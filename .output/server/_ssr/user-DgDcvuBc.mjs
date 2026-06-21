import { t as zod_default } from '../_libs/zod.mjs'
import { i as isoDate } from './primitives-BmQBoQXc.mjs'
import {
  l as nullableLocationRequestSchema,
  n as baseNullableLocationResponseSchema
} from './location-ExHvl-rC.mjs'
import {
  g as UserStatusList,
  h as UserRoleList,
  l as JobSearchStatusList,
  p as SpecializationList,
  s as FollowPolicyList
} from './literals-DmvvSYvr.mjs'
import { n as skillLinkResponseSchema } from './skill-WC7CHsIh.mjs'
import { t as workExperienceResponseSchema } from './work-experience-lv5LN9sE.mjs'
import { t as resumeResponseSchema } from './resume-CN48r55P.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/user-DgDcvuBc.js
var userUpdateRequestSchema = nullableLocationRequestSchema.extend({
  firstName: zod_default.string().max(64).nullish(),
  lastName: zod_default.string().max(64).nullish(),
  headline: zod_default.string().max(120).nullish(),
  birthdate: isoDate.nullish(),
  bio: zod_default.string().nullish(),
  specialization: zod_default.enum(SpecializationList).nullish(),
  phoneNumber: zod_default.string().max(32).nullish(),
  githubUrl: zod_default.string().nullish(),
  telegramUsername: zod_default.string().nullish(),
  followPolicy: zod_default.enum(FollowPolicyList).nullish(),
  jobSearchStatus: zod_default.enum(JobSearchStatusList).nullish(),
  deleteAvatarKey: zod_default.string().nullish(),
  deleteBannerKey: zod_default.string().nullish()
})
var userSummaryResponseSchema = baseNullableLocationResponseSchema.extend({
  firstName: zod_default.string(),
  lastName: zod_default.string().nullish(),
  headline: zod_default.string().nullish(),
  avatarUrl: zod_default.string().nullish(),
  specialization: zod_default.enum(SpecializationList).nullish(),
  jobSearchStatus: zod_default.enum(JobSearchStatusList).nullish(),
  followersCount: zod_default.number().int(),
  followingsCount: zod_default.number().int()
})
var userDetailResponseSchema = baseNullableLocationResponseSchema.extend({
  email: zod_default.string(),
  emailVerified: zod_default.boolean(),
  firstName: zod_default.string(),
  lastName: zod_default.string().nullish(),
  headline: zod_default.string().nullish(),
  birthdate: isoDate.nullish(),
  bio: zod_default.string().nullish(),
  avatarUrl: zod_default.string().nullish(),
  bannerUrl: zod_default.string().nullish(),
  specialization: zod_default.enum(SpecializationList).nullish(),
  phoneNumber: zod_default.string().nullish(),
  githubUrl: zod_default.string().nullish(),
  telegramUsername: zod_default.string().nullish(),
  role: zod_default.enum(UserRoleList),
  status: zod_default.enum(UserStatusList),
  followPolicy: zod_default.enum(FollowPolicyList),
  jobSearchStatus: zod_default.enum(JobSearchStatusList),
  resumes: zod_default.array(resumeResponseSchema),
  skills: zod_default.array(skillLinkResponseSchema),
  workExperiences: zod_default.array(workExperienceResponseSchema),
  followersCount: zod_default.number().int(),
  followingsCount: zod_default.number().int()
})
//#endregion
export {
  userSummaryResponseSchema as n,
  userUpdateRequestSchema as r,
  userDetailResponseSchema as t
}
