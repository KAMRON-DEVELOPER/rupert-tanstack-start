import { queryOptions } from '@tanstack/react-query'
import { getSkillsFn } from './skills.functions'
import { PaginationQuery } from '@/types/shared/pagination'

export const useGetSkillsQueryOptions = (
  data: PaginationQuery = { offset: 0, limit: 100 }
) =>
  queryOptions({
    queryKey:
      Object.keys(data).length > 0
        ? (['skills', data] as const)
        : (['skills'] as const),
    queryFn: () => getSkillsFn({ data })
  })
