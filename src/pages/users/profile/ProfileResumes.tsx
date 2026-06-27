import { useMemo, useState } from 'react'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGetCountriesQueryOptions, useGetCitiesQueryOptions } from '@/api/locations/locations'
import {
  useCreateResumeMutation,
  useDeleteResumeMutation,
  useGetResumesQueryOptions,
  useUpdateResumeMutation
} from '@/api/users/resume'
import { SingleCombobox } from '@/components/combobox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  EmploymentType,
  EmploymentTypeList,
  SalaryCurrency,
  SalaryCurrencyList,
  Specialization,
  SpecializationList,
  WorkFormat,
  WorkFormatList
} from '@/types/shared/literals'
import { locationLabel } from '@/lib/location-label'
import { FileText, Pencil, Plus, Trash2 } from 'lucide-react'
import { ResumeCreateRequest } from '@/types/users/resume'

type NullableCurrency = SalaryCurrency | 'none'

type ResumeFormState = {
  title: string
  summary?: string
  specialization: Specialization
  countryId: string
  cityId: string
  salaryExpectationMin: string
  salaryExpectationMax: string
  salaryCurrency: NullableCurrency
  workFormat: WorkFormat
  employmentType: EmploymentType
}

const ProfileResumes = () => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null)
  const [newResume, setNewResume] = useState<ResumeFormState>({
    title: '',
    specialization: 'fullstack',
    countryId: '',
    cityId: '',
    salaryExpectationMin: '',
    salaryExpectationMax: '',
    salaryCurrency: 'none',
    workFormat: 'remote',
    employmentType: 'full_time'
  })
  const createResumeMutation = useCreateResumeMutation()
  const updateResumeMutation = useUpdateResumeMutation()
  const deleteResumeMutation = useDeleteResumeMutation()
  const { data: resumesData } = useSuspenseQuery(useGetResumesQueryOptions())
  const resumes = resumesData.data
  const editingResume = resumes.find((resume) => resume.id === editingResumeId)

  const { data: countriesData } = useSuspenseQuery(useGetCountriesQueryOptions())
  const { data: citiesData } = useQuery(
    useGetCitiesQueryOptions({ countryId: newResume.countryId })
  )

  const countryOptions = useMemo(
    () => countriesData.data.map((c) => ({ value: c.id, label: c.name })),
    [countriesData]
  )
  const cityOptions = useMemo(
    () => (citiesData?.data ?? []).map((c) => ({ value: c.id, label: c.name })),
    [citiesData]
  )

  const handleAddResume = async () => {
    if (!newResume.title || !newResume.specialization) return

    const resumeToAdd: ResumeCreateRequest = {
      title: newResume.title,
      specialization: newResume.specialization,
      countryId: newResume.countryId,
      cityId: newResume.cityId || undefined,
      salaryExpectationMin: newResume.salaryExpectationMin
        ? Number(newResume.salaryExpectationMin)
        : undefined,
      salaryExpectationMax: newResume.salaryExpectationMax
        ? Number(newResume.salaryExpectationMax)
        : undefined,
      salaryCurrency: newResume.salaryCurrency === 'none' ? undefined : newResume.salaryCurrency,
      workFormat: newResume.workFormat,
      employmentType: newResume.employmentType
    }

    try {
      await createResumeMutation.mutateAsync(resumeToAdd)
      toast.success('Resume added')
      setIsAddOpen(false)
      resetForm()
    } catch {
      toast.error('Failed to add resume')
    }
  }

  const handleDeleteResume = async (resumeId: string) => {
    try {
      await deleteResumeMutation.mutateAsync(resumeId)
      toast.success('Resume removed')
    } catch {
      toast.error('Failed to remove resume')
    }
  }

  const handleUpdateResume = async () => {
    if (!editingResumeId || !newResume.title || !newResume.specialization) return

    try {
      await updateResumeMutation.mutateAsync({
        resumeId: editingResumeId,
        data: {
          title: newResume.title,
          summary: newResume.summary ?? undefined,
          specialization: newResume.specialization,
          countryId: newResume.countryId,
          cityId: newResume.cityId || undefined,
          salaryExpectationMin: newResume.salaryExpectationMin
            ? Number(newResume.salaryExpectationMin)
            : undefined,
          salaryExpectationMax: newResume.salaryExpectationMax
            ? Number(newResume.salaryExpectationMax)
            : undefined,
          salaryCurrency:
            newResume.salaryCurrency === 'none' ? undefined : newResume.salaryCurrency,
          workFormat: newResume.workFormat,
          employmentType: newResume.employmentType
        }
      })
      toast.success('Resume updated')
      setEditingResumeId(null)
      setIsAddOpen(false)
    } catch {
      toast.error('Failed to update resume')
    }
  }

  const resetForm = () => {
    setNewResume({
      title: '',
      specialization: 'fullstack',
      countryId: '',
      cityId: '',
      salaryExpectationMin: '',
      salaryExpectationMax: '',
      salaryCurrency: 'none',
      workFormat: 'remote',
      employmentType: 'full_time'
    })
  }

  const openEdit = (resume: (typeof resumes)[number]) => {
    setEditingResumeId(resume.id)
    setNewResume({
      title: resume.title,
      summary: resume.summary ?? '',
      specialization: resume.specialization,
      countryId: resume.country.id,
      cityId: resume.city?.id ?? '',
      salaryExpectationMin: resume.salaryExpectationMin?.toString() ?? '',
      salaryExpectationMax: resume.salaryExpectationMax?.toString() ?? '',
      salaryCurrency: resume.salaryCurrency ?? 'none',
      workFormat: resume.workFormat ?? 'remote',
      employmentType: resume.employmentType ?? 'full_time'
    })
    setIsAddOpen(true)
  }

  const openCreate = () => {
    setEditingResumeId(null)
    resetForm()
    setIsAddOpen(true)
  }

  const updateField = <K extends keyof ResumeFormState>(key: K, value: ResumeFormState[K]) => {
    setNewResume((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'countryId') next.cityId = ''
      return next
    })
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Resumes</CardTitle>
        <Button variant="ghost" size="sm" onClick={openCreate}>
          <Plus className="mr-1 size-4" />
          Add Resume
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resumes.length === 0 ? (
            <p className="text-muted-foreground text-sm">No resumes added yet.</p>
          ) : (
            resumes.map((resume) => (
              <div
                key={resume.id}
                className="group hover:border-primary flex items-center justify-between rounded-lg border p-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <FileText className="text-primary size-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{resume.title}</h4>
                    <p className="text-muted-foreground text-xs">
                      {resume.specialization} • {locationLabel(resume.country, resume.city)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => openEdit(resume)}
                    className="text-muted-foreground"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDeleteResume(resume.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>{editingResume ? 'Edit Resume' : 'Add Resume'}</DialogTitle>
            <DialogDescription>
              Create a new resume profile. You can add more details later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Resume Title</Label>
              <Input
                id="title"
                value={newResume.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Input
                id="summary"
                value={newResume.summary ?? ''}
                onChange={(e) => updateField('summary', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                value={newResume.specialization}
                onValueChange={(value) => updateField('specialization', value as Specialization)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {SpecializationList.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec.replace(/_/g, ' ').charAt(0).toUpperCase() +
                        spec.replace(/_/g, ' ').slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Work Format</Label>
                <Select
                  value={newResume.workFormat}
                  onValueChange={(value) => updateField('workFormat', value as WorkFormat)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WorkFormatList.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Select
                  value={newResume.employmentType}
                  onValueChange={(value) => updateField('employmentType', value as EmploymentType)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EmploymentTypeList.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Salary Min</Label>
                <Input
                  type="number"
                  min="0"
                  value={newResume.salaryExpectationMin}
                  onChange={(e) => updateField('salaryExpectationMin', e.target.value)}
                  placeholder="e.g. 5000"
                />
              </div>
              <div className="space-y-2">
                <Label>Salary Max</Label>
                <Input
                  type="number"
                  min="0"
                  value={newResume.salaryExpectationMax}
                  onChange={(e) => updateField('salaryExpectationMax', e.target.value)}
                  placeholder="e.g. 10000"
                />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select
                  value={newResume.salaryCurrency}
                  onValueChange={(value) =>
                    updateField('salaryCurrency', value as NullableCurrency)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {SalaryCurrencyList.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resume-country">Country</Label>
                <SingleCombobox
                  id="resume-country"
                  options={countryOptions}
                  value={newResume.countryId}
                  placeholder="Select country"
                  emptyLabel="No countries found"
                  onChange={(val) => updateField('countryId', val ?? '')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume-city">City</Label>
                <SingleCombobox
                  id="resume-city"
                  options={cityOptions}
                  value={newResume.cityId}
                  placeholder={newResume.countryId ? 'Select city' : 'Select a country first'}
                  emptyLabel="No cities found"
                  disabled={!newResume.countryId}
                  onChange={(val) => updateField('cityId', val ?? '')}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={editingResume ? handleUpdateResume : handleAddResume}
              disabled={createResumeMutation.isPending || updateResumeMutation.isPending}
            >
              {editingResume
                ? updateResumeMutation.isPending
                  ? 'Saving...'
                  : 'Save Resume'
                : createResumeMutation.isPending
                  ? 'Adding...'
                  : 'Add Resume'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ProfileResumes
