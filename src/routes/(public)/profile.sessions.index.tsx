import { useGetSessionsQueryOptions } from '@/api/users/session'
import ProfileSessions from '@/pages/users/profile/ProfileSessions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile/sessions/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(useGetSessionsQueryOptions())
  },
  component: ProfileSessionsPage
})

function ProfileSessionsPage() {
  return <ProfileSessions />
}
