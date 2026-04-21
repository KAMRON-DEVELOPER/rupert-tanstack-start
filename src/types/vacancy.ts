import { CompanyCardSchema } from '@/types/company';
import {
  ApplicationStatus,
  EmploymentType,
  PaymentFrequency,
  ProficiencyLevel,
  SalaryCurrency,
  Specialization,
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
  specialization: Specialization;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
  paymentFrequency?: PaymentFrequency;
  country: string;
  city: string;
  status: VacancyStatus;
  yearsOfExperienceMin?: number;
  workFormat: WorkFormat;
  employmentType: EmploymentType;
  workHoursPerWeek?: number;
  isSaved: boolean;
  hasApplied: boolean;
}

export interface ApplicationCardSchema extends Id {
  vacancyId: UUID;
  applicantId: UUID;
  status: ApplicationStatus;
  coverLetter?: string;
  vacancy: VacancyCardSchema;
  resume?: ResumeCardSchema;
}

export interface ApplicationDetailSchema {
  applicant: UserCardSchema;
  recruiterNote?: string;
}

export interface SavedVacancyScema {
  vacancy: VacancyCardSchema;
}
