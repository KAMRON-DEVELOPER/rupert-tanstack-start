import { ProficiencyLevelList } from '@/types/shared/literals'
import { isoDate, uuid } from '@/types/shared/primitives'
import { baseSchema } from '@/types/shared/base'
import z from 'zod'

// --- Requests ---
export const skillRequestSchema = z.object({
  name: z.string().trim().min(1).max(64)
})

export const skillLinkCreateRequestSchema = z.object({
  skillId: uuid,
  proficiency: z.enum(ProficiencyLevelList),
  lastUsedAt: isoDate.nullish()
})

export const skillLinkUpdateRequestSchema = z.object({
  skillId: uuid.nullish(),
  proficiency: z.enum(ProficiencyLevelList).nullish(),
  lastUsedAt: isoDate.nullish()
})

// --- Responses ---
export const skillResponseSchema = baseSchema.extend({
  name: z.string()
})

export const skillLinkResponseSchema = baseSchema.extend({
  skill: skillResponseSchema,
  proficiency: z.enum(ProficiencyLevelList).nullish(),
  lastUsedAt: isoDate.nullish()
})

// --- Types ---
export type SkillRequest = z.infer<typeof skillRequestSchema>
export type SkillLinkCreateRequest = z.infer<
  typeof skillLinkCreateRequestSchema
>
export type SkillLinkUpdateRequest = z.infer<
  typeof skillLinkUpdateRequestSchema
>
export type SkillResponse = z.infer<typeof skillResponseSchema>
export type SkillLinkResponse = z.infer<typeof skillLinkResponseSchema>
