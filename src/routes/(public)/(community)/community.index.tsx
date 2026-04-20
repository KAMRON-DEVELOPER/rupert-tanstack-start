import CommunityPage from '@/pages/Community/CommunityPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/(community)/community/')({
  component: CommunityPage,
});
