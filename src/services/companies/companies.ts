import { queryOptions } from '@tanstack/react-query';
import { getCompaniesFn, getCompanyFn } from './companies.functions';
import { CompanySearch } from '@/types/company.schema';

export const useGetCompaniesQueryOptions = (data: CompanySearch) =>
  queryOptions({
    queryKey: ['companies', data],
    queryFn: () => getCompaniesFn({ data }),
  });

export const useGetCompanyQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['companies', data],
    queryFn: () => getCompanyFn({ data }),
  });
