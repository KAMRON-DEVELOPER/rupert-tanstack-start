import z from 'zod'

export const paginationQuerySchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).max(100).default(20)
})

export type PaginationQuery = z.infer<typeof paginationQuerySchema>

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    data: z.array(item),
    total: z.number().int().min(0)
  })

export type PaginatedResponse<T> = { data: T[]; total: number }
