import z from 'zod'

export const uuidSchema = z
  .string()
  .regex(
    /^([0-9a-fA-F]{32}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/,
    'Invalid UUID'
  )

export const paginationSchema = z.object({
  offset: z.coerce.number().int().min(0).optional().catch(0),
  limit: z.coerce.number().int().positive().max(100).optional().catch(20)
})

export type PaginationSearch = z.infer<typeof paginationSchema>
