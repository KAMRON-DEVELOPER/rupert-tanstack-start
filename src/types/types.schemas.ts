import z from 'zod';

export const paginationSchema = z.object({
  offset: z.coerce.number().int().positive().optional().catch(1),
  limit: z.coerce.number().int().positive().max(100).optional().catch(20),
});

export type PaginationSearch = z.infer<typeof paginationSchema>;
