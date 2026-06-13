import {
  skillLinkCreateRequestSchema,
  skillLinkResponseSchema,
  skillLinkUpdateRequestSchema
} from '@/types/shared/skill'
import type { MessageResponse } from '@/types/shared/types'
import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '../api.server'
import { uuid } from '@/types/shared/primitives'
import z from 'zod'
import { paginatedResponseSchema } from '@/types/shared/pagination'

export const getResumeSkillsFn = createServerFn()
  .inputValidator(z.object({ resumeId: uuid }))
  .handler(async ({ data: { resumeId } }) => {
    const api = createServerApi()

    const data = await api(`users/resumes/${resumeId}/skills`)

    const result = paginatedResponseSchema(skillLinkResponseSchema).safeParse(
      data
    )

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

export const createResumeSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillLinkCreateRequestSchema.extend({ resumeId: uuid }))
  .handler(async ({ data: { resumeId, ...data } }) => {
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
      resumeId: uuid,
      skillLinkId: uuid
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
  .inputValidator(z.object({ resumeId: uuid, skillLinkId: uuid }))
  .handler(async ({ data: { resumeId, skillLinkId } }) => {
    const api = createServerApi()

    return api<MessageResponse>(
      `users/resumes/${resumeId}/skills/${skillLinkId}`,
      {
        method: 'DELETE'
      }
    )
  })
