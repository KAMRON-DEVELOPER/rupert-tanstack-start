import z from 'zod'

export const chatRoomActionRequestSchema = z.object({
  chatId: z.string().uuid()
})

export const messageActionRequestSchema = chatRoomActionRequestSchema.extend({
  messageId: z.string().uuid()
})

export const readChatRequestSchema = chatRoomActionRequestSchema.extend({
  lastSeenAt: z.string().datetime().optional()
})

export const scopedChatActionRequestSchema = chatRoomActionRequestSchema.extend(
  {
    forParticipant: z.boolean().default(false)
  }
)

export const updateChatSettingsActionRequestSchema = z.object({
  chatId: z.string().uuid(),
  isPinned: z.boolean().nullable().optional(),
  isMuted: z.boolean().nullable().optional(),
  isArchived: z.boolean().nullable().optional()
})

export const updateMessageActionRequestSchema = z.object({
  chatId: z.string().uuid(),
  messageId: z.string().uuid(),
  message: z.string().optional(),
  attachments: z.array(z.string().uuid()).optional()
})

export const createChatRequestSchema = z.object({
  participantId: z.string().uuid()
})

export const sendMessageRequestSchema = z.object({
  chatId: z.string().uuid(),
  message: z.string().optional(),
  replyId: z.string().uuid().nullable().optional(),
  participantId: z.string().uuid().nullable().optional(),
  attachments: z.array(z.string().uuid()).optional()
})

export const errorEventSchema = z.object({
  type: z.literal('error'),
  detail: z.string(),
  statusCode: z.number().optional()
})

export const chatJoinedEventSchema = z.object({
  type: z.literal('chat_joined'),
  chatId: z.string().uuid()
})

export const chatLeftEventSchema = z.object({
  type: z.literal('chat_left'),
  chatId: z.string().uuid()
})

export const typingEventSchema = z.object({
  type: z.enum(['typing_start', 'typing_stop']),
  chatId: z.string().uuid(),
  userId: z.string().uuid()
})

export const chatReadEventSchema = z.object({
  type: z.literal('chat_read'),
  chatId: z.string().uuid(),
  userId: z.string().uuid(),
  lastSeenAt: z.string().datetime()
})

export const chatCreatedEventSchema = z.object({
  type: z.literal('chat_created'),
  chatId: z.string().uuid(),
  participantId: z.string().uuid()
})

export const chatClearedEventSchema = z.object({
  type: z.literal('chat_cleared'),
  chatId: z.string().uuid(),
  userId: z.string().uuid(),
  clearedAt: z.string().datetime(),
  forParticipant: z.boolean()
})

export const chatDeletedEventSchema = z.object({
  type: z.literal('chat_deleted'),
  chatId: z.string().uuid(),
  userId: z.string().uuid(),
  deletedAt: z.string().datetime().optional(),
  forParticipant: z.boolean()
})

export const userOnlineEventSchema = z.object({
  type: z.literal('user_online'),
  userId: z.string().uuid()
})

export const userOfflineEventSchema = z.object({
  type: z.literal('user_offline'),
  userId: z.string().uuid(),
  lastOnlineAt: z.string().datetime()
})

export const messageCreatedEventSchema = z.object({
  type: z.literal('message_created'),
  message: z.string()
})

export const messageUpdatedEventSchema = z.object({
  type: z.literal('message_updated'),
  message: z.string()
})

export const messageDeletedEventSchema = z.object({
  type: z.literal('message_deleted'),
  chatId: z.string().uuid(),
  messageId: z.string().uuid()
})

export const chatSettingsUpdatedEventSchema = z.object({
  type: z.literal('chat_settings_updated'),
  chatId: z.string().uuid(),
  isPinned: z.boolean().nullable(),
  isMuted: z.boolean().nullable(),
  isArchived: z.boolean().nullable()
})

export const pongEventSchema = z.object({
  type: z.literal('pong')
})

export const incomingMessageSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('ping') }),
  chatRoomActionRequestSchema.extend({ type: z.literal('join_chat') }),
  chatRoomActionRequestSchema.extend({ type: z.literal('leave_chat') }),
  chatRoomActionRequestSchema.extend({ type: z.literal('typing_start') }),
  chatRoomActionRequestSchema.extend({ type: z.literal('typing_stop') }),
  readChatRequestSchema.extend({ type: z.literal('read_chat') }),
  createChatRequestSchema.extend({ type: z.literal('create_chat') }),
  scopedChatActionRequestSchema.extend({ type: z.literal('delete_chat') }),
  scopedChatActionRequestSchema.extend({ type: z.literal('clear_chat') }),
  updateChatSettingsActionRequestSchema.extend({
    type: z.literal('update_chat_settings')
  }),
  sendMessageRequestSchema.extend({ type: z.literal('send_message') }),
  updateMessageActionRequestSchema.extend({
    type: z.literal('update_message')
  }),
  messageActionRequestSchema.extend({ type: z.literal('delete_message') })
])

export const outgoingMessageSchema = z.discriminatedUnion('type', [
  pongEventSchema,
  ErrorEvent,
  chatJoinedEventSchema,
  chatLeftEventSchema,
  typingEventSchema,
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
])

export type ChatRoomActionRequestType = z.infer<
  typeof chatRoomActionRequestSchema
>
export type MessageActionRequestType = z.infer<
  typeof messageActionRequestSchema
>
export type ReadChatRequestType = z.infer<typeof readChatRequestSchema>
export type ScopedChatActionRequestType = z.infer<
  typeof scopedChatActionRequestSchema
>
export type UpdateChatSettingsActionRequestType = z.infer<
  typeof updateChatSettingsActionRequestSchema
>
export type UpdateMessageActionRequestType = z.infer<
  typeof updateMessageActionRequestSchema
>
export type CreateChatRequestType = z.infer<typeof createChatRequestSchema>
export type SendMessageRequestType = z.infer<typeof sendMessageRequestSchema>

export type IncomingMessageType = z.infer<typeof incomingMessageSchema>
export type OutgoingMessageType = z.infer<typeof outgoingMessageSchema>

export type ErrorEventType = z.infer<typeof ErrorEvent>
export type ChatJoinedEventType = z.infer<typeof chatJoinedEventSchema>
export type ChatLeftEventType = z.infer<typeof chatLeftEventSchema>
export type TypingEventType = z.infer<typeof typingEventSchema>
export type ChatReadEventType = z.infer<typeof chatReadEventSchema>
export type ChatCreatedEventType = z.infer<typeof chatCreatedEventSchema>
export type ChatClearedEventType = z.infer<typeof chatClearedEventSchema>
export type ChatDeletedEventType = z.infer<typeof chatDeletedEventSchema>
export type UserOnlineEventType = z.infer<typeof userOnlineEventSchema>
export type UserOfflineEventType = z.infer<typeof userOfflineEventSchema>
export type MessageCreatedEventType = z.infer<typeof messageCreatedEventSchema>
export type MessageUpdatedEventType = z.infer<typeof messageUpdatedEventSchema>
export type MessageDeletedEventType = z.infer<typeof messageDeletedEventSchema>
export type ChatSettingsUpdatedEventType = z.infer<
  typeof chatSettingsUpdatedEventSchema
>
export type PongEventType = z.infer<typeof pongEventSchema>
