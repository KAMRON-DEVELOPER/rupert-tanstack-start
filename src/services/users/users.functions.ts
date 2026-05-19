import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/services/api.server'
import { toApiParams } from '@/services/api-params'
import type { ListResponse, MessageResponse, Pagination } from '@/types/types'
import type {
  FollowSchema,
  FollowUpdateRequest,
  ResumeRequest,
  ResumeSchema,
  ResumeSkillLinkSchema,
  ResumeUpdateRequest,
  SessionSchema,
  SkillLinkRequest,
  SkillLinkUpdateRequest,
  UserSkillLinkSchema,
  WorkExperienceRequest,
  WorkExperienceSchema,
  WorkExperienceUpdateRequest
} from '@/types/user'

export const getSessionsFn = createServerFn().handler(async () => {
  const api = createServerApi()
  return api<SessionSchema[]>('users/sessions')
})

export const revokeSessionFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data: { sessionId } }) => {
    const api = createServerApi()
    return api<MessageResponse>(`users/sessions/${sessionId}`, {
      method: 'DELETE'
    })
  })

export const revokeSessionsFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { includeCurrent?: boolean }) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()
    return api<MessageResponse>('users/sessions', {
      method: 'DELETE',
      params: toApiParams(data)
    })
  })

export const getUserSkillsFn = createServerFn().handler(async () => {
  const api = createServerApi()
  return api<UserSkillLinkSchema[]>('users/skills')
})

export const addUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: SkillLinkRequest) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()
    return api<UserSkillLinkSchema>('users/skills', { method: 'POST', data })
  })

export const updateUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { skillLinkId: string; data: SkillLinkUpdateRequest }) => data
  )
  .handler(async ({ data: { skillLinkId, data } }) => {
    const api = createServerApi()
    return api<UserSkillLinkSchema>(`users/skills/${skillLinkId}`, {
      method: 'PATCH',
      data
    })
  })

export const deleteUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { skillLinkId: string }) => data)
  .handler(async ({ data: { skillLinkId } }) => {
    const api = createServerApi()
    return api<MessageResponse>(`users/skills/${skillLinkId}`, {
      method: 'DELETE'
    })
  })

export const getResumesFn = createServerFn().handler(async () => {
  const api = createServerApi()
  return api<ResumeSchema[]>('users/resumes')
})

export const createResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data: ResumeRequest) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()
    return api<ResumeSchema>('users/resumes', { method: 'POST', data })
  })

export const getResumeFn = createServerFn()
  .inputValidator((data: { resumeId: string }) => data)
  .handler(async ({ data: { resumeId } }) => {
    const api = createServerApi()
    return api<ResumeSchema>(`users/resumes/${resumeId}`)
  })

export const updateResumeFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { resumeId: string; data: ResumeUpdateRequest }) => data
  )
  .handler(async ({ data: { resumeId, data } }) => {
    const api = createServerApi()
    return api<ResumeSchema>(`users/resumes/${resumeId}`, {
      method: 'PATCH',
      data
    })
  })

export const deleteResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { resumeId: string }) => data)
  .handler(async ({ data: { resumeId } }) => {
    const api = createServerApi()
    return api<MessageResponse>(`users/resumes/${resumeId}`, {
      method: 'DELETE'
    })
  })

export const addResumeSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { resumeId: string; data: SkillLinkRequest }) => data)
  .handler(async ({ data: { resumeId, data } }) => {
    const api = createServerApi()
    return api<ResumeSkillLinkSchema>(`users/resumes/${resumeId}/skills`, {
      method: 'POST',
      data
    })
  })

export const updateResumeSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      resumeId: string
      skillLinkId: string
      data: SkillLinkUpdateRequest
    }) => data
  )
  .handler(async ({ data: { resumeId, skillLinkId, data } }) => {
    const api = createServerApi()
    return api<ResumeSkillLinkSchema>(
      `users/resumes/${resumeId}/skills/${skillLinkId}`,
      {
        method: 'PATCH',
        data
      }
    )
  })

export const deleteResumeSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { resumeId: string; skillLinkId: string }) => data)
  .handler(async ({ data: { resumeId, skillLinkId } }) => {
    const api = createServerApi()
    return api<MessageResponse>(
      `users/resumes/${resumeId}/skills/${skillLinkId}`,
      {
        method: 'DELETE'
      }
    )
  })

export const getWorkExperiencesFn = createServerFn().handler(async () => {
  const api = createServerApi()
  return api<WorkExperienceSchema[]>('users/work-experiences')
})

export const createWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data: WorkExperienceRequest) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()
    return api<WorkExperienceSchema>('users/work-experiences', {
      method: 'POST',
      data
    })
  })

export const updateWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { workExperienceId: string; data: WorkExperienceUpdateRequest }) =>
      data
  )
  .handler(async ({ data: { workExperienceId, data } }) => {
    const api = createServerApi()
    return api<WorkExperienceSchema>(
      `users/work-experiences/${workExperienceId}`,
      {
        method: 'PATCH',
        data
      }
    )
  })

export const deleteWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { workExperienceId: string }) => data)
  .handler(async ({ data: { workExperienceId } }) => {
    const api = createServerApi()
    return api<MessageResponse>(`users/work-experiences/${workExperienceId}`, {
      method: 'DELETE'
    })
  })

export const followUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { followingId: string }) => data)
  .handler(async ({ data: { followingId } }) => {
    const api = createServerApi()
    return api<FollowSchema>(`users/${followingId}/follow`, {
      method: 'POST'
    })
  })

export const unfollowUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { followingId: string }) => data)
  .handler(async ({ data: { followingId } }) => {
    const api = createServerApi()
    return api<MessageResponse>(`users/${followingId}/follow`, {
      method: 'DELETE'
    })
  })

export const getFollowersFn = createServerFn()
  .inputValidator((data: Partial<Pagination>) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    return api<ListResponse<FollowSchema>>('users/followers', {
      params: toApiParams(params)
    })
  })

export const getFollowingFn = createServerFn()
  .inputValidator((data: Partial<Pagination>) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    return api<ListResponse<FollowSchema>>('users/following', {
      params: toApiParams(params)
    })
  })

export const getFollowRequestsFn = createServerFn()
  .inputValidator((data: Partial<Pagination>) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    return api<ListResponse<FollowSchema>>('users/follow-requests', {
      params: toApiParams(params)
    })
  })

export const updateFollowRequestFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { followId: string; data: FollowUpdateRequest }) => data
  )
  .handler(async ({ data: { followId, data } }) => {
    const api = createServerApi()
    return api<FollowSchema>(`users/follow-requests/${followId}`, {
      method: 'PATCH',
      data
    })
  })
