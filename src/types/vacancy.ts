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
import { Skill } from '@/types/types';
import { ResumeCard, UserCard } from '@/types/user';

export interface VacancySkillLink {
  skill: Skill;
  proficiency: ProficiencyLevel;
  years_of_experience_min?: number;
  is_required: boolean;
}

export interface VacancyCard {
  company: CompanyCard;

  title: string;

  specialization: Specialization;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: SalaryCurrency;
  payment_frequency?: PaymentFrequency;

  country: string;
  city: string;

  status: VacancyStatus;

  years_of_experience_min?: number;
  work_format: WorkFormat;
  employment_type: EmploymentType;
  work_hours_per_week?: number;

  is_saved: boolean;
  has_applied: boolean;
}

export interface ApplicationOut {
  vacancy_id: UUID;
  applicant_id: UUID;
  status: ApplicationStatus;
  cover_letter?: string;

  vacancy: VacancyCard;
  resume?: ResumeCard;
}

export interface ApplicationDetailOut {
  applicant: UserCard;
  recruiter_note?: string;
}

export interface SavedVacancy {
  vacancy: VacancyCard;
}
