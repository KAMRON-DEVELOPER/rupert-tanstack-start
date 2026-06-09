import {
  FollowPolicyList,
  JobSearchStatusList,
  SpecializationList,
  UserRoleList,
  UserStatusList
} from '@/types/shared/literals'
import { baseNullableLocationResponseSchema } from '@/types/shared/location'
import { isoDate } from '@/types/shared/primitives'
import z from 'zod'

export const authProbeResponseSchema = z.object({
  isAuthenticated: z.boolean()
})

export const emailAuthRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(24),
  firstName: z.string().min(8).max(24).optional(),
  lastName: z.string().min(8).max(24).optional()
})

const emailAuthSuccessResponseSchema =
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
    followPolicy: z.enum(FollowPolicyList),
    jobSearchStatus: z.enum(JobSearchStatusList)
  })

const emailAuthNewUserSchema = z.object({
  type: z.literal('new_user')
})

const emailAuthSetupPasswordSchema = z.object({
  type: z.literal('setup_password'),
  message: z.string()
})

const emailAuthSuccessSchema = emailAuthSuccessResponseSchema.extend({
  type: z.literal('success')
})

export const emailAuthResponseSchema = z.discriminatedUnion('type', [
  emailAuthNewUserSchema,
  emailAuthSetupPasswordSchema,
  emailAuthSuccessSchema
])

export type AuthProbeResponse = z.infer<typeof authProbeResponseSchema>
export type EmailAuthRequest = z.infer<typeof emailAuthRequestSchema>
export type EmailAuthNewUser = z.infer<typeof emailAuthNewUserSchema>
export type EmailAuthSetupPassword = z.infer<
  typeof emailAuthSetupPasswordSchema
>
export type EmailAuthSuccess = z.infer<typeof emailAuthSuccessSchema>
export type EmailAuthResponse = z.infer<typeof emailAuthResponseSchema>

export const passwordSetupRequestSchema = z.object({
  password: z.string().min(8).max(24)
})

export type PasswordSetupRequest = z.infer<typeof passwordSetupRequestSchema>
