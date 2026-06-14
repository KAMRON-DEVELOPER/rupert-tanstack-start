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

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { WsConnection } from './connection'
import { eventBus } from './eventBus'
import { registerChatHandlers } from './handlers/chats'
import { registerGroupHandlers } from './handlers/groups'
import { registerFeedHandlers } from './handlers/feeds'
import type { IncomingEvent, OutgoingEvent, WsStatus } from './events'
import { toast } from 'sonner'

// --- Context ---

interface WsContextValue {
  status: WsStatus
  lastError: string | null
  authFailed: boolean
  send: (payload: IncomingEvent) => boolean
}

const WsContext = createContext<WsContextValue | null>(null)

// --- Provider ---
interface WebSocketProviderProps {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const queryClient = useQueryClient()
  const connectionRef = useRef<WsConnection | null>(null)

  const [status, setStatus] = useState<WsStatus>('idle')
  const [lastError, setLastError] = useState<string | null>(null)

  // Stable send() that delegates to the current connection
  const send = useCallback((payload: IncomingEvent): boolean => {
    if (!connectionRef.current) {
      setLastError('WebSocket is not connected')
      return false
    }
    return connectionRef.current.send(payload)
  }, [])

  useEffect(() => {
    // Register domain handlers (they attach to the event bus)
    const cleanupChat = registerChatHandlers(queryClient)
    const cleanupGroups = registerGroupHandlers(queryClient)
    const cleanupFeeds = registerFeedHandlers(queryClient)

    // Create and connect the WebSocket
    const conn = new WsConnection({
      onStatusChange: setStatus,
      onError: (msg) => {
        console.log(`[WebSocketProvider][WsConnection] onError: ${msg}`)
        toast.error(`[WebSocketProvider][WsConnection] onError: ${msg}`)
        setLastError(msg)
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

  const value = useMemo(
    () => ({ status, lastError, authFailed, send }),
    [status, lastError, authFailed, send]
  )

  return <WsContext.Provider value={value}>{children}</WsContext.Provider>
}

// --- Consumer hooks ---

/**
 * Access connection status and send().
 *
 * @example
 * const { status, send } = useWebSocket()
 * send({ type: 'join_chat', chatId })
 */
export function useWebSocket(): WsContextValue {
  const ctx = useContext(WsContext)
  if (!ctx) {
    throw new Error('useWebSocket must be used inside <WebSocketProvider>')
  }
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
export function useWebSocketEvent<T extends OutgoingEvent['type']>(
  type: T,
  handler: (event: Extract<OutgoingEvent, { type: T }>) => void
): void {
  // Keep a ref so the eventBus subscription never needs to change
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const stable = (event: Extract<OutgoingEvent, { type: T }>) => {
      handlerRef.current(event)
    }

    eventBus.on(type as never, stable as never)
    return () => eventBus.off(type as never, stable as never)
  }, [type])
}
