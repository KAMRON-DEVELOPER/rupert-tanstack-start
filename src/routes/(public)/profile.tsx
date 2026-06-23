import { useGetProfileQueryOptions } from '@/api/users/users'
import ProfileLayout from '@/pages/users/ProfileLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile')({
  beforeLoad: async ({ context: { isAuthenticated } }) => {
    if (!isAuthenticated) {
      throw redirect({ to: '/auth' })
    }
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(useGetProfileQueryOptions())
  },
  component: ProfileLayout
})
