import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useGetCompaniesQueryOptions } from '@/api/companies/companies'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import EmptyState from '@/components/forms/EmptyState'
import { Building2, Plus } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/profile/company/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(
      useGetCompaniesQueryOptions({ offset: 0, limit: 20, own: true })
    )
  },
  component: ProfileCompanyIndexPage
})

function ProfileCompanyIndexPage() {
  const { data: companiesData } = useSuspenseQuery(
    useGetCompaniesQueryOptions({ offset: 0, limit: 20, own: true })
  )
  const companies = companiesData.data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Companies</h2>
        <Button size="sm" asChild>
          <Link to="/work/companies">
            <Plus className="mr-1 size-4" />
            Create Company
          </Link>
        </Button>
      </div>

      {companies.length === 0 ? (
        <EmptyState title="No companies yet" description="Create a company to get started." />
      ) : (
        <div className="space-y-3">
          {companies.map((company) => (
            <Link key={company.id} to="/profile/company/$id" params={{ id: company.id }}>
              <Card className="hover:border-primary transition-colors">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Building2 className="text-primary size-5" />
                  </div>
                  <div>
                    <p className="font-medium">{company.name}</p>
                    {company.tagline && (
                      <p className="text-muted-foreground text-sm">{company.tagline}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
