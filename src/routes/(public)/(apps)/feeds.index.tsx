import FeedsPage from '@/pages/feeds/FeedsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/(apps)/feeds/')({
  component: FeedsPage,
});
