import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import { authProbeResponseSchema } from '@/types/users/auth'
import { MessageResponse } from '@/types/shared/types'

export const authProbeFn = createServerFn().handler(
  async (): Promise<boolean> => {
    const api = createServerApi()

    try {
      const data = await api('users/auth/probe')

      const result = authProbeResponseSchema.safeParse(data)

      if (!result.success) {
        console.error(
          '[authProbeResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[authProbeResponseSchema] Unexpected response shape from backend'
        )
      }

      return result.data.isAuthenticated
    } catch (err) {
      console.error(`🚨 Failed authProbeFn`, err)
      throw err
    }
  }
)

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const api = createServerApi()
  await api<MessageResponse>('users/auth/logout', { method: 'POST' })
  return null
})
