import EmptyState from '@/components/forms/EmptyState'
import FormError from '@/components/forms/FormError'
import SubmitButton from '@/components/forms/SubmitButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
  useGetWorkExperiencesQueryOptions,
  useUpdateWorkExperienceMutation
} from '@/services/users/users'
import { getErrorMessage } from '@/types/helper'
import type { WorkExperienceRequest, WorkExperienceSchema } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { toast } from 'sonner'

const emptyForm: WorkExperienceRequest = {
  companyName: '',
  location: '',
  position: '',
  description: '',
  startedAt: '',
  endedAt: null
}

const ProfileWorkExperiences = () => {
  const {
    data: workExperiences,
    isPending,
    isError
  } = useQuery(useGetWorkExperiencesQueryOptions())
  const deleteWorkExperience = useDeleteWorkExperienceMutation()
  const [editing, setEditing] = useState<WorkExperienceSchema | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  const remove = async (workExperienceId: string) => {
    try {
      await deleteWorkExperience.mutateAsync(workExperienceId)
      toast.success('Work experience deleted')
    } catch {
      toast.error('Failed to delete work experience')
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Work Experience</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setEditing(null)
            setFormOpen(true)
          }}
        >
          <Plus className="size-4" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {isPending && <p className="text-muted-foreground text-sm">Loading...</p>}
        {isError && (
          <p className="text-muted-foreground text-sm">Work experiences are not available.</p>
        )}
        {workExperiences?.length === 0 && <EmptyState title="No work experience" />}
        {workExperiences?.map((item) => (
          <div key={item.id} className="rounded-lg border p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{item.position}</p>
                <p className="text-muted-foreground text-sm">
                  {item.companyName}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                <p className="text-muted-foreground text-xs">
                  {item.startedAt} - {item.isCurrent ? 'Current' : item.endedAt || 'Unknown'}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setEditing(item)
                    setFormOpen(true)
                  }}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(item.id)}
                  disabled={deleteWorkExperience.isPending}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            {item.description && (
              <p className="text-muted-foreground mt-2 text-sm whitespace-pre-wrap">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </CardContent>
      <WorkExperienceForm workExperience={editing} open={formOpen} onOpenChange={setFormOpen} />
    </Card>
  )
}

const WorkExperienceForm = ({
  workExperience,
  open,
  onOpenChange
}: {
  workExperience: WorkExperienceSchema | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const createWorkExperience = useCreateWorkExperienceMutation()
  const updateWorkExperience = useUpdateWorkExperienceMutation()
  const [error, setError] = useState<string | null>(null)
  const [isCurrent, setIsCurrent] = useState(workExperience?.isCurrent ?? false)
  const [form, setForm] = useState<WorkExperienceRequest>(
    workExperience
      ? {
          companyName: workExperience.companyName,
          location: workExperience.location ?? '',
          position: workExperience.position,
          description: workExperience.description ?? '',
          startedAt: workExperience.startedAt,
          endedAt: workExperience.endedAt
        }
      : emptyForm
  )

  useEffect(() => {
    setIsCurrent(workExperience?.isCurrent ?? false)
    setForm(
      workExperience
        ? {
            companyName: workExperience.companyName,
            location: workExperience.location ?? '',
            position: workExperience.position,
            description: workExperience.description ?? '',
            startedAt: workExperience.startedAt,
            endedAt: workExperience.endedAt
          }
        : emptyForm
    )
  }, [workExperience])

  const updateField = <K extends keyof WorkExperienceRequest>(
    key: K,
    value: WorkExperienceRequest[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const payload: WorkExperienceRequest = {
      companyName: form.companyName.trim(),
      location: form.location?.trim() || null,
      position: form.position.trim(),
      description: form.description?.trim() || null,
      startedAt: form.startedAt,
      endedAt: isCurrent ? null : form.endedAt || null
    }

    try {
      if (workExperience) {
        await updateWorkExperience.mutateAsync({
          workExperienceId: workExperience.id,
          data: payload
        })
        toast.success('Work experience updated')
      } else {
        await createWorkExperience.mutateAsync(payload)
        toast.success('Work experience created')
      }
      onOpenChange(false)
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Failed to save work experience')
          : 'Failed to save work experience'
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {workExperience ? 'Edit Work Experience' : 'Add Work Experience'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <FormError message={error} />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="work-company">Company</Label>
              <Input
                id="work-company"
                value={form.companyName}
                onChange={(event) => updateField('companyName', event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-position">Position</Label>
              <Input
                id="work-position"
                value={form.position}
                onChange={(event) => updateField('position', event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-location">Location</Label>
              <Input
                id="work-location"
                value={form.location ?? ''}
                onChange={(event) => updateField('location', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-started">Started at</Label>
              <Input
                id="work-started"
                type="date"
                value={form.startedAt}
                onChange={(event) => updateField('startedAt', event.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isCurrent} onCheckedChange={setIsCurrent} />
              <Label>Current role</Label>
            </div>
            {!isCurrent && (
              <div className="space-y-2">
                <Label htmlFor="work-ended">Ended at</Label>
                <Input
                  id="work-ended"
                  type="date"
                  value={form.endedAt ?? ''}
                  onChange={(event) => updateField('endedAt', event.target.value || null)}
                />
              </div>
            )}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="work-description">Description</Label>
              <Textarea
                id="work-description"
                value={form.description ?? ''}
                onChange={(event) => updateField('description', event.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <SubmitButton
              isPending={createWorkExperience.isPending || updateWorkExperience.isPending}
            >
              Save
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileWorkExperiences
