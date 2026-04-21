import { createFileRoute, redirect } from '@tanstack/react-router';
import { AuthPage } from '@/pages/users/AuthPage';

export const Route = createFileRoute('/(public)/(apps)/(users)/auth/')({
  beforeLoad: async ({ context }) => {
    if (context.isAuthenticated === true) {
      throw redirect({
        to: '/',
        replace: true,
      });
    }
  },
  component: AuthPage,
});
