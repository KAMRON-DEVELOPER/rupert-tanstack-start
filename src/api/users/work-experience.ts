import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  createWorkExperienceFn,
  deleteWorkExperienceFn,
  getWorkExperiencesFn,
  updateWorkExperienceFn
} from './work-experience.function'
import {
  WorkExperienceCreateRequest,
  WorkExperienceUpdateRequest
} from '@/types/users/work-experience'

export const useGetWorkExperiencesQueryOptions = () =>
  queryOptions({
    queryKey: ['work-experiences'],
    queryFn: () => getWorkExperiencesFn(),
    staleTime: 30_000
  })

export const useCreateWorkExperienceMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: WorkExperienceCreateRequest) =>
      createWorkExperienceFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['work-experiences'] })
    }
  })
}

export const useUpdateWorkExperienceMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      workExperienceId,
      data
    }: {
      workExperienceId: string
      data: WorkExperienceUpdateRequest
    }) => updateWorkExperienceFn({ data: { workExperienceId, data } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['work-experiences'] })
    }
  })
}

export const useDeleteWorkExperienceMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (workExperienceId: string) =>
      deleteWorkExperienceFn({ data: { workExperienceId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['work-experiences'] })
    }
  })
}
