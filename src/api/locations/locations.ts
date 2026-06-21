import { queryOptions } from '@tanstack/react-query'
import { getCitiesFn, getCountriesFn } from './locations.functions'
import { PaginationQuery } from '@/types/shared/pagination'

export const useGetCountriesQueryOptions = (
  data: PaginationQuery = { offset: 0, limit: 100 }
) =>
  queryOptions({
    queryKey:
      Object.keys(data).length > 0
        ? (['countries', data] as const)
        : (['countries'] as const),
    queryFn: () => getCountriesFn({ data }),
    staleTime: 30_000
  })

export const useGetCitiesQueryOptions = (
  data: Partial<PaginationQuery> & { countryId: string }
) =>
  queryOptions({
    queryKey: ['countries', data.countryId, 'cities', data] as const,
    queryFn: () => getCitiesFn({ data: { offset: 0, limit: 100, ...data } }),
    enabled: Boolean(data.countryId),
    staleTime: 3_600_000
  })
