import { useQuery } from '@tanstack/react-query'
import { useGetSkillsQueryOptions } from '@/services/skills/skills'
import { useCreateSkillMutation, useUpdateSkillMutation } from '@/services/admin/admin'
import { SkillList } from '@/components/admin/SkillList'
import { SkillForm } from '@/components/admin/SkillForm'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { AdminSkill, SkillRequest } from '@/types/admin.schema'
import { getErrorMessage } from '@/types/helper'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

const showMutationError = (error: Error, fallback: string) => {
  const message = isAxiosError(error) ? getErrorMessage(error.response?.data, fallback) : fallback

  toast.error(message)
}

export function AdminSkillsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<AdminSkill | null>(null)

  const { data: skills, isLoading } = useQuery(useGetSkillsQueryOptions())
  const createSkillMutation = useCreateSkillMutation()
  const updateSkillMutation = useUpdateSkillMutation()

  const handleCreate = (data: SkillRequest) => {
    createSkillMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateOpen(false)
        toast.success('Skill created')
      },
      onError: (error) => showMutationError(error, 'Failed to create skill')
    })
  }

  const handleUpdate = (data: SkillRequest) => {
    if (!editingSkill) return

    updateSkillMutation.mutate(
      { skillId: editingSkill.id, data },
      {
        onSuccess: () => {
          setEditingSkill(null)
          toast.success('Skill updated')
        },
        onError: (error) => showMutationError(error, 'Failed to update skill')
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
        <SkillList skills={skills || []} onEdit={(skill) => setEditingSkill(skill)} />
      )}

      {isCreateOpen && (
        <SkillForm
          title="Add New Skill"
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
          isLoading={createSkillMutation.isPending}
        />
      )}

      {editingSkill && (
        <SkillForm
          title="Edit Skill"
          initialData={{ name: editingSkill.name }}
          onSubmit={handleUpdate}
          onCancel={() => setEditingSkill(null)}
          isLoading={updateSkillMutation.isPending}
        />
      )}
    </div>
  )
}
