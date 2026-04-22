import CompaniesPage from '@/pages/work/companies/CompaniesPage';
import { useGetCompaniesQueryOptions } from '@/services/companies/companies';
import { companySearch } from '@/types/company.schema';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(work)/work/companies/')({
  validateSearch: companySearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await Promise.all([queryClient.ensureQueryData(useGetCompaniesQueryOptions(deps))]);
  },
  component: CompaniesPage,
});
