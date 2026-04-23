import { createFileRoute, redirect } from '@tanstack/react-router';
import HomePage from '@/pages/home/HomePage';
import { useGetStatsQueryOptions } from '@/services/stats/stats';

export const Route = createFileRoute('/(public)/')({
  beforeLoad: ({ context: { isAuthenticated } }) => {
    if (isAuthenticated) {
      throw redirect({
        to: '/work/vacancies',
        replace: true,
      });
    }
  },
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([queryClient.ensureQueryData(useGetStatsQueryOptions())]);
  },
  component: HomePage,
});
