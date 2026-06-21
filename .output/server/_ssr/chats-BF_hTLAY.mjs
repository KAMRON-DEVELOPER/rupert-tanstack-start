import { o as __toESM } from '../_runtime.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import {
  r as queryOptions,
  s as useQueryClient
} from '../_libs/tanstack__react-query.mjs'
import {
  a as literal,
  c as string,
  i as discriminatedUnion,
  n as array,
  o as number,
  r as boolean,
  s as object,
  t as zod_default
} from '../_libs/zod.mjs'
import {
  a as isoDateTime,
  o as uuid,
  t as BASE_URL
} from './primitives-BmQBoQXc.mjs'
import { n as paginationQuerySchema } from './pagination-LyDEN9Vs.mjs'
import { n as toast } from '../_libs/sonner.mjs'
import {
  n as chatListItemResponseSchema,
  r as chatListLastMessageResponseSchema
} from './chat-Di9wjxRA.mjs'
import { t as ReconnectingWebSocket } from '../_libs/reconnecting-websocket.mjs'
import { t as mitt_default } from '../_libs/mitt.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/chats-BF_hTLAY.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
/**
 * eventBus.ts
 *
 * A tiny typed pub/sub bus built on top of mitt.
 * The WebSocket connection layer emits parsed events here;
 * domain handlers subscribe to the specific event types they care about.
 *
 * This means:
 *  - The connection layer never imports React or TanStack Query.
 *  - Domain handlers never touch the WebSocket directly.
 *  - Adding a new domain (groups, feeds) = add new handlers, nothing else changes.
 */
var eventBus = mitt_default()
var errorEventSchema = object({
  type: literal('error'),
  detail: string(),
  statusCode: number().nullish()
})
var outgoingEventSchema = discriminatedUnion('type', [
  object({ type: literal('pong') }),
  errorEventSchema,
  object({
    type: literal('chat_joined'),
    chatId: uuid
  }),
  object({
    type: literal('chat_left'),
    chatId: uuid
  }),
  object({
    type: literal('typing_start'),
    chatId: uuid,
    userId: uuid
  }),
  object({
    type: literal('typing_stop'),
    chatId: uuid,
    userId: uuid
  }),
  object({
    type: literal('chat_read'),
    chatId: uuid,
    userId: uuid,
    lastSeenAt: isoDateTime
  }),
  object({
    type: literal('chat_created'),
    item: chatListItemResponseSchema
  }),
  object({
    type: literal('chat_cleared'),
    chatId: uuid,
    userId: uuid,
    clearedAt: isoDateTime,
    forParticipant: boolean()
  }),
  object({
    type: literal('chat_deleted'),
    chatId: uuid,
    userId: uuid,
    deletedAt: isoDateTime.nullish(),
    forParticipant: boolean()
  }),
  object({
    type: literal('user_online'),
    userId: uuid
  }),
  object({
    type: literal('user_offline'),
    userId: uuid,
    lastOnlineAt: isoDateTime
  }),
  object({
    type: literal('message_created'),
    message: chatListLastMessageResponseSchema
  }),
  object({
    type: literal('message_updated'),
    message: chatListLastMessageResponseSchema
  }),
  object({
    type: literal('message_deleted'),
    chatId: uuid,
    messageId: uuid
  }),
  object({
    type: literal('chat_settings_updated'),
    chatId: uuid,
    isPinned: boolean().nullable(),
    isMuted: boolean().nullable(),
    isArchived: boolean().nullable()
  })
])
var chatRoomActionRequestSchema = object({ chatId: uuid })
var messageActionRequestSchema = chatRoomActionRequestSchema.extend({
  messageId: uuid
})
var readChatRequestSchema = chatRoomActionRequestSchema.extend({
  lastSeenAt: isoDateTime.nullish()
})
var scopedChatActionRequestSchema = chatRoomActionRequestSchema.extend({
  forParticipant: boolean().default(false)
})
var updateChatSettingsActionRequestSchema = object({
  chatId: uuid,
  isPinned: boolean().nullable().nullish(),
  isMuted: boolean().nullable().nullish(),
  isArchived: boolean().nullable().nullish()
})
var updateMessageActionRequestSchema = object({
  chatId: uuid,
  messageId: uuid,
  message: string().nullish(),
  attachments: array(uuid).nullish()
})
var createChatRequestSchema = object({ participantId: uuid })
var sendMessageRequestSchema = object({
  chatId: uuid,
  message: string().nullish(),
  replyId: uuid.nullable().nullish(),
  participantId: uuid.nullable().nullish(),
  attachments: array(uuid).nullish()
})
var incomingEventSchema = discriminatedUnion('type', [
  object({ type: literal('ping') }),
  chatRoomActionRequestSchema.extend({ type: literal('join_chat') }),
  chatRoomActionRequestSchema.extend({ type: literal('leave_chat') }),
  chatRoomActionRequestSchema.extend({ type: literal('typing_start') }),
  chatRoomActionRequestSchema.extend({ type: literal('typing_stop') }),
  readChatRequestSchema.extend({ type: literal('read_chat') }),
  createChatRequestSchema.extend({ type: literal('create_chat') }),
  scopedChatActionRequestSchema.extend({ type: literal('delete_chat') }),
  scopedChatActionRequestSchema.extend({ type: literal('clear_chat') }),
  updateChatSettingsActionRequestSchema.extend({
    type: literal('update_chat_settings')
  }),
  sendMessageRequestSchema.extend({ type: literal('send_message') }),
  updateMessageActionRequestSchema.extend({ type: literal('update_message') }),
  messageActionRequestSchema.extend({ type: literal('delete_message') })
])
/**
 * connection.ts
 *
 * Owns the WebSocket lifecycle:
 *  - connects, reconnects, heartbeats
 *  - parses raw frames → OutgoingEvent via Zod
 *  - emits typed events onto the bus
 *  - exposes a type-safe send() that validates IncomingEvent before wire
 *
 * Deliberately has zero React imports. It is instantiated once inside
 * WebSocketProvider and torn down on unmount.
 */
var HEARTBEAT_MS = 25e3
function buildWsUrl() {
  const url = new URL(BASE_URL)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  url.pathname = `${url.pathname.replace(/\/$/, '')}/ws/`
  return url.toString()
}
var WsConnection = class {
  socket = null
  heartbeatTimer = null
  isUnloading = false
  connectTime = 0
  didOpen = false
  cb
  constructor(cb) {
    this.cb = cb
  }
  connect() {
    if (this.socket) return
    const socket = new ReconnectingWebSocket(buildWsUrl(), [], {
      maxRetries: 10
    })
    this.socket = socket
    this.connectTime = Date.now()
    this.didOpen = false
    this.cb.onStatusChange('connecting')
    window.addEventListener('beforeunload', this.handleBeforeUnload)
    socket.addEventListener('open', this.handleOpen)
    socket.addEventListener('close', this.handleClose)
    socket.addEventListener('error', this.handleError)
    socket.addEventListener('message', this.handleMessage)
  }
  disconnect() {
    this.stopHeartbeat()
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
    if (this.socket) {
      this.socket.removeEventListener('open', this.handleOpen)
      this.socket.removeEventListener('close', this.handleClose)
      this.socket.removeEventListener('error', this.handleError)
      this.socket.removeEventListener('message', this.handleMessage)
      this.socket.close()
      this.socket = null
    }
  }
  /**
   * Validate the payload against the incoming schema before sending.
   * Returns false (and sets lastError) if the socket is not open or the
   * payload is invalid.
   */
  send(payload) {
    const parsed = incomingEventSchema.safeParse(payload)
    if (!parsed.success) {
      this.cb.onError(parsed.error.issues[0]?.message ?? 'Invalid WS payload')
      return false
    }
    if (this.socket?.readyState !== WebSocket.OPEN) {
      this.cb.onError('WebSocket is not open')
      return false
    }
    this.socket.send(JSON.stringify(parsed.data))
    return true
  }
  handleBeforeUnload = () => {
    this.isUnloading = true
  }
  handleOpen = () => {
    this.didOpen = true
    this.cb.onStatusChange('open')
    this.cb.onError('')
    this.stopHeartbeat()
    this.heartbeatTimer = setInterval(() => {
      this.socket?.send(JSON.stringify({ type: 'ping' }))
    }, HEARTBEAT_MS)
  }
  handleClose = () => {
    if (this.isUnloading) return
    this.stopHeartbeat()
    if (this.isAuthFailure()) {
      this.cb.onStatusChange('closed')
      this.cb.onError('Authentication failed — please refresh the page')
      return
    }
    this.cb.onStatusChange('closed')
  }
  handleError = () => {
    if (this.isUnloading) return
    if (this.isAuthFailure()) {
      this.cb.onStatusChange('error')
      this.cb.onError('Authentication failed — please refresh the page')
      return
    }
    this.cb.onStatusChange('error')
    this.cb.onError('WebSocket connection failed')
  }
  handleMessage = (event) => {
    let raw
    try {
      raw = JSON.parse(event.data)
    } catch {
      this.cb.onError('Received invalid JSON from server')
      return
    }
    const parsed = outgoingEventSchema.safeParse(raw)
    if (!parsed.success) {
      console.log(
        `[WsConnection] handleMessage: failed to parse into outgoingEventSchema: ${raw}`
      )
      toast.error(
        `[WsConnection] handleMessage: failed to parse into outgoingEventSchema: ${raw}`
      )
      return
    }
    const ev = parsed.data
    if (ev.type === 'error') this.cb.onError(ev.detail)
    if (ev.type != 'pong') console.log('ev: ', JSON.stringify(ev))
    eventBus.emit(ev.type, ev)
  }
  stopHeartbeat() {
    if (this.heartbeatTimer !== null) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }
  /**
   * Heuristic: if the socket failed/closed within 2 s of connecting and
   * we never got an `open` event, it was almost certainly an auth rejection
   * (HTTP 401/403 during the WS upgrade handshake).
   */
  isAuthFailure() {
    return !this.didOpen && Date.now() - this.connectTime < 2e3
  }
}
var isRecord = (v) => typeof v === 'object' && v !== null && !Array.isArray(v)
function getListKeyKind(queryKey) {
  if (!Array.isArray(queryKey) || queryKey[0] !== 'chats') return 'other'
  if (queryKey.length === 1) return 'chat-list'
  if (queryKey.length === 2 && isRecord(queryKey[1])) return 'chat-list'
  if (
    queryKey.length === 3 &&
    typeof queryKey[1] === 'string' &&
    queryKey[2] === 'messages'
  )
    return 'chat-messages'
  return 'other'
}
function replaceInArray(items, next) {
  return [next, ...items.filter((i) => i.id !== next.id)]
}
function appendUnique(items, item) {
  if (items.some((i) => i.id === item.id)) return items
  return [...items, item]
}
function updateCollection(data, updater, target = 'all') {
  if (Array.isArray(data)) return updater(data)
  if (!isRecord(data)) return data
  if (Array.isArray(data['data']))
    return {
      ...data,
      data: updater(data['data'])
    }
  if (Array.isArray(data['items']))
    return {
      ...data,
      items: updater(data['items'])
    }
  if (Array.isArray(data['pages'])) {
    const pages = data['pages']
    return {
      ...data,
      pages: pages.map((page, i) => {
        return target === 'all' ||
          (target === 'first' && i === 0) ||
          (target === 'last' && i === pages.length - 1)
          ? updateCollection(page, updater, 'all')
          : page
      })
    }
  }
  return data
}
function mutateChatLists(qc, updater, target = 'all') {
  qc.setQueriesData(
    { predicate: ({ queryKey }) => getListKeyKind(queryKey) === 'chat-list' },
    (data) => updateCollection(data, updater, target)
  )
}
function mutateChatMessages(qc, chatId, updater, target = 'all') {
  qc.setQueryData(['chats', chatId, 'messages'], (data) =>
    updateCollection(data, updater, target)
  )
}
function onMessageCreated(qc, ev) {
  const msg = ev.message
  mutateChatMessages(
    qc,
    msg.chatId,
    (items) => appendUnique(items, msg),
    'last'
  )
  mutateChatLists(
    qc,
    (items) => {
      const target = items.find((i) => i.id === msg.chatId)
      if (!target) return items
      return replaceInArray(items, {
        ...target,
        lastMessage: msg
      })
    },
    'all'
  )
}
function onMessageUpdated(qc, ev) {
  const msg = ev.message
  mutateChatMessages(
    qc,
    msg.chatId,
    (items) => items.map((i) => (i.id === msg.id ? msg : i)),
    'all'
  )
  mutateChatLists(
    qc,
    (items) => {
      const target = items.find((i) => i.id === msg.chatId)
      if (!target) return items
      return replaceInArray(items, {
        ...target,
        lastMessage: msg
      })
    },
    'all'
  )
}
function onMessageDeleted(qc, ev) {
  mutateChatMessages(
    qc,
    ev.chatId,
    (items) => items.filter((i) => i.id !== ev.messageId),
    'all'
  )
  qc.invalidateQueries({ queryKey: ['chats'] })
}
function onChatSettingsUpdated(qc, ev) {
  mutateChatLists(
    qc,
    (items) =>
      items.map((i) =>
        i.id === ev.chatId
          ? {
              ...i,
              isPinned: ev.isPinned ?? i.isPinned,
              isMuted: ev.isMuted ?? i.isMuted,
              isArchived: ev.isArchived ?? i.isArchived
            }
          : i
      ),
    'all'
  )
}
function onUserPresenceChange(qc, userId, isOnline) {
  mutateChatLists(
    qc,
    (items) =>
      items.map((i) =>
        i.user.id === userId
          ? {
              ...i,
              user: {
                ...i.user,
                isOnline
              }
            }
          : i
      ),
    'all'
  )
}
/**
 * Attach all chat-domain event listeners to the bus.
 * Returns a cleanup function — call it on unmount.
 */
function registerChatHandlers(qc) {
  const handlers = {
    message_created: (ev) => onMessageCreated(qc, ev),
    message_updated: (ev) => onMessageUpdated(qc, ev),
    message_deleted: (ev) => onMessageDeleted(qc, ev),
    chat_settings_updated: (ev) => onChatSettingsUpdated(qc, ev),
    chat_created: () => {
      qc.invalidateQueries({ queryKey: ['chats'] })
    },
    chat_deleted: (ev) => {
      mutateChatLists(
        qc,
        (items) => items.filter((i) => i.id !== ev.chatId),
        'all'
      )
      qc.removeQueries({ queryKey: ['chats', ev.chatId, 'messages'] })
    },
    chat_cleared: (ev) => {
      qc.invalidateQueries({ queryKey: ['chats', ev.chatId, 'messages'] })
      qc.invalidateQueries({ queryKey: ['chats'] })
    },
    chat_read: () => {
      qc.invalidateQueries({ queryKey: ['chats'] })
    },
    user_online: (ev) => onUserPresenceChange(qc, ev.userId, true),
    user_offline: (ev) => onUserPresenceChange(qc, ev.userId, false)
  }
  Object.entries(handlers).forEach(([event, handler]) => {
    eventBus.on(event, handler)
  })
  return () => {
    Object.entries(handlers).forEach(([event, handler]) => {
      eventBus.off(event, handler)
    })
  }
}
function registerGroupHandlers(_qc) {
  return () => {}
}
function registerFeedHandlers(_qc) {
  return () => {}
}
/**
 * index.tsx
 *
 * React integration:
 *
 *   <WebSocketProvider>          — mounts in __root.tsx (auth-gated)
 *     useWebSocket()             — status, lastError, authFailed, send()
 *     useWebSocketEvent(type, handler)  — subscribe to a specific event type
 *
 * The provider owns the WsConnection instance and all domain handlers.
 * Components never talk to the socket directly — they call send() from
 * useWebSocket() and react to events via useWebSocketEvent().
 */
var WsContext = (0, import_react.createContext)(null)
function WebSocketProvider({ children }) {
  const queryClient = useQueryClient()
  const connectionRef = (0, import_react.useRef)(null)
  const [status, setStatus] = (0, import_react.useState)('idle')
  const [lastError, setLastError] = (0, import_react.useState)(null)
  const send = (0, import_react.useCallback)((payload) => {
    if (!connectionRef.current) {
      setLastError('WebSocket is not connected')
      return false
    }
    return connectionRef.current.send(payload)
  }, [])
  ;(0, import_react.useEffect)(() => {
    const cleanupChat = registerChatHandlers(queryClient)
    const cleanupGroups = registerGroupHandlers(queryClient)
    const cleanupFeeds = registerFeedHandlers(queryClient)
    const conn = new WsConnection({
      onStatusChange: setStatus,
      onError: (msg) => {
        if (msg.trim() !== '') {
          console.log(`[WebSocketProvider][WsConnection] onError: ${msg}`)
          toast.error(`[WebSocketProvider][WsConnection] onError: ${msg}`)
          setLastError(msg)
        }
      }
    })
    connectionRef.current = conn
    conn.connect()
    return () => {
      conn.disconnect()
      connectionRef.current = null
      cleanupChat()
      cleanupGroups()
      cleanupFeeds()
    }
  }, [queryClient])
  const authFailed =
    (status === 'closed' || status === 'error') &&
    lastError === 'Authentication failed — please refresh the page'
  const value = (0, import_react.useMemo)(
    () => ({
      status,
      lastError,
      authFailed,
      send
    }),
    [status, lastError, authFailed, send]
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsContext.Provider, {
    value,
    children
  })
}
/**
 * Access connection status and send().
 *
 * @example
 * const { status, send } = useWebSocket()
 * send({ type: 'join_chat', chatId })
 */
function useWebSocket() {
  const ctx = (0, import_react.useContext)(WsContext)
  if (!ctx)
    throw new Error('useWebSocket must be used inside <WebSocketProvider>')
  return ctx
}
/**
 * Subscribe to a specific outgoing event type.
 * The handler is stable-ref'd internally so callers don't need useCallback.
 *
 * @example
 * useWebSocketEvent('typing_start', ({ chatId, userId }) => {
 *   setTyping(chatId, userId, true)
 * })
 */
function useWebSocketEvent(type, handler) {
  const handlerRef = (0, import_react.useRef)(handler)
  handlerRef.current = handler
  ;(0, import_react.useEffect)(() => {
    const stable = (event) => {
      handlerRef.current(event)
    }
    eventBus.on(type, stable)
    return () => eventBus.off(type, stable)
  }, [type])
}
var getChatsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(
    createSsrRpc(
      'd3762ab5affb3ab5e2448288d3ffcdb2cd2615e12410fd666f30b7939d6d3be3'
    )
  )
var getChatMessagesFn = createServerFn()
  .inputValidator(
    paginationQuerySchema.extend({ chatId: zod_default.string() })
  )
  .handler(
    createSsrRpc(
      '2f80f3be7a7d00480e77d6e03bc5f3eb6299b5f37957fdf688ce8bbdea76be2c'
    )
  )
var useGetChatsQueryOptions = (
  data = {
    offset: 0,
    limit: 20
  }
) =>
  queryOptions({
    queryKey: Object.keys(data).length > 0 ? ['chats', data] : ['chats'],
    queryFn: () => getChatsFn({ data }),
    staleTime: 3e4
  })
//#endregion
export {
  useWebSocketEvent as a,
  useWebSocket as i,
  getChatMessagesFn as n,
  useGetChatsQueryOptions as r,
  WebSocketProvider as t
}
