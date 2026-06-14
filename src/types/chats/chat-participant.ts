import { uuid } from '@/types/shared/primitives'
import z from 'zod'

export const chatSettingsRequestSchema = z.object({
  is_pinned: z.boolean().nullish(),
  is_muted: z.boolean().nullish(),
  is_archived: z.boolean().nullish()
})

export const chatListUserResponseSchema = z.object({
  id: uuid,
  name: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  isOnline: z.boolean().nullish().default(false)
})

export type ChatSettingsRequest = z.infer<typeof chatSettingsRequestSchema>
export type ChatListUserResponse = z.infer<typeof chatListUserResponseSchema>
