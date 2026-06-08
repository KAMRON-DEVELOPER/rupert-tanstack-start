import { isoDate, uuid } from '@/types/shared/primitives'
import { baseSchema } from '@/types/shared/base'
import z from 'zod'
import {
  locationRequestSchema,
  nullableLocationRequestSchema
} from '@/types/shared/location'

// --- Requests ---
export const workExperienceCreateRequestSchema = locationRequestSchema.extend({
  companyName: z.string().max(128),
  location: z.string().max(128).optional(),
  position: z.string().max(128),
  description: z.string().optional(),
  startedAt: isoDate,
  endedAt: isoDate.optional()
})

export const workExperienceUpdateRequestSchema =
  nullableLocationRequestSchema.extend({
    companyName: z.string().max(128).optional(),
    location: z.string().max(128).optional(),
    position: z.string().max(128).optional(),
    description: z.string().optional(),
    startedAt: isoDate.optional(),
    endedAt: isoDate.optional()
  })

// --- Responses ---
export const workExperienceResponseSchema = baseSchema.extend({
  userId: uuid,
  companyName: z.string(),
  location: z.string().optional(),
  position: z.string(),
  description: z.string().optional(),
  startedAt: isoDate,
  endedAt: isoDate.optional(),
  is_current: z.boolean()
})

// --- Types ---
export type WorkExperienceCreateRequest = z.infer<
  typeof workExperienceCreateRequestSchema
>
export type WorkExperienceUpdateRequest = z.infer<
  typeof workExperienceUpdateRequestSchema
>
export type WorkExperienceResponse = z.infer<
  typeof workExperienceResponseSchema
>
