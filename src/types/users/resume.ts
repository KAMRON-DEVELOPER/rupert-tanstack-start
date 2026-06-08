import {
  EmploymentTypeList,
  SalaryCurrencyList,
  SpecializationList,
  WorkFormatList
} from '@/types/shared/literals'
import { uuid } from '@/types/shared/primitives'
import { baseSchema } from '@/types/shared/base'
import z from 'zod'
import {
  baseLocationResponseSchema,
  locationRequestSchema,
  nullableLocationRequestSchema
} from '@/types/shared/location'
import {
  skillLinkCreateRequestSchema,
  skillLinkResponseSchema,
  skillLinkUpdateRequestSchema
} from '@/types/shared/skill'

// --- Requests ---
export const resumeCreateRequestSchema = locationRequestSchema.extend({
  title: z.string().max(128),
  summary: z.string().optional(),
  specialization: z.enum(SpecializationList),
  salaryExpectationMin: z.number().int().positive().optional(),
  salaryExpectationMax: z.number().int().positive().optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  workFormat: z.enum(WorkFormatList).optional(),
  employmentType: z.enum(EmploymentTypeList).optional(),
  skills: z.array(skillLinkCreateRequestSchema)
})

export const resumeUpdateRequestSchema = nullableLocationRequestSchema.extend({
  title: z.string().max(128),
  summary: z.string().optional(),
  specialization: z.enum(SpecializationList),
  salaryExpectationMin: z.number().int().positive().optional(),
  salaryExpectationMax: z.number().int().positive().optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  workFormat: z.enum(WorkFormatList).optional(),
  employmentType: z.enum(EmploymentTypeList).optional(),
  skills: z.array(skillLinkUpdateRequestSchema)
})

// --- Responses ---
export const resumeDetailResponseSchema = baseSchema.extend({
  user_id: uuid,
  title: z.string(),
  summary: z.string().optional(),
  specialization: z.enum(SpecializationList),
  salaryExpectationMin: z.number().int().positive().optional(),
  salaryExpectationMax: z.number().int().positive().optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  workFormat: z.enum(WorkFormatList).optional(),
  employmentType: z.enum(EmploymentTypeList).optional(),
  skills: z.array(skillLinkResponseSchema)
})

export const resumeSummaryResponseSchema = baseLocationResponseSchema.extend({
  user_id: uuid,
  title: z.string(),
  specialization: z.enum(SpecializationList),
  salaryExpectationMin: z.number().int().optional(),
  salaryExpectationMax: z.number().int().optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  workFormat: z.enum(WorkFormatList).optional(),
  employmentType: z.enum(EmploymentTypeList).optional()
})

// --- Types ---
export type ResumeCreateRequest = z.infer<typeof resumeCreateRequestSchema>
export type ResumeUpdateRequest = z.infer<typeof resumeUpdateRequestSchema>
export type ResumeDetail = z.infer<typeof resumeDetailResponseSchema>
export type ResumeSummary = z.infer<typeof resumeSummaryResponseSchema>
