import z from 'zod'
import {
  baseNullableLocationResponseSchema,
  nullableLocationRequestSchema
} from '@/types/shared/location'
import { isoDate } from '@/types/shared/primitives'
import {
  FollowPolicyList,
  JobSearchStatusList,
  SpecializationList,
  UserRoleList,
  UserStatusList
} from '@/types/shared/literals'
import { workExperienceResponseSchema } from './work-experience'
import { resumeSummaryResponseSchema } from './resume'
import { skillLinkResponseSchema } from '@/types/shared/skill'

// --- Requests ---
export const userUpdateRequestSchema = nullableLocationRequestSchema.extend({
  firstName: z.string().max(64).optional(),
  lastName: z.string().max(64).optional(),
  headline: z.string().max(120).optional(),
  birthdate: isoDate.optional(),
  bio: z.string().optional(),
  specialization: z.enum(SpecializationList).optional(),
  phoneNumber: z.string().max(32).optional(),
  githubUrl: z.string().optional(),
  telegramUsername: z.string().optional(),
  followPolicy: z.enum(FollowPolicyList).optional(),
  jobSearchStatus: z.enum(JobSearchStatusList).optional(),
  deleteAvatarKey: z.string().optional(),
  deleteBannerKey: z.string().optional()
})

// --- Responses ---
export const userSummaryResponseSchema =
  baseNullableLocationResponseSchema.extend({
    firstName: z.string(),
    lastName: z.string().optional(),
    headline: z.string().optional(),
    avatarUrl: z.string().optional(),
    specialization: z.enum(SpecializationList).optional(),
    jobSearchStatus: z.enum(JobSearchStatusList).optional(),

    followersCount: z.number().int(),
    followingsCount: z.number().int()
  })

export const userDetailResponseSchema =
  baseNullableLocationResponseSchema.extend({
    email: z.string(),
    emailVerified: z.boolean(),
    firstName: z.string(),
    lastName: z.string().optional(),
    headline: z.string().optional(),
    birthdate: isoDate.optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().optional(),
    bannerUrl: z.string().optional(),
    specialization: z.enum(SpecializationList).optional(),
    phoneNumber: z.string().optional(),
    githubUrl: z.string().optional(),
    telegramUsername: z.string().optional(),
    role: z.enum(UserRoleList),
    status: z.enum(UserStatusList),
    followPolicy: z.enum(FollowPolicyList).optional(),
    jobSearchStatus: z.enum(JobSearchStatusList).optional(),

    resumes: z.array(resumeSummaryResponseSchema),
    skills: z.array(skillLinkResponseSchema),
    workExperiences: z.array(workExperienceResponseSchema),

    followersCount: z.number().int(),
    followingsCount: z.number().int()
  })

// --- Types ---
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>
export type UserSummaryResponse = z.infer<typeof userSummaryResponseSchema>
export type UserDetailResponse = z.infer<typeof userDetailResponseSchema>
