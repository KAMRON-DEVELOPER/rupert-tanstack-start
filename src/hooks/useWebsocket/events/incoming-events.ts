import { isoDateTime, uuid } from '@/types/shared/primitives'
import { z } from 'zod'

// --- Incoming events (client → server) ---

const chatRoomActionRequestSchema = z.object({ chatId: uuid })
const messageActionRequestSchema = chatRoomActionRequestSchema.extend({
  messageId: uuid
})
const readChatRequestSchema = chatRoomActionRequestSchema.extend({
  lastSeenAt: isoDateTime.nullish()
})
const scopedChatActionRequestSchema = chatRoomActionRequestSchema.extend({
  forParticipant: z.boolean().default(false)
})
const updateChatSettingsActionRequestSchema = z.object({
  chatId: uuid,
  isPinned: z.boolean().nullable().nullish(),
  isMuted: z.boolean().nullable().nullish(),
  isArchived: z.boolean().nullable().nullish()
})
const updateMessageActionRequestSchema = z.object({
  chatId: uuid,
  messageId: uuid,
  message: z.string().nullish(),
  attachments: z.array(uuid).nullish()
})
const createChatRequestSchema = z.object({ participantId: uuid })
const sendMessageRequestSchema = z.object({
  chatId: uuid,
  message: z.string().nullish(),
  replyId: uuid.nullable().nullish(),
  participantId: uuid.nullable().nullish(),
  attachments: z.array(uuid).nullish()
})

export const incomingEventSchema = z.discriminatedUnion('type', [
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

export type IncomingEvent = z.infer<typeof incomingEventSchema>
