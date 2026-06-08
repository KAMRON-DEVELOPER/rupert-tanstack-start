import { attachmentWithPositionResponseSchema } from '@/types/attachments/attachment'
import { baseSchema } from '@/types/shared/base'
import { uuid } from '@/types/shared/primitives'
import z from 'zod'
import { attachmentIdWithPositionRequestSchema } from '../shared/attachment'

// --- Requests ---
export const chatMessageCreateRequestSchema = z.object({
  message: z.string().optional(),
  chatId: uuid.optional(),
  replyId: uuid.optional(),
  participantId: uuid.optional(),
  attachments: z.array(attachmentIdWithPositionRequestSchema)
})

export const chatMessageUpdateRequestSchema = z.object({
  message: z.string().optional(),
  attachments: z.array(attachmentIdWithPositionRequestSchema).optional()
})

// --- Responses ---
export const chatMessageResponseSchema = baseSchema.extend({
  senderId: uuid.optional(),
  message: z.string().optional(),
  chatId: uuid,
  replyId: uuid.optional(),
  attachments: z.array(attachmentWithPositionResponseSchema).default([])
})

export const chatListLastMessageResponseSchema =
  chatMessageResponseSchema.extend({
    seenByRecipient: z.boolean().optional()
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
