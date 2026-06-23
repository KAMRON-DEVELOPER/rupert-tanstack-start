import { useGetResumesQueryOptions } from '@/api/users/resume'
import ProfileResumes from '@/pages/users/profile/ProfileResumes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile/resumes/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(useGetResumesQueryOptions())
  },
  component: ProfileResumesPage
})

function ProfileResumesPage() {
  return <ProfileResumes />
}
