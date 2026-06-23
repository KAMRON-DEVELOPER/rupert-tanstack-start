import {
  useGetFollowersQueryOptions,
  useGetFollowingQueryOptions,
  useGetFollowRequestsQueryOptions
} from '@/api/users/follow'
import ProfileFollows from '@/pages/users/profile/ProfileFollows'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile/follows/')({
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(useGetFollowersQueryOptions({ offset: 0, limit: 10 })),
      queryClient.ensureQueryData(useGetFollowingQueryOptions({ offset: 0, limit: 10 })),
      queryClient.ensureQueryData(useGetFollowRequestsQueryOptions({ offset: 0, limit: 10 }))
    ])
  },
  component: ProfileFollowsPage
})

function ProfileFollowsPage() {
  return <ProfileFollows />
}
