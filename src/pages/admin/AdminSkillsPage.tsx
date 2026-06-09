import { useQuery } from '@tanstack/react-query'
import { useGetSkillsQueryOptions } from '@/api/skills/skills'
import {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation
} from '@/api/admin/city'
import { SkillList } from '@/components/admin/SkillList'
import { SkillForm } from '@/components/admin/SkillForm'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { AdminSkill, SkillRequest } from '@/types/admin/admin'
import { getErrorMessage } from '@/types/shared/helper'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

const showMutationError = (error: Error, fallback: string) => {
  const message = isAxiosError(error) ? getErrorMessage(error.response?.data, fallback) : fallback

  toast.error(message)
}

export function AdminSkillsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data: skills, isLoading } = useQuery(useGetSkillsQueryOptions())
  const createSkillMutation = useCreateSkillMutation()
  const updateSkillMutation = useUpdateSkillMutation()
  const deleteSkillMutation = useDeleteSkillMutation()

  const handleCreate = (data: SkillRequest) => {
    createSkillMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateOpen(false)
        toast.success('Skill created')
      },
      onError: (error) => showMutationError(error, 'Failed to create skill')
    })
  }

  const handleRename = (skill: AdminSkill, newName: string) => {
    updateSkillMutation.mutate(
      { skillId: skill.id, data: { name: newName } },
      {
        onSuccess: () => {
          toast.success('Skill renamed')
        },
        onError: (error) => showMutationError(error, 'Failed to rename skill')
      }
    )
  }

  const handleDelete = (skill: AdminSkill) => {
    deleteSkillMutation.mutate(
      { skillId: skill.id },
      {
        onSuccess: () => {
          toast.success('Skill deleted')
        },
        onError: (error) => showMutationError(error, 'Failed to delete skill')
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground">Manage platform skills.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground py-10 text-center text-sm">Loading skills...</div>
      ) : (
        <SkillList skills={skills?.data || []} onRename={handleRename} onDelete={handleDelete} />
      )}

      {isCreateOpen && (
        <SkillForm
          title="Add New Skill"
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
          isLoading={createSkillMutation.isPending}
        />
      )}
    </div>
  )
}
