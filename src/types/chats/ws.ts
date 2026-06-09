import z from 'zod'
import { chatListItemResponseSchema } from './chat'
import { PaginatedResponseSchema } from '@/types/shared/pagination'
import { chatListUserResponseSchema } from './chat-participant'
import { chatMessageResponseSchema } from './chat-message'
import { isoDateTime, uuid } from '@/types/shared/primitives'
import { attachmentIdWithPositionRequestSchema } from '@/types/shared/attachment'

export const userSearchResponseSchema = PaginatedResponseSchema(
  chatListUserResponseSchema
)

export const chatMessagesResponseSchema = PaginatedResponseSchema(
  chatMessageResponseSchema
)

export const createChatSchema = z.object({
  participantId: uuid
})

export const chatRoomActionRequestSchema = z.object({
  chatId: uuid
})

export const scopedChatActionRequestSchema = chatRoomActionRequestSchema.extend(
  {
    forParticipant: z.boolean().optional().default(false)
  }
)

export const messageActionRequestSchema = chatRoomActionRequestSchema.extend({
  messageId: uuid
})

export const readChatRequestSchema = chatRoomActionRequestSchema.extend({
  lastSeenAt: isoDateTime.optional()
})

export const createChatMessageRequestSchema = z
  .object({
    message: z.string().optional(),
    chatId: uuid.optional(),
    replyId: uuid.optional(),
    participantId: uuid.optional(),
    attachments: z
      .array(attachmentIdWithPositionRequestSchema)
      .optional()
      .default([])
  })
  .superRefine((value, context) => {
    const hasMessage = Boolean(value.message?.trim())
    const hasAttachments = value.attachments.length > 0

    if (!hasMessage && !hasAttachments) {
      context.addIssue({
        code: 'custom',
        message: 'message or attachments are required'
      })
    }

    if (!value.chatId && !value.participantId) {
      context.addIssue({
        code: 'custom',
        message: 'chatId or participantId is required'
      })
    }

    const positions = value.attachments.map((item) => item.position)
    if (new Set(positions).size !== positions.length) {
      context.addIssue({
        code: 'custom',
        message: 'attachment positions must be unique'
      })
    }
  })

export const updateMessageActionRequestSchema = messageActionRequestSchema
  .extend({
    message: z.string().optional(),
    attachments: z
      .array(attachmentIdWithPositionRequestSchema)
      .optional()
      .optional()
  })
  .superRefine((value, context) => {
    if (value.message === null && value.attachments === null) {
      context.addIssue({
        code: 'custom',
        message: 'message or attachments are required'
      })
    }

    const positions = (value.attachments ?? []).map((item) => item.position)
    if (new Set(positions).size !== positions.length) {
      context.addIssue({
        code: 'custom',
        message: 'attachment positions must be unique'
      })
    }
  })

export const updateChatSettingsActionRequestSchema = chatRoomActionRequestSchema
  .extend({
    isPinned: z.boolean().optional(),
    isMuted: z.boolean().optional(),
    isArchived: z.boolean().optional()
  })
  .superRefine((value, context) => {
    if (
      value.isPinned === null &&
      value.isMuted === null &&
      value.isArchived === null
    ) {
      context.addIssue({
        code: 'custom',
        message: 'at least one chat setting is required'
      })
    }
  })

// --- WS Outbound Payload ---
export const chatWsOutboundPayloadSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('ping') }).strict(),
  chatRoomActionRequestSchema.extend({ type: z.literal('join_chat') }).strict(),
  chatRoomActionRequestSchema.extend({ type: z.literal('leave_chat') }),
  chatRoomActionRequestSchema.extend({ type: z.literal('typing_start') }),
  chatRoomActionRequestSchema.extend({ type: z.literal('typing_stop') }),
  createChatSchema.extend({ type: z.literal('create_chat') }).strict(),
  createChatMessageRequestSchema.extend({ type: z.literal('send_message') }),
  updateMessageActionRequestSchema.extend({
    type: z.literal('update_message')
  }),
  messageActionRequestSchema.extend({ type: z.literal('delete_message') }),
  readChatRequestSchema.extend({ type: z.literal('read_chat') }).strict(),
  scopedChatActionRequestSchema.extend({ type: z.literal('clear_chat') }),
  scopedChatActionRequestSchema.extend({ type: z.literal('delete_chat') }),
  updateChatSettingsActionRequestSchema.extend({
    type: z.literal('update_chat_settings')
  })
])

// --- WS Inbound Payload ---─

const chatCreatedWithItemEventSchema = z.object({
  type: z.literal('chat_created'),
  chat: chatListItemResponseSchema
})

const chatCreatedWithIdsEventSchema = z.object({
  type: z.literal('chat_created'),
  chatId: uuid,
  participantId: uuid
})

export const chatWsInboundPayloadSchema = z.union([
  z.object({ type: z.literal('pong') }),
  z.object({
    type: z.literal('error'),
    detail: z.unknown(),
    statusCode: z.number().int().optional()
  }),
  z.object({ type: z.literal('chat_joined'), chatId: uuid }),
  z.object({ type: z.literal('chat_left'), chatId: uuid }),
  z.union([chatCreatedWithItemEventSchema, chatCreatedWithIdsEventSchema]),
  z.object({
    type: z.literal('chat_read'),
    chatId: uuid,
    userId: uuid,
    lastSeenAt: isoDateTime
  }),
  z.object({
    type: z.literal('chat_cleared'),
    chatId: uuid,
    userId: uuid,
    clearedAt: isoDateTime,
    forParticipant: z.boolean()
  }),
  z.object({
    type: z.literal('chat_deleted'),
    chatId: uuid,
    userId: uuid,
    deletedAt: isoDateTime.optional(),
    forParticipant: z.boolean()
  }),
  z.object({ type: z.literal('user_online'), userId: uuid }),
  z.object({
    type: z.literal('user_offline'),
    userId: uuid,
    lastOnlineAt: isoDateTime
  }),
  z.object({
    type: z.literal('typing_start'),
    chatId: uuid,
    userId: uuid
  }),
  z.object({
    type: z.literal('typing_stop'),
    chatId: uuid,
    userId: uuid
  }),
  z.object({
    type: z.literal('message_created'),
    message: chatMessageResponseSchema
  }),
  z.object({
    type: z.literal('message_updated'),
    message: chatMessageResponseSchema
  }),
  z.object({
    type: z.literal('message_deleted'),
    chatId: uuid,
    messageId: uuid
  }),
  z.object({
    type: z.literal('chat_settings_updated'),
    chatId: uuid,
    isPinned: z.boolean(),
    isMuted: z.boolean(),
    isArchived: z.boolean()
  })
])

export type UserSearchResponse = z.infer<typeof userSearchResponseSchema>
export type ChatMessagesResponse = z.infer<typeof chatMessagesResponseSchema>
export type CreateChatRequest = z.infer<typeof createChatSchema>
export type CreateChatMessageRequest = z.infer<
  typeof createChatMessageRequestSchema
>
export type ChatWsOutboundPayload = z.infer<typeof chatWsOutboundPayloadSchema>
export type ChatWsInboundPayload = z.infer<typeof chatWsInboundPayloadSchema>
