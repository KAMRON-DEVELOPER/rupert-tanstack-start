import { uuid } from '@/types/shared/primitives'
import z from 'zod'

export const chatSettingsRequestSchema = z.object({
  is_pinned: z.boolean().optional(),
  is_muted: z.boolean().optional(),
  is_archived: z.boolean().optional()
})

export const chatListUserResponseSchema = z.object({
  id: uuid,
  firstName: z.string(),
  lastName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  name: z.string()
})
