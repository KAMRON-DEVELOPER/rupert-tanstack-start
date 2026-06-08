import z from 'zod'

export const messageResponseSchema = z.object({
  message: z.string()
})

export const errorResponseSchema = z.object({
  details: z.union([z.string(), z.array(z.string())])
})

export const tagSchema = z.object({
  name: z.string()
})

export type MessageResponse = z.infer<typeof messageResponseSchema>
export type ErrorResponse = z.infer<typeof errorResponseSchema>
export type Tag = z.infer<typeof tagSchema>
