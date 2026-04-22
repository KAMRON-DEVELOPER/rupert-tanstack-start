import { createServerFn } from '@tanstack/react-start';
import { createServerApi } from '@/services/api.server';
import { ListResponse } from '@/types/types';
import { CompanySearch } from '@/types/company.schema';
import { CompanyCardSchema, CompanySchema } from '@/types/company';

export const getCompaniesFn = createServerFn()
  .inputValidator((data: CompanySearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi();
    return api<ListResponse<CompanyCardSchema>>('/companies', { params });
  });

export const getCompanyFn = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    const api = createServerApi();
    return api<CompanySchema>(`/companies/${id}`);
  });
