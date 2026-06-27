import { createServerApi } from '@/api/api.server'
import { uuid } from '@/types/shared/primitives'
import {
  applicationDetailResponseSchema,
  applicationListParamsSchema,
  applicationListResponseSchema,
  vacancyDetailResponseSchema,
  vacancyListParamsSchema,
  vacancyListResponseSchema
} from '@/types/vacancies/vacancy'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

export const getVacanciesFn = createServerFn()
  .inputValidator(vacancyListParamsSchema)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('vacancies/', { params })

    const result = vacancyListResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(
        '[vacancyListResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[vacancyListResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const getVacancyFn = createServerFn()
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data: { id } }) => {
    const api = createServerApi()

    const data = await api(`vacancies/${id}`)

    const result = vacancyDetailResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(
        '[vacancyDetailResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[vacancyDetailResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const getApplicationsFn = createServerFn()
  .inputValidator(applicationListParamsSchema.extend({ vacancyId: uuid }))
  .handler(async ({ data: { vacancyId, ...params } }) => {
    const api = createServerApi()

    const data = await api(`vacancies/${vacancyId}/applications`, { params })

    const result = applicationListResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(
        '[applicationListResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[applicationListResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const getApplicationFn = createServerFn()
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data: { id } }) => {
    const api = createServerApi()

    const data = await api(`vacancies/applications/${id}`)

    const result = applicationDetailResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(
        '[applicationDetailResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[applicationDetailResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })
