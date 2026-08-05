import { baseSchema } from '@/types/shared/base'
import {
  CompanyMemberRoleList,
  CompanyStatusList,
  CompanyTypeList
} from '@/types/shared/literals'
import {
  cityResponseSchema,
  countryResponseSchema
} from '@/types/shared/location'
import { paginationQuerySchema } from '@/types/shared/pagination'
import { uuid } from '@/types/shared/primitives'
import { userSummaryResponseSchema } from '@/types/users/user'
import z from 'zod'

const queryBooleanSchema = z.preprocess((value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}, z.boolean())

const companyLocationResponseSchema = baseSchema.extend({
  country: countryResponseSchema,
  city: cityResponseSchema.nullish()
})

// --- Company Requests ---
export const companyCreateRequestSchema = z.object({
  countryId: uuid,
  cityId: uuid.nullish(),
  name: z.string().max(120),
  tagline: z.string().max(128).nullish(),
  description: z.string().nullish(),
  logoUrl: z.url().nullish(),
  websiteUrl: z.url().nullish(),
  type: z.enum(CompanyTypeList),
  contactEmail: z.email().nullish(),
  contactPhone: z.string().max(32).nullish()
})

export const companyUpdateRequestSchema = z.object({
  countryId: uuid.nullish(),
  cityId: uuid.nullish(),
  name: z.string().max(128).nullish(),
  tagline: z.string().max(128).nullish(),
  description: z.string().nullish(),
  logoUrl: z.url().nullish(),
  websiteUrl: z.url().nullish(),
  type: z.enum(CompanyTypeList).nullish(),
  contactEmail: z.email().nullish(),
  contactPhone: z.string().max(32).nullish()
})

export const companyListParamsSchema = paginationQuerySchema.extend({
  countryId: uuid.nullish(),
  cityId: uuid.nullish(),
  name: z.string().nullish(),
  type: z.enum(CompanyTypeList).nullish(),
  status: z.enum(CompanyStatusList).nullish(),
  hasOpenVacancies: queryBooleanSchema.nullish(),
  own: queryBooleanSchema.nullish()
})

// --- Company Responses ---
export const companySummaryResponseSchema =
  companyLocationResponseSchema.extend({
    name: z.string(),
    tagline: z.string().nullish(),
    logoUrl: z.url().nullish(),
    type: z.enum(CompanyTypeList),
    status: z.enum(CompanyStatusList),
    openVacanciesCount: z.number().int().nullish()
  })

export const companyDetailResponseSchema = companySummaryResponseSchema.extend({
  description: z.string().nullish(),
  websiteUrl: z.url().nullish(),
  contactEmail: z.string().nullish(),
  contactPhone: z.string().nullish(),
  memberCount: z.number().int().nullish(),
  members: z.array(z.lazy(() => companyMemberResponseSchema)).default([]),
  permission: z.object({ isOwner: z.boolean() })
})

// --- Company Member Requests ---
export const companyMemberInviteRequestSchema = z.object({
  userId: uuid,
  role: z.enum(CompanyMemberRoleList).default('member')
})

export const companyMemberRoleUpdateRequestSchema = z.object({
  role: z.enum(CompanyMemberRoleList)
})

// --- Company Member Responses ---

export const companyMemberResponseSchema = baseSchema.extend({
  user: userSummaryResponseSchema,
  companyId: uuid,
  role: z.enum(CompanyMemberRoleList)
})

// --- Types ---
export type CompanyCreateRequest = z.infer<typeof companyCreateRequestSchema>
export type CompanyUpdateRequest = z.infer<typeof companyUpdateRequestSchema>
export type CompanyListParams = z.infer<typeof companyListParamsSchema>
export type CompanySummaryResponse = z.infer<
  typeof companySummaryResponseSchema
>
export type CompanyDetailResponse = z.infer<typeof companyDetailResponseSchema>
export type CompanyMemberInviteRequest = z.infer<
  typeof companyMemberInviteRequestSchema
>
export type CompanyMemberRoleUpdateRequest = z.infer<
  typeof companyMemberRoleUpdateRequestSchema
>
export type CompanyMemberResponse = z.infer<typeof companyMemberResponseSchema>
