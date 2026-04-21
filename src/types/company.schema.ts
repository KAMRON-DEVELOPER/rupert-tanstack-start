import z from 'zod';
import { paginationSchema } from './types.schemas';
import { CompanyTypeList } from './literals';

export const CompanySearchSchema = z.object({
  name: z.string().optional(),
  type: z.enum(CompanyTypeList).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});

export const companySearch = CompanySearchSchema.extend(paginationSchema.shape);

export type CompanySearch = z.infer<typeof companySearch>;
