import { t as zod_default } from '../_libs/zod.mjs'
import { o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as baseSchema } from './base-DM7IIzOg.mjs'
import { n as AttachmentStatusList } from './literals-DmvvSYvr.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/chat-Di9wjxRA.js
var attachmentIdWithPositionRequestSchema = zod_default.object({
  attachmentId: uuid,
  position: zod_default.number().int().nonnegative()
})
var attachmentResponseSchema = zod_default.object({
  id: uuid,
  objectKey: zod_default.string(),
  originalFilename: zod_default.string().nullish(),
  status: zod_default.enum(AttachmentStatusList),
  mimeType: zod_default.string(),
  label: zod_default.string(),
  group: zod_default.string(),
  sizeBytes: zod_default.number().int(),
  meta: zod_default.object(),
  url: zod_default.string()
})
var attachmentWithPositionResponseSchema = attachmentResponseSchema.extend({
  position: zod_default.number().int().nonnegative().nullish()
})
var attachmentWithPositionableResponseSchema = attachmentResponseSchema.extend({
  isPositionable: zod_default.boolean()
})
zod_default.object({
  attachments: zod_default.array(attachmentWithPositionableResponseSchema),
  failed: zod_default.array(zod_default.string())
})
zod_default.object({
  message: zod_default.string().nullish(),
  chatId: uuid,
  replyId: uuid.nullish(),
  attachments: zod_default
    .array(attachmentIdWithPositionRequestSchema)
    .default([])
})
zod_default.object({
  message: zod_default.string().nullish(),
  attachments: zod_default
    .array(attachmentIdWithPositionRequestSchema)
    .nullish()
})
var chatMessageResponseSchema = baseSchema.extend({
  senderId: uuid.nullish(),
  message: zod_default.string().nullish(),
  chatId: uuid,
  replyId: uuid.nullish(),
  attachments: zod_default
    .array(attachmentWithPositionResponseSchema)
    .default([])
})
var chatListLastMessageResponseSchema = chatMessageResponseSchema.extend({
  seenByRecipient: zod_default.boolean().nullish()
})
zod_default.object({
  is_pinned: zod_default.boolean().nullish(),
  is_muted: zod_default.boolean().nullish(),
  is_archived: zod_default.boolean().nullish()
})
var chatListUserResponseSchema = zod_default.object({
  id: uuid,
  name: zod_default.string(),
  firstName: zod_default.string(),
  lastName: zod_default.string().nullable(),
  avatarUrl: zod_default.string().nullable(),
  isOnline: zod_default.boolean().nullish().default(false)
})
var chatListItemResponseSchema = baseSchema.extend({
  user: chatListUserResponseSchema,
  isPinned: zod_default.boolean(),
  isMuted: zod_default.boolean(),
  isArchived: zod_default.boolean(),
  lastMessage: chatListLastMessageResponseSchema.nullish(),
  unreadCount: zod_default.number().int().min(0)
})
//#endregion
export {
  chatMessageResponseSchema as a,
  chatListUserResponseSchema as i,
  chatListItemResponseSchema as n,
  chatListLastMessageResponseSchema as r,
  attachmentIdWithPositionRequestSchema as t
}
