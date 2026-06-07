import { CompanyCardSchema } from '@/types/companies/company'
import type {
  CitySchema,
  CountrySchema
} from '@/types/location/location.schema'
import {
  ApplicationStatus,
  EmploymentType,
  PaymentFrequency,
  ProficiencyLevel,
  SalaryCurrency,
  Specialization,
  SubmissionType,
  VacancyStatus,
  WorkFormat
} from '@/types/shared/literals'
import { UUID } from '@/types/shared/primitives'
import { Id } from '@/types/shared/types'
import { ResumeCardSchema, UserCardSchema } from '@/types/users/user'

export interface VacancySkillLinkSchema extends Id {
  vacancyId: UUID
  skill: SkillS
  proficiency: ProficiencyLevel
  yearsOfExperienceMin: number | null
  isRequired: boolean
}

export interface VacancySkillLinkRequest {
  skillId: UUID
  proficiency: ProficiencyLevel
  yearsOfExperienceMin?: number | null
  isRequired?: boolean
}

export interface VacancySkillLinkUpdateRequest {
  proficiency?: ProficiencyLevel | null
  yearsOfExperienceMin?: number | null
  isRequired?: boolean | null
}

export interface VacancyCardSchema extends Id {
  company: CompanyCardSchema
  title: string
  submissionType: SubmissionType
  specialization: Specialization
  salaryMin: number | null
  salaryMax: number | null
  salaryCurrency: SalaryCurrency | null
  yearsOfExperienceMin: number | null
  workFormat: WorkFormat
  employmentType: EmploymentType
  status: VacancyStatus
  country: CountrySchema
  city: CitySchema | null
  isSaved: boolean | null
  hasApplied: boolean | null
}

export interface VacancySchema extends VacancyCardSchema {
  description: string
  externalApplyUrl: string | null
  workHoursPerWeek: number | null
  paymentFrequency: PaymentFrequency | null
  skillLinks: VacancySkillLinkSchema[]
}

export interface VacancyRequest {
  title: string
  description: string
  countryId: UUID
  cityId?: UUID | null
  externalApplyUrl?: string | null
  submissionType: SubmissionType
  specialization: Specialization
  salaryMin?: number | null
  salaryMax?: number | null
  salaryCurrency?: SalaryCurrency | null
  paymentFrequency?: PaymentFrequency | null
  yearsOfExperienceMin?: number | null
  workFormat?: WorkFormat
  workHoursPerWeek?: number | null
  employmentType?: EmploymentType
  status?: VacancyStatus
  skills?: VacancySkillLinkRequest[]
}

export type VacancyUpdateRequest = Partial<VacancyRequest>

export interface ApplicationCardSchema extends Id {
  vacancyId: UUID
  applicantId: UUID
  status: ApplicationStatus
  coverLetter: string | null
  vacancy: VacancyCardSchema
  resume: ResumeCardSchema | null
}

export interface ApplicationSchema extends ApplicationCardSchema {
  applicant: UserCardSchema
  recruiterNote: string | null
}

export interface ApplicationRequest {
  vacancyId: UUID
  resumeId?: UUID | null
  coverLetter?: string | null
}

export interface ApplicationStatusUpdateRequest {
  status: ApplicationStatus
  recruiterNote?: string | null
}

export interface SavedVacancySchema {
  vacancy: VacancyCardSchema
}
