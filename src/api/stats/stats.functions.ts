import { statsResponseSchema } from '@/types/stats/stats'
import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'

export const getStatsFn = createServerFn().handler(async () => {
  const api = createServerApi()
  const data = await api('stats/')
  const result = statsResponseSchema.safeParse(data)
  if (!result.success) {
    console.error('[statsResponseSchema] parse failed:', result.error.flatten())
    throw new Error(
      '[statsResponseSchema] Unexpected response shape from backend'
    )
  }
  return result.data
})
