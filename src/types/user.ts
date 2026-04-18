import type { IsoDateTime, UUID } from '@/types/primitives';
import { ProficiencyLevel, Skill } from '@/types/types';
import { EmploymentType, FollowPolicy, JobSearchStatus, SalaryCurrency, Specialization, UserRole, UserStatus, WorkFormat } from '@/types/literals';

export interface AuthProbe {
  isAuthenticated: boolean;
}

export interface OAuthUser {
  id: UUID;
  userId: UUID;
  provider: string;
  username?: string;
  email?: string;
  picture?: string;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export interface ResumeSkillLink {
  resume_id: UUID;
  skill: Skill;
  proficiency: ProficiencyLevel;
  last_used_at?: Date;
}

export interface Resume {
  user_id: UUID;
  title: string;
  summary?: string;
  specialization: Specialization;
  country: string;
  city: string;
  salary_expectation_min?: number;
  salary_expectation_max?: number;
  salary_currency?: SalaryCurrency;
  work_format?: WorkFormat;
  employment_type?: EmploymentType;
  skills: ResumeSkillLink[];
}

export interface ResumeCard {
  user_id: UUID;
  title: string;
  specialization: Specialization;
  country: string;
  city: string;
  salary_expectation_min?: number;
  salary_expectation_max?: number;
  salary_currency?: SalaryCurrency;
  work_format?: WorkFormat;
  employment_type?: EmploymentType;
}

export interface UserSkillLink {
  skill: Skill;
  proficiency: ProficiencyLevel;
  last_used_at?: Date;
}

export interface WorkExperience {
  user_id: UUID;
  company_name: string;
  location?: string;
  position: string;
  description?: string;
  started_at: Date;
  ended_at?: Date;
  is_current: boolean;
}

export interface UserCard {
  first_name: string;
  last_name?: string;
  headline?: string;
  avatar_url?: string;
  country?: string;
  city?: string;
  specialization?: Specialization;
  job_search_status: JobSearchStatus;
  followers_count: number;
  followings_count: number;
}

export interface User {
  // Auth & Identity
  email: string;
  email_verified: boolean;
  // Profile
  first_name: string;
  last_name?: string;
  headline?: string;
  birthdate?: Date;
  bio?: string;
  avatar_url?: string;
  banner_url?: string;
  country?: string;
  city?: string;
  // Specialization
  specialization?: Specialization;
  // Contact
  phone_number?: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  // System
  role: UserRole;
  status: UserStatus;
  follow_policy: FollowPolicy;
  job_search_status: JobSearchStatus;
  // Relationships
  resumes: Resume[];
  skills: UserSkillLink[];
  work_experiences: WorkExperience[];
  // Computed
  followers_count: number;
  followings_count: number;
}

export interface SessionOut {
  user_id: UUID;
  user_agent?: string;
  ip_addr?: string;
  device_name?: string;
  is_active: boolean;
  last_activity_at: Date;
}
