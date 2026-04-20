import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@/pages/home/HomePage';
import { useGetStatsQueryOptions } from '@/services/stats/stats';

export const Route = createFileRoute('/(public)/')({
  loader: async ({ context }) => {
    let query = context.queryClient;
    await Promise.all([query.ensureQueryData(useGetStatsQueryOptions())]);
  },
  component: HomePage,
});
