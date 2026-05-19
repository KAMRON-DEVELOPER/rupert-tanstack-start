import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import type { Pagination } from '@/types/types'
import type {
  FollowUpdateRequest,
  ResumeRequest,
  ResumeUpdateRequest,
  SkillLinkRequest,
  SkillLinkUpdateRequest,
  WorkExperienceRequest,
  WorkExperienceUpdateRequest
} from '@/types/user'
import {
  addResumeSkillFn,
  addUserSkillFn,
  createResumeFn,
  createWorkExperienceFn,
  deleteResumeFn,
  deleteResumeSkillFn,
  deleteUserSkillFn,
  deleteWorkExperienceFn,
  followUserFn,
  getFollowersFn,
  getFollowingFn,
  getFollowRequestsFn,
  getResumeFn,
  getResumesFn,
  getSessionsFn,
  getUserSkillsFn,
  getWorkExperiencesFn,
  revokeSessionFn,
  revokeSessionsFn,
  unfollowUserFn,
  updateFollowRequestFn,
  updateResumeFn,
  updateResumeSkillFn,
  updateUserSkillFn,
  updateWorkExperienceFn
} from './users.functions'

export const useGetSessionsQueryOptions = () =>
  queryOptions({
    queryKey: ['sessions'],
    queryFn: () => getSessionsFn()
  })

export const useGetUserSkillsQueryOptions = () =>
  queryOptions({
    queryKey: ['user-skills'],
    queryFn: () => getUserSkillsFn()
  })

export const useGetResumesQueryOptions = () =>
  queryOptions({
    queryKey: ['resumes'],
    queryFn: () => getResumesFn()
  })

export const useGetResumeQueryOptions = (data: { resumeId: string }) =>
  queryOptions({
    queryKey: ['resumes', data],
    queryFn: () => getResumeFn({ data })
  })

export const useGetWorkExperiencesQueryOptions = () =>
  queryOptions({
    queryKey: ['work-experiences'],
    queryFn: () => getWorkExperiencesFn()
  })

export const useGetFollowersQueryOptions = (data: Partial<Pagination>) =>
  queryOptions({
    queryKey: ['followers', data],
    queryFn: () => getFollowersFn({ data })
  })

export const useGetFollowingQueryOptions = (data: Partial<Pagination>) =>
  queryOptions({
    queryKey: ['following', data],
    queryFn: () => getFollowingFn({ data })
  })

export const useGetFollowRequestsQueryOptions = (data: Partial<Pagination>) =>
  queryOptions({
    queryKey: ['follow-requests', data],
    queryFn: () => getFollowRequestsFn({ data })
  })

export const useRevokeSessionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sessionId: string) => revokeSessionFn({ data: { sessionId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    }
  })
}

export const useRevokeSessionsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { includeCurrent?: boolean }) =>
      revokeSessionsFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    }
  })
}

export const useAddUserSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SkillLinkRequest) => addUserSkillFn({ data }),
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
    }) => updateUserSkillFn({ data: { skillLinkId, data } }),
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

export const useCreateResumeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ResumeRequest) => createResumeFn({ data }),
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
    }) => updateResumeFn({ data: { resumeId, data } }),
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

export const useAddResumeSkillMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      resumeId,
      data
    }: {
      resumeId: string
      data: SkillLinkRequest
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
    }) => updateResumeSkillFn({ data: { resumeId, skillLinkId, data } }),
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

export const useCreateWorkExperienceMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: WorkExperienceRequest) =>
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

export const useFollowUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (followingId: string) =>
      followUserFn({ data: { followingId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] })
      queryClient.invalidateQueries({ queryKey: ['following'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}

export const useUnfollowUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (followingId: string) =>
      unfollowUserFn({ data: { followingId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] })
      queryClient.invalidateQueries({ queryKey: ['following'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}

export const useUpdateFollowRequestMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      followId,
      data
    }: {
      followId: string
      data: FollowUpdateRequest
    }) => updateFollowRequestFn({ data: { followId, data } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-requests'] })
      queryClient.invalidateQueries({ queryKey: ['followers'] })
    }
  })
}
