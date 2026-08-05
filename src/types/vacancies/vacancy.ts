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
  paginatedResponseSchema,
  paginationQuerySchema
} from '@/types/shared/pagination'
import { uuid } from '@/types/shared/primitives'
import { companySummaryResponseSchema } from '@/types/companies/company'
import { resumeResponseSchema } from '@/types/users/resume'
import { userSummaryResponseSchema } from '@/types/users/user'
import { skillResponseSchema } from '@/types/shared/skill'

// --- Vacancy Skill Link ---
export const vacancySkillLinkRequestSchema = z.object({
  skillId: uuid,
  proficiency: z.enum(ProficiencyLevelList),
  yearsOfExperienceMin: z.number().nullish(),
  isRequired: z.boolean().default(true)
})

export const vacancySkillLinkUpdateRequestSchema = z.object({
  proficiency: z.enum(ProficiencyLevelList).nullish(),
  yearsOfExperienceMin: z.number().nullish(),
  isRequired: z.boolean().nullish()
})

export const vacancySkillLinkResponseSchema = baseSchema.extend({
  vacancyId: uuid,
  skill: skillResponseSchema,
  proficiency: z.enum(ProficiencyLevelList),
  yearsOfExperienceMin: z.number().nullish(),
  isRequired: z.boolean()
})

// --- Vacancy Requests ---
export const vacancyCreateRequestSchema = locationRequestSchema.extend({
  title: z.string().max(128),
  description: z.string(),
  externalApplyUrl: z.url().nullish(),
  submissionType: z.enum(SubmissionTypeList),
  specialization: z.enum(SpecializationList),
  salaryMin: z.number().int().min(0).nullish(),
  salaryMax: z.number().int().min(0).nullish(),
  salaryCurrency: z.enum(SalaryCurrencyList).nullish(),
  paymentFrequency: z.enum(PaymentFrequencyList).nullish(),
  yearsOfExperienceMin: z.number().min(0).nullish(),
  workFormat: z.enum(WorkFormatList).default('onsite'),
  workHoursPerWeek: z.number().int().min(1).max(168).nullish(),
  employmentType: z.enum(EmploymentTypeList).default('full_time'),
  status: z.enum(VacancyStatusList).default('draft'),
  skills: z.array(vacancySkillLinkRequestSchema).nullish()
})

export const vacancyUpdateRequestSchema = nullableLocationRequestSchema.extend({
  title: z.string().max(128).nullish(),
  description: z.string().nullish(),
  externalApplyUrl: z.url().nullish(),
  submissionType: z.enum(SubmissionTypeList).nullish(),
  specialization: z.enum(SpecializationList).nullish(),
  salaryMin: z.number().int().min(0).nullish(),
  salaryMax: z.number().int().min(0).nullish(),
  salaryCurrency: z.enum(SalaryCurrencyList).nullish(),
  paymentFrequency: z.enum(PaymentFrequencyList).nullish(),
  yearsOfExperienceMin: z.number().min(0).nullish(),
  workFormat: z.enum(WorkFormatList).nullish(),
  workHoursPerWeek: z.number().int().min(1).max(168).nullish(),
  employmentType: z.enum(EmploymentTypeList).nullish(),
  status: z.enum(VacancyStatusList).nullish(),
  skills: z.array(vacancySkillLinkRequestSchema).nullish()
})

const numberOrNullish = z.coerce.number().nullish()
const specializationArraySchema = z.preprocess(
  (value) => {
    if (value == null || value === '') return value
    return Array.isArray(value) ? value : [value]
  },
  z.array(z.enum(SpecializationList)).nullish()
)
const uuidArraySchema = z.preprocess((value) => {
  if (value == null || value === '') return value
  return Array.isArray(value) ? value : [value]
}, z.array(z.uuid()).nullish())

export const vacancyListParamsSchema = paginationQuerySchema.extend({
  companyId: uuid.nullish(),
  title: z.string().nullish(),
  submissionType: z.enum(SubmissionTypeList).nullish(),
  specialization: specializationArraySchema,
  salaryMin: numberOrNullish,
  salaryMax: numberOrNullish,
  salaryCurrency: z.enum(SalaryCurrencyList).nullish(),
  yearsOfExperienceMin: numberOrNullish,
  workFormat: z.enum(WorkFormatList).nullish(),
  employmentType: z.enum(EmploymentTypeList).nullish(),
  status: z.enum(VacancyStatusList).nullish(),
  countryId: z.uuid().nullish(),
  cityId: z.uuid().nullish(),
  skillIds: uuidArraySchema,
  postedWithinDays: z.coerce.number().int().positive().nullish()
})

// --- Vacancy Responses ---
export const vacancySummaryResponseSchema = baseLocationResponseSchema.extend({
  company: companySummaryResponseSchema,
  title: z.string(),
  submissionType: z.enum(SubmissionTypeList),
  specialization: z.enum(SpecializationList),
  salaryMin: z.number().int().nullish(),
  salaryMax: z.number().int().nullish(),
  salaryCurrency: z.enum(SalaryCurrencyList).nullish(),
  yearsOfExperienceMin: z.number().nullish(),
  workFormat: z.enum(WorkFormatList),
  employmentType: z.enum(EmploymentTypeList),
  status: z.enum(VacancyStatusList),
  isSaved: z.boolean().nullish(),
  hasApplied: z.boolean().nullish()
})

export const vacancyDetailResponseSchema = vacancySummaryResponseSchema.extend({
  description: z.string(),
  externalApplyUrl: z.url().nullish(),
  workHoursPerWeek: z.number().int().nullish(),
  paymentFrequency: z.enum(PaymentFrequencyList).nullish(),
  skillLinks: z.array(vacancySkillLinkResponseSchema),
  permission: z.object({ isOwner: z.boolean() })
})

export const vacancyListResponseSchema = paginatedResponseSchema(
  vacancySummaryResponseSchema
)

// --- Application Requests ---
export const applicationRequestSchema = z.object({
  vacancyId: uuid,
  resumeId: uuid.nullish(),
  coverLetter: z.string().nullish()
})

export const applicationStatusUpdateRequestSchema = z.object({
  status: z.enum(ApplicationStatusList),
  recruiterNote: z.string().nullish()
})

export const applicationListParamsSchema = paginationQuerySchema.extend({
  applicantId: uuid.nullish(),
  status: z.enum(ApplicationStatusList).nullish()
})

// --- Application Responses ---
export const applicationSummaryResponseSchema = baseSchema.extend({
  vacancyId: uuid,
  applicantId: uuid,
  status: z.enum(ApplicationStatusList),
  coverLetter: z.string().nullish(),
  vacancy: vacancySummaryResponseSchema,
  resume: resumeResponseSchema.nullish()
})

export const applicationDetailResponseSchema =
  applicationSummaryResponseSchema.extend({
    applicant: userSummaryResponseSchema,
    recruiterNote: z.string().nullish()
  })

export const applicationListResponseSchema = paginatedResponseSchema(
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
