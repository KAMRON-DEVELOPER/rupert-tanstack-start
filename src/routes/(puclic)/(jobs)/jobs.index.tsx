import JobsPage from '@/pages/jobs/JobsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(puclic)/(jobs)/jobs/')({
  component: JobsPage,
});
