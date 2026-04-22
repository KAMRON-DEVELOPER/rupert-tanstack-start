import CompanyPage from '@/pages/work/companies/CompanyPage';
import { useGetCompanyQueryOptions } from '@/services/companies/companies';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(work)/work/companies/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(useGetCompanyQueryOptions(params));
  },
  component: CompanyPage,
});
