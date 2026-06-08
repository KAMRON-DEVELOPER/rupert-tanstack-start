import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  applicationListResponseSchema,
  applicationDetailResponseSchema,
  vacancyListResponseSchema,
  vacancyDetailResponseSchema
} from '@/types/vacancies/vacancy'
import type {
  ApplicationListParams,
  VacancyListParams
} from '@/types/vacancies/vacancy'

export const getVacanciesFn = createServerFn()
  .inputValidator((data: VacancyListParams) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('vacancies/', { params })
    const result = vacancyListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[vacancyListResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[vacancyListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const getVacancyFn = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    const api = createServerApi()
    const data = await api(`vacancies/${id}`)
    const result = vacancyDetailResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[vacancyDetailResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[vacancyDetailResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const getApplicationsFn = createServerFn()
  .inputValidator((data: ApplicationListParams) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('vacancies/applications', { params })
    const result = applicationListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[applicationListResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[applicationListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const getApplicationFn = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    const api = createServerApi()
    const data = await api(`vacancies/applications/${id}`)
    const result = applicationDetailResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[applicationDetailResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[applicationDetailResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
