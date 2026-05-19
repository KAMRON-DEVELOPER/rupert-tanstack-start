import { Button } from '@/components/ui/button'
import { useDeleteCompanyMutation, useGetCompanyQueryOptions } from '@/services/companies/companies'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams, useRouteContext } from '@tanstack/react-router'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import CompanyDetails from './CompanyDetails'
import CompanyForm from './CompanyForm'
import CompanyMembers from './CompanyMembers'

const CompanyPage = () => {
  const params = useParams({ from: '/(apps)/(work)/work/companies/$id' })
  const navigate = useNavigate()
  const { api } = useRouteContext({ from: '__root__' })
  const { data: company } = useSuspenseQuery(useGetCompanyQueryOptions(params))
  const deleteCompany = useDeleteCompanyMutation(api)
  const [editOpen, setEditOpen] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm('Delete this company?')) return

    try {
      await deleteCompany.mutateAsync(company.id)
      toast.success('Company deleted')
      navigate({ to: '/work/companies' })
    } catch {
      toast.error('Failed to delete company')
    }
  }

  return (
    <div className="col-span-3 space-y-4">
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setEditOpen(true)}>
          <Pencil className="size-4" />
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={deleteCompany.isPending}>
          <Trash2 className="size-4" />
          Delete
        </Button>
      </div>

      <CompanyDetails company={company} />
      <CompanyMembers company={company} />
      <CompanyForm company={company} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  )
}

export default CompanyPage
