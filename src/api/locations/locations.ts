import { queryOptions } from '@tanstack/react-query'
import { getCitiesFn, getCountriesFn } from './locations.functions'
import type { PaginationSearch } from '@/types/types.schemas'

export const useGetCountriesQueryOptions = (data: PaginationSearch = {}) =>
  queryOptions({
    queryKey:
      Object.keys(data).length > 0
        ? (['countries', data] as const)
        : (['countries'] as const),
    queryFn: () => getCountriesFn({ data })
  })

export const useGetCitiesQueryOptions = (
  data: PaginationSearch & { countryId: string }
) =>
  queryOptions({
    queryKey: ['countries', data.countryId, 'cities', data] as const,
    queryFn: () => getCitiesFn({ data }),
    enabled: Boolean(data.countryId)
  })
