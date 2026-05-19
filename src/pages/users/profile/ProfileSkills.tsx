import { Badge } from '@/components/ui/badge'
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
import { ProficiencyLevel, ProficiencyLevelList } from '@/types/literals'
import { UserSchema } from '@/types/user'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useAddUserSkillMutation,
  useDeleteUserSkillMutation,
  useGetUserSkillsQueryOptions,
  useUpdateUserSkillMutation
} from '@/services/users/users'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

interface ProfileSkillsProps {
  user: UserSchema
}

const ProfileSkills = ({ user }: ProfileSkillsProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [skillId, setSkillId] = useState('')
  const [proficiency, setProficiency] = useState<ProficiencyLevel>('intermediate')
  const addSkillMutation = useAddUserSkillMutation()
  const deleteSkillMutation = useDeleteUserSkillMutation()
  const updateSkillMutation = useUpdateUserSkillMutation()
  const { data: userSkills } = useQuery(useGetUserSkillsQueryOptions())
  const skills = userSkills ?? user.skills

  const handleAddSkill = async () => {
    if (!skillId) return

    try {
      await addSkillMutation.mutateAsync({
        skillId,
        proficiency,
        lastUsedAt: null
      })
      toast.success('Skill added')
      setSkillId('')
      setIsAddOpen(false)
    } catch {
      toast.error('Failed to add skill')
    }
  }

  const handleDeleteSkill = async (skillLinkId: string) => {
    try {
      await deleteSkillMutation.mutateAsync(skillLinkId)
      toast.success('Skill removed')
    } catch {
      toast.error('Failed to remove skill')
    }
  }

  const handleUpdateSkill = async (skillLinkId: string, nextProficiency: ProficiencyLevel) => {
    try {
      await updateSkillMutation.mutateAsync({
        skillLinkId,
        data: { proficiency: nextProficiency }
      })
      toast.success('Skill updated')
    } catch {
      toast.error('Failed to update skill')
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Skills</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-1 size-4" />
          Add Skill
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.length === 0 ? (
            <p className="text-muted-foreground text-sm">No skills added yet.</p>
          ) : (
            skills.map((skillLink) => (
              <Badge
                key={skillLink.id}
                variant="secondary"
                className="group flex items-center gap-2 px-3 py-1"
              >
                <span>{skillLink.skill.name}</span>
                <Select
                  value={skillLink.proficiency}
                  onValueChange={(value) =>
                    handleUpdateSkill(skillLink.id, value as ProficiencyLevel)
                  }
                >
                  <SelectTrigger className="h-6 w-30 border-0 px-1 text-[10px] uppercase shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ProficiencyLevelList.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  onClick={() => handleDeleteSkill(skillLink.id)}
                  className="hover:text-destructive ml-1 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="size-3" />
                </button>
              </Badge>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogDescription>
              Add a new skill and specify your proficiency level.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="skillId">Skill ID</Label>
              <Input
                id="skillId"
                value={skillId}
                onChange={(e) => setSkillId(e.target.value)}
                placeholder="Existing skill UUID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency</Label>
              <Select
                value={proficiency}
                onValueChange={(value) => setProficiency(value as ProficiencyLevel)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {ProficiencyLevelList.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddSkill} disabled={addSkillMutation.isPending}>
              {addSkillMutation.isPending ? 'Adding...' : 'Add Skill'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ProfileSkills
