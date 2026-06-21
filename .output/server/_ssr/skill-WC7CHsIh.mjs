import { t as zod_default } from '../_libs/zod.mjs'
import { i as isoDate, o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as baseSchema } from './base-DM7IIzOg.mjs'
import { d as ProficiencyLevelList } from './literals-DmvvSYvr.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/skill-WC7CHsIh.js
var skillRequestSchema = zod_default.object({
  name: zod_default.string().trim().min(1).max(64)
})
var skillLinkCreateRequestSchema = zod_default.object({
  skillId: uuid,
  proficiency: zod_default.enum(ProficiencyLevelList),
  lastUsedAt: isoDate.nullish()
})
var skillLinkUpdateRequestSchema = zod_default.object({
  skillId: uuid.nullish(),
  proficiency: zod_default.enum(ProficiencyLevelList).nullish(),
  lastUsedAt: isoDate.nullish()
})
var skillResponseSchema = baseSchema.extend({ name: zod_default.string() })
var skillLinkResponseSchema = baseSchema.extend({
  skill: skillResponseSchema,
  proficiency: zod_default.enum(ProficiencyLevelList).nullish(),
  lastUsedAt: isoDate.nullish()
})
//#endregion
export {
  skillResponseSchema as a,
  skillRequestSchema as i,
  skillLinkResponseSchema as n,
  skillLinkUpdateRequestSchema as r,
  skillLinkCreateRequestSchema as t
}
