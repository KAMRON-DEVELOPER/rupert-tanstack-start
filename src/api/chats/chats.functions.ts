import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '@/api/api.server'
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
    const data = await api('chats/', {
      params
    })
    const result = chatListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error('[getChatsFn] schema parse failed:', result.error.issues)
      console.error('[getChatsFn] raw data:', JSON.stringify(data, null, 2))
      throw new Error(
        `Chat list schema validation failed: ${result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ')}`
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
    return chatMessagesResponseSchema.parse(data) satisfies ChatMessagesResponse
  })
