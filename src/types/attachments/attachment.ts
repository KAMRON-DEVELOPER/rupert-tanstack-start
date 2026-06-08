import z from 'zod'
import { uuid } from '@/types/shared/primitives'
import { AttachmentStatusList } from '@/types/shared/literals'

const attachmentMetaValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null()
])

const attachmentMetaSchema = z.record(z.string(), attachmentMetaValueSchema)

const attachmentBaseFields = {
  id: uuid,
  object_key: z.string(),
  original_filename: z.string().nullable(),
  status: z.enum(AttachmentStatusList),
  mime_type: z.string(),
  label: z.string(),
  group: z.string(),
  size_bytes: z.number().int().nonnegative(),
  meta: attachmentMetaSchema.optional().default({}),
  url: z.string()
}

function transformAttachment(raw: {
  object_key: string
  original_filename: string | null
  mime_type: string
  size_bytes: number
  [key: string]: unknown
}) {
  const { object_key, original_filename, mime_type, size_bytes, ...rest } = raw
  return {
    ...rest,
    objectKey: object_key,
    originalFilename: original_filename,
    mimeType: mime_type,
    sizeBytes: size_bytes
  }
}

export const attachmentResponseSchema = z
  .object(attachmentBaseFields)
  .transform(transformAttachment)

export const attachmentIdWithPositionRequestSchema = z
  .object({
    attachmentId: uuid,
    position: z.number().int().nonnegative().nullable().optional().default(null)
  })
  .strict()

export const attachmentWithPositionResponseSchema = z
  .object({
    ...attachmentBaseFields,
    position: z.number().int().nonnegative().nullable().optional().default(null)
  })
  .transform(transformAttachment)

export const attachmentWithPositionableResponseSchema = z
  .object({
    ...attachmentBaseFields,
    is_positionable: z.boolean()
  })
  .transform((raw) => ({
    ...transformAttachment(raw),
    isPositionable: raw.is_positionable
  }))

export const uploadAttachmentsResponseSchema = z.object({
  attachments: z.array(attachmentWithPositionableResponseSchema),
  failed: z.array(z.string())
})

export type AttachmentStatus = z.infer<typeof attachmentStatusSchema>
export type AttachmentResponse = z.infer<typeof attachmentResponseSchema>
export type AttachmentIdWithPositionRequest = z.infer<
  typeof attachmentIdWithPositionRequestSchema
>
export type AttachmentWithPositionResponse = z.infer<
  typeof attachmentWithPositionResponseSchema
>
export type AttachmentWithPositionableResponse = z.infer<
  typeof attachmentWithPositionableResponseSchema
>
export type UploadAttachmentsResponse = z.infer<
  typeof uploadAttachmentsResponseSchema
>
