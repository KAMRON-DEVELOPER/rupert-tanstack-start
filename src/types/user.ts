import type { IsoDate, IsoDateTime, UUID } from '@/types/primitives'
import { Id, Skill } from '@/types/types'
import {
  EmploymentType,
  FollowPolicy,
  FollowStatus,
  JobSearchStatus,
  ProficiencyLevel,
  SalaryCurrency,
  Specialization,
  UserRole,
  UserStatus,
  WorkFormat
} from '@/types/literals'

export interface AuthProbeSchema {
  isAuthenticated: boolean
}

export interface EmailAuthRequest {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface PasswordSetupRequest {
  password: string
}

export interface OAuthUserSchema extends Id {
  userId: UUID
  provider: string
  username: string | null
  email: string | null
  picture: string | null
}

export interface ResumeSkillLinkSchema extends Id {
  resumeId: UUID
  skill: Skill
  proficiency: ProficiencyLevel
  lastUsedAt: IsoDate | null
}

export interface SkillLinkRequest {
  skillId: UUID
  proficiency: ProficiencyLevel
  lastUsedAt?: IsoDate | null
}

export interface SkillLinkUpdateRequest {
  proficiency?: ProficiencyLevel | null
  lastUsedAt?: IsoDate | null
}

export interface ResumeSchema extends Id {
  userId: UUID
  title: string
  summary?: string | null
  specialization: Specialization
  country: string
  city: string
  salaryExpectationMin: number | null
  salaryExpectationMax: number | null
  salaryCurrency: SalaryCurrency | null
  workFormat: WorkFormat | null
  employmentType: EmploymentType | null
  skills?: ResumeSkillLinkSchema[]
}

export interface ResumeRequest {
  title: string
  summary?: string | null
  specialization: Specialization
  country: string
  city: string
  salaryExpectationMin?: number | null
  salaryExpectationMax?: number | null
  salaryCurrency?: SalaryCurrency | null
  workFormat?: WorkFormat | null
  employmentType?: EmploymentType | null
  skills?: SkillLinkRequest[]
}

export type ResumeUpdateRequest = Partial<ResumeRequest>

export interface ResumeCardSchema extends Id {
  userId: UUID
  title: string
  specialization: Specialization
  country: string
  city: string
  salaryExpectationMin: number | null
  salaryExpectationMax: number | null
  salaryCurrency: SalaryCurrency | null
  workFormat: WorkFormat | null
  employmentType: EmploymentType | null
}

export interface UserSkillLinkSchema extends Id {
  skill: Skill
  proficiency: ProficiencyLevel
  lastUsedAt: IsoDate | null
}

export interface WorkExperienceSchema extends Id {
  userId: UUID
  companyName: string
  location: string | null
  position: string
  description: string | null
  startedAt: IsoDate
  endedAt: IsoDate | null
  isCurrent: boolean
}

export interface WorkExperienceRequest {
  companyName: string
  location?: string | null
  position: string
  description?: string | null
  startedAt: IsoDate
  endedAt?: IsoDate | null
}

export type WorkExperienceUpdateRequest = Partial<WorkExperienceRequest>

export interface UserCardSchema extends Id {
  firstName: string
  lastName: string | null
  headline: string | null
  avatarUrl: string | null
  country: string | null
  city: string | null
  specialization: Specialization | null
  jobSearchStatus: JobSearchStatus
  followersCount: number
  followingsCount: number
}

export interface UserSchema extends Id {
  // Auth & Identity
  email: string
  emailVerified: boolean
  // Profile
  firstName: string
  lastName: string | null
  headline: string | null
  birthdate: IsoDate | null
  bio: string | null
  avatarUrl: string | null
  bannerUrl: string | null
  country: string | null
  city: string | null
  // Specialization
  specialization: Specialization | null
  // Contact
  phoneNumber: string | null
  githubUrl: string | null
  linkedinUrl?: string | null
  portfolioUrl?: string | null
  telegramUsername: string | null
  // System
  role: UserRole
  status: UserStatus
  followPolicy: FollowPolicy
  jobSearchStatus: JobSearchStatus
  // Relationships
  resumes: ResumeSchema[]
  skills: UserSkillLinkSchema[]
  workExperiences: WorkExperienceSchema[]
  // Computed
  followersCount: number
  followingsCount: number
}

type UserProfileUpdateRequest = Partial<
  Pick<
    UserSchema,
    | 'firstName'
    | 'lastName'
    | 'headline'
    | 'birthdate'
    | 'bio'
    | 'specialization'
    | 'phoneNumber'
    | 'githubUrl'
    | 'telegramUsername'
    | 'followPolicy'
    | 'jobSearchStatus'
    | 'country'
    | 'city'
  >
>

export type UserUpdateRequest = UserProfileUpdateRequest &
  Partial<{
    deleteAvatar: boolean | null
    deleteBanner: boolean | null
    avatar: File | null
    banner: File | null
  }>

export interface SessionSchema extends Id {
  userId: UUID
  userAgent: string | null
  ipAddr: string | null
  deviceName: string | null
  isActive: boolean
  lastActivityAt: IsoDateTime
}

export interface FollowUserSchema extends UserCardSchema {
  followPolicy: FollowPolicy
}

export interface FollowSchema extends Id {
  followerId: UUID
  followingId: UUID
  status: FollowStatus
  follower: FollowUserSchema | null
  following: FollowUserSchema | null
}

export interface FollowUpdateRequest {
  status: Extract<FollowStatus, 'accepted' | 'declined'>
}
