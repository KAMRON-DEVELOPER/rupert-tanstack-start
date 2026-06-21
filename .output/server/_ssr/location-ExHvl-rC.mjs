import { c as string, s as object } from '../_libs/zod.mjs'
import { o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as baseSchema } from './base-DM7IIzOg.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/location-ExHvl-rC.js
var locationRequestSchema = object({
  countryId: uuid,
  cityId: uuid.nullish()
})
var nullableLocationRequestSchema = object({
  countryId: uuid.nullish(),
  cityId: uuid.nullish()
})
var countryCreateRequestSchema = object({
  code: string()
    .trim()
    .length(2)
    .transform((code) => code.toUpperCase()),
  name: string().trim().min(1).max(56)
})
var countryUpdateRequestSchema = object({
  code: string()
    .trim()
    .length(2)
    .transform((code) => code.toUpperCase())
    .nullish(),
  name: string().trim().min(1).max(56).nullish()
})
var cityRequestSchema = object({ name: string().trim().min(1).max(168) })
var countryResponseSchema = baseSchema.extend({
  code: string(),
  name: string()
})
var cityResponseSchema = baseSchema.extend({
  countryId: uuid,
  name: string()
})
var baseLocationResponseSchema = baseSchema.extend({
  country: countryResponseSchema,
  city: cityResponseSchema.nullish()
})
var baseNullableLocationResponseSchema = baseSchema.extend({
  country: countryResponseSchema.nullish(),
  city: cityResponseSchema.nullish()
})
//#endregion
export {
  countryCreateRequestSchema as a,
  locationRequestSchema as c,
  cityResponseSchema as i,
  nullableLocationRequestSchema as l,
  baseNullableLocationResponseSchema as n,
  countryResponseSchema as o,
  cityRequestSchema as r,
  countryUpdateRequestSchema as s,
  baseLocationResponseSchema as t
}
