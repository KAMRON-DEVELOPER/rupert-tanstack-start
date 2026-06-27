import { createFileRoute } from '@tanstack/react-router'
import { useGetCompanyQueryOptions } from '@/api/companies/companies'
import { useGetVacanciesQueryOptions } from '@/api/vacancies/vacancies'
import CompanyPage from '@/pages/work/companies/CompanyPage'

export const Route = createFileRoute('/(public)/profile/company/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await Promise.all([
      queryClient.ensureQueryData(useGetCompanyQueryOptions({ id: params.id })),
      queryClient.ensureQueryData(
        useGetVacanciesQueryOptions({ offset: 0, limit: 50, companyId: params.id })
      )
    ])
  },
  component: ProfileCompanyDetailPage
})

function ProfileCompanyDetailPage() {
  const { id } = Route.useParams()
  return <CompanyPage companyId={id} />
}
