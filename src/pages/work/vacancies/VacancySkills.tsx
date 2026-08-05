import EmptyState from '@/components/forms/EmptyState'
import FormError from '@/components/forms/FormError'
import SubmitButton from '@/components/forms/SubmitButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { SingleCombobox } from '@/components/combobox'
import {
  useAddVacancySkillMutation,
  useDeleteVacancySkillMutation,
  useUpdateVacancySkillMutation
} from '@/api/vacancies/vacancies'
import { useGetSkillsQueryOptions } from '@/api/skills/skills'
import { getErrorMessage } from '@/types/shared/helper'
import { ProficiencyLevelList, type ProficiencyLevel } from '@/types/shared/literals'
import type {
  VacancyDetailResponse,
  VacancySkillLinkResponse,
  VacancySkillLinkUpdateRequest
} from '@/types/vacancies/vacancy'
import { useRouteContext } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState, type SubmitEvent } from 'react'
import { toast } from 'sonner'

type VacancySkillLinkRowProps = {
  vacancyId: string
  skillLink: VacancySkillLinkResponse
}

const VacancySkillLinkRow = ({ vacancyId, skillLink }: VacancySkillLinkRowProps) => {
  const { api } = useRouteContext({ from: '__root__' })
  const updateSkill = useUpdateVacancySkillMutation(api)
  const deleteSkill = useDeleteVacancySkillMutation(api)

  const [yearsDraft, setYearsDraft] = useState(
    skillLink.yearsOfExperienceMin != null ? String(skillLink.yearsOfExperienceMin) : ''
  )

  useEffect(() => {
    setYearsDraft(
      skillLink.yearsOfExperienceMin != null ? String(skillLink.yearsOfExperienceMin) : ''
    )
  }, [skillLink.yearsOfExperienceMin])

  const sendUpdate = async (data: VacancySkillLinkUpdateRequest) => {
    try {
      await updateSkill.mutateAsync({
        vacancyId,
        skillLinkId: skillLink.id,
        data
      })
      toast.success('Skill updated')
    } catch {
      toast.error('Failed to update skill')
    }
  }

  const handleProficiencyChange = (value: ProficiencyLevel) => {
    if (value === skillLink.proficiency) return
    void sendUpdate({ proficiency: value })
  }

  const handleRequiredChange = (checked: boolean) => {
    if (checked === skillLink.isRequired) return
    void sendUpdate({ isRequired: checked })
  }

  const handleYearsBlur = () => {
    const trimmed = yearsDraft.trim()
    const original = skillLink.yearsOfExperienceMin

    if (trimmed === '') {
      if (original != null) {
        void sendUpdate({ yearsOfExperienceMin: null })
      }
      return
    }

    const parsed = Number(trimmed)
    if (Number.isNaN(parsed) || parsed < 0) {
      setYearsDraft(original != null ? String(original) : '')
      toast.error('Years must be a positive number')
      return
    }

    if (original != null && parsed === original) return
    if (original == null && trimmed === '') return

    void sendUpdate({ yearsOfExperienceMin: parsed })
  }

  const handleDelete = async () => {
    try {
      await deleteSkill.mutateAsync({ vacancyId, skillLinkId: skillLink.id })
      toast.success('Skill removed')
    } catch {
      toast.error('Failed to remove skill')
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-medium">{skillLink.skill.name}</p>
        <p className="text-muted-foreground text-sm">
          {skillLink.isRequired ? 'Required' : 'Optional'} · {skillLink.yearsOfExperienceMin ?? 0}+ years ·{' '}
          {skillLink.proficiency}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={skillLink.proficiency}
          onValueChange={(value) => handleProficiencyChange(value as ProficiencyLevel)}
          disabled={updateSkill.isPending}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ProficiencyLevelList.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          min="0"
          className="w-20"
          placeholder="Years"
          value={yearsDraft}
          onChange={(event) => setYearsDraft(event.target.value)}
          onBlur={handleYearsBlur}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.currentTarget.blur()
            }
          }}
          disabled={updateSkill.isPending}
        />

        <div className="flex h-9 items-center gap-2 rounded-md border px-2">
          <Switch
            checked={skillLink.isRequired}
            onCheckedChange={handleRequiredChange}
            disabled={updateSkill.isPending}
            id={`required-${skillLink.id}`}
          />
          <Label htmlFor={`required-${skillLink.id}`} className="text-sm font-normal">
            Required
          </Label>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleDelete}
          disabled={deleteSkill.isPending || updateSkill.isPending}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  )
}

const VacancySkillReadOnlyRow = ({ skillLink }: { skillLink: VacancySkillLinkResponse }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">{skillLink.skill.name}</p>
        <p className="text-muted-foreground text-sm">
          {skillLink.isRequired ? 'Required' : 'Optional'} · {skillLink.yearsOfExperienceMin ?? 0}+ years
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{skillLink.proficiency}</Badge>
      </div>
    </div>
  )
}

const VacancySkills = ({
  vacancy,
  isOwner = false
}: {
  vacancy: VacancyDetailResponse
  isOwner?: boolean
}) => {
  const { api } = useRouteContext({ from: '__root__' })
  const addSkill = useAddVacancySkillMutation(api)
  const { data: skillsData } = useQuery(useGetSkillsQueryOptions())
  const [skillId, setSkillId] = useState('')
  const [proficiency, setProficiency] = useState<ProficiencyLevel>('intermediate')
  const [years, setYears] = useState('')
  const [isRequired, setIsRequired] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const skills = skillsData?.data ?? []
  const existingSkillIds = useMemo(
    () => new Set(vacancy.skillLinks.map((link) => link.skill.id)),
    [vacancy.skillLinks]
  )

  const skillOptions = useMemo(
    () =>
      skills
        .filter((skill) => !existingSkillIds.has(skill.id))
        .map((skill) => ({ value: skill.id, label: skill.name })),
    [skills, existingSkillIds]
  )

  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!skillId) {
      setError('Please select a skill')
      return
    }

    try {
      await addSkill.mutateAsync({
        vacancyId: vacancy.id,
        data: {
          skillId: skillId.trim(),
          proficiency,
          yearsOfExperienceMin: years ? Number(years) : undefined,
          isRequired
        }
      })
      setSkillId('')
      setYears('')
      setProficiency('intermediate')
      setIsRequired(true)
      toast.success('Skill added')
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Failed to add skill')
          : 'Failed to add skill'
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isOwner && (
          <form onSubmit={submit} className="space-y-3 rounded-lg border p-3">
            <FormError message={error} />
            <div className="grid gap-3 sm:grid-cols-[1fr_160px_120px_auto]">
              <div className="space-y-2">
                <Label htmlFor="vacancy-skill-id">Skill</Label>
                <SingleCombobox
                  id="vacancy-skill-id"
                  options={skillOptions}
                  value={skillId || null}
                  placeholder={
                    skillOptions.length === 0 && skillsData ? 'All skills added' : 'Select skill'
                  }
                  emptyLabel={
                    !skillsData
                      ? 'Loading skills...'
                      : skillOptions.length === 0
                        ? 'All skills already added'
                        : 'No matching skills'
                  }
                  onChange={(value) => setSkillId(value ?? '')}
                />
              </div>
              <div className="space-y-2">
                <Label>Proficiency</Label>
                <Select
                  value={proficiency}
                  onValueChange={(value) => setProficiency(value as ProficiencyLevel)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ProficiencyLevelList.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vacancy-skill-years">Years</Label>
                <Input
                  id="vacancy-skill-years"
                  type="number"
                  min="0"
                  value={years}
                  onChange={(event) => setYears(event.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex h-8 items-center gap-2">
                  <Switch checked={isRequired} onCheckedChange={setIsRequired} />
                  <Label>Required</Label>
                </div>
                <SubmitButton isPending={addSkill.isPending} disabled={!skillId}>
                  Add
                </SubmitButton>
              </div>
            </div>
          </form>
        )}

        {vacancy.skillLinks.length === 0 ? (
          <EmptyState title="No skills" />
        ) : (
          <div className="space-y-2">
            {vacancy.skillLinks.map((skillLink) =>
              isOwner ? (
                <VacancySkillLinkRow
                  key={skillLink.id}
                  vacancyId={vacancy.id}
                  skillLink={skillLink}
                />
              ) : (
                <VacancySkillReadOnlyRow key={skillLink.id} skillLink={skillLink} />
              )
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VacancySkills
