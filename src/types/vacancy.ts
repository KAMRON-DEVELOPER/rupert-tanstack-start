import { CompanyCard } from '@/types/company';
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
import { ResumeCard, UserCard } from '@/types/user';

export interface VacancySkillLink {
  skill: Skill;
  proficiency: ProficiencyLevel;
  yearsOfExperienceMin?: number;
  isRequired: boolean;
}

export interface VacancyCardType extends Id {
  company: CompanyCard;
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

export interface ApplicationCardType extends Id {
  vacancyId: UUID;
  applicantId: UUID;
  status: ApplicationStatus;
  coverLetter?: string;
  vacancy: VacancyCardType;
  resume?: ResumeCard;
}

export interface ApplicationDetail {
  applicant: UserCard;
  recruiterNote?: string;
}

export interface SavedVacancyType {
  vacancy: VacancyCardType;
}
