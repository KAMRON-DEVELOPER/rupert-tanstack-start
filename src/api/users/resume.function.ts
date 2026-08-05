import type { MessageResponse } from '@/types/shared/types'
import {
  resumeCreateRequestSchema,
  resumeResponseSchema,
  resumeUpdateRequestSchema
} from '@/types/users/resume'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { createServerApi } from '../api.server'
import {
  paginatedResponseSchema,
  paginationQuerySchema
} from '@/types/shared/pagination'
import { uuid } from '@/types/shared/primitives'
import { toApiParams } from '@/lib/to-api-params'

export const getResumesFn = createServerFn()
  .inputValidator(paginationQuerySchema.optional())
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('users/resumes', {
      params: params
        ? toApiParams(params as Record<string, unknown>)
        : undefined
    })

    const result = paginatedResponseSchema(resumeResponseSchema).safeParse(data)

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

export const createResumeFn = createServerFn({ method: 'POST' })
  .inputValidator(resumeCreateRequestSchema)
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
  .inputValidator(z.object({ resumeId: uuid }))
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
  .inputValidator(resumeUpdateRequestSchema.extend({ resumeId: uuid }))
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
  .inputValidator(z.object({ resumeId: uuid }))
  .handler(async ({ data: { resumeId } }) => {
    const api = createServerApi()

    return api<MessageResponse>(`users/resumes/${resumeId}`, {
      method: 'DELETE'
    })
  })
