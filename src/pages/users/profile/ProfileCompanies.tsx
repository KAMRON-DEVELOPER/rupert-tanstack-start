import { useState } from 'react'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'

import {
  useDeleteCompanyMutation,
  useGetCompaniesQueryOptions,
  useGetCompanyQueryOptions
} from '@/api/companies/companies'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Pencil, Plus, Trash2 } from 'lucide-react'
import CompanyForm from '@/pages/work/companies/CompanyForm'
import { useRouteContext } from '@tanstack/react-router'

const ProfileCompanies = () => {
  const { api } = useRouteContext({ from: '__root__' })
  const { data: companiesData } = useSuspenseQuery(
    useGetCompaniesQueryOptions({ offset: 0, limit: 20, own: true })
  )
  const deleteCompany = useDeleteCompanyMutation(api)
  const companies = companiesData.data

  const [createOpen, setCreateOpen] = useState(false)
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null)

  const { data: editingCompanyData } = useQuery({
    ...useGetCompanyQueryOptions({ id: editingCompanyId ?? '' }),
    enabled: !!editingCompanyId
  })

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this company?')) return

    try {
      await deleteCompany.mutateAsync(id)
      toast.success('Company deleted')
    } catch {
      toast.error('Failed to delete company')
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">My Companies</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setCreateOpen(true)}>
          <Plus className="mr-1 size-4" />
          Create Company
        </Button>
      </CardHeader>
      <CardContent>
        {companies.length === 0 ? (
          <p className="text-muted-foreground text-sm">No companies yet.</p>
        ) : (
          <div className="space-y-3">
            {companies.map((company) => (
              <div
                key={company.id}
                className="group hover:border-primary flex items-center justify-between rounded-lg border p-3 transition-colors"
              >
                <Link
                  to="/profile/company/$id"
                  params={{ id: company.id }}
                  className="flex flex-1 items-center gap-3"
                >
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Building2 className="text-primary size-5" />
                  </div>
                  <div>
                    <p className="font-medium">{company.name}</p>
                    {company.tagline && (
                      <p className="text-muted-foreground text-xs">{company.tagline}</p>
                    )}
                  </div>
                </Link>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setEditingCompanyId(company.id)}
                    className="text-muted-foreground"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(company.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CompanyForm open={createOpen} onOpenChange={setCreateOpen} />
      {editingCompanyData && (
        <CompanyForm
          company={editingCompanyData}
          open={!!editingCompanyId}
          onOpenChange={(open) => {
            if (!open) setEditingCompanyId(null)
          }}
        />
      )}
    </Card>
  )
}

export default ProfileCompanies
