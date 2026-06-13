import { chatListItemResponseSchema } from '@/types/chats/chat'
import { isoDateTime, uuid } from '@/types/shared/primitives'
import { z } from 'zod'

// --- Outgoing events (server → client) ---

export const errorEventSchema = z.object({
  type: z.literal('error'),
  detail: z.string(),
  statusCode: z.number().nullish()
})

export const pongEventSchema = z.object({
  type: z.literal('pong')
})

export const chatJoinedEventSchema = z.object({
  type: z.literal('chat_joined'),
  chatId: uuid
})

export const chatLeftEventSchema = z.object({
  type: z.literal('chat_left'),
  chatId: uuid
})

export const typingStartEventSchema = z.object({
  type: z.literal('typing_start'),
  chatId: uuid,
  userId: uuid
})

export const typingStopEventSchema = z.object({
  type: z.literal('typing_stop'),
  chatId: uuid,
  userId: uuid
})

export const chatReadEventSchema = z.object({
  type: z.literal('chat_read'),
  chatId: uuid,
  userId: uuid,
  lastSeenAt: isoDateTime
})

export const chatCreatedEventSchema = z.object({
  type: z.literal('chat_created'),
  item: chatListItemResponseSchema
})

export const chatClearedEventSchema = z.object({
  type: z.literal('chat_cleared'),
  chatId: uuid,
  userId: uuid,
  clearedAt: isoDateTime,
  forParticipant: z.boolean()
})

export const chatDeletedEventSchema = z.object({
  type: z.literal('chat_deleted'),
  chatId: uuid,
  userId: uuid,
  deletedAt: isoDateTime.nullish(),
  forParticipant: z.boolean()
})

export const userOnlineEventSchema = z.object({
  type: z.literal('user_online'),
  userId: uuid
})

export const userOfflineEventSchema = z.object({
  type: z.literal('user_offline'),
  userId: uuid,
  lastOnlineAt: isoDateTime
})

export const messageCreatedEventSchema = z.object({
  type: z.literal('message_created'),
  message: chatListItemResponseSchema
})

export const messageUpdatedEventSchema = z.object({
  type: z.literal('message_updated'),
  message: chatListItemResponseSchema
})

export const messageDeletedEventSchema = z.object({
  type: z.literal('message_deleted'),
  chatId: uuid,
  messageId: uuid
})

export const chatSettingsUpdatedEventSchema = z.object({
  type: z.literal('chat_settings_updated'),
  chatId: uuid,
  isPinned: z.boolean().nullable(),
  isMuted: z.boolean().nullable(),
  isArchived: z.boolean().nullable()
})

export const outgoingEventSchema = z.discriminatedUnion('type', [
  pongEventSchema,
  errorEventSchema,
  chatJoinedEventSchema,
  chatLeftEventSchema,
  typingStartEventSchema,
  typingStopEventSchema,
  chatReadEventSchema,
  chatCreatedEventSchema,
  chatClearedEventSchema,
  chatDeletedEventSchema,
  userOnlineEventSchema,
  userOfflineEventSchema,
  messageCreatedEventSchema,
  messageUpdatedEventSchema,
  messageDeletedEventSchema,
  chatSettingsUpdatedEventSchema
  // groups domain events go here
  // feeds domain events go here
])

export type ErrorEvent = z.infer<typeof errorEventSchema>
export type PongEvent = z.infer<typeof pongEventSchema>
export type ChatJoinedEvent = z.infer<typeof chatJoinedEventSchema>
export type ChatLeftEvent = z.infer<typeof chatLeftEventSchema>
export type TypingStartEvent = z.infer<typeof typingStartEventSchema>
export type TypingStopEvent = z.infer<typeof typingStopEventSchema>
export type ChatReadEvent = z.infer<typeof chatReadEventSchema>
export type ChatCreatedEvent = z.infer<typeof chatCreatedEventSchema>
export type ChatClearedEvent = z.infer<typeof chatClearedEventSchema>
export type ChatDeletedEvent = z.infer<typeof chatDeletedEventSchema>
export type UserOnlineEvent = z.infer<typeof userOnlineEventSchema>
export type UserOfflineEvent = z.infer<typeof userOfflineEventSchema>
export type MessageCreatedEvent = z.infer<typeof messageCreatedEventSchema>
export type MessageUpdatedEvent = z.infer<typeof messageUpdatedEventSchema>
export type MessageDeletedEvent = z.infer<typeof messageDeletedEventSchema>
export type ChatSettingsUpdatedEvent = z.infer<
  typeof chatSettingsUpdatedEventSchema
>

export type OutgoingEvent = z.infer<typeof outgoingEventSchema>
