import z from 'zod'
import { uuid } from './primitives'
import { AttachmentStatusList } from './literals'

export const attachmentIdWithPositionRequestSchema = z.object({
  attachmentId: uuid,
  position: z.number().int().nonnegative()
})

export const attachmentResponseSchema = z.object({
  id: uuid,
  objectKey: z.string(),
  originalFilename: z.string().optional(),
  status: z.enum(AttachmentStatusList),
  mimeType: z.string(),
  label: z.string(),
  group: z.string(),
  sizeBytes: z.number().int(),
  meta: z.object(),
  url: z.string()
})

export const attachmentWithPositionResponseSchema =
  attachmentResponseSchema.extend({
    position: z.number().int().nonnegative().optional()
  })

export const attachmentWithPositionableResponseSchema =
  attachmentResponseSchema.extend({
    isPositionable: z.boolean()
  })

export const uploadAttachmentsResponseSchema = z.object({
  attachments: z.array(attachmentWithPositionableResponseSchema),
  failed: z.array(z.string())
})

export type AttachmentIdWithPositionRequest = z.infer<
  typeof attachmentIdWithPositionRequestSchema
>
export type AttachmentResponse = z.infer<typeof attachmentResponseSchema>
export type AttachmentWithPositionableResponse = z.infer<
  typeof attachmentWithPositionableResponseSchema
>
export type UploadAttachmentsResponse = z.infer<
  typeof uploadAttachmentsResponseSchema
>
