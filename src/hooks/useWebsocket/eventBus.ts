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

import mitt from 'mitt'
import type { OutgoingEvent } from './events'

/**
 * Map each event `type` discriminant to the full event shape.
 * mitt is generic over a record of { eventName: payload }, so we
 * build that record from the OutgoingEvent discriminated union.
 */
type EventMap = {
  [E in OutgoingEvent as E['type']]: E
}

export const eventBus = mitt<EventMap>()

export type WsEventBus = typeof eventBus
