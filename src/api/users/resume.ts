import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  createResumeFn,
  deleteResumeFn,
  getResumeFn,
  getResumesFn,
  updateResumeFn
} from './resume.function'
import { ResumeCreateRequest, ResumeUpdateRequest } from '@/types/users/resume'

export const useGetResumesQueryOptions = (data?: {
  offset?: number
  limit?: number
}) =>
  queryOptions({
    queryKey: ['resumes', data],
    queryFn: () => getResumesFn({ data: data as any }),
    staleTime: 30_000
  })

export const useGetResumeQueryOptions = (data: { resumeId: string }) =>
  queryOptions({
    queryKey: ['resumes', data],
    queryFn: () => getResumeFn({ data }),
    staleTime: 30_000
  })

export const useCreateResumeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ResumeCreateRequest) => createResumeFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    }
  })
}

export const useUpdateResumeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      resumeId,
      data
    }: {
      resumeId: string
      data: ResumeUpdateRequest
    }) => updateResumeFn({ data: { resumeId, ...data } }),
    onSuccess: (resume) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
      queryClient.invalidateQueries({
        queryKey: ['resumes', { resumeId: resume.id }]
      })
    }
  })
}

export const useDeleteResumeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (resumeId: string) => deleteResumeFn({ data: { resumeId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    }
  })
}
