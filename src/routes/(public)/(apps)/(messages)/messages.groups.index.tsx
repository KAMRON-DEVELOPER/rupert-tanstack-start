import GroupsPage from '@/pages/messages/groups/GroupsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/(apps)/(messages)/messages/groups/')({
  component: GroupsPage,
});
