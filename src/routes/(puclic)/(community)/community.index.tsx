import CommunityPage from '@/pages/Community/CommunityPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(puclic)/(community)/community/')({
  component: CommunityPage,
});
