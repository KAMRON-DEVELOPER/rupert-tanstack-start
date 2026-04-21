import FeedPage from '@/pages/feeds/FeedPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/feeds/')({
  component: FeedPage,
});
