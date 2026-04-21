import z from 'zod';
import { paginationSchema } from './types.schemas';
import { CompanyTypeList } from './literals';

export const CompanySearchSchema = z.object({
  id: z.uuidv4().optional(),
  name: z.string().optional(),
  type: z.enum(CompanyTypeList).optional(),
});

export const companySearch = CompanySearchSchema.extend(paginationSchema.shape);

export type CompanySearch = z.infer<typeof companySearch>;
