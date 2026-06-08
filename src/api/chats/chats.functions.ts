import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
import {
  chatListResponseSchema,
  chatMessagesResponseSchema
} from '@/types/chats/chat'
import type { ChatListResponse, ChatMessagesResponse } from '@/types/chats/chat'
import type { PaginationSearch } from '@/types/shared/types.schemas'

export const getChatsFn = createServerFn()
  .inputValidator((data: PaginationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api('chats/', {
      params
    })
    const result = chatListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[chatListResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[chatListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data satisfies ChatListResponse
  })

export const getChatMessagesFn = createServerFn()
  .inputValidator((data: PaginationSearch & { chatId: string }) => data)
  .handler(async ({ data: { chatId, ...params } }) => {
    const api = createServerApi()
    const data = await api(`chats/${chatId}/messages`, {
      params
    })
    const result = chatMessagesResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[chatMessagesResponseSchema] parse failed:',
        result.error.flatten()
      )
      throw new Error(
        '[chatMessagesResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data satisfies ChatMessagesResponse
  })
