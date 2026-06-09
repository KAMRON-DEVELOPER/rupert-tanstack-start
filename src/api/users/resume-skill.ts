import {
  SkillLinkCreateRequest,
  SkillLinkUpdateRequest
} from '@/types/shared/skill'
import {
  addResumeSkillFn,
  deleteResumeSkillFn,
  updateResumeSkillFn
} from './resume-skill.function'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddResumeSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      resumeId,
      data
    }: {
      resumeId: string
      data: SkillLinkCreateRequest
    }) => addResumeSkillFn({ data: { resumeId, data } }),
    onSuccess: (_, { resumeId }) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes', { resumeId }] })
    }
  })
}

export const useUpdateResumeSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      resumeId,
      skillLinkId,
      data
    }: {
      resumeId: string
      skillLinkId: string
      data: SkillLinkUpdateRequest
    }) => updateResumeSkillFn({ data: { resumeId, skillLinkId, ...data } }),
    onSuccess: (_, { resumeId }) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes', { resumeId }] })
    }
  })
}

export const useDeleteResumeSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      resumeId,
      skillLinkId
    }: {
      resumeId: string
      skillLinkId: string
    }) => deleteResumeSkillFn({ data: { resumeId, skillLinkId } }),
    onSuccess: (_, { resumeId }) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes', { resumeId }] })
    }
  })
}
