import {
  SkillLinkCreateRequest,
  skillLinkResponseSchema,
  skillLinkUpdateRequestSchema
} from '@/types/shared/skill'
import type { MessageResponse } from '@/types/shared/types'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { createServerApi } from '../api.server'

export const getUserSkillsFn = createServerFn().handler(async () => {
  const api = createServerApi()

  const data = await api('users/skills')

  const result = skillLinkResponseSchema.array().safeParse(data)

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

export const addUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: SkillLinkCreateRequest) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()

    const responseData = await api('users/skills', { method: 'POST', data })

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

export const updateUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(
    skillLinkUpdateRequestSchema.extend({ skillLinkId: z.string() })
  )
  .handler(async ({ data: { skillLinkId, ...data } }) => {
    const api = createServerApi()

    const responseData = await api(`users/skills/${skillLinkId}`, {
      method: 'PATCH',
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

export const deleteUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { skillLinkId: string }) => data)
  .handler(async ({ data: { skillLinkId } }) => {
    const api = createServerApi()
    return api<MessageResponse>(`users/skills/${skillLinkId}`, {
      method: 'DELETE'
    })
  })
