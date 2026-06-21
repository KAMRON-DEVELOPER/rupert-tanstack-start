import { t as zod_default } from '../_libs/zod.mjs'
import { o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as baseSchema } from './base-DM7IIzOg.mjs'
import {
  i as cityResponseSchema,
  o as countryResponseSchema
} from './location-ExHvl-rC.mjs'
import { n as paginationQuerySchema } from './pagination-LyDEN9Vs.mjs'
import {
  a as CompanyTypeList,
  i as CompanyStatusList,
  r as CompanyMemberRoleList
} from './literals-DmvvSYvr.mjs'
import { n as userSummaryResponseSchema } from './user-DgDcvuBc.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/company-Ceac0N8k.js
var queryBooleanSchema = zod_default.preprocess((value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}, zod_default.boolean())
var companyLocationResponseSchema = baseSchema.extend({
  country: countryResponseSchema,
  city: cityResponseSchema.nullish()
})
zod_default.object({
  countryId: uuid,
  cityId: uuid.nullish(),
  name: zod_default.string().max(120),
  tagline: zod_default.string().max(128).nullish(),
  description: zod_default.string().nullish(),
  logoUrl: zod_default.url().nullish(),
  websiteUrl: zod_default.url().nullish(),
  type: zod_default.enum(CompanyTypeList),
  contactEmail: zod_default.email().nullish(),
  contactPhone: zod_default.string().max(32).nullish()
})
zod_default.object({
  countryId: uuid.nullish(),
  cityId: uuid.nullish(),
  name: zod_default.string().max(128).nullish(),
  tagline: zod_default.string().max(128).nullish(),
  description: zod_default.string().nullish(),
  logoUrl: zod_default.url().nullish(),
  websiteUrl: zod_default.url().nullish(),
  type: zod_default.enum(CompanyTypeList).nullish(),
  contactEmail: zod_default.email().nullish(),
  contactPhone: zod_default.string().max(32).nullish()
})
var companyListParamsSchema = paginationQuerySchema.extend({
  countryId: uuid.nullish(),
  cityId: uuid.nullish(),
  name: zod_default.string().nullish(),
  type: zod_default.enum(CompanyTypeList).nullish(),
  status: zod_default.enum(CompanyStatusList).nullish(),
  hasOpenVacancies: queryBooleanSchema.nullish(),
  own: queryBooleanSchema.nullish()
})
var companySummaryResponseSchema = companyLocationResponseSchema.extend({
  name: zod_default.string(),
  tagline: zod_default.string().nullish(),
  logoUrl: zod_default.url().nullish(),
  type: zod_default.enum(CompanyTypeList),
  status: zod_default.enum(CompanyStatusList),
  openVacanciesCount: zod_default.number().int().nullish()
})
var companyDetailResponseSchema = companySummaryResponseSchema.extend({
  description: zod_default.string().nullish(),
  websiteUrl: zod_default.url().nullish(),
  contactEmail: zod_default.string().nullish(),
  contactPhone: zod_default.string().nullish(),
  memberCount: zod_default.number().int().nullish(),
  members: zod_default
    .array(zod_default.lazy(() => companyMemberResponseSchema))
    .default([])
})
zod_default.object({
  userId: uuid,
  role: zod_default.enum(CompanyMemberRoleList).default('member')
})
zod_default.object({ role: zod_default.enum(CompanyMemberRoleList) })
var companyMemberResponseSchema = baseSchema.extend({
  user: userSummaryResponseSchema,
  companyId: uuid,
  role: zod_default.enum(CompanyMemberRoleList)
})
//#endregion
export {
  companyListParamsSchema as n,
  companySummaryResponseSchema as r,
  companyDetailResponseSchema as t
}
