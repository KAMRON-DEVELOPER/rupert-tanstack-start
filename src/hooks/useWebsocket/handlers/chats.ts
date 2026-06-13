import type { QueryClient, QueryKey } from '@tanstack/react-query'
import type {
  ChatSettingsUpdatedEvent,
  MessageCreatedEvent,
  MessageDeletedEvent,
  MessageUpdatedEvent
} from '../events'
import { eventBus } from '../eventBus'
import { ChatMessageResponse } from '@/types/chats/chat-message'
import { ChatListItemResponse } from '@/types/chats/chat'

// ─── Query-key helpers ────────────────────────────────────────────────────────

type ListKeyKind = 'chat-list' | 'chat-messages' | 'other'

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

function getListKeyKind(queryKey: QueryKey): ListKeyKind {
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

// --- Immutable collection helpers ---

function replaceInArray<T extends { id: string }>(items: T[], next: T): T[] {
  return [next, ...items.filter((i) => i.id !== next.id)]
}

function appendUnique<T extends { id: string }>(items: T[], item: T): T[] {
  if (items.some((i) => i.id === item.id)) return items
  return [...items, item]
}

type PageTarget = 'first' | 'last' | 'all'

function updateCollection<T extends { id: string }>(
  data: unknown,
  updater: (items: T[]) => T[],
  target: PageTarget = 'all'
): unknown {
  if (Array.isArray(data)) return updater(data as T[])
  if (!isRecord(data)) return data

  if (Array.isArray(data['data']))
    return { ...data, data: updater(data['data'] as T[]) }

  if (Array.isArray(data['items']))
    return { ...data, items: updater(data['items'] as T[]) }

  if (Array.isArray(data['pages'])) {
    const pages = data['pages'] as unknown[]
    return {
      ...data,
      pages: pages.map((page, i) => {
        const hit =
          target === 'all' ||
          (target === 'first' && i === 0) ||
          (target === 'last' && i === pages.length - 1)
        return hit ? updateCollection<T>(page, updater, 'all') : page
      })
    }
  }

  return data
}

// --- Cache mutators ---

function mutateChatLists(
  qc: QueryClient,
  updater: (items: ChatListItemResponse[]) => ChatListItemResponse[],
  target: PageTarget = 'all'
) {
  qc.setQueriesData(
    { predicate: ({ queryKey }) => getListKeyKind(queryKey) === 'chat-list' },
    (data) => updateCollection<ChatListItemResponse>(data, updater, target)
  )
}

function mutateChatMessages(
  qc: QueryClient,
  chatId: string,
  updater: (items: ChatMessageResponse[]) => ChatMessageResponse[],
  target: PageTarget = 'all'
) {
  qc.setQueryData(['chats', chatId, 'messages'], (data) =>
    updateCollection<ChatMessageResponse>(data, updater, target)
  )
}

// --- Individual event handlers ---

function onMessageCreated(qc: QueryClient, ev: MessageCreatedEvent) {
  const msg = ev.message

  mutateChatMessages(qc, msg.id, (items) => appendUnique(items, msg), 'last')

  mutateChatLists(
    qc,
    (items) => {
      const target = items.find((i) => i.id === msg.id)
      if (!target) return items
      return replaceInArray(items, {
        ...target,
        lastMessage: msg.lastMessage
      })
    },
    'all'
  )
}

function onMessageUpdated(qc: QueryClient, ev: MessageUpdatedEvent) {
  const msg = ev.message

  mutateChatMessages(
    qc,
    msg.id,
    (items) => items.map((i) => (i.id === msg.id ? msg : i)),
    'all'
  )

  mutateChatLists(
    qc,
    (items) => {
      const target = items.find((i) => i.id === msg.id)
      if (!target) return items
      return replaceInArray(items, {
        ...target,
        lastMessage: msg.lastMessage
      })
    },
    'all'
  )
}

function onMessageDeleted(qc: QueryClient, ev: MessageDeletedEvent) {
  mutateChatMessages(
    qc,
    ev.chatId,
    (items) => items.filter((i) => i.id !== ev.messageId),
    'all'
  )
  qc.invalidateQueries({ queryKey: ['chats'] })
}

function onChatSettingsUpdated(qc: QueryClient, ev: ChatSettingsUpdatedEvent) {
  mutateChatLists(
    qc,
    (items) =>
      items.map((i) =>
        i.id === ev.id
          ? {
              ...i,
              isPinned: ev.isPinned,
              isMuted: ev.isMuted,
              isArchived: ev.isArchived
            }
          : i
      ),
    'all'
  )
}

function onUserPresenceChange(
  qc: QueryClient,
  userId: string,
  isOnline: boolean
) {
  mutateChatLists(
    qc,
    (items) =>
      items.map((i) => (i.user.id === userId ? { ...i, isOnline } : i)),
    'all'
  )
}

// ─── Register / unregister ────────────────────────────────────────────────────

/**
 * Attach all chat-domain event listeners to the bus.
 * Returns a cleanup function — call it on unmount.
 */
export function registerChatHandlers(qc: QueryClient): () => void {
  const handlers = {
    message_created: (ev: MessageCreatedEvent) => onMessageCreated(qc, ev),
    message_updated: (ev: MessageUpdatedEvent) => onMessageUpdated(qc, ev),
    message_deleted: (ev: MessageDeletedEvent) => onMessageDeleted(qc, ev),
    chat_settings_updated: (ev: ChatSettingsUpdatedEvent) =>
      onChatSettingsUpdated(qc, ev),
    chat_created: () => {
      // Invalidate the full chat list so the new chat appears.
      // Once backend sends the full ChatListItemResponse in the event,
      // replace this with a targeted prepend (see old hook for pattern).
      qc.invalidateQueries({ queryKey: ['chats'] })
    },
    chat_deleted: (ev: { chatId: string }) => {
      mutateChatLists(
        qc,
        (items) => items.filter((i) => i.id !== ev.chatId),
        'all'
      )
      qc.removeQueries({ queryKey: ['chats', ev.chatId, 'messages'] })
    },
    chat_cleared: (ev: { chatId: string }) => {
      qc.invalidateQueries({ queryKey: ['chats', ev.chatId, 'messages'] })
      qc.invalidateQueries({ queryKey: ['chats'] })
    },
    chat_read: () => {
      qc.invalidateQueries({ queryKey: ['chats'] })
    },
    user_online: (ev: { userId: string }) =>
      onUserPresenceChange(qc, ev.userId, true),
    user_offline: (ev: { userId: string }) =>
      onUserPresenceChange(qc, ev.userId, false)
  } as const

  // Register
  Object.entries(handlers).forEach(([event, handler]) => {
    eventBus.on(event as never, handler as never)
  })

  // Cleanup
  return () => {
    Object.entries(handlers).forEach(([event, handler]) => {
      eventBus.off(event as never, handler as never)
    })
  }
}
