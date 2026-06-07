import { createServerFn } from '@tanstack/react-start'
import { AuthProbeSchema, UserSchema } from '@/types/users/user'
import { createServerApi } from '@/api/api.server'

export const authProbeFn = createServerFn().handler(
  async (): Promise<boolean> => {
    const axios = createServerApi()

    try {
      const res = await axios<AuthProbeSchema>('users/auth/probe')
      return res.isAuthenticated
    } catch (err) {
      console.error(`🚨 Failed authProbeFn`, err)
      throw err
    }
  }
)

export const getProfileFn = createServerFn().handler(async () => {
  const axios = createServerApi()
  return axios<UserSchema>('users/')
})

export const updateProfileFn = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const axios = createServerApi()

    await axios<null>('users/', { method: 'PATCH', data })
    return null
  })

export const deleteProfileFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    const axios = createServerApi()
    await axios('users/', { method: 'DELETE' })
    return null
  }
)

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const axios = createServerApi()
  await axios<null>('users/auth/logout', { method: 'POST' })
  return null
})
