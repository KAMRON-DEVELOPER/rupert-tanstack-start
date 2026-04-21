import VacanciesPage from '@/pages/work/vacancies/VacanciesPage';
import { useGetVacanciesQueryOptions } from '@/services/vacancies/vacancies';
import { vacancySearch } from '@/types/vacancy.schema';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/(apps)/(work)/work/vacancies/')({
  validateSearch: vacancySearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await Promise.all([queryClient.ensureQueryData(useGetVacanciesQueryOptions(deps))]);
  },
  component: VacanciesPage,
});
