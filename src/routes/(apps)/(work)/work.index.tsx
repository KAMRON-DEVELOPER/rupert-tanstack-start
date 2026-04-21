import WorkPage from '@/pages/work/WorkPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(work)/work/')({
  component: WorkPage,
});
