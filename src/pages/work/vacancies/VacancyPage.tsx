import { Button } from '@/components/ui/button'
import {
  useDeleteVacancyMutation,
  useGetVacancyQueryOptions,
  useSaveVacancyMutation,
  useUnsaveVacancyMutation
} from '@/services/vacancies/vacancies'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams, useRouteContext } from '@tanstack/react-router'
import { Bookmark, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import ApplicationForm from './ApplicationForm'
import VacancyApplications from './VacancyApplications'
import VacancyDetails from './VacancyDetails'
import VacancyForm from './VacancyForm'
import VacancySkills from './VacancySkills'

const VacancyPage = () => {
  const params = useParams({ from: '/(apps)/(work)/work/vacancies/$id' })
  const navigate = useNavigate()
  const { api } = useRouteContext({ from: '__root__' })
  const { data: vacancy } = useSuspenseQuery(useGetVacancyQueryOptions(params))
  const deleteVacancy = useDeleteVacancyMutation(api)
  const saveVacancy = useSaveVacancyMutation(api)
  const unsaveVacancy = useUnsaveVacancyMutation(api)
  const [editOpen, setEditOpen] = useState(false)

  const toggleSaved = async () => {
    try {
      if (vacancy.isSaved) {
        await unsaveVacancy.mutateAsync(vacancy.id)
        toast.success('Vacancy unsaved')
      } else {
        await saveVacancy.mutateAsync(vacancy.id)
        toast.success('Vacancy saved')
      }
    } catch {
      toast.error('Failed to update saved vacancy')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this vacancy?')) return

    try {
      await deleteVacancy.mutateAsync(vacancy.id)
      toast.success('Vacancy deleted')
      navigate({ to: '/work/vacancies' })
    } catch {
      toast.error('Failed to delete vacancy')
    }
  }

  return (
    <div className="col-span-3 space-y-4">
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={toggleSaved}
          disabled={saveVacancy.isPending || unsaveVacancy.isPending}
        >
          <Bookmark className="size-4" />
          {vacancy.isSaved ? 'Unsave' : 'Save'}
        </Button>
        <Button variant="outline" onClick={() => setEditOpen(true)}>
          <Pencil className="size-4" />
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={deleteVacancy.isPending}>
          <Trash2 className="size-4" />
          Delete
        </Button>
      </div>

      <VacancyDetails vacancy={vacancy} />
      <ApplicationForm vacancy={vacancy} />
      <VacancySkills vacancy={vacancy} />
      <VacancyApplications vacancy={vacancy} />
      <VacancyForm vacancy={vacancy} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  )
}

export default VacancyPage
