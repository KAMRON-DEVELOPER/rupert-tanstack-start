import ProfilePage from '@/pages/users/ProfilePage';
import { useGetProfileQueryOptions } from '@/services/users/auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/profile/')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(useGetProfileQueryOptions());
  },
  component: ProfilePage,
});
