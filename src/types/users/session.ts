import { isoDateTime, uuid } from '@/types/shared/primitives'
import { baseSchema } from '@/types/shared/base'
import z from 'zod'

export const sessionDetailResponseSchema = baseSchema.extend({
  userId: uuid,
  userAgent: z.string().nullish(),
  ipAddr: z.string().nullish(),
  deviceName: z.string().nullish(),
  isActive: z.boolean(),
  lastActivityAt: isoDateTime
})

export type SessionDetailResponse = z.infer<typeof sessionDetailResponseSchema>
