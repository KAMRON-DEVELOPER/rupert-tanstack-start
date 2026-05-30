import GroupsPage from '@/pages/messages/groups/GroupsPage'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(apps)/(messages)/messages/groups/')({
  beforeLoad: () => {
    throw redirect({
      to: '/messages/chats',
      replace: true
    })
  },
  component: GroupsPage
})
