import type { IsoDateTime, UUID } from '@/types/primitives';
import { Skill } from '@/types/types';
import {
  EmploymentType,
  FollowPolicy,
  JobSearchStatus,
  ProficiencyLevel,
  SalaryCurrency,
  Specialization,
  UserRole,
  UserStatus,
  WorkFormat,
} from '@/types/literals';

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
  resumeId: UUID;
  skill: Skill;
  proficiency: ProficiencyLevel;
  lastUsedAt?: Date;
}

export interface Resume {
  userId: UUID;
  title: string;
  summary?: string;
  specialization: Specialization;
  country: string;
  city: string;
  salaryExpectationMin?: number;
  salaryExpectationMax?: number;
  salaryCurrency?: SalaryCurrency;
  workFormat?: WorkFormat;
  employmentType?: EmploymentType;
  skills: ResumeSkillLink[];
}

export interface ResumeCard {
  userId: UUID;
  title: string;
  specialization: Specialization;
  country: string;
  city: string;
  salaryExpectationMin?: number;
  salaryExpectationMax?: number;
  salaryCurrency?: SalaryCurrency;
  workFormat?: WorkFormat;
  employmentType?: EmploymentType;
}

export interface UserSkillLink {
  skill: Skill;
  proficiency: ProficiencyLevel;
  lastUsedAt?: Date;
}

export interface WorkExperience {
  userId: UUID;
  companyName: string;
  location?: string;
  position: string;
  description?: string;
  startedAt: Date;
  endedAt?: Date;
  isCurrent: boolean;
}

export interface UserCard {
  firstName: string;
  lastName?: string;
  headline?: string;
  avatarUrl?: string;
  country?: string;
  city?: string;
  specialization?: Specialization;
  jobSearchStatus: JobSearchStatus;
  followersCount: number;
  followingsCount: number;
}

export interface User {
  // Auth & Identity
  email: string;
  emailVerified: boolean;
  // Profile
  firstName: string;
  lastName?: string;
  headline?: string;
  birthdate?: Date;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  country?: string;
  city?: string;
  // Specialization
  specialization?: Specialization;
  // Contact
  phoneNumber?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  // System
  role: UserRole;
  status: UserStatus;
  followPolicy: FollowPolicy;
  jobSearchStatus: JobSearchStatus;
  // Relationships
  resumes: Resume[];
  skills: UserSkillLink[];
  workExperiences: WorkExperience[];
  // Computed
  followersCount: number;
  followingsCount: number;
}

export interface SessionOut {
  userId: UUID;
  userAgent?: string;
  ipAddr?: string;
  deviceName?: string;
  isActive: boolean;
  lastActivityAt: Date;
}
