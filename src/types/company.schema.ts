import z from 'zod';
import { paginationSchema } from './types.schemas';
import { CompanyStatusList, CompanyTypeList } from './literals';

export const CompanySearchSchema = z.object({
  name: z.string().optional(),
  type: z.enum(CompanyTypeList).optional(),
  status: z.enum(CompanyStatusList).catch('approved').optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  hasOpenVacancies: z.boolean().optional(),
  skillIds: z.array(z.uuidv4()).optional(),
});

export const companySearch = CompanySearchSchema.extend(paginationSchema.shape);

export type CompanySearch = z.infer<typeof companySearch>;
