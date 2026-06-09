import { ProficiencyLevelList } from '@/types/shared/literals'
import { isoDate, uuid } from '@/types/shared/primitives'
import { baseSchema } from '@/types/shared/base'
import { PaginatedResponseSchema } from '@/types/shared/pagination'
import z from 'zod'

// --- Requests ---
export const SkillRequestSchema = z.object({
  name: z.string().trim().min(1).max(64)
})

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
export const skillResponseSchema = baseSchema.extend({
  name: z.string()
})

export const skillListResponseSchema =
  PaginatedResponseSchema(skillResponseSchema)

export const skillLinkResponseSchema = baseSchema.extend({
  resumeId: uuid,
  skill: skillResponseSchema,
  proficiency: z.enum(ProficiencyLevelList).optional(),
  lastUsedAt: isoDate.optional()
})

// --- Types ---
export type SkillRequest = z.infer<typeof SkillRequestSchema>
export type SkillLinkCreateRequest = z.infer<
  typeof skillLinkCreateRequestSchema
>
export type SkillLinkUpdateRequest = z.infer<
  typeof skillLinkUpdateRequestSchema
>
export type SkillResponse = z.infer<typeof skillResponseSchema>
export type SkillLinkResponse = z.infer<typeof skillLinkResponseSchema>
