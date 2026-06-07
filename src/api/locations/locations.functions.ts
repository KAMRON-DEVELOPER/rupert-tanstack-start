import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  cityListResponseSchema,
  countryListResponseSchema
} from '@/types/location/location.schema'
import type { PaginationSearch } from '@/types/shared/types.schemas'

export const getCountriesFn = createServerFn()
  .inputValidator((data: PaginationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('locations/countries', {
      params
    })
    return countryListResponseSchema.parse(data)
  })

export const getCitiesFn = createServerFn()
  .inputValidator((data: PaginationSearch & { countryId: string }) => data)
  .handler(async ({ data: { countryId, ...params } }) => {
    const api = createServerApi()
    const data = await api(`locations/countries/${countryId}/cities`, {
      params
    })
    return cityListResponseSchema.parse(data)
  })
