import z from 'zod'
import { uuidSchema } from './types.schemas'

export const AttachmentStatusList = ['pending', 'ready'] as const

export const attachmentStatusSchema = z.enum(AttachmentStatusList)

const attachmentMetaValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null()
])

const attachmentMetaSchema = z.record(z.string(), attachmentMetaValueSchema)

export const attachmentResponseSchema = z.object({
  id: uuidSchema,
  objectKey: z.string(),
  originalFilename: z.string().nullable(),
  status: attachmentStatusSchema,
  mimeType: z.string(),
  label: z.string(),
  group: z.string(),
  sizeBytes: z.number().int().nonnegative(),
  meta: attachmentMetaSchema.optional().default({}),
  url: z.string()
})

export const attachmentIdWithPositionRequestSchema = z
  .object({
    attachmentId: uuidSchema,
    position: z.number().int().nonnegative().nullable().optional().default(null)
  })
  .strict()

export const attachmentWithPositionResponseSchema =
  attachmentResponseSchema.extend({
    position: z.number().int().nonnegative().nullable().optional().default(null)
  })

export const attachmentWithPositionableResponseSchema =
  attachmentResponseSchema.extend({
    isPositionable: z.boolean()
  })

export const uploadAttachmentsResponseSchema = z.object({
  attachments: z.array(attachmentWithPositionableResponseSchema),
  failed: z.array(z.string())
})

export type AttachmentStatus = z.infer<typeof attachmentStatusSchema>
export type AttachmentSchema = z.infer<typeof attachmentResponseSchema>
export type AttachmentIdWithPositionRequest = z.infer<
  typeof attachmentIdWithPositionRequestSchema
>
export type AttachmentWithPositionSchema = z.infer<
  typeof attachmentWithPositionResponseSchema
>
export type AttachmentWithPositionableSchema = z.infer<
  typeof attachmentWithPositionableResponseSchema
>
export type UploadAttachmentsResponse = z.infer<
  typeof uploadAttachmentsResponseSchema
>
