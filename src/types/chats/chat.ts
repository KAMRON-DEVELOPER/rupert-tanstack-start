import { baseSchema } from '@/types/shared/base'
import z from 'zod'
import { chatListLastMessageResponseSchema } from './chat-message'
import { chatListUserResponseSchema } from './chat-participant'

export const chatListItemResponseSchema = baseSchema.extend({
  user: chatListUserResponseSchema,
  isPinned: z.boolean(),
  isMuted: z.boolean(),
  isArchived: z.boolean(),
  lastMessage: chatListLastMessageResponseSchema.nullish(),
  unreadCount: z.number().int().min(0)
})

export type ChatListItemResponse = z.infer<typeof chatListItemResponseSchema>
