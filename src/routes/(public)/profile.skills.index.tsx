import { useGetUserSkillsQueryOptions } from '@/api/users/user-skill'
import ProfileSkills from '@/pages/users/profile/ProfileSkills'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile/skills/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(useGetUserSkillsQueryOptions())
  },
  component: ProfileSkillsPage
})

function ProfileSkillsPage() {
  return <ProfileSkills />
}
