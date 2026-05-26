import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  useQueryClient,
  type QueryClient,
  type QueryKey
} from '@tanstack/react-query'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { BASE_URL } from '@/consts'
import {
  chatWsInboundPayloadSchema,
  chatWsOutboundPayloadSchema,
  type ChatListItemResponse,
  type ChatMessageResponse,
  type ChatWsInboundPayload,
  type ChatWsOutboundPayload
} from '@/types/chats.schema'

type ChatSocketStatus = 'idle' | 'connecting' | 'open' | 'closed' | 'error'

type UseChatWebSocketResult = {
  status: ChatSocketStatus
  lastEvent: ChatWsInboundPayload | null
  lastError: string | null
  send: (payload: ChatWsOutboundPayload) => boolean
}

type ListKeyKind = 'chat-list' | 'chat-messages' | 'other'

const HEARTBEAT_MS = 25_000

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getListKeyKind = (queryKey: QueryKey): ListKeyKind => {
  if (!Array.isArray(queryKey) || queryKey[0] !== 'chats') return 'other'
  if (queryKey.length === 1) return 'chat-list'
  if (queryKey.length === 2 && isRecord(queryKey[1])) return 'chat-list'
  if (
    queryKey.length === 3 &&
    typeof queryKey[1] === 'string' &&
    queryKey[2] === 'messages'
  ) {
    return 'chat-messages'
  }
  return 'other'
}

const replaceInArray = <T extends { id: string }>(items: T[], nextItem: T) => {
  const withoutDuplicate = items.filter((item) => item.id !== nextItem.id)
  return [nextItem, ...withoutDuplicate]
}

const appendUnique = <T extends { id: string }>(items: T[], item: T) => {
  if (items.some((current) => current.id === item.id)) return items
  return [...items, item]
}

const updateCollection = <T extends { id: string }>(
  data: unknown,
  updater: (items: T[]) => T[],
  pageTarget: 'first' | 'last' | 'all' = 'all'
): unknown => {
  if (Array.isArray(data)) return updater(data as T[])

  if (!isRecord(data)) return data

  if (Array.isArray(data.data)) {
    return { ...data, data: updater(data.data as T[]) }
  }

  if (Array.isArray(data.items)) {
    return { ...data, items: updater(data.items as T[]) }
  }

  if (Array.isArray(data.pages)) {
    const pages = data.pages
    const nextPages = pages.map((page, index) => {
      const isTarget =
        pageTarget === 'all' ||
        (pageTarget === 'first' && index === 0) ||
        (pageTarget === 'last' && index === pages.length - 1)

      return isTarget ? updateCollection<T>(page, updater, 'all') : page
    })
    return { ...data, pages: nextPages }
  }

  return data
}

const prependChatToLists = (
  queryClient: QueryClient,
  chat: ChatListItemResponse
) => {
  queryClient.setQueriesData(
    { predicate: ({ queryKey }) => getListKeyKind(queryKey) === 'chat-list' },
    (data) =>
      updateCollection<ChatListItemResponse>(
        data,
        (items) => replaceInArray(items, chat),
        'first'
      )
  )
}

const updateChatPreview = (
  queryClient: QueryClient,
  message: ChatMessageResponse
) => {
  queryClient.setQueriesData(
    { predicate: ({ queryKey }) => getListKeyKind(queryKey) === 'chat-list' },
    (data) =>
      updateCollection<ChatListItemResponse>(
        data,
        (items) => {
          const target = items.find((item) => item.id === message.chatId)
          if (!target) return items

          const updated: ChatListItemResponse = {
            ...target,
            lastMessage: {
              ...message,
              seenByRecipient: null
            }
          }

          return replaceInArray(items, updated)
        },
        'all'
      )
  )
}

const appendMessageToChat = (
  queryClient: QueryClient,
  message: ChatMessageResponse
) => {
  queryClient.setQueryData(['chats', message.chatId, 'messages'], (data) =>
    updateCollection<ChatMessageResponse>(
      data,
      (items) => appendUnique(items, message),
      'last'
    )
  )
}

const replaceMessageInChat = (
  queryClient: QueryClient,
  message: ChatMessageResponse
) => {
  queryClient.setQueryData(['chats', message.chatId, 'messages'], (data) =>
    updateCollection<ChatMessageResponse>(
      data,
      (items) => items.map((item) => (item.id === message.id ? message : item)),
      'all'
    )
  )
}

const removeMessageFromChat = (
  queryClient: QueryClient,
  chatId: string,
  messageId: string
) => {
  queryClient.setQueryData(['chats', chatId, 'messages'], (data) =>
    updateCollection<ChatMessageResponse>(
      data,
      (items) => items.filter((item) => item.id !== messageId),
      'all'
    )
  )
}

const removeChatFromLists = (queryClient: QueryClient, chatId: string) => {
  queryClient.setQueriesData(
    { predicate: ({ queryKey }) => getListKeyKind(queryKey) === 'chat-list' },
    (data) =>
      updateCollection<ChatListItemResponse>(
        data,
        (items) => items.filter((item) => item.id !== chatId),
        'all'
      )
  )
}

const updateChatSettingsInLists = (
  queryClient: QueryClient,
  event: Extract<ChatWsInboundPayload, { type: 'chat_settings_updated' }>
) => {
  queryClient.setQueriesData(
    { predicate: ({ queryKey }) => getListKeyKind(queryKey) === 'chat-list' },
    (data) =>
      updateCollection<ChatListItemResponse>(
        data,
        (items) =>
          items.map((item) =>
            item.id === event.chatId
              ? {
                  ...item,
                  isPinned: event.isPinned,
                  isMuted: event.isMuted,
                  isArchived: event.isArchived
                }
              : item
          ),
        'all'
      )
  )
}

const toWebSocketUrl = () => {
  const url = new URL(BASE_URL)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  url.pathname = `${url.pathname.replace(/\/$/, '')}/chats/ws`
  return url.toString()
}

const readEventData = (
  data: unknown
): { ok: true; data: unknown } | { ok: false; message: string } => {
  if (typeof data !== 'string') return { ok: true, data }

  try {
    return { ok: true, data: JSON.parse(data) }
  } catch {
    return { ok: false, message: 'Invalid chat event JSON' }
  }
}

const routeInboundEvent = (
  queryClient: QueryClient,
  event: ChatWsInboundPayload
) => {
  if (event.type === 'chat_created') {
    if ('chat' in event) {
      prependChatToLists(queryClient, event.chat)
      return
    }
    queryClient.invalidateQueries({ queryKey: ['chats'] })
    return
  }

  if (event.type === 'message_created') {
    appendMessageToChat(queryClient, event.message)
    updateChatPreview(queryClient, event.message)
    return
  }

  if (event.type === 'message_updated') {
    replaceMessageInChat(queryClient, event.message)
    updateChatPreview(queryClient, event.message)
    return
  }

  if (event.type === 'message_deleted') {
    removeMessageFromChat(queryClient, event.chatId, event.messageId)
    queryClient.invalidateQueries({ queryKey: ['chats'] })
    return
  }

  if (event.type === 'chat_deleted') {
    removeChatFromLists(queryClient, event.chatId)
    queryClient.removeQueries({ queryKey: ['chats', event.chatId, 'messages'] })
    return
  }

  if (event.type === 'chat_cleared') {
    queryClient.invalidateQueries({
      queryKey: ['chats', event.chatId, 'messages']
    })
    queryClient.invalidateQueries({ queryKey: ['chats'] })
    return
  }

  if (event.type === 'chat_settings_updated') {
    updateChatSettingsInLists(queryClient, event)
    return
  }

  if (event.type === 'chat_read') {
    queryClient.invalidateQueries({ queryKey: ['chats'] })
  }
}

export const useChatWebSocket = (): UseChatWebSocketResult => {
  const queryClient = useQueryClient()
  const socketRef = useRef<ReconnectingWebSocket | null>(null)
  const heartbeatRef = useRef<number | null>(null)
  const [status, setStatus] = useState<ChatSocketStatus>('idle')
  const [lastEvent, setLastEvent] = useState<ChatWsInboundPayload | null>(null)
  const [lastError, setLastError] = useState<string | null>(null)

  const wsUrl = useMemo(() => {
    if (typeof window === 'undefined') return null
    return toWebSocketUrl()
  }, [])

  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current === null) return
    window.clearInterval(heartbeatRef.current)
    heartbeatRef.current = null
  }, [])

  const send = useCallback((payload: ChatWsOutboundPayload) => {
    const parsed = chatWsOutboundPayloadSchema.safeParse(payload)
    if (!parsed.success) {
      setLastError(parsed.error.issues[0]?.message ?? 'Invalid chat payload')
      return false
    }

    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      setLastError('Chat socket is not open')
      return false
    }

    socketRef.current.send(JSON.stringify(parsed.data))
    return true
  }, [])

  useEffect(() => {
    if (!wsUrl) return

    const socket = new ReconnectingWebSocket(wsUrl, [], { maxRetries: 10 })
    socketRef.current = socket
    setStatus('connecting')

    const handleOpen = () => {
      setStatus('open')
      setLastError(null)
      stopHeartbeat()
      heartbeatRef.current = window.setInterval(() => {
        socket.send(JSON.stringify({ type: 'ping' }))
      }, HEARTBEAT_MS)
    }

    const handleClose = () => {
      setStatus('closed')
      stopHeartbeat()
    }

    const handleError = () => {
      setStatus('error')
      setLastError('Chat socket connection failed')
    }

    const handleMessage = (event: MessageEvent) => {
      const eventData = readEventData(event.data)
      if (!eventData.ok) {
        setLastError(eventData.message)
        return
      }

      const parsed = chatWsInboundPayloadSchema.safeParse(eventData.data)

      if (!parsed.success) {
        setLastError(parsed.error.issues[0]?.message ?? 'Invalid chat event')
        return
      }

      setLastEvent(parsed.data)
      routeInboundEvent(queryClient, parsed.data)

      if (parsed.data.type === 'error') {
        setLastError(
          typeof parsed.data.detail === 'string'
            ? parsed.data.detail
            : 'Chat socket error'
        )
      }
    }

    socket.addEventListener('open', handleOpen)
    socket.addEventListener('close', handleClose)
    socket.addEventListener('error', handleError)
    socket.addEventListener('message', handleMessage)

    return () => {
      stopHeartbeat()
      socket.removeEventListener('open', handleOpen)
      socket.removeEventListener('close', handleClose)
      socket.removeEventListener('error', handleError)
      socket.removeEventListener('message', handleMessage)
      socket.close()
      if (socketRef.current === socket) socketRef.current = null
    }
  }, [queryClient, stopHeartbeat, wsUrl])

  return { status, lastEvent, lastError, send }
}
