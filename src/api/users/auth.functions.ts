import { createServerFn } from '@tanstack/react-start'
import { authProbeResponseSchema, userResponseSchema } from '@/types/users/user'
import { createServerApi } from '@/api/api.server'

export const authProbeFn = createServerFn().handler(
  async (): Promise<boolean> => {
    const axios = createServerApi()

    try {
      const data = await axios('users/auth/probe')
      const result = authProbeResponseSchema.safeParse(data)
      if (!result.success) {
        console.error(
          '[authProbeResponseSchema] parse failed:',
          result.error.flatten()
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

export const getProfileFn = createServerFn().handler(async () => {
  const axios = createServerApi()
  const data = await axios('users/')
  const result = userResponseSchema.safeParse(data)
  if (!result.success) {
    console.error('[userResponseSchema] parse failed:', result.error.flatten())
    throw new Error(
      '[userResponseSchema] Unexpected response shape from backend'
    )
  }
  return result.data
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
