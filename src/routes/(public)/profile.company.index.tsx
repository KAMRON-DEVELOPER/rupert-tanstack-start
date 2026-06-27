import { useGetCompaniesQueryOptions } from '@/api/companies/companies'
import ProfileCompanies from '@/pages/users/profile/ProfileCompanies'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile/company/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(
      useGetCompaniesQueryOptions({ offset: 0, limit: 20, own: true })
    )
  },
  component: ProfileCompaniesPage
})

function ProfileCompaniesPage() {
  return <ProfileCompanies />
}
