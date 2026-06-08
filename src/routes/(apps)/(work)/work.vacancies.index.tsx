import VacanciesPage from '@/pages/work/vacancies/VacanciesPage'
import { useGetVacanciesQueryOptions } from '@/api/vacancies/vacancies'
import { vacancyListParamsSchema } from '@/types/vacancies/vacancy'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/(work)/work/vacancies/')({
  validateSearch: vacancyListParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await Promise.all([queryClient.ensureQueryData(useGetVacanciesQueryOptions(deps))])
  },
  component: VacanciesPage
})
