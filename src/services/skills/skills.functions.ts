import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/services/api.server'
import { toApiParams } from '@/services/api-params'
import { skillListResponseSchema } from '@/types/skill.schema'
import type { PaginationSearch } from '@/types/types.schemas'

export const getSkillsFn = createServerFn()
  .inputValidator((data: PaginationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('skills/', {
      params: toApiParams(params)
    })
    return skillListResponseSchema.parse(data)
  })
