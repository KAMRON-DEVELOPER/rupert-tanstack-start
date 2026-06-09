import z from 'zod'

export const paginationQuerySchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).max(100).default(20)
})

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    data: z.array(item),
    total: z.number().int().min(0)
  })

export type PaginationQuery = z.infer<typeof paginationQuerySchema>
// export type PaginatedResponse<T> = { data: T[]; total: number }
