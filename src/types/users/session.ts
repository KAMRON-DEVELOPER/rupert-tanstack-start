import { isoDateTime, uuid } from '@/types/shared/primitives'
import { baseSchema } from '@/types/shared/base'
import z from 'zod'

const sessionDetailResponseSchema = baseSchema.extend({
  userId: uuid,
  userAgent: z.string().optional(),
  ipAddr: z.string().optional(),
  deviceName: z.string().optional(),
  isActive: z.boolean(),
  lastActivityAt: isoDateTime
})

export type SessionDetailResponse = z.infer<typeof sessionDetailResponseSchema>
