import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  companyDetailResponseSchema,
  companyListParamsSchema,
  companySummaryResponseSchema
} from '@/types/companies/company'
import { paginatedResponseSchema } from '@/types/shared/pagination'

export const getCompaniesFn = createServerFn()
  .inputValidator(companyListParamsSchema)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('companies/', { params })

    const result = paginatedResponseSchema(
      companySummaryResponseSchema
    ).safeParse(data)

    if (!result.success) {
      console.error(
        '[companyListResponseSchema] parse failed:',
        result.error.message
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
        result.error.message
      )
      throw new Error(
        '[companyDetailResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })
