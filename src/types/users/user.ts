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

// --- Requests ---
export const userUpdateRequestSchema = nullableLocationRequestSchema.extend({
  firstName: z.string().max(64).nullish(),
  lastName: z.string().max(64).nullish(),
  headline: z.string().max(120).nullish(),
  birthdate: isoDate.nullish(),
  bio: z.string().nullish(),
  specialization: z.enum(SpecializationList).nullish(),
  phoneNumber: z.string().max(32).nullish(),
  githubUrl: z.string().nullish(),
  telegramUsername: z.string().nullish(),
  followPolicy: z.enum(FollowPolicyList).nullish(),
  jobSearchStatus: z.enum(JobSearchStatusList).nullish(),
  deleteAvatarKey: z.string().nullish(),
  deleteBannerKey: z.string().nullish()
})

// --- Responses ---
export const userSummaryResponseSchema =
  baseNullableLocationResponseSchema.extend({
    firstName: z.string(),
    lastName: z.string().nullish(),
    headline: z.string().nullish(),
    avatarUrl: z.string().nullish(),
    specialization: z.enum(SpecializationList).nullish(),
    jobSearchStatus: z.enum(JobSearchStatusList).nullish(),

    followersCount: z.number().int(),
    followingsCount: z.number().int()
  })

export const userDetailResponseSchema =
  baseNullableLocationResponseSchema.extend({
    email: z.string(),
    emailVerified: z.boolean(),
    firstName: z.string(),
    lastName: z.string().nullish(),
    headline: z.string().nullish(),
    birthdate: isoDate.nullish(),
    bio: z.string().nullish(),
    avatarUrl: z.string().nullish(),
    bannerUrl: z.string().nullish(),
    specialization: z.enum(SpecializationList).nullish(),
    phoneNumber: z.string().nullish(),
    githubUrl: z.string().nullish(),
    telegramUsername: z.string().nullish(),
    role: z.enum(UserRoleList),
    status: z.enum(UserStatusList),
    followPolicy: z.enum(FollowPolicyList),
    jobSearchStatus: z.enum(JobSearchStatusList),

    followersCount: z.number().int(),
    followingsCount: z.number().int(),
    permission: z.object({ isOwner: z.boolean() })
  })

// --- Types ---
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>
export type UserSummaryResponse = z.infer<typeof userSummaryResponseSchema>
export type UserDetailResponse = z.infer<typeof userDetailResponseSchema>
