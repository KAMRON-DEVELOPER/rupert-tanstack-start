import z from 'zod'
import { baseSchema } from './base'

export const tagRequestSchema = baseSchema.extend({
  name: z.string().max(64)
})

export const tagResponseSchema = baseSchema.extend({
  name: z.string()
})

export type TagRequest = z.infer<typeof tagRequestSchema>
export type TagResponse = z.infer<typeof tagResponseSchema>
