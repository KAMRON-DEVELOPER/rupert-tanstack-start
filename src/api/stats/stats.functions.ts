import { StatsSchema } from '@/types/stats/stats'
import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'

export const getStatsFn = createServerFn().handler(async () => {
  const api = createServerApi()
  return api<StatsSchema>('stats/')
})
