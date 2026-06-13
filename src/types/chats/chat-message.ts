import { baseSchema } from '@/types/shared/base'
import { uuid } from '@/types/shared/primitives'
import z from 'zod'
import {
  attachmentIdWithPositionRequestSchema,
  attachmentWithPositionResponseSchema
} from '@/types/shared/attachment'

// --- Requests ---
export const chatMessageCreateRequestSchema = z.object({
  message: z.string().nullish(),
  chatId: uuid.nullish(),
  replyId: uuid.nullish(),
  participantId: uuid.nullish(),
  attachments: z.array(attachmentIdWithPositionRequestSchema)
})

export const chatMessageUpdateRequestSchema = z.object({
  message: z.string().nullish(),
  attachments: z.array(attachmentIdWithPositionRequestSchema).nullish()
})

// --- Responses ---
export const chatMessageResponseSchema = baseSchema.extend({
  senderId: uuid.nullish(),
  message: z.string().nullish(),
  chatId: uuid,
  replyId: uuid.nullish(),
  attachments: z.array(attachmentWithPositionResponseSchema).default([])
})

export const chatListLastMessageResponseSchema =
  chatMessageResponseSchema.extend({
    seenByRecipient: z.boolean()
  })

// --- Types ---
export type ChatMessageCreateRequest = z.infer<
  typeof chatMessageCreateRequestSchema
>
export type ChatMessageUpdateRequest = z.infer<
  typeof chatMessageUpdateRequestSchema
>
export type ChatMessageResponse = z.infer<typeof chatMessageResponseSchema>
export type ChatListLastMessageResponse = z.infer<
  typeof chatListLastMessageResponseSchema
>
