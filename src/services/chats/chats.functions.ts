import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/services/api.server'
import { toApiParams } from '@/services/api-params'
import {
  chatListResponseSchema,
  chatMessagesResponseSchema
} from '@/types/chats.schema'
import type {
  ChatListResponse,
  ChatMessagesResponse
} from '@/types/chats.schema'
import type { PaginationSearch } from '@/types/types.schemas'

export const getChatsFn = createServerFn()
  .inputValidator((data: PaginationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi()
    const data = await api<unknown>('chats/', {
      params: toApiParams(params)
    })
    return chatListResponseSchema.parse(data) satisfies ChatListResponse
  })

export const getChatMessagesFn = createServerFn()
  .inputValidator((data: PaginationSearch & { chatId: string }) => data)
  .handler(async ({ data: { chatId, ...params } }) => {
    const api = createServerApi()
    const data = await api<unknown>(`chats/${chatId}/messages`, {
      params: toApiParams(params)
    })
    return chatMessagesResponseSchema.parse(data) satisfies ChatMessagesResponse
  })
