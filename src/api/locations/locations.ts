import { queryOptions } from '@tanstack/react-query'
import { getCitiesFn, getCountriesFn } from './locations.functions'
import { PaginationQuery } from '@/types/shared/pagination'

export const useGetCountriesQueryOptions = (data: PaginationQuery) =>
  queryOptions({
    queryKey:
      Object.keys(data).length > 0
        ? (['countries', data] as const)
        : (['countries'] as const),
    queryFn: () => getCountriesFn({ data })
  })

export const useGetCitiesQueryOptions = (
  data: PaginationQuery & { countryId: string }
) =>
  queryOptions({
    queryKey: ['countries', data.countryId, 'cities', data] as const,
    queryFn: () => getCitiesFn({ data }),
    enabled: Boolean(data.countryId)
  })
