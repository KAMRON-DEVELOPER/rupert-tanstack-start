import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import { ListResponse } from '@/types/shared/types'
import { CompanySearch } from '@/types/companies/company.schema'
import { CompanyCardSchema, CompanySchema } from '@/types/companies/company'

export const getCompaniesFn = createServerFn()
  .inputValidator((data: CompanySearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    return api<ListResponse<CompanyCardSchema>>('companies/', {
      params
    })
  })

export const getCompanyFn = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    const api = createServerApi()
    return api<CompanySchema>(`companies/${id}`)
  })
