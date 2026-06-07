import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import type { SkillSchema } from '@/types/skills/skill.schema'
import { AdminSkillSchema, type AdminSkill } from '@/types/admin/admin.schema'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

type SkillListProps = {
  skills: SkillSchema[]
  onRename: (skill: AdminSkill, newName: string) => void
  onDelete: (skill: AdminSkill) => void
}

const isEditableSkill = (skill: SkillSchema): skill is AdminSkill =>
  AdminSkillSchema.safeParse(skill).success

export function SkillList({ skills, onRename, onDelete }: SkillListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const startRename = (skill: AdminSkill) => {
    setEditingId(skill.id)
    setEditValue(skill.name)
  }

  const cancelRename = () => {
    setEditingId(null)
    setEditValue('')
  }

  const submitRename = (skill: AdminSkill) => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== skill.name) {
      onRename(skill, trimmed)
    }
    setEditingId(null)
    setEditValue('')
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const canEdit = isEditableSkill(skill)
        const isRenaming = canEdit && editingId === skill.id

        if (isRenaming) {
          return (
            <div key={skill.name} className="flex items-center gap-1">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitRename(skill)
                  if (e.key === 'Escape') cancelRename()
                }}
                autoFocus
                className="h-6 w-32 text-xs"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => submitRename(skill)}
                disabled={!editValue.trim()}
              >
                <Check className="h-3 w-3 text-green-600" />
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={cancelRename}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )
        }

        return (
          <Badge
            key={skill.name}
            variant="secondary"
            className="group flex items-center gap-1.5 px-2.5 py-1 text-sm"
          >
            <span>{skill.name}</span>
            {canEdit && (
              <>
                <button
                  onClick={() => startRename(skill)}
                  className="hover:text-foreground ml-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                  title="Rename skill"
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="hover:text-destructive ml-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                      title="Delete skill"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Skill</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{skill.name}&quot;? This action cannot
                        be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction variant="destructive" onClick={() => onDelete(skill)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </Badge>
        )
      })}
    </div>
  )
}
