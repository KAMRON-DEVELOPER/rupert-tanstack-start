import { createServerFn } from '@tanstack/react-start'
import { userSearchResponseSchema } from '@/types/chats/chat'
import type { UserSearchResponse } from '@/types/chats/chat'
import type {
  ListResponse,
  MessageResponse,
  Pagination
} from '@/types/shared/types'
import type {
  FollowSchema,
  FollowUpdateRequest,
  ResumeRequest,
  ResumeUpdateRequest,
  SkillLinkRequest,
  SkillLinkUpdateRequest,
  WorkExperienceRequest,
  WorkExperienceUpdateRequest
} from '@/types/users/user'
import { createServerApi } from '../api.server'
import {
  followResponseSchema,
  resumeResponseSchema,
  resumeSkillLinkResponseSchema,
  sessionResponseSchema,
  userSkillLinkResponseSchema,
  workExperienceResponseSchema
} from '@/types/users/user.schema'

export const getSessionsFn = createServerFn().handler(async () => {
  const axios = createServerApi()
  const data = await axios('users/sessions')
  const result = sessionResponseSchema.array().safeParse(data)
  if (!result.success) {
    console.error(
      '[sessionResponseSchema] parse failed:',
      result.error.flatten()
    )
    throw new Error(
      '[sessionResponseSchema] Unexpected response shape from backend'
    )
  }
  return result.data
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
  const data = await axios('users/skills')
  const result = userSkillLinkResponseSchema.array().safeParse(data)
  if (!result.success) {
    console.error(
      '[userSkillLinkResponseSchema] parse failed:',
      result.error.flatten()
    )
    throw new Error(
      '[userSkillLinkResponseSchema] Unexpected response shape from backend'
    )
  }
  return result.data
})

export const addUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: SkillLinkRequest) => data)
  .handler(async ({ data }) => {
    const axios = createServerApi()
    const responseData = await axios('users/skills', { method: 'POST', data })
    const result = userSkillLinkResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[userSkillLinkResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[userSkillLinkResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const updateUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { skillLinkId: string; data: SkillLinkUpdateRequest }) => data
  )
  .handler(async ({ data: { skillLinkId, data } }) => {
    const axios = createServerApi()
    const responseData = await axios(`users/skills/${skillLinkId}`, {
      method: 'PATCH',
      data
    })
    const result = userSkillLinkResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[userSkillLinkResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[userSkillLinkResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
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
  const data = await axios('users/resumes')
  const result = resumeResponseSchema.array().safeParse(data)
  if (!result.success) {
    console.error(
      '[resumeResponseSchema] parse failed:',
      result.error.flatten()
    )
    throw new Error(
      '[resumeResponseSchema] Unexpected response shape from backend'
    )
  }
  return result.data
})

export const createResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data: ResumeRequest) => data)
  .handler(async ({ data }) => {
    const axios = createServerApi()
    const responseData = await axios('users/resumes', { method: 'POST', data })
    const result = resumeResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[resumeResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[resumeResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const getResumeFn = createServerFn()
  .inputValidator((data: { resumeId: string }) => data)
  .handler(async ({ data: { resumeId } }) => {
    const axios = createServerApi()
    const data = await axios(`users/resumes/${resumeId}`)
    const result = resumeResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[resumeResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[resumeResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const updateResumeFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { resumeId: string; data: ResumeUpdateRequest }) => data
  )
  .handler(async ({ data: { resumeId, data } }) => {
    const axios = createServerApi()
    const responseData = await axios(`users/resumes/${resumeId}`, {
      method: 'PATCH',
      data
    })
    const result = resumeResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[resumeResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[resumeResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
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
    const responseData = await axios(`users/resumes/${resumeId}/skills`, {
      method: 'POST',
      data
    })
    const result = resumeSkillLinkResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[resumeSkillLinkResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[resumeSkillLinkResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
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
    const responseData = await axios(
      `users/resumes/${resumeId}/skills/${skillLinkId}`,
      {
        method: 'PATCH',
        data
      }
    )
    const result = resumeSkillLinkResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[resumeSkillLinkResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[resumeSkillLinkResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
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
  const data = await axios('users/work-experiences')
  const result = workExperienceResponseSchema.array().safeParse(data)
  if (!result.success) {
    console.error(
      '[workExperienceResponseSchema] parse failed:',
      result.error.flatten()
    )
    throw new Error(
      '[workExperienceResponseSchema] Unexpected response shape from backend'
    )
  }
  return result.data
})

export const createWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data: WorkExperienceRequest) => data)
  .handler(async ({ data }) => {
    const axios = createServerApi()
    const responseData = await axios('users/work-experiences', {
      method: 'POST',
      data
    })
    const result = workExperienceResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[workExperienceResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[workExperienceResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const updateWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { workExperienceId: string; data: WorkExperienceUpdateRequest }) =>
      data
  )
  .handler(async ({ data: { workExperienceId, data } }) => {
    const axios = createServerApi()
    const responseData = await axios(
      `users/work-experiences/${workExperienceId}`,
      {
        method: 'PATCH',
        data
      }
    )
    const result = workExperienceResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[workExperienceResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[workExperienceResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
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
    const data = await axios(`users/${followingId}/follow`, {
      method: 'POST'
    })
    const result = followResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
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
    const data = await axios('users/followers', { params })
    const result = followResponseSchema
      .array()
      .safeParse((data as ListResponse<FollowSchema>).data ?? data)
    // If data is already paginated, return as-is with parse
    const listResult =
      typeof data === 'object' && data !== null && 'data' in data
        ? (data as { data: unknown[]; total: number })
        : { data: [data], total: 1 }
    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }
    return {
      data: result.data,
      total: listResult.total
    } as ListResponse<FollowSchema>
  })

export const getFollowingFn = createServerFn()
  .inputValidator((data: Partial<Pagination>) => data)
  .handler(async ({ data: params }) => {
    const axios = createServerApi()
    const data = await axios('users/following', { params })
    const listResult = data as { data: unknown[]; total: number }
    const result = followResponseSchema.array().safeParse(listResult.data)
    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }
    return {
      data: result.data,
      total: listResult.total
    } as ListResponse<FollowSchema>
  })

export const getFollowRequestsFn = createServerFn()
  .inputValidator((data: Partial<Pagination>) => data)
  .handler(async ({ data: params }) => {
    const axios = createServerApi()
    const data = await axios('users/follow-requests', { params })
    const listResult = data as { data: unknown[]; total: number }
    const result = followResponseSchema.array().safeParse(listResult.data)
    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }
    return {
      data: result.data,
      total: listResult.total
    } as ListResponse<FollowSchema>
  })

export const updateFollowRequestFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { followId: string; data: FollowUpdateRequest }) => data
  )
  .handler(async ({ data: { followId, data } }) => {
    const axios = createServerApi()
    const responseData = await axios(`users/follow-requests/${followId}`, {
      method: 'PATCH',
      data
    })
    const result = followResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
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
    const result = userSearchResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[userSearchResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[userSearchResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data satisfies UserSearchResponse
  })
