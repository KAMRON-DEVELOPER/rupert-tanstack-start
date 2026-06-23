import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import {
  useCreateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
  useGetWorkExperiencesQueryOptions,
  useUpdateWorkExperienceMutation
} from '@/api/users/work-experience'
import { useGetCountriesQueryOptions, useGetCitiesQueryOptions } from '@/api/locations/locations'
import { SingleCombobox } from '@/components/combobox'
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
import { getErrorMessage } from '@/types/shared/helper'
import {
  WorkExperienceCreateRequest,
  WorkExperienceResponse,
  WorkExperienceUpdateRequest
} from '@/types/users/work-experience'
import { Pencil, Plus, Trash2 } from 'lucide-react'

type WorkExperienceFormState = {
  countryId: string
  cityId: string
  companyName: string
  location: string
  position: string
  description: string
  startedAt: string
  endedAt: string
}

const emptyForm: WorkExperienceFormState = {
  countryId: '',
  cityId: '',
  companyName: '',
  location: '',
  position: '',
  description: '',
  startedAt: '',
  endedAt: ''
}

const ProfileWorkExperiences = () => {
  const { data: workExperiences } = useSuspenseQuery(useGetWorkExperiencesQueryOptions())
  const deleteWorkExperience = useDeleteWorkExperienceMutation()
  const [editing, setEditing] = useState<WorkExperienceResponse | null>(null)
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
        {workExperiences.length === 0 && <EmptyState title="No work experience" />}
        {workExperiences.map((item) => (
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
  workExperience: WorkExperienceResponse | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const createWorkExperience = useCreateWorkExperienceMutation()
  const updateWorkExperience = useUpdateWorkExperienceMutation()
  const [error, setError] = useState<string | null>(null)
  const [isCurrent, setIsCurrent] = useState(workExperience?.isCurrent ?? false)
  const [form, setForm] = useState<WorkExperienceFormState>(
    workExperience
      ? {
          countryId: '',
          cityId: '',
          companyName: workExperience.companyName,
          location: workExperience.location ?? '',
          position: workExperience.position,
          description: workExperience.description ?? '',
          startedAt: workExperience.startedAt,
          endedAt: workExperience.endedAt ?? ''
        }
      : emptyForm
  )

  const { data: countriesData } = useSuspenseQuery(useGetCountriesQueryOptions())
  const { data: citiesData } = useQuery(useGetCitiesQueryOptions({ countryId: form.countryId }))

  const countryOptions = useMemo(
    () => countriesData.data.map((c) => ({ value: c.id, label: c.name })),
    [countriesData]
  )
  const cityOptions = useMemo(
    () => (citiesData?.data ?? []).map((c) => ({ value: c.id, label: c.name })),
    [citiesData]
  )

  useEffect(() => {
    setIsCurrent(workExperience?.isCurrent ?? false)
    setForm(
      workExperience
        ? {
            countryId: '',
            cityId: '',
            companyName: workExperience.companyName,
            location: workExperience.location ?? '',
            position: workExperience.position,
            description: workExperience.description ?? '',
            startedAt: workExperience.startedAt,
            endedAt: workExperience.endedAt ?? ''
          }
        : emptyForm
    )
  }, [workExperience])

  const updateField = <K extends keyof WorkExperienceFormState>(
    key: K,
    value: WorkExperienceFormState[K]
  ) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'countryId') next.cityId = ''
      return next
    })
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const companyName = form.companyName.trim()
    const position = form.position.trim()
    const startedAt = form.startedAt.trim()
    const countryId = form.countryId.trim()

    if (!workExperience && !countryId) {
      setError('Country is required')
      return
    }

    if (!companyName || !position || !startedAt) {
      setError('Company, position, and start date are required')
      return
    }

    const payload: WorkExperienceUpdateRequest = {
      countryId: countryId || undefined,
      cityId: form.cityId.trim() || undefined,
      companyName,
      location: form.location?.trim() || undefined,
      position,
      description: form.description?.trim() || undefined,
      startedAt,
      endedAt: isCurrent ? undefined : form.endedAt || undefined
    }

    const createPayload: WorkExperienceCreateRequest = {
      countryId,
      cityId: form.cityId.trim() || undefined,
      companyName,
      location: form.location.trim() || undefined,
      position,
      description: form.description.trim() || undefined,
      startedAt,
      endedAt: isCurrent ? undefined : form.endedAt || undefined
    }

    try {
      if (workExperience) {
        await updateWorkExperience.mutateAsync({
          workExperienceId: workExperience.id,
          data: payload
        })
        toast.success('Work experience updated')
      } else {
        await createWorkExperience.mutateAsync(createPayload)
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
              <Label htmlFor="work-country">Country</Label>
              <SingleCombobox
                id="work-country"
                options={countryOptions}
                value={form.countryId}
                placeholder="Select country"
                emptyLabel="No countries found"
                onChange={(val) => updateField('countryId', val ?? '')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-city">City</Label>
              <SingleCombobox
                id="work-city"
                options={cityOptions}
                value={form.cityId}
                placeholder={form.countryId ? 'Select city' : 'Select a country first'}
                emptyLabel="No cities found"
                disabled={!form.countryId}
                onChange={(val) => updateField('cityId', val ?? '')}
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
                  onChange={(event) => updateField('endedAt', event.target.value)}
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
