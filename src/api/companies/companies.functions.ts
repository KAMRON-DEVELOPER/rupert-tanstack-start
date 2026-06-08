import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  companyListResponseSchema,
  companyDetailResponseSchema
} from '@/types/companies/company'
import type { CompanyListParams } from '@/types/companies/company'

export const getCompaniesFn = createServerFn()
  .inputValidator((data: CompanyListParams) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('companies/', { params })
    const result = companyListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[companyListResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[companyListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const getCompanyFn = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    const api = createServerApi()
    const data = await api(`companies/${id}`)
    const result = companyDetailResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[companyDetailResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[companyDetailResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
