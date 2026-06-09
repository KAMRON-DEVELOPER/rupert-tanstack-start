import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  paginatedResponseSchema,
  paginationQuerySchema
} from '@/types/shared/pagination'
import { chatListItemResponseSchema } from '@/types/chats/chat'
import z from 'zod'
import { chatMessagesResponseSchema } from '@/types/chats/ws'

export const getChatsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(async ({ data: params }) => {
    const api = createServerApi()

    const data = await api('chats/', {
      params
    })

    const result = paginatedResponseSchema(
      chatListItemResponseSchema
    ).safeParse(data)

    if (!result.success) {
      console.error(
        '[chatListItemResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[chatListItemResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const getChatMessagesFn = createServerFn()
  .inputValidator(paginationQuerySchema.extend({ chatId: z.string() }))
  .handler(async ({ data: { chatId, ...params } }) => {
    const api = createServerApi()

    const data = await api(`chats/${chatId}/messages`, {
      params
    })

    const result = chatMessagesResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(
        '[chatMessagesResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[chatMessagesResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })
