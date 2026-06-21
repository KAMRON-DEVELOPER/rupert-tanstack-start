import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
import {
  a as vacancyListParamsSchema,
  i as vacancyDetailResponseSchema,
  n as applicationListParamsSchema,
  o as vacancyListResponseSchema,
  r as applicationListResponseSchema,
  t as applicationDetailResponseSchema
} from './vacancy-BU3XEoF-.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/vacancies.functions-C8Zm8LPt.js
var getVacanciesFn_createServerFn_handler = createServerRpc(
  {
    id: '1cfe67b18d4875567e1323a55b11579a633907de444cb0da49b88f5141a42b67',
    name: 'getVacanciesFn',
    filename: 'src/api/vacancies/vacancies.functions.ts'
  },
  (opts) => getVacanciesFn.__executeServer(opts)
)
var getVacanciesFn = createServerFn()
  .inputValidator(vacancyListParamsSchema)
  .handler(getVacanciesFn_createServerFn_handler, async ({ data: params }) => {
    const data = await createServerApi()('vacancies/', { params })
    const result = vacancyListResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[vacancyListResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[vacancyListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var getVacancyFn_createServerFn_handler = createServerRpc(
  {
    id: '23608d1ce4dd9141ce459b8b9b2b4a2562f774a42239db2875534087b0854b46',
    name: 'getVacancyFn',
    filename: 'src/api/vacancies/vacancies.functions.ts'
  },
  (opts) => getVacancyFn.__executeServer(opts)
)
var getVacancyFn = createServerFn()
  .inputValidator(zod_default.object({ id: zod_default.uuid() }))
  .handler(getVacancyFn_createServerFn_handler, async ({ data: { id } }) => {
    const data = await createServerApi()(`vacancies/${id}`)
    const result = vacancyDetailResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[vacancyDetailResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[vacancyDetailResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var getApplicationsFn_createServerFn_handler = createServerRpc(
  {
    id: 'b7d6f5a60197c487f50eb5bf88908a40522f2e0778ea0b58d7bdb5c62f3448da',
    name: 'getApplicationsFn',
    filename: 'src/api/vacancies/vacancies.functions.ts'
  },
  (opts) => getApplicationsFn.__executeServer(opts)
)
var getApplicationsFn = createServerFn()
  .inputValidator(applicationListParamsSchema)
  .handler(
    getApplicationsFn_createServerFn_handler,
    async ({ data: params }) => {
      const data = await createServerApi()('vacancies/applications', { params })
      const result = applicationListResponseSchema.safeParse(data)
      if (!result.success) {
        console.error(
          '[applicationListResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[applicationListResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
var getApplicationFn_createServerFn_handler = createServerRpc(
  {
    id: '6183ac05653f3949294e86763ae45ca91c2fa3272918cba589d0b21081e5824a',
    name: 'getApplicationFn',
    filename: 'src/api/vacancies/vacancies.functions.ts'
  },
  (opts) => getApplicationFn.__executeServer(opts)
)
var getApplicationFn = createServerFn()
  .inputValidator(zod_default.object({ id: zod_default.uuid() }))
  .handler(
    getApplicationFn_createServerFn_handler,
    async ({ data: { id } }) => {
      const data = await createServerApi()(`vacancies/applications/${id}`)
      const result = applicationDetailResponseSchema.safeParse(data)
      if (!result.success) {
        console.error(
          '[applicationDetailResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[applicationDetailResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
//#endregion
export {
  getApplicationFn_createServerFn_handler,
  getApplicationsFn_createServerFn_handler,
  getVacanciesFn_createServerFn_handler,
  getVacancyFn_createServerFn_handler
}
