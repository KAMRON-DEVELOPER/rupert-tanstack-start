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

import ReconnectingWebSocket from 'reconnecting-websocket'
import { BASE_URL } from '@/consts'
import { eventBus } from './eventBus'
import {
  incomingEventSchema,
  outgoingEventSchema,
  type IncomingEvent,
  type WsStatus
} from './events'
import { toast } from 'sonner'

const HEARTBEAT_MS = 25_000

function buildWsUrl(): string {
  const url = new URL(BASE_URL)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  url.pathname = `${url.pathname.replace(/\/$/, '')}/ws/`
  return url.toString()
}

export type ConnectionCallbacks = {
  onStatusChange: (status: WsStatus) => void
  onError: (message: string) => void
}

export class WsConnection {
  private socket: ReconnectingWebSocket | null = null
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null
  private isUnloading = false
  private connectTime = 0
  private didOpen = false

  private readonly cb: ConnectionCallbacks

  constructor(cb: ConnectionCallbacks) {
    this.cb = cb
  }

  connect(): void {
    if (this.socket) return

    const url = buildWsUrl()
    const socket = new ReconnectingWebSocket(url, [], { maxRetries: 10 })
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

  disconnect(): void {
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
  send(payload: IncomingEvent): boolean {
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

  // --- Private handlers ---

  private readonly handleBeforeUnload = () => {
    this.isUnloading = true
  }

  private readonly handleOpen = () => {
    this.didOpen = true
    this.cb.onStatusChange('open')
    this.cb.onError('')

    this.stopHeartbeat()
    this.heartbeatTimer = setInterval(() => {
      this.socket?.send(JSON.stringify({ type: 'ping' }))
    }, HEARTBEAT_MS)
  }

  private readonly handleClose = () => {
    if (this.isUnloading) return
    this.stopHeartbeat()

    if (this.isAuthFailure()) {
      this.cb.onStatusChange('closed')
      this.cb.onError('Authentication failed — please refresh the page')
      return
    }

    this.cb.onStatusChange('closed')
  }

  private readonly handleError = () => {
    if (this.isUnloading) return

    if (this.isAuthFailure()) {
      this.cb.onStatusChange('error')
      this.cb.onError('Authentication failed — please refresh the page')
      return
    }

    this.cb.onStatusChange('error')
    this.cb.onError('WebSocket connection failed')
  }

  private readonly handleMessage = (event: MessageEvent) => {
    let raw: unknown
    try {
      raw = JSON.parse(event.data as string)
    } catch {
      this.cb.onError('Received invalid JSON from server')
      return
    }

    const parsed = outgoingEventSchema.safeParse(raw)

    if (!parsed.success) {
      console.log(
        '[WsConnection] handleMessage: failed to parse into outgoingEventSchema: ',
        JSON.stringify(raw)
      )
      toast.error(
        `[WsConnection] handleMessage: failed to parse into outgoingEventSchema: ${raw}`
      )
      return
    }

    const ev = parsed.data

    // Surface server-side errors to the UI
    if (ev.type === 'error') {
      this.cb.onError(ev.detail)
    }

    if (ev.type != 'pong') {
      console.log('ev: ', JSON.stringify(ev))
    }

    // Emit to the domain handlers — TypeScript narrows the payload
    // by the discriminant key so each handler receives the right shape.
    // mitt is typed as EventMap so this cast is safe.
    eventBus.emit(ev.type as never, ev as never)
  }

  // --- Helpers ---

  private stopHeartbeat(): void {
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
  private isAuthFailure(): boolean {
    return !this.didOpen && Date.now() - this.connectTime < 2000
  }
}
