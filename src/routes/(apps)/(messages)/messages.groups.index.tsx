import GroupPage from '@/pages/messages/groups/GroupPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(messages)/messages/groups/')({
  component: GroupPage,
});
