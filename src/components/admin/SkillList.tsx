import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Lock } from 'lucide-react'
import type { SkillSchema } from '@/types/skill.schema'
import { AdminSkillSchema, type AdminSkill } from '@/types/admin.schema'

type SkillListProps = {
  skills: SkillSchema[]
  onEdit: (skill: AdminSkill) => void
}

const isEditableSkill = (skill: SkillSchema): skill is AdminSkill =>
  AdminSkillSchema.safeParse(skill).success

export function SkillList({ skills, onEdit }: SkillListProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => {
        const canEdit = isEditableSkill(skill)

        return (
          <Card key={skill.name}>
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <span className="font-medium">{skill.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => canEdit && onEdit(skill)}
                disabled={!canEdit}
                title={canEdit ? 'Edit skill' : 'Skill id is not returned by the list API'}
              >
                {canEdit ? <Edit className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
