import { t as zod_default } from '../_libs/zod.mjs'
import { a as isoDateTime, o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as paginatedResponseSchema } from './pagination-LyDEN9Vs.mjs'
import {
  a as chatMessageResponseSchema,
  i as chatListUserResponseSchema,
  n as chatListItemResponseSchema,
  t as attachmentIdWithPositionRequestSchema
} from './chat-Di9wjxRA.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/ws-BasjsCG1.js
var userSearchResponseSchema = paginatedResponseSchema(
  chatListUserResponseSchema
)
var chatMessagesResponseSchema = paginatedResponseSchema(
  chatMessageResponseSchema
)
var createChatSchema = zod_default.object({ participantId: uuid })
var chatRoomActionRequestSchema = zod_default.object({ chatId: uuid })
var scopedChatActionRequestSchema = chatRoomActionRequestSchema.extend({
  forParticipant: zod_default.boolean().nullish().default(false)
})
var messageActionRequestSchema = chatRoomActionRequestSchema.extend({
  messageId: uuid
})
var readChatRequestSchema = chatRoomActionRequestSchema.extend({
  lastSeenAt: isoDateTime.nullish()
})
var createChatMessageRequestSchema = zod_default
  .object({
    message: zod_default.string().nullish(),
    chatId: uuid.nullish(),
    replyId: uuid.nullish(),
    participantId: uuid.nullish(),
    attachments: zod_default
      .array(attachmentIdWithPositionRequestSchema)
      .default([])
  })
  .superRefine((value, context) => {
    const hasMessage = Boolean(value.message?.trim())
    const hasAttachments = value.attachments.length > 0
    if (!hasMessage && !hasAttachments)
      context.addIssue({
        code: 'custom',
        message: 'message or attachments are required'
      })
    if (!value.chatId && !value.participantId)
      context.addIssue({
        code: 'custom',
        message: 'chatId or participantId is required'
      })
    const positions = value.attachments.map((item) => item.position)
    if (new Set(positions).size !== positions.length)
      context.addIssue({
        code: 'custom',
        message: 'attachment positions must be unique'
      })
  })
var updateMessageActionRequestSchema = messageActionRequestSchema
  .extend({
    message: zod_default.string().nullish(),
    attachments: zod_default
      .array(attachmentIdWithPositionRequestSchema)
      .nullish()
      .nullish()
  })
  .superRefine((value, context) => {
    if (value.message === null && value.attachments === null)
      context.addIssue({
        code: 'custom',
        message: 'message or attachments are required'
      })
    const positions = (value.attachments ?? []).map((item) => item.position)
    if (new Set(positions).size !== positions.length)
      context.addIssue({
        code: 'custom',
        message: 'attachment positions must be unique'
      })
  })
var updateChatSettingsActionRequestSchema = chatRoomActionRequestSchema
  .extend({
    isPinned: zod_default.boolean().nullish(),
    isMuted: zod_default.boolean().nullish(),
    isArchived: zod_default.boolean().nullish()
  })
  .superRefine((value, context) => {
    if (
      value.isPinned === null &&
      value.isMuted === null &&
      value.isArchived === null
    )
      context.addIssue({
        code: 'custom',
        message: 'at least one chat setting is required'
      })
  })
zod_default.discriminatedUnion('type', [
  zod_default.object({ type: zod_default.literal('ping') }).strict(),
  chatRoomActionRequestSchema
    .extend({ type: zod_default.literal('join_chat') })
    .strict(),
  chatRoomActionRequestSchema.extend({
    type: zod_default.literal('leave_chat')
  }),
  chatRoomActionRequestSchema.extend({
    type: zod_default.literal('typing_start')
  }),
  chatRoomActionRequestSchema.extend({
    type: zod_default.literal('typing_stop')
  }),
  createChatSchema
    .extend({ type: zod_default.literal('create_chat') })
    .strict(),
  createChatMessageRequestSchema.extend({
    type: zod_default.literal('send_message')
  }),
  updateMessageActionRequestSchema.extend({
    type: zod_default.literal('update_message')
  }),
  messageActionRequestSchema.extend({
    type: zod_default.literal('delete_message')
  }),
  readChatRequestSchema
    .extend({ type: zod_default.literal('read_chat') })
    .strict(),
  scopedChatActionRequestSchema.extend({
    type: zod_default.literal('clear_chat')
  }),
  scopedChatActionRequestSchema.extend({
    type: zod_default.literal('delete_chat')
  }),
  updateChatSettingsActionRequestSchema.extend({
    type: zod_default.literal('update_chat_settings')
  })
])
var chatCreatedWithItemEventSchema = zod_default.object({
  type: zod_default.literal('chat_created'),
  chat: chatListItemResponseSchema
})
var chatCreatedWithIdsEventSchema = zod_default.object({
  type: zod_default.literal('chat_created'),
  chatId: uuid,
  participantId: uuid
})
zod_default.union([
  zod_default.object({ type: zod_default.literal('pong') }),
  zod_default.object({
    type: zod_default.literal('error'),
    detail: zod_default.unknown(),
    statusCode: zod_default.number().int().nullish()
  }),
  zod_default.object({
    type: zod_default.literal('chat_joined'),
    chatId: uuid
  }),
  zod_default.object({
    type: zod_default.literal('chat_left'),
    chatId: uuid
  }),
  zod_default.union([
    chatCreatedWithItemEventSchema,
    chatCreatedWithIdsEventSchema
  ]),
  zod_default.object({
    type: zod_default.literal('chat_read'),
    chatId: uuid,
    userId: uuid,
    lastSeenAt: isoDateTime
  }),
  zod_default.object({
    type: zod_default.literal('chat_cleared'),
    chatId: uuid,
    userId: uuid,
    clearedAt: isoDateTime,
    forParticipant: zod_default.boolean()
  }),
  zod_default.object({
    type: zod_default.literal('chat_deleted'),
    chatId: uuid,
    userId: uuid,
    deletedAt: isoDateTime.nullish(),
    forParticipant: zod_default.boolean()
  }),
  zod_default.object({
    type: zod_default.literal('user_online'),
    userId: uuid
  }),
  zod_default.object({
    type: zod_default.literal('user_offline'),
    userId: uuid,
    lastOnlineAt: isoDateTime
  }),
  zod_default.object({
    type: zod_default.literal('typing_start'),
    chatId: uuid,
    userId: uuid
  }),
  zod_default.object({
    type: zod_default.literal('typing_stop'),
    chatId: uuid,
    userId: uuid
  }),
  zod_default.object({
    type: zod_default.literal('message_created'),
    message: chatMessageResponseSchema
  }),
  zod_default.object({
    type: zod_default.literal('message_updated'),
    message: chatMessageResponseSchema
  }),
  zod_default.object({
    type: zod_default.literal('message_deleted'),
    chatId: uuid,
    messageId: uuid
  }),
  zod_default.object({
    type: zod_default.literal('chat_settings_updated'),
    chatId: uuid,
    isPinned: zod_default.boolean(),
    isMuted: zod_default.boolean(),
    isArchived: zod_default.boolean()
  })
])
//#endregion
export { userSearchResponseSchema as n, chatMessagesResponseSchema as t }
