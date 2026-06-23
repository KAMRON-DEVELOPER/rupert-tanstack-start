import { useGetWorkExperiencesQueryOptions } from '@/api/users/work-experience'
import ProfileWorkExperiences from '@/pages/users/profile/ProfileWorkExperiences'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile/work-experience/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(useGetWorkExperiencesQueryOptions())
  },
  component: ProfileWorkExperiencePage
})

function ProfileWorkExperiencePage() {
  return <ProfileWorkExperiences />
}
