import ChatsPage from '@/pages/messages/chats/ChatsPage'
import { useGetChatsQueryOptions } from '@/api/chats/chats'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/(messages)/messages/chats/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(useGetChatsQueryOptions()),
  component: ChatsPage
})
