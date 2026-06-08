import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import { skillListResponseSchema } from '@/types/skills/skill'
import type { PaginationSearch } from '@/types/shared/types.schemas'

export const getSkillsFn = createServerFn()
  .inputValidator((data: PaginationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('skills/', { params })
    const result = skillListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[skillListResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[skillListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
