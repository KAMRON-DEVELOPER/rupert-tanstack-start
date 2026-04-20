import z from 'zod';

export const paginationSchema = z.object({
  offset: z.coerce.number().int().positive().catch(1),
  limit: z.coerce.number().int().positive().max(50).catch(20),
});

export type PaginationSearch = z.infer<typeof paginationSchema>;
