import { t as zod_default } from '../_libs/zod.mjs'
import { o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as baseSchema } from './base-DM7IIzOg.mjs'
import {
  c as locationRequestSchema,
  l as nullableLocationRequestSchema,
  t as baseLocationResponseSchema
} from './location-ExHvl-rC.mjs'
import {
  n as paginationQuerySchema,
  t as paginatedResponseSchema
} from './pagination-LyDEN9Vs.mjs'
import {
  _ as VacancyStatusList,
  d as ProficiencyLevelList,
  f as SalaryCurrencyList,
  m as SubmissionTypeList,
  o as EmploymentTypeList,
  p as SpecializationList,
  t as ApplicationStatusList,
  u as PaymentFrequencyList,
  v as WorkFormatList
} from './literals-DmvvSYvr.mjs'
import { a as skillResponseSchema } from './skill-WC7CHsIh.mjs'
import { t as resumeResponseSchema } from './resume-CN48r55P.mjs'
import { n as userSummaryResponseSchema } from './user-DgDcvuBc.mjs'
import { r as companySummaryResponseSchema } from './company-Ceac0N8k.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/vacancy-BU3XEoF-.js
var vacancySkillLinkRequestSchema = zod_default.object({
  skillId: uuid,
  proficiency: zod_default.enum(ProficiencyLevelList),
  yearsOfExperienceMin: zod_default.number().nullish(),
  isRequired: zod_default.boolean().default(true)
})
zod_default.object({
  proficiency: zod_default.enum(ProficiencyLevelList).nullish(),
  yearsOfExperienceMin: zod_default.number().nullish(),
  isRequired: zod_default.boolean().nullish()
})
var vacancySkillLinkResponseSchema = baseSchema.extend({
  vacancyId: uuid,
  skill: skillResponseSchema,
  proficiency: zod_default.enum(ProficiencyLevelList),
  yearsOfExperienceMin: zod_default.number().nullish(),
  isRequired: zod_default.boolean()
})
locationRequestSchema.extend({
  title: zod_default.string().max(128),
  description: zod_default.string(),
  externalApplyUrl: zod_default.url().nullish(),
  submissionType: zod_default.enum(SubmissionTypeList),
  specialization: zod_default.enum(SpecializationList),
  salaryMin: zod_default.number().int().min(0).nullish(),
  salaryMax: zod_default.number().int().min(0).nullish(),
  salaryCurrency: zod_default.enum(SalaryCurrencyList).nullish(),
  paymentFrequency: zod_default.enum(PaymentFrequencyList).nullish(),
  yearsOfExperienceMin: zod_default.number().min(0).nullish(),
  workFormat: zod_default.enum(WorkFormatList).default('onsite'),
  workHoursPerWeek: zod_default.number().int().min(1).max(168).nullish(),
  employmentType: zod_default.enum(EmploymentTypeList).default('full_time'),
  status: zod_default.enum(VacancyStatusList).default('draft'),
  skills: zod_default.array(vacancySkillLinkRequestSchema).nullish()
})
nullableLocationRequestSchema.extend({
  title: zod_default.string().max(128).nullish(),
  description: zod_default.string().nullish(),
  externalApplyUrl: zod_default.url().nullish(),
  submissionType: zod_default.enum(SubmissionTypeList).nullish(),
  specialization: zod_default.enum(SpecializationList).nullish(),
  salaryMin: zod_default.number().int().min(0).nullish(),
  salaryMax: zod_default.number().int().min(0).nullish(),
  salaryCurrency: zod_default.enum(SalaryCurrencyList).nullish(),
  paymentFrequency: zod_default.enum(PaymentFrequencyList).nullish(),
  yearsOfExperienceMin: zod_default.number().min(0).nullish(),
  workFormat: zod_default.enum(WorkFormatList).nullish(),
  workHoursPerWeek: zod_default.number().int().min(1).max(168).nullish(),
  employmentType: zod_default.enum(EmploymentTypeList).nullish(),
  status: zod_default.enum(VacancyStatusList).nullish(),
  skills: zod_default.array(vacancySkillLinkRequestSchema).nullish()
})
var vacancyListParamsSchema = paginationQuerySchema.extend({
  title: zod_default.string().nullish(),
  submissionType: zod_default.enum(SubmissionTypeList).nullish(),
  specialization: zod_default
    .array(zod_default.enum(SpecializationList))
    .nullish(),
  salaryMin: zod_default.number().nullish(),
  salaryMax: zod_default.number().nullish(),
  salaryCurrency: zod_default.enum(SalaryCurrencyList).nullish(),
  yearsOfExperienceMin: zod_default.number().nullish(),
  workFormat: zod_default.enum(WorkFormatList).nullish(),
  employmentType: zod_default.enum(EmploymentTypeList).nullish(),
  status: zod_default.enum(VacancyStatusList).nullish(),
  countryId: zod_default.uuid().nullish(),
  cityId: zod_default.uuid().nullish(),
  skillIds: zod_default.array(zod_default.uuid()).nullish(),
  postedWithinDays: zod_default.number().int().positive().nullish()
})
var vacancySummaryResponseSchema = baseLocationResponseSchema.extend({
  company: companySummaryResponseSchema,
  title: zod_default.string(),
  submissionType: zod_default.enum(SubmissionTypeList),
  specialization: zod_default.enum(SpecializationList),
  salaryMin: zod_default.number().int().nullish(),
  salaryMax: zod_default.number().int().nullish(),
  salaryCurrency: zod_default.enum(SalaryCurrencyList).nullish(),
  yearsOfExperienceMin: zod_default.number().nullish(),
  workFormat: zod_default.enum(WorkFormatList),
  employmentType: zod_default.enum(EmploymentTypeList),
  status: zod_default.enum(VacancyStatusList),
  isSaved: zod_default.boolean().nullish(),
  hasApplied: zod_default.boolean().nullish()
})
var vacancyDetailResponseSchema = vacancySummaryResponseSchema.extend({
  description: zod_default.string(),
  externalApplyUrl: zod_default.url().nullish(),
  workHoursPerWeek: zod_default.number().int().nullish(),
  paymentFrequency: zod_default.enum(PaymentFrequencyList).nullish(),
  skillLinks: zod_default.array(vacancySkillLinkResponseSchema)
})
var vacancyListResponseSchema = paginatedResponseSchema(
  vacancySummaryResponseSchema
)
zod_default.object({
  vacancyId: uuid,
  resumeId: uuid.nullish(),
  coverLetter: zod_default.string().nullish()
})
zod_default.object({
  status: zod_default.enum(ApplicationStatusList),
  recruiterNote: zod_default.string().nullish()
})
var applicationListParamsSchema = paginationQuerySchema.extend({
  vacancyId: uuid.nullish(),
  applicantId: uuid.nullish(),
  status: zod_default.enum(ApplicationStatusList).nullish()
})
var applicationSummaryResponseSchema = baseSchema.extend({
  vacancyId: uuid,
  applicantId: uuid,
  status: zod_default.enum(ApplicationStatusList),
  coverLetter: zod_default.string().nullish(),
  vacancy: vacancySummaryResponseSchema,
  resume: resumeResponseSchema.nullish()
})
var applicationDetailResponseSchema = applicationSummaryResponseSchema.extend({
  applicant: userSummaryResponseSchema,
  recruiterNote: zod_default.string().nullish()
})
var applicationListResponseSchema = paginatedResponseSchema(
  applicationSummaryResponseSchema
)
//#endregion
export {
  vacancyListParamsSchema as a,
  vacancyDetailResponseSchema as i,
  applicationListParamsSchema as n,
  vacancyListResponseSchema as o,
  applicationListResponseSchema as r,
  applicationDetailResponseSchema as t
}
