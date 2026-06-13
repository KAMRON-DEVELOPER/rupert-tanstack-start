import {
  SkillLinkCreateRequest,
  SkillLinkUpdateRequest
} from '@/types/shared/skill'
import {
  createResumeSkillFn,
  deleteResumeSkillFn,
  updateResumeSkillFn
} from './resume-skill.function'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateResumesSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      resumeId,
      ...data
    }: SkillLinkCreateRequest & { resumeId: string }) =>
      createResumeSkillFn({ data: { resumeId, ...data } }),
    onSuccess: (_, { resumeId }) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes', { resumeId }] })
    }
  })
}

export const useUpdateResumesSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      resumeId,
      skillLinkId,
      ...data
    }: SkillLinkUpdateRequest & { resumeId: string; skillLinkId: string }) =>
      updateResumeSkillFn({ data: { resumeId, skillLinkId, ...data } }),
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
