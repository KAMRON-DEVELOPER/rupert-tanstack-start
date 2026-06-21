import type { MessageResponse } from '@/types/shared/types'
import {
  ResumeCreateRequest,
  resumeResponseSchema,
  resumeUpdateRequestSchema
} from '@/types/users/resume'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { createServerApi } from '../api.server'
import { paginatedResponseSchema } from '@/types/shared/pagination'

export const getResumesFn = createServerFn().handler(async () => {
  const api = createServerApi()

  const data = await api('users/resumes')

  const result = paginatedResponseSchema(resumeResponseSchema).safeParse(data)

  if (!result.success) {
    console.error('[resumeResponseSchema] parse failed:', result.error.message)
    throw new Error(
      '[resumeResponseSchema] Unexpected response shape from backend'
    )
  }

  return result.data
})

export const createResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data: ResumeCreateRequest) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()

    const responseData = await api('users/resumes', { method: 'POST', data })

    const result = resumeResponseSchema.safeParse(responseData)

    if (!result.success) {
      console.error(
        '[resumeResponseSchema] parse failed:',
        result.error.message
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
    const api = createServerApi()

    const data = await api(`users/resumes/${resumeId}`)

    const result = resumeResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(
        '[resumeResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[resumeResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const updateResumeFn = createServerFn({ method: 'POST' })
  .inputValidator(resumeUpdateRequestSchema.extend({ resumeId: z.uuid() }))
  .handler(async ({ data: { resumeId, ...data } }) => {
    const api = createServerApi()

    const responseData = await api(`users/resumes/${resumeId}`, {
      method: 'PATCH',
      data
    })

    const result = resumeResponseSchema.safeParse(responseData)

    if (!result.success) {
      console.error(
        '[resumeResponseSchema] parse failed:',
        result.error.message
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
    const api = createServerApi()

    return api<MessageResponse>(`users/resumes/${resumeId}`, {
      method: 'DELETE'
    })
  })
