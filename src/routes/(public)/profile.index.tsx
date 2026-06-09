import {
  useGetFollowersQueryOptions,
  useGetFollowingQueryOptions,
  useGetFollowRequestsQueryOptions
} from '@/api/users/follow'
import { useGetResumesQueryOptions } from '@/api/users/resume'
import { useGetSessionsQueryOptions } from '@/api/users/session'
import { useGetUserSkillsQueryOptions } from '@/api/users/user-skill'
import { useGetProfileQueryOptions } from '@/api/users/users'
import { useGetWorkExperiencesQueryOptions } from '@/api/users/work-experience'
import ProfilePage from '@/pages/users/ProfilePage'
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
