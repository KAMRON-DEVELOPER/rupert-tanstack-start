import {
  SkillLinkCreateRequest,
  skillLinkResponseSchema,
  skillLinkUpdateRequestSchema
} from '@/types/shared/skill'
import type { MessageResponse } from '@/types/shared/types'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { createServerApi } from '../api.server'

export const addResumeSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { resumeId: string; data: SkillLinkCreateRequest }) => data
  )
  .handler(async ({ data: { resumeId, data } }) => {
    const api = createServerApi()

    const responseData = await api(`users/resumes/${resumeId}/skills`, {
      method: 'POST',
      data
    })

    const result = skillLinkResponseSchema.safeParse(responseData)

    if (!result.success) {
      console.error(
        '[skillLinkResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[skillLinkResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const updateResumeSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(
    skillLinkUpdateRequestSchema.extend({
      resumeId: z.uuid(),
      skillLinkId: z.uuid()
    })
  )
  .handler(async ({ data: { resumeId, skillLinkId, ...data } }) => {
    const api = createServerApi()

    const responseData = await api(
      `users/resumes/${resumeId}/skills/${skillLinkId}`,
      {
        method: 'PATCH',
        data
      }
    )

    const result = skillLinkResponseSchema.safeParse(responseData)

    if (!result.success) {
      console.error(
        '[skillLinkResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[skillLinkResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
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
