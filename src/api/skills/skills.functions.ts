import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  paginatedResponseSchema,
  paginationQuerySchema
} from '@/types/shared/pagination'
import { skillResponseSchema } from '@/types/shared/skill'

export const getSkillsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('skills/', { params })

    const result = paginatedResponseSchema(skillResponseSchema).safeParse(data)

    if (!result.success) {
      console.error('[skillResponseSchema] parse failed:', result.error.message)
      throw new Error(
        '[skillResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })
