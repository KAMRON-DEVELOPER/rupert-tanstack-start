import { useGetChatsQueryOptions } from '@/api/chats/chats'
import MessagesPage from '@/pages/messages/MessagesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/(messages)')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(useGetChatsQueryOptions()),
  component: MessagesPage
})
