import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/services/api.server'
import { toApiParams } from '@/services/api-params'
import {
  cityListResponseSchema,
  countryListResponseSchema
} from '@/types/location.schema'
import type { PaginationSearch } from '@/types/types.schemas'

export const getCountriesFn = createServerFn()
  .inputValidator((data: PaginationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('locations/countries', {
      params: toApiParams(params)
    })
    return countryListResponseSchema.parse(data)
  })

export const getCitiesFn = createServerFn()
  .inputValidator((data: PaginationSearch & { countryId: string }) => data)
  .handler(async ({ data: { countryId, ...params } }) => {
    const api = createServerApi()
    const data = await api(`locations/countries/${countryId}/cities`, {
      params: toApiParams(params)
    })
    return cityListResponseSchema.parse(data)
  })
