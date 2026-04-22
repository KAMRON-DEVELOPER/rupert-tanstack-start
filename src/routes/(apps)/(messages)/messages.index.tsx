import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(messages)/messages/')({
  beforeLoad: () => {
    throw redirect({
      to: '/messages/chats',
      replace: true,
    });
  },
});
