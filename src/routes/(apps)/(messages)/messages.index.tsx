import MessagesPage from '@/pages/messages/MessagesPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)/(messages)/messages/')({
  component: MessagesPage,
});
