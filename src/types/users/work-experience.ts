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
  location: z.string().max(128).nullish(),
  position: z.string().max(128),
  description: z.string().nullish(),
  startedAt: isoDate,
  endedAt: isoDate.nullish()
})

export const workExperienceUpdateRequestSchema =
  nullableLocationRequestSchema.extend({
    companyName: z.string().max(128).nullish(),
    location: z.string().max(128).nullish(),
    position: z.string().max(128).nullish(),
    description: z.string().nullish(),
    startedAt: isoDate.nullish(),
    endedAt: isoDate.nullish()
  })

// --- Responses ---
export const workExperienceResponseSchema = baseSchema.extend({
  userId: uuid,
  companyName: z.string(),
  location: z.string().nullish(),
  position: z.string(),
  description: z.string().nullish(),
  startedAt: isoDate,
  endedAt: isoDate.nullish(),
  isCurrent: z.boolean()
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
