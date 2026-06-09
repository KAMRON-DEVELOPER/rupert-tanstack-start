import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  addUserSkillFn,
  deleteUserSkillFn,
  getUserSkillsFn,
  updateUserSkillFn
} from './user-skill.function'
import {
  SkillLinkCreateRequest,
  SkillLinkUpdateRequest
} from '@/types/shared/skill'

export const useGetUserSkillsQueryOptions = () =>
  queryOptions({
    queryKey: ['user-skills'],
    queryFn: () => getUserSkillsFn()
  })

export const useAddUserSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SkillLinkCreateRequest) => addUserSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-skills'] })
    }
  })
}

export const useUpdateUserSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      skillLinkId,
      data
    }: {
      skillLinkId: string
      data: SkillLinkUpdateRequest
    }) => updateUserSkillFn({ data: { skillLinkId, ...data } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-skills'] })
    }
  })
}

export const useDeleteUserSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (skillLinkId: string) =>
      deleteUserSkillFn({ data: { skillLinkId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-skills'] })
    }
  })
}
