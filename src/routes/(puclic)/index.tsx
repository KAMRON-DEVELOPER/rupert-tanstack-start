import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@/pages/home/HomePage';
import { useGetStatsQueryOptions } from '@/services/users/auth';

export const Route = createFileRoute('/(puclic)/')({
  loader: async ({ context }) => {
    let query = context.queryClient;
    let api = context.api;

    await Promise.all([query.ensureQueryData(useGetStatsQueryOptions(api))]);
  },
  component: HomePage,
});
