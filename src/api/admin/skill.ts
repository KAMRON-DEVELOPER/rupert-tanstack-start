import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSkillFn, deleteSkillFn, updateSkillFn } from './skill.functions'
import { SkillRequest } from '@/types/shared/skill'

export const useCreateSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SkillRequest) => createSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    }
  })
}

export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SkillRequest & { skillId: string }) =>
      updateSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    }
  })
}

export const useDeleteSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { skillId: string }) => deleteSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    }
  })
}
