import type { MessageResponse } from '@/types/shared/types'
import { sessionDetailResponseSchema } from '@/types/users/session'
import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '../api.server'

export const getSessionsFn = createServerFn().handler(async () => {
  const api = createServerApi()

  const data = await api('users/sessions')

  const result = sessionDetailResponseSchema.array().safeParse(data)

  if (!result.success) {
    console.error(
      '[sessionDetailResponseSchema] parse failed:',
      result.error.message
    )
    throw new Error(
      '[sessionDetailResponseSchema] Unexpected response shape from backend'
    )
  }

  return result.data
})

export const revokeSessionFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data: { sessionId } }) => {
    const api = createServerApi()

    return api<MessageResponse>(`users/sessions/${sessionId}`, {
      method: 'DELETE'
    })
  })

export const revokeSessionsFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { include_current?: boolean }) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    return api<MessageResponse>('users/sessions', {
      method: 'DELETE',
      params
    })
  })
