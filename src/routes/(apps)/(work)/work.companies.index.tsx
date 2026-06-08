import CompaniesPage from '@/pages/work/companies/CompaniesPage'
import { useGetCompaniesQueryOptions } from '@/api/companies/companies'
import { companyListParamsSchema } from '@/types/companies/company'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/(work)/work/companies/')({
  validateSearch: companyListParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await Promise.all([queryClient.ensureQueryData(useGetCompaniesQueryOptions(deps))])
  },
  component: CompaniesPage
})
