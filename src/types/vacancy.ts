import { CompanyCardSchema } from '@/types/company';
import {
  ApplicationStatus,
  EmploymentType,
  PaymentFrequency,
  ProficiencyLevel,
  SalaryCurrency,
  Specialization,
  SubmissionType,
  VacancyStatus,
  WorkFormat,
} from '@/types/literals';
import { UUID } from '@/types/primitives';
import { Id, Skill } from '@/types/types';
import { ResumeCardSchema, UserCardSchema } from '@/types/user';

export interface VacancySkillLinkSchema {
  skill: Skill;
  proficiency: ProficiencyLevel;
  yearsOfExperienceMin?: number;
  isRequired: boolean;
}

export interface VacancyCardSchema extends Id {
  company: CompanyCardSchema;
  title: string;
  submissionType: SubmissionType;
  specialization: Specialization;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
  yearsOfExperienceMin?: number;
  workFormat: WorkFormat;
  employmentType: EmploymentType;
  status: VacancyStatus;
  country: string;
  city: string;
  isSaved: boolean;
  hasApplied: boolean;
}

export interface VacancySchema extends VacancyCardSchema {
  description: string;
  externalApplyUrl?: string;
  workHoursPerWeek?: number;
  paymentFrequency?: PaymentFrequency;
  skill_links: VacancySkillLinkSchema[];
}

export interface ApplicationCardSchema extends Id {
  vacancyId: UUID;
  applicantId: UUID;
  status: ApplicationStatus;
  coverLetter?: string;
  vacancy: VacancyCardSchema;
  resume?: ResumeCardSchema;
}

export interface ApplicationSchema {
  applicant: UserCardSchema;
  recruiterNote?: string;
}

export interface SavedVacancyScema {
  vacancy: VacancyCardSchema;
}
