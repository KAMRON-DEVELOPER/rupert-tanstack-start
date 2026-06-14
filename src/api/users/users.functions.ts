import { userSearchResponseSchema } from '@/types/chats/ws'
import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '../api.server'
import {
  userDetailResponseSchema,
  userUpdateRequestSchema
} from '@/types/users/user'
import { MessageResponse } from '@/types/shared/types'

export const searchUsersFn = createServerFn()
  .inputValidator(
    (data: { q: string; offset?: number; limit?: number }) => data
  )
  .handler(async ({ data: { q, ...params } }) => {
    const api = createServerApi()

    const data = await api('users/search', {
      params
    })

    const result = userSearchResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(
        '[userSearchResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[userSearchResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const getProfileFn = createServerFn().handler(async () => {
  const api = createServerApi()

  const data = await api('users/')

  const result = userDetailResponseSchema.safeParse(data)

  if (!result.success) {
    console.error(
      '[userDetailResponseSchema] parse failed:',
      result.error.message
    )
    throw new Error(
      '[userDetailResponseSchema] Unexpected response shape from backend'
    )
  }

  return result.data
})

export const updateProfileFn = createServerFn({ method: 'POST' })
  .inputValidator(userUpdateRequestSchema)
  .handler(async ({ data }) => {
    const api = createServerApi()

    await api<MessageResponse>('users/', { method: 'PATCH', data })
    return null
  })

export const deleteProfileFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    const api = createServerApi()
    await api('users/', { method: 'DELETE' })
    return null
  }
)
