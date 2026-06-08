import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  cityListResponseSchema,
  countryListResponseSchema
} from '@/types/shared/location'
import type { PaginationSearch } from '@/types/shared/types.schemas'

export const getCountriesFn = createServerFn()
  .inputValidator((data: PaginationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('locations/countries', { params })
    const result = countryListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[countryListResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[countryListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })

export const getCitiesFn = createServerFn()
  .inputValidator((data: PaginationSearch & { countryId: string }) => data)
  .handler(async ({ data: { countryId, ...params } }) => {
    const api = createServerApi()
    const data = await api(`locations/countries/${countryId}/cities`, {
      params
    })
    const result = cityListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[cityListResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[cityListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
