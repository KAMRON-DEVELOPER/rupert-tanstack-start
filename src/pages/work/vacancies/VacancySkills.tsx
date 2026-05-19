import EmptyState from '@/components/forms/EmptyState'
import FormError from '@/components/forms/FormError'
import SubmitButton from '@/components/forms/SubmitButton'
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
import {
  useAddVacancySkillMutation,
  useDeleteVacancySkillMutation,
  useUpdateVacancySkillMutation
} from '@/services/vacancies/vacancies'
import { getErrorMessage } from '@/types/helper'
import { ProficiencyLevelList, type ProficiencyLevel } from '@/types/literals'
import type { VacancySchema } from '@/types/vacancy'
import { useRouteContext } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

const VacancySkills = ({ vacancy }: { vacancy: VacancySchema }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const addSkill = useAddVacancySkillMutation(api)
  const updateSkill = useUpdateVacancySkillMutation(api)
  const deleteSkill = useDeleteVacancySkillMutation(api)
  const [skillId, setSkillId] = useState('')
  const [proficiency, setProficiency] = useState<ProficiencyLevel>('intermediate')
  const [years, setYears] = useState('')
  const [isRequired, setIsRequired] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await addSkill.mutateAsync({
        vacancyId: vacancy.id,
        data: {
          skillId: skillId.trim(),
          proficiency,
          yearsOfExperienceMin: years ? Number(years) : null,
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

  const changeProficiency = async (skillLinkId: string, nextProficiency: ProficiencyLevel) => {
    try {
      await updateSkill.mutateAsync({
        vacancyId: vacancy.id,
        skillLinkId,
        data: { proficiency: nextProficiency }
      })
      toast.success('Skill updated')
    } catch {
      toast.error('Failed to update skill')
    }
  }

  const removeSkill = async (skillLinkId: string) => {
    try {
      await deleteSkill.mutateAsync({ vacancyId: vacancy.id, skillLinkId })
      toast.success('Skill removed')
    } catch {
      toast.error('Failed to remove skill')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={submit} className="space-y-3 rounded-lg border p-3">
          <FormError message={error} />
          <div className="grid gap-3 sm:grid-cols-[1fr_160px_120px_auto]">
            <div className="space-y-2">
              <Label htmlFor="vacancy-skill-id">Skill ID</Label>
              <Input
                id="vacancy-skill-id"
                value={skillId}
                onChange={(event) => setSkillId(event.target.value)}
                placeholder="Existing skill UUID"
                required
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
              />
            </div>
            <div className="flex items-end gap-3">
              <div className="flex h-8 items-center gap-2">
                <Switch checked={isRequired} onCheckedChange={setIsRequired} />
                <Label>Required</Label>
              </div>
              <SubmitButton isPending={addSkill.isPending}>Add</SubmitButton>
            </div>
          </div>
        </form>

        {vacancy.skillLinks.length === 0 ? (
          <EmptyState title="No skills" />
        ) : (
          <div className="space-y-2">
            {vacancy.skillLinks.map((skillLink) => (
              <div
                key={skillLink.id}
                className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{skillLink.skill.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {skillLink.isRequired ? 'Required' : 'Optional'} ·{' '}
                    {skillLink.yearsOfExperienceMin ?? 0}+ years
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={skillLink.proficiency}
                    onValueChange={(value) =>
                      changeProficiency(skillLink.id, value as ProficiencyLevel)
                    }
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeSkill(skillLink.id)}
                    disabled={deleteSkill.isPending}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VacancySkills
