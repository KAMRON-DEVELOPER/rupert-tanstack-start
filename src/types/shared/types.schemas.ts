import z from 'zod'

export const paginationSchema = z.object({
  offset: z.coerce.number().int().min(0).optional().catch(0),
  limit: z.coerce.number().int().positive().max(100).optional().catch(20)
})

export type PaginationSearch = z.infer<typeof paginationSchema>
