import { createServerFn } from '@tanstack/react-start'
import { userSearchResponseSchema } from '@/types/chats.schema'
import type { UserSearchResponse } from '@/types/chats.schema'
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
import { createServerApi } from '../api.server'

export const getSessionsFn = createServerFn().handler(async () => {
  const axios = createServerApi()
  return axios<SessionSchema[]>('users/sessions', { method: 'PATCH' })
})

export const revokeSessionFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data: { sessionId } }) => {
    const axios = createServerApi()
    return axios<MessageResponse>(`users/sessions/${sessionId}`, {
      method: 'DELETE'
    })
  })

export const revokeSessionsFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { include_current?: boolean }) => data)
  .handler(async ({ data: params }) => {
    const axios = createServerApi()
    return axios<MessageResponse>('users/sessions', {
      method: 'DELETE',
      params
    })
  })

export const getUserSkillsFn = createServerFn().handler(async () => {
  const axios = createServerApi()
  return axios<UserSkillLinkSchema[]>('users/skills')
})

export const addUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: SkillLinkRequest) => data)
  .handler(async ({ data }) => {
    const axios = createServerApi()
    return axios<UserSkillLinkSchema>('users/skills', { method: 'POST', data })
  })

export const updateUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { skillLinkId: string; data: SkillLinkUpdateRequest }) => data
  )
  .handler(async ({ data: { skillLinkId, data } }) => {
    const axios = createServerApi()
    return axios<UserSkillLinkSchema>(`users/skills/${skillLinkId}`, {
      method: 'PATCH',
      data
    })
  })

export const deleteUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { skillLinkId: string }) => data)
  .handler(async ({ data: { skillLinkId } }) => {
    const axios = createServerApi()
    return axios<MessageResponse>(`users/skills/${skillLinkId}`, {
      method: 'DELETE'
    })
  })

export const getResumesFn = createServerFn().handler(async () => {
  const axios = createServerApi()
  return axios<ResumeSchema[]>('users/resumes')
})

export const createResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data: ResumeRequest) => data)
  .handler(async ({ data }) => {
    const axios = createServerApi()
    return axios<ResumeSchema>('users/resumes', { method: 'POST', data })
  })

export const getResumeFn = createServerFn()
  .inputValidator((data: { resumeId: string }) => data)
  .handler(async ({ data: { resumeId } }) => {
    const axios = createServerApi()
    return axios<ResumeSchema>(`users/resumes/${resumeId}`)
  })

export const updateResumeFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { resumeId: string; data: ResumeUpdateRequest }) => data
  )
  .handler(async ({ data: { resumeId, data } }) => {
    const axios = createServerApi()
    return axios<ResumeSchema>(`users/resumes/${resumeId}`, {
      method: 'PATCH',
      data
    })
  })

export const deleteResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { resumeId: string }) => data)
  .handler(async ({ data: { resumeId } }) => {
    const axios = createServerApi()
    return axios<MessageResponse>(`users/resumes/${resumeId}`, {
      method: 'DELETE'
    })
  })

export const addResumeSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { resumeId: string; data: SkillLinkRequest }) => data)
  .handler(async ({ data: { resumeId, data } }) => {
    const axios = createServerApi()
    return axios<ResumeSkillLinkSchema>(`users/resumes/${resumeId}/skills`, {
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
    const axios = createServerApi()
    return axios<ResumeSkillLinkSchema>(
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
    const axios = createServerApi()
    return axios<MessageResponse>(
      `users/resumes/${resumeId}/skills/${skillLinkId}`,
      {
        method: 'DELETE'
      }
    )
  })

export const getWorkExperiencesFn = createServerFn().handler(async () => {
  const axios = createServerApi()
  return axios<WorkExperienceSchema[]>('users/work-experiences')
})

export const createWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data: WorkExperienceRequest) => data)
  .handler(async ({ data }) => {
    const axios = createServerApi()
    return axios<WorkExperienceSchema>('users/work-experiences', {
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
    const axios = createServerApi()
    return axios<WorkExperienceSchema>(
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
    const axios = createServerApi()
    return axios<MessageResponse>(
      `users/work-experiences/${workExperienceId}`,
      {
        method: 'DELETE'
      }
    )
  })

export const followUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { followingId: string }) => data)
  .handler(async ({ data: { followingId } }) => {
    const axios = createServerApi()
    return axios<FollowSchema>(`users/${followingId}/follow`, {
      method: 'POST'
    })
  })

export const unfollowUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { followingId: string }) => data)
  .handler(async ({ data: { followingId } }) => {
    const axios = createServerApi()
    return axios<MessageResponse>(`users/${followingId}/follow`, {
      method: 'DELETE'
    })
  })

export const getFollowersFn = createServerFn()
  .inputValidator((data: Partial<Pagination>) => data)
  .handler(async ({ data: params }) => {
    const axios = createServerApi()
    return axios<ListResponse<FollowSchema>>('users/followers', {
      params
    })
  })

export const getFollowingFn = createServerFn()
  .inputValidator((data: Partial<Pagination>) => data)
  .handler(async ({ data: params }) => {
    const axios = createServerApi()
    return axios<ListResponse<FollowSchema>>('users/following', {
      params
    })
  })

export const getFollowRequestsFn = createServerFn()
  .inputValidator((data: Partial<Pagination>) => data)
  .handler(async ({ data: params }) => {
    const axios = createServerApi()
    return axios<ListResponse<FollowSchema>>('users/follow-requests', {
      params
    })
  })

export const updateFollowRequestFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { followId: string; data: FollowUpdateRequest }) => data
  )
  .handler(async ({ data: { followId, data } }) => {
    const axios = createServerApi()
    return axios<FollowSchema>(`users/follow-requests/${followId}`, {
      method: 'PATCH',
      data
    })
  })

export const searchUsersFn = createServerFn()
  .inputValidator(
    (data: { q: string; offset?: number; limit?: number }) => data
  )
  .handler(async ({ data: { q, ...params } }) => {
    const axios = createServerApi()
    const data = await axios('users/search', {
      params
    })
    return userSearchResponseSchema.parse(data) satisfies UserSearchResponse
  })
