import { t as zod_default } from '../_libs/zod.mjs'
import { i as isoDate, o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as baseSchema } from './base-DM7IIzOg.mjs'
import {
  c as locationRequestSchema,
  l as nullableLocationRequestSchema
} from './location-ExHvl-rC.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work-experience-lv5LN9sE.js
locationRequestSchema.extend({
  companyName: zod_default.string().max(128),
  location: zod_default.string().max(128).nullish(),
  position: zod_default.string().max(128),
  description: zod_default.string().nullish(),
  startedAt: isoDate,
  endedAt: isoDate.nullish()
})
nullableLocationRequestSchema.extend({
  companyName: zod_default.string().max(128).nullish(),
  location: zod_default.string().max(128).nullish(),
  position: zod_default.string().max(128).nullish(),
  description: zod_default.string().nullish(),
  startedAt: isoDate.nullish(),
  endedAt: isoDate.nullish()
})
var workExperienceResponseSchema = baseSchema.extend({
  userId: uuid,
  companyName: zod_default.string(),
  location: zod_default.string().nullish(),
  position: zod_default.string(),
  description: zod_default.string().nullish(),
  startedAt: isoDate,
  endedAt: isoDate.nullish(),
  isCurrent: zod_default.boolean()
})
//#endregion
export { workExperienceResponseSchema as t }
