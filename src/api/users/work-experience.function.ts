import type { MessageResponse } from '@/types/shared/types'
import {
  WorkExperienceCreateRequest,
  workExperienceResponseSchema,
  WorkExperienceUpdateRequest
} from '@/types/users/work-experience'
import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '../api.server'

export const getWorkExperiencesFn = createServerFn().handler(async () => {
  const api = createServerApi()

  const data = await api('users/work-experiences')

  const result = workExperienceResponseSchema.array().safeParse(data)

  if (!result.success) {
    console.error(
      '[workExperienceResponseSchema] parse failed:',
      result.error.message
    )
    throw new Error(
      '[workExperienceResponseSchema] Unexpected response shape from backend'
    )
  }

  return result.data
})

export const createWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data: WorkExperienceCreateRequest) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()

    const responseData = await api('users/work-experiences', {
      method: 'POST',
      data
    })

    const result = workExperienceResponseSchema.safeParse(responseData)

    if (!result.success) {
      console.error(
        '[workExperienceResponseSchema] parse failed:',
        result.error.message
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
    const api = createServerApi()

    const responseData = await api(
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
        result.error.message
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
    const api = createServerApi()
    return api<MessageResponse>(`users/work-experiences/${workExperienceId}`, {
      method: 'DELETE'
    })
  })
