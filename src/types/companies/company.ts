import z from 'zod'
import { baseSchema } from '@/types/shared/base'
import {
  cityResponseSchema,
  countryResponseSchema
} from '@/types/shared/location'
import {
  CompanyMemberRoleList,
  CompanyStatusList,
  CompanyTypeList
} from '@/types/shared/literals'
import {
  PaginatedResponseSchema,
  paginationQuerySchema
} from '@/types/shared/pagination'
import { uuid } from '@/types/shared/primitives'
import { userSummaryResponseSchema } from '@/types/users/user'

const queryBooleanSchema = z.preprocess((value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}, z.boolean())

const companyLocationResponseSchema = baseSchema.extend({
  country: countryResponseSchema,
  city: cityResponseSchema.optional()
})

// --- Company Requests ---
export const companyCreateRequestSchema = z.object({
  countryId: uuid,
  cityId: uuid.optional(),
  name: z.string().max(120),
  tagline: z.string().max(128).optional(),
  description: z.string().optional(),
  logoUrl: z.url().optional(),
  websiteUrl: z.url().optional(),
  type: z.enum(CompanyTypeList),
  contactEmail: z.email().optional(),
  contactPhone: z.string().max(32).optional()
})

export const companyUpdateRequestSchema = z.object({
  countryId: uuid.optional(),
  cityId: uuid.optional(),
  name: z.string().max(128).optional(),
  tagline: z.string().max(128).optional(),
  description: z.string().optional(),
  logoUrl: z.url().optional(),
  websiteUrl: z.url().optional(),
  type: z.enum(CompanyTypeList).optional(),
  contactEmail: z.email().optional(),
  contactPhone: z.string().max(32).optional()
})

export const companyListParamsSchema = paginationQuerySchema.extend({
  countryId: uuid.optional(),
  cityId: uuid.optional(),
  name: z.string().optional(),
  type: z.enum(CompanyTypeList).optional(),
  status: z.enum(CompanyStatusList).optional(),
  hasOpenVacancies: queryBooleanSchema.optional(),
  skillIds: z.array(uuid).optional()
})

// --- Company Responses ---
export const companySummaryResponseSchema =
  companyLocationResponseSchema.extend({
    name: z.string(),
    tagline: z.string().optional(),
    logoUrl: z.url().optional(),
    type: z.enum(CompanyTypeList),
    status: z.enum(CompanyStatusList),
    openVacanciesCount: z.number().int().optional()
  })

export const companyDetailResponseSchema = companySummaryResponseSchema.extend({
  description: z.string().optional(),
  websiteUrl: z.url().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  memberCount: z.number().int().optional(),
  members: z.array(z.lazy(() => companyMemberResponseSchema)).default([])
})

export const companyListResponseSchema = PaginatedResponseSchema(
  companySummaryResponseSchema
)

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
