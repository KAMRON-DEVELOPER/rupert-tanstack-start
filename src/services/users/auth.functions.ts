import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/services/api.server'
import { AuthProbeSchema, UserSchema } from '@/types/user'

export const authProbeFn = createServerFn().handler(
  async (): Promise<boolean> => {
    const api = createServerApi()

    try {
      const res = await api<AuthProbeSchema>('users/auth/probe')
      return res.isAuthenticated
    } catch (err) {
      console.error(`🚨 Failed authProbeFn`, err)
      throw err
    }
  }
)

export const getProfileFn = createServerFn().handler(async () => {
  const api = createServerApi()
  return api<UserSchema>('users/')
})

export const updateProfileFn = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const api = createServerApi()

    await api<null>('users/', { method: 'PATCH', data })
    return null
  })

export const deleteProfileFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    const api = createServerApi()
    await api('users/', { method: 'DELETE' })
    return null
  }
)

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const api = createServerApi()
  await api<null>('users/auth/logout', { method: 'POST' })
  return null
})
