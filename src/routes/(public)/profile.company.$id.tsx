import { createFileRoute } from '@tanstack/react-router'
import { useGetCompanyQueryOptions } from '@/api/companies/companies'
import CompanyPage from '@/pages/work/companies/CompanyPage'

export const Route = createFileRoute('/(public)/profile/company/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(useGetCompanyQueryOptions({ id: params.id }))
  },
  component: ProfileCompanyDetailPage
})

function ProfileCompanyDetailPage() {
  const { id } = Route.useParams()
  return <CompanyPage companyId={id} />
}
