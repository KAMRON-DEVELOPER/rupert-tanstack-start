import { t as zod_default } from '../_libs/zod.mjs'
import { o as uuid } from './primitives-BmQBoQXc.mjs'
import {
  c as locationRequestSchema,
  l as nullableLocationRequestSchema,
  t as baseLocationResponseSchema
} from './location-ExHvl-rC.mjs'
import {
  f as SalaryCurrencyList,
  o as EmploymentTypeList,
  p as SpecializationList,
  v as WorkFormatList
} from './literals-DmvvSYvr.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/resume-CN48r55P.js
locationRequestSchema.extend({
  title: zod_default.string().max(128),
  summary: zod_default.string().nullish(),
  specialization: zod_default.enum(SpecializationList),
  salaryExpectationMin: zod_default.number().int().positive().nullish(),
  salaryExpectationMax: zod_default.number().int().positive().nullish(),
  salaryCurrency: zod_default.enum(SalaryCurrencyList).nullish(),
  workFormat: zod_default.enum(WorkFormatList).nullish(),
  employmentType: zod_default.enum(EmploymentTypeList).nullish()
})
var resumeUpdateRequestSchema = nullableLocationRequestSchema.extend({
  title: zod_default.string().max(128).nullish(),
  summary: zod_default.string().nullish(),
  specialization: zod_default.enum(SpecializationList).nullish(),
  salaryExpectationMin: zod_default.number().int().positive().nullish(),
  salaryExpectationMax: zod_default.number().int().positive().nullish(),
  salaryCurrency: zod_default.enum(SalaryCurrencyList).nullish(),
  workFormat: zod_default.enum(WorkFormatList).nullish(),
  employmentType: zod_default.enum(EmploymentTypeList).nullish()
})
var resumeResponseSchema = baseLocationResponseSchema.extend({
  user_id: uuid,
  title: zod_default.string(),
  summary: zod_default.string().nullish(),
  specialization: zod_default.enum(SpecializationList),
  salaryExpectationMin: zod_default.number().int().positive().nullish(),
  salaryExpectationMax: zod_default.number().int().positive().nullish(),
  salaryCurrency: zod_default.enum(SalaryCurrencyList).nullish(),
  workFormat: zod_default.enum(WorkFormatList).nullish(),
  employmentType: zod_default.enum(EmploymentTypeList).nullish()
})
//#endregion
export { resumeUpdateRequestSchema as n, resumeResponseSchema as t }
