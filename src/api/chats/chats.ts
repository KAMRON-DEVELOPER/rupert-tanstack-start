import { queryOptions } from '@tanstack/react-query'
import { getChatMessagesFn, getChatsFn } from './chats.functions'
import type { PaginationSearch } from '@/types/types.schemas'

export const useGetChatsQueryOptions = (data: PaginationSearch = {}) =>
  queryOptions({
    queryKey:
      Object.keys(data).length > 0
        ? (['chats', data] as const)
        : (['chats'] as const),
    queryFn: () => getChatsFn({ data })
  })

export const useGetChatMessagesQueryOptions = (
  data: PaginationSearch & { chatId: string }
) =>
  queryOptions({
    queryKey: ['chats', data.chatId, 'messages'] as const,
    queryFn: () => getChatMessagesFn({ data })
  })
