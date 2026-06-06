import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import { skillListResponseSchema } from '@/types/skill.schema'
import type { PaginationSearch } from '@/types/types.schemas'

export const getSkillsFn = createServerFn()
  .inputValidator((data: PaginationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('skills/', {
      params
    })
    return skillListResponseSchema.parse(data)
  })
