import ProfilePage from '@/pages/users/ProfilePage'
import { useGetProfileQueryOptions } from '@/services/users/auth'
import {
  useGetFollowersQueryOptions,
  useGetFollowingQueryOptions,
  useGetFollowRequestsQueryOptions,
  useGetResumesQueryOptions,
  useGetSessionsQueryOptions,
  useGetUserSkillsQueryOptions,
  useGetWorkExperiencesQueryOptions
} from '@/services/users/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile/')({
  loader: async ({ context: { queryClient } }) => {
    return await Promise.all([
      queryClient.ensureQueryData(useGetProfileQueryOptions()),
      queryClient.ensureQueryData(useGetUserSkillsQueryOptions()),
      queryClient.ensureQueryData(useGetResumesQueryOptions()),
      queryClient.ensureQueryData(useGetWorkExperiencesQueryOptions()),
      queryClient.ensureQueryData(useGetSessionsQueryOptions()),
      queryClient.ensureQueryData(useGetFollowersQueryOptions({ offset: 0, limit: 10 })),
      queryClient.ensureQueryData(useGetFollowingQueryOptions({ offset: 0, limit: 10 })),
      queryClient.ensureQueryData(useGetFollowRequestsQueryOptions({ offset: 0, limit: 10 }))
    ])
  },
  component: ProfilePage
})
