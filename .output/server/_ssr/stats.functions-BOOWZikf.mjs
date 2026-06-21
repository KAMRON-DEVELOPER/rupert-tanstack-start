import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { i as isoDate } from './primitives-BmQBoQXc.mjs'
import {
  _ as VacancyStatusList,
  a as CompanyTypeList,
  l as JobSearchStatusList,
  p as SpecializationList
} from './literals-DmvvSYvr.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/stats.functions-BOOWZikf.js
var bucketBaseSchema = zod_default.object({
  count: zod_default.number().int(),
  percentage: zod_default.number()
})
var jobSearchStatusBucketSchema = bucketBaseSchema.extend({
  key: zod_default.enum(JobSearchStatusList)
})
var specializationBucketSchema = bucketBaseSchema.extend({
  key: zod_default.enum(SpecializationList)
})
var vacancyStatusBucketSchema = bucketBaseSchema.extend({
  key: zod_default.enum(VacancyStatusList)
})
var companyTypeBucketSchema = bucketBaseSchema.extend({
  key: zod_default.enum(CompanyTypeList)
})
var dailyActiveUsersBucketSchema = zod_default.object({
  count: zod_default.number().int(),
  anonymousCount: zod_default.number().int(),
  date: isoDate
})
var usersStatsResponseSchema = zod_default.object({
  total: zod_default.number().int(),
  lookingForJobCount: zod_default.number().int(),
  lookingForJobPercentage: zod_default.number(),
  dauChart: zod_default.array(dailyActiveUsersBucketSchema),
  byJobSearchStatus: zod_default.array(jobSearchStatusBucketSchema),
  bySpecialization: zod_default.array(specializationBucketSchema)
})
var vacanciesStatsResponseSchema = zod_default.object({
  total: zod_default.number().int(),
  open: zod_default.number().int(),
  byStatus: zod_default.array(vacancyStatusBucketSchema),
  bySpecialization: zod_default.array(specializationBucketSchema)
})
var companiesStatsResponseSchema = zod_default.object({
  total: zod_default.number().int(),
  byType: zod_default.array(companyTypeBucketSchema)
})
var statsResponseSchema = zod_default.object({
  users: usersStatsResponseSchema,
  vacancies: vacanciesStatsResponseSchema,
  companies: companiesStatsResponseSchema
})
var getStatsFn_createServerFn_handler = createServerRpc(
  {
    id: '5d1554e43fd6e986a4e0012d7e64d9b29239b76a5a82236a4fbb4860f97246fe',
    name: 'getStatsFn',
    filename: 'src/api/stats/stats.functions.ts'
  },
  (opts) => getStatsFn.__executeServer(opts)
)
var getStatsFn = createServerFn().handler(
  getStatsFn_createServerFn_handler,
  async () => {
    const data = await createServerApi()('stats/')
    const result = statsResponseSchema.safeParse(data)
    if (!result.success) {
      console.error('[statsResponseSchema] parse failed:', result.error.message)
      throw new Error(
        '[statsResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  }
)
//#endregion
export { getStatsFn_createServerFn_handler }
