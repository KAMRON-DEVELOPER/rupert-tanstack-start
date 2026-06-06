import ApplicationPage from '@/pages/work/vacancies/ApplicationPage'
import { useGetApplicationQueryOptions } from '@/api/vacancies/vacancies'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/(work)/work/applications/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(useGetApplicationQueryOptions(params))
  },
  component: ApplicationPage
})
