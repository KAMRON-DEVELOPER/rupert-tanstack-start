import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(work)/work/')({
  beforeLoad: () => {
    throw redirect({
      to: '/work/vacancies',
      replace: true,
    });
  },
});
