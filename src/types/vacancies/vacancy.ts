import z from 'zod'
import { baseSchema } from '@/types/shared/base'
import {
  ApplicationStatusList,
  EmploymentTypeList,
  PaymentFrequencyList,
  ProficiencyLevelList,
  SalaryCurrencyList,
  SpecializationList,
  SubmissionTypeList,
  VacancyStatusList,
  WorkFormatList
} from '@/types/shared/literals'
import {
  baseLocationResponseSchema,
  locationRequestSchema,
  nullableLocationRequestSchema
} from '@/types/shared/location'
import {
  PaginatedResponseSchema,
  paginationQuerySchema
} from '@/types/shared/pagination'
import { uuid } from '@/types/shared/primitives'
import { companySummaryResponseSchema } from '@/types/companies/company'
import { resumeSummaryResponseSchema } from '@/types/users/resume'
import { userSummaryResponseSchema } from '@/types/users/user'
import { skillResponseSchema } from '@/types/skills/skill'

// --- Vacancy Skill Link ---
export const vacancySkillLinkRequestSchema = z.object({
  skillId: uuid,
  proficiency: z.enum(ProficiencyLevelList),
  yearsOfExperienceMin: z.number().optional(),
  isRequired: z.boolean().default(true)
})

export const vacancySkillLinkUpdateRequestSchema = z.object({
  proficiency: z.enum(ProficiencyLevelList).optional(),
  yearsOfExperienceMin: z.number().optional(),
  isRequired: z.boolean().optional()
})

export const vacancySkillLinkResponseSchema = baseSchema.extend({
  vacancyId: uuid,
  skill: skillResponseSchema,
  proficiency: z.enum(ProficiencyLevelList),
  yearsOfExperienceMin: z.number().optional(),
  isRequired: z.boolean()
})

// --- Vacancy Requests ---
export const vacancyCreateRequestSchema = locationRequestSchema.extend({
  title: z.string().max(128),
  description: z.string(),
  externalApplyUrl: z.url().optional(),
  submissionType: z.enum(SubmissionTypeList),
  specialization: z.enum(SpecializationList),
  salaryMin: z.number().int().min(0).optional(),
  salaryMax: z.number().int().min(0).optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  paymentFrequency: z.enum(PaymentFrequencyList).optional(),
  yearsOfExperienceMin: z.number().min(0).optional(),
  workFormat: z.enum(WorkFormatList).default('onsite'),
  workHoursPerWeek: z.number().int().min(1).max(168).optional(),
  employmentType: z.enum(EmploymentTypeList).default('full_time'),
  status: z.enum(VacancyStatusList).default('draft'),
  skills: z.array(vacancySkillLinkRequestSchema).optional()
})

export const vacancyUpdateRequestSchema = nullableLocationRequestSchema.extend({
  title: z.string().max(128).optional(),
  description: z.string().optional(),
  externalApplyUrl: z.url().optional(),
  submissionType: z.enum(SubmissionTypeList).optional(),
  specialization: z.enum(SpecializationList).optional(),
  salaryMin: z.number().int().min(0).optional(),
  salaryMax: z.number().int().min(0).optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  paymentFrequency: z.enum(PaymentFrequencyList).optional(),
  yearsOfExperienceMin: z.number().min(0).optional(),
  workFormat: z.enum(WorkFormatList).optional(),
  workHoursPerWeek: z.number().int().min(1).max(168).optional(),
  employmentType: z.enum(EmploymentTypeList).optional(),
  status: z.enum(VacancyStatusList).optional(),
  skills: z.array(vacancySkillLinkRequestSchema).optional()
})

export const vacancyListParamsSchema = paginationQuerySchema.extend({
  companyId: z.uuid().optional(),
  title: z.string().optional(),
  submissionType: z.enum(SubmissionTypeList).optional(),
  specialization: z.enum(SpecializationList).optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  yearsOfExperienceMin: z.number().optional(),
  workFormat: z.enum(WorkFormatList).optional(),
  employmentType: z.enum(EmploymentTypeList).optional(),
  status: z.enum(VacancyStatusList).optional(),
  countryId: z.uuid().optional(),
  cityId: z.uuid().optional(),
  skillIds: z.array(z.uuid()).optional()
})

// --- Vacancy Responses ---
export const vacancySummaryResponseSchema = baseLocationResponseSchema.extend({
  company: companySummaryResponseSchema,
  title: z.string(),
  submissionType: z.enum(SubmissionTypeList),
  specialization: z.enum(SpecializationList),
  salaryMin: z.number().int().optional(),
  salaryMax: z.number().int().optional(),
  salaryCurrency: z.enum(SalaryCurrencyList).optional(),
  yearsOfExperienceMin: z.number().optional(),
  workFormat: z.enum(WorkFormatList),
  employmentType: z.enum(EmploymentTypeList),
  status: z.enum(VacancyStatusList),
  isSaved: z.boolean().optional(),
  hasApplied: z.boolean().optional()
})

export const vacancyDetailResponseSchema = vacancySummaryResponseSchema.extend({
  description: z.string(),
  externalApplyUrl: z.url().optional(),
  workHoursPerWeek: z.number().int().optional(),
  paymentFrequency: z.enum(PaymentFrequencyList).optional(),
  skillLinks: z.array(vacancySkillLinkResponseSchema)
})

export const vacancyListResponseSchema = PaginatedResponseSchema(
  vacancySummaryResponseSchema
)

// --- Application Requests ---
export const applicationRequestSchema = z.object({
  vacancyId: uuid,
  resumeId: uuid.optional(),
  coverLetter: z.string().optional()
})

export const applicationStatusUpdateRequestSchema = z.object({
  status: z.enum(ApplicationStatusList),
  recruiterNote: z.string().optional()
})

export const applicationListParamsSchema = paginationQuerySchema.extend({
  vacancyId: uuid.optional(),
  applicantId: uuid.optional(),
  status: z.enum(ApplicationStatusList).optional()
})

// --- Application Responses ---
export const applicationSummaryResponseSchema = baseSchema.extend({
  vacancyId: uuid,
  applicantId: uuid,
  status: z.enum(ApplicationStatusList),
  coverLetter: z.string().optional(),
  vacancy: vacancySummaryResponseSchema,
  resume: resumeSummaryResponseSchema.optional()
})

export const applicationDetailResponseSchema =
  applicationSummaryResponseSchema.extend({
    applicant: userSummaryResponseSchema,
    recruiterNote: z.string().optional()
  })

export const applicationListResponseSchema = PaginatedResponseSchema(
  applicationSummaryResponseSchema
)

// --- Types ---
export type VacancySkillLinkRequest = z.infer<
  typeof vacancySkillLinkRequestSchema
>
export type VacancySkillLinkUpdateRequest = z.infer<
  typeof vacancySkillLinkUpdateRequestSchema
>
export type VacancySkillLinkResponse = z.infer<
  typeof vacancySkillLinkResponseSchema
>
export type VacancyCreateRequest = z.infer<typeof vacancyCreateRequestSchema>
export type VacancyUpdateRequest = z.infer<typeof vacancyUpdateRequestSchema>
export type VacancyListParams = z.infer<typeof vacancyListParamsSchema>
export type VacancySummaryResponse = z.infer<
  typeof vacancySummaryResponseSchema
>
export type VacancyDetailResponse = z.infer<typeof vacancyDetailResponseSchema>
export type ApplicationRequest = z.infer<typeof applicationRequestSchema>
export type ApplicationStatusUpdateRequest = z.infer<
  typeof applicationStatusUpdateRequestSchema
>
export type ApplicationListParams = z.infer<typeof applicationListParamsSchema>
export type ApplicationSummaryResponse = z.infer<
  typeof applicationSummaryResponseSchema
>
export type ApplicationDetailResponse = z.infer<
  typeof applicationDetailResponseSchema
>
