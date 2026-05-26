import z from 'zod'
import {
  attachmentIdWithPositionRequestSchema,
  attachmentWithPositionResponseSchema
} from './attachment.schema'
import { uuidSchema } from './types.schemas'

export const ChatEventList = [
  'ping',
  'join_chat',
  'leave_chat',
  'typing_start',
  'typing_stop',
  'create_chat',
  'delete_chat',
  'clear_chat',
  'read_chat',
  'send_message',
  'update_message',
  'delete_message',
  'update_chat_settings',
  'pong',
  'error',
  'chat_joined',
  'chat_left',
  'chat_created',
  'chat_read',
  'chat_cleared',
  'chat_deleted',
  'user_online',
  'user_offline',
  'message_created',
  'message_updated',
  'message_deleted',
  'chat_settings_updated'
] as const

export const chatEventSchema = z.enum(ChatEventList)

export const chatListUserResponseSchema = z.object({
  id: uuidSchema,
  firstName: z.string(),
  lastName: z.string().nullable().optional().default(null),
  avatarUrl: z.string().nullable().optional().default(null),
  name: z.string()
})

export const chatMessageResponseSchema = z.object({
  id: uuidSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  senderId: uuidSchema.nullable(),
  message: z.string().nullable(),
  chatId: uuidSchema,
  replyId: uuidSchema.nullable(),
  attachments: z
    .array(attachmentWithPositionResponseSchema)
    .optional()
    .default([])
})

export const chatListLastMessageResponseSchema =
  chatMessageResponseSchema.extend({
    seenByRecipient: z.boolean().nullable()
  })

export const chatListItemResponseSchema = z.object({
  id: uuidSchema,
  user: chatListUserResponseSchema,
  isPinned: z.boolean(),
  isMuted: z.boolean(),
  isArchived: z.boolean(),
  lastMessage: chatListLastMessageResponseSchema
    .nullable()
    .optional()
    .default(null),
  unreadCount: z.number().int().min(0)
})

export const chatListResponseSchema = z.object({
  data: z.array(chatListItemResponseSchema),
  total: z.number().int().min(0)
})

export const chatMessagesResponseSchema = z.object({
  data: z.array(chatMessageResponseSchema),
  total: z.number().int().min(0)
})

export const createChatSchema = z
  .object({
    participantId: uuidSchema
  })
  .strict()

export const chatRoomActionRequestSchema = z
  .object({
    chatId: uuidSchema
  })
  .strict()

export const scopedChatActionRequestSchema = chatRoomActionRequestSchema
  .extend({
    forParticipant: z.boolean().optional().default(false)
  })
  .strict()

export const messageActionRequestSchema = chatRoomActionRequestSchema
  .extend({
    messageId: uuidSchema
  })
  .strict()

export const readChatRequestSchema = chatRoomActionRequestSchema
  .extend({
    lastSeenAt: z.string().datetime().optional()
  })
  .strict()

export const createChatMessageRequestSchema = z
  .object({
    message: z.string().nullable().optional().default(null),
    chatId: uuidSchema.nullable().optional().default(null),
    replyId: uuidSchema.nullable().optional().default(null),
    participantId: uuidSchema.nullable().optional().default(null),
    attachments: z
      .array(attachmentIdWithPositionRequestSchema)
      .optional()
      .default([])
  })
  .strict()
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
    message: z.string().nullable().optional().default(null),
    attachments: z
      .array(attachmentIdWithPositionRequestSchema)
      .nullable()
      .optional()
      .default(null)
  })
  .strict()
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
    isPinned: z.boolean().nullable().optional().default(null),
    isMuted: z.boolean().nullable().optional().default(null),
    isArchived: z.boolean().nullable().optional().default(null)
  })
  .strict()
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

export const chatWsOutboundPayloadSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('ping') }).strict(),
  chatRoomActionRequestSchema.extend({ type: z.literal('join_chat') }).strict(),
  chatRoomActionRequestSchema
    .extend({ type: z.literal('leave_chat') })
    .strict(),
  chatRoomActionRequestSchema
    .extend({ type: z.literal('typing_start') })
    .strict(),
  chatRoomActionRequestSchema
    .extend({ type: z.literal('typing_stop') })
    .strict(),
  createChatSchema.extend({ type: z.literal('create_chat') }).strict(),
  createChatMessageRequestSchema
    .extend({ type: z.literal('send_message') })
    .strict(),
  updateMessageActionRequestSchema
    .extend({ type: z.literal('update_message') })
    .strict(),
  messageActionRequestSchema
    .extend({ type: z.literal('delete_message') })
    .strict(),
  readChatRequestSchema.extend({ type: z.literal('read_chat') }).strict(),
  scopedChatActionRequestSchema
    .extend({ type: z.literal('clear_chat') })
    .strict(),
  scopedChatActionRequestSchema
    .extend({ type: z.literal('delete_chat') })
    .strict(),
  updateChatSettingsActionRequestSchema
    .extend({ type: z.literal('update_chat_settings') })
    .strict()
])

const chatCreatedWithItemEventSchema = z.object({
  type: z.literal('chat_created'),
  chat: chatListItemResponseSchema
})

const chatCreatedWithIdsEventSchema = z.object({
  type: z.literal('chat_created'),
  chatId: uuidSchema,
  participantId: uuidSchema
})

export const chatWsInboundPayloadSchema = z.union([
  z.object({ type: z.literal('pong') }),
  z.object({
    type: z.literal('error'),
    detail: z.unknown(),
    statusCode: z.number().int().optional()
  }),
  z.object({ type: z.literal('chat_joined'), chatId: uuidSchema }),
  z.object({ type: z.literal('chat_left'), chatId: uuidSchema }),
  z.union([chatCreatedWithItemEventSchema, chatCreatedWithIdsEventSchema]),
  z.object({
    type: z.literal('chat_read'),
    chatId: uuidSchema,
    userId: uuidSchema,
    lastSeenAt: z.string().datetime()
  }),
  z.object({
    type: z.literal('chat_cleared'),
    chatId: uuidSchema,
    userId: uuidSchema,
    clearedAt: z.string().datetime(),
    forParticipant: z.boolean()
  }),
  z.object({
    type: z.literal('chat_deleted'),
    chatId: uuidSchema,
    userId: uuidSchema,
    deletedAt: z.string().datetime().optional(),
    forParticipant: z.boolean()
  }),
  z.object({ type: z.literal('user_online'), userId: uuidSchema }),
  z.object({
    type: z.literal('user_offline'),
    userId: uuidSchema,
    lastOnlineAt: z.string().datetime()
  }),
  z.object({
    type: z.literal('typing_start'),
    chatId: uuidSchema,
    userId: uuidSchema
  }),
  z.object({
    type: z.literal('typing_stop'),
    chatId: uuidSchema,
    userId: uuidSchema
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
    chatId: uuidSchema,
    messageId: uuidSchema
  }),
  z.object({
    type: z.literal('chat_settings_updated'),
    chatId: uuidSchema,
    isPinned: z.boolean(),
    isMuted: z.boolean(),
    isArchived: z.boolean()
  })
])

export type ChatEvent = z.infer<typeof chatEventSchema>
export type ChatListUserResponse = z.infer<typeof chatListUserResponseSchema>
export type ChatMessageResponse = z.infer<typeof chatMessageResponseSchema>
export type ChatListLastMessageResponse = z.infer<
  typeof chatListLastMessageResponseSchema
>
export type ChatListItemResponse = z.infer<typeof chatListItemResponseSchema>
export type ChatListResponse = z.infer<typeof chatListResponseSchema>
export type ChatMessagesResponse = z.infer<typeof chatMessagesResponseSchema>
export type CreateChatRequest = z.infer<typeof createChatSchema>
export type CreateChatMessageRequest = z.infer<
  typeof createChatMessageRequestSchema
>
export type ChatWsOutboundPayload = z.infer<typeof chatWsOutboundPayloadSchema>
export type ChatWsInboundPayload = z.infer<typeof chatWsInboundPayloadSchema>
