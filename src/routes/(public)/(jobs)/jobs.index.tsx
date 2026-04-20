import JobsPage from '@/pages/jobs/JobsPage';
import { useGetVacanciesQueryOptions } from '@/services/vacancies/vacancies';
import { createFileRoute } from '@tanstack/react-router';
import { vacancySearch } from '@/types/vacancy.schema';

export const Route = createFileRoute('/(public)/(jobs)/jobs/')({
  validateSearch: vacancySearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await Promise.all([queryClient.ensureQueryData(useGetVacanciesQueryOptions(deps))]);
  },
  component: JobsPage,
});
