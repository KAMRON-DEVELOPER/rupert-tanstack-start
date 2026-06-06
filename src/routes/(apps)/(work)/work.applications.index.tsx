import ApplicationsPage from '@/pages/work/vacancies/ApplicationsPage'
import { useGetApplicationsQueryOptions } from '@/api/vacancies/vacancies'
import { applicationSearch } from '@/types/vacancy.schema'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/(work)/work/applications/')({
  validateSearch: applicationSearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(useGetApplicationsQueryOptions(deps))
  },
  component: ApplicationsPage
})
