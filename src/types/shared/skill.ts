import { ProficiencyLevelList } from '@/types/shared/literals'
import { isoDate, uuid } from '@/types/shared/primitives'
import { baseSchema } from '@/types/shared/base'
import { skillResponseSchema } from '@/types/skills/skill'
import z from 'zod'

// --- Requests ---
export const skillLinkCreateRequestSchema = z.object({
  skillId: uuid,
  proficiency: z.enum(ProficiencyLevelList),
  lastUsedAt: isoDate.optional()
})

export const skillLinkUpdateRequestSchema = z.object({
  proficiency: z.enum(ProficiencyLevelList).optional(),
  lastUsedAt: isoDate.optional()
})

// --- Responses ---
export const skillLinkResponseSchema = baseSchema.extend({
  resumeId: uuid,
  skill: skillResponseSchema,
  proficiency: z.enum(ProficiencyLevelList).optional(),
  lastUsedAt: isoDate.optional()
})

// --- Types ---
export type SkillLinkCreateRequest = z.infer<
  typeof skillLinkCreateRequestSchema
>
export type SkillLinkUpdateRequest = z.infer<
  typeof skillLinkUpdateRequestSchema
>
export type SkillLinkResponse = z.infer<typeof skillLinkResponseSchema>
