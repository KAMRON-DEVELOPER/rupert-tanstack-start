import { createFileRoute, redirect } from '@tanstack/react-router'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { useGetProfileQueryOptions } from '@/api/users/auth'

export const Route = createFileRoute('/(admin)/admin')({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/auth',
        replace: true
      })
    }

    const profile = await context.queryClient.ensureQueryData(useGetProfileQueryOptions())

    if (profile.role !== 'admin') {
      throw redirect({
        to: '/work/vacancies',
        replace: true
      })
    }
  },
  component: AdminLayout
})
