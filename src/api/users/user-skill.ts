import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  createUserSkillFn,
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
    mutationFn: (data: SkillLinkCreateRequest) => createUserSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-skills'] })
    }
  })
}

export const useUpdateUserSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SkillLinkUpdateRequest & { skillLinkId: string }) =>
      updateUserSkillFn({ data }),
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
