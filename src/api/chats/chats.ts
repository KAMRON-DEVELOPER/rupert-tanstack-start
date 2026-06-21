import { queryOptions } from '@tanstack/react-query'
import { getChatMessagesFn, getChatsFn } from './chats.functions'
import { PaginationQuery } from '@/types/shared/pagination'

export const useGetChatsQueryOptions = (
  data: PaginationQuery = { offset: 0, limit: 20 }
) =>
  queryOptions({
    queryKey:
      Object.keys(data).length > 0
        ? (['chats', data] as const)
        : (['chats'] as const),
    queryFn: () => getChatsFn({ data }),
    staleTime: 30_000
  })

export const useGetChatMessagesQueryOptions = (
  data: PaginationQuery & { chatId: string }
) =>
  queryOptions({
    queryKey: ['chats', data.chatId, 'messages'] as const,
    queryFn: () => getChatMessagesFn({ data }),
    staleTime: 30_000
  })
