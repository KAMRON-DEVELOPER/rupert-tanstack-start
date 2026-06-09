import {
  paginatedResponseSchema,
  paginationQuerySchema
} from '@/types/shared/pagination'
import type { MessageResponse } from '@/types/shared/types'
import { followResponseSchema, FollowUpdateRequest } from '@/types/users/follow'
import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '../api.server'

export const followUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { followingId: string }) => data)
  .handler(async ({ data: { followingId } }) => {
    const api = createServerApi()

    const data = await api(`users/${followingId}/follow`, {
      method: 'POST'
    })

    const result = followResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const unfollowUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { followingId: string }) => data)
  .handler(async ({ data: { followingId } }) => {
    const api = createServerApi()

    return api<MessageResponse>(`users/${followingId}/follow`, {
      method: 'DELETE'
    })
  })

export const getFollowersFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('users/followers', { params })

    const result = paginatedResponseSchema(followResponseSchema).safeParse(data)

    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const getFollowingFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('users/following', { params })

    const result = paginatedResponseSchema(followResponseSchema).safeParse(data)

    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const getFollowRequestsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('users/follow-requests', { params })

    const result = paginatedResponseSchema(followResponseSchema).safeParse(data)

    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const updateFollowRequestFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { followId: string; data: FollowUpdateRequest }) => data
  )
  .handler(async ({ data: { followId, data } }) => {
    const api = createServerApi()

    const responseData = await api(`users/follow-requests/${followId}`, {
      method: 'PATCH',
      data
    })

    const result = followResponseSchema.safeParse(responseData)

    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })
