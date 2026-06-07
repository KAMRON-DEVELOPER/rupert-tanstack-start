import { queryOptions } from '@tanstack/react-query'
import { getSkillsFn } from './skills.functions'
import type { PaginationSearch } from '@/types/shared/types.schemas'

export const useGetSkillsQueryOptions = (data: PaginationSearch = {}) =>
  queryOptions({
    queryKey:
      Object.keys(data).length > 0
        ? (['skills', data] as const)
        : (['skills'] as const),
    queryFn: () => getSkillsFn({ data })
  })
