import { useState } from 'react'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  useDeleteVacancyMutation,
  useGetVacanciesQueryOptions,
  useGetVacancyQueryOptions
} from '@/api/vacancies/vacancies'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, Pencil, Plus, Trash2 } from 'lucide-react'
import VacancyForm from '@/pages/work/vacancies/VacancyForm'
import { useRouteContext } from '@tanstack/react-router'

const formatLabel = (value: string) => value.replace(/_/g, ' ')

type CompanyVacanciesProps = {
  companyId: string
  isOwner?: boolean
}

const CompanyVacancies = ({ companyId, isOwner = false }: CompanyVacanciesProps) => {
  const { api } = useRouteContext({ from: '__root__' })
  const deleteVacancy = useDeleteVacancyMutation(api)
  const { data: vacanciesData } = useSuspenseQuery(
    useGetVacanciesQueryOptions({ offset: 0, limit: 50, companyId })
  )
  const vacancies = vacanciesData.data.filter((v) => v.company.id === companyId)

  const [createOpen, setCreateOpen] = useState(false)
  const [editingVacancyId, setEditingVacancyId] = useState<string | null>(null)

  const { data: editingVacancyData } = useQuery({
    ...useGetVacancyQueryOptions({ id: editingVacancyId ?? '' }),
    enabled: !!editingVacancyId
  })

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this vacancy?')) return

    try {
      await deleteVacancy.mutateAsync(id)
      toast.success('Vacancy deleted')
    } catch {
      toast.error('Failed to delete vacancy')
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vacancies</CardTitle>
        {isOwner && (
          <Button variant="outline" size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="mr-1 size-4" />
            Create Vacancy
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {vacancies.length === 0 ? (
          <p className="text-muted-foreground text-sm">No vacancies yet.</p>
        ) : (
          <div className="space-y-2">
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="hover:border-primary flex items-center justify-between rounded-lg border p-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Briefcase className="text-primary size-4" />
                  </div>
                  <div>
                    <p className="font-medium">{vacancy.title}</p>
                    <div className="mt-0.5 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-xs">
                        {formatLabel(vacancy.workFormat)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {formatLabel(vacancy.employmentType)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {formatLabel(vacancy.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                {isOwner && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setEditingVacancyId(vacancy.id)}
                      className="text-muted-foreground"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(vacancy.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <VacancyForm companyId={companyId} open={createOpen} onOpenChange={setCreateOpen} />
      {editingVacancyData && (
        <VacancyForm
          companyId={companyId}
          vacancy={editingVacancyData}
          open={!!editingVacancyId}
          onOpenChange={(open) => {
            if (!open) setEditingVacancyId(null)
          }}
        />
      )}
    </Card>
  )
}

export default CompanyVacancies
