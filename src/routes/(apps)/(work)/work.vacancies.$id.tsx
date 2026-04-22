import VacancyPage from '@/pages/work/vacancies/VacancyPage';
import { useGetVacancyQueryOptions } from '@/services/vacancies/vacancies';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(work)/work/vacancies/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(useGetVacancyQueryOptions(params));
  },
  component: VacancyPage,
});
