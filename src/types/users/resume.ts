import {
  EmploymentTypeList,
  SalaryCurrencyList,
  SpecializationList,
  WorkFormatList
} from '@/types/shared/literals'
import { uuid } from '@/types/shared/primitives'
import z from 'zod'
import {
  baseLocationResponseSchema,
  locationRequestSchema,
  nullableLocationRequestSchema
} from '@/types/shared/location'

// --- Requests ---
export const resumeCreateRequestSchema = locationRequestSchema.extend({
  title: z.string().max(128),
  summary: z.string().nullish(),
  specialization: z.enum(SpecializationList),
  salaryExpectationMin: z.number().int().positive().nullish(),
  salaryExpectationMax: z.number().int().positive().nullish(),
  salaryCurrency: z.enum(SalaryCurrencyList).nullish(),
  workFormat: z.enum(WorkFormatList).nullish(),
  employmentType: z.enum(EmploymentTypeList).nullish()
})

export const resumeUpdateRequestSchema = nullableLocationRequestSchema.extend({
  title: z.string().max(128).nullish(),
  summary: z.string().nullish(),
  specialization: z.enum(SpecializationList).nullish(),
  salaryExpectationMin: z.number().int().positive().nullish(),
  salaryExpectationMax: z.number().int().positive().nullish(),
  salaryCurrency: z.enum(SalaryCurrencyList).nullish(),
  workFormat: z.enum(WorkFormatList).nullish(),
  employmentType: z.enum(EmploymentTypeList).nullish()
})

// --- Responses ---
export const resumeResponseSchema = baseLocationResponseSchema.extend({
  userId: uuid,
  title: z.string(),
  summary: z.string().nullish(),
  specialization: z.enum(SpecializationList),
  salaryExpectationMin: z.number().int().positive().nullish(),
  salaryExpectationMax: z.number().int().positive().nullish(),
  salaryCurrency: z.enum(SalaryCurrencyList).nullish(),
  workFormat: z.enum(WorkFormatList).nullish(),
  employmentType: z.enum(EmploymentTypeList).nullish()
})

// --- Types ---
export type ResumeCreateRequest = z.infer<typeof resumeCreateRequestSchema>
export type ResumeUpdateRequest = z.infer<typeof resumeUpdateRequestSchema>
export type ResumeDetail = z.infer<typeof resumeResponseSchema>
