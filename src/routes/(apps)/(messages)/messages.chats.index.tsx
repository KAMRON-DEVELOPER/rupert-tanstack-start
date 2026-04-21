import ChatsPage from '@/pages/messages/chats/ChatsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(messages)/messages/chats/')({
  component: ChatsPage,
});
