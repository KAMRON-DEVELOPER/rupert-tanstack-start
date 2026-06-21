import { n as createServerFn } from './ssr.mjs'
import { t as paginatedResponseSchema } from './pagination-LyDEN9Vs.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
import {
  n as companyListParamsSchema,
  r as companySummaryResponseSchema,
  t as companyDetailResponseSchema
} from './company-Ceac0N8k.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/companies.functions-BhEQqAL8.js
var getCompaniesFn_createServerFn_handler = createServerRpc(
  {
    id: '9270e2c7fe6ae3297d6a13e2af48862017fd1b2403fdc94af7661a9be3bb2090',
    name: 'getCompaniesFn',
    filename: 'src/api/companies/companies.functions.ts'
  },
  (opts) => getCompaniesFn.__executeServer(opts)
)
var getCompaniesFn = createServerFn()
  .inputValidator(companyListParamsSchema)
  .handler(getCompaniesFn_createServerFn_handler, async ({ data: params }) => {
    const data = await createServerApi()('companies/', { params })
    const result = paginatedResponseSchema(
      companySummaryResponseSchema
    ).safeParse(data)
    if (!result.success) {
      console.error(
        '[companyListResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[companyListResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var getCompanyFn_createServerFn_handler = createServerRpc(
  {
    id: '512a5b71f05f26ff24776603ff4b89552798aa29d6a5348cecd28a7e70eb3369',
    name: 'getCompanyFn',
    filename: 'src/api/companies/companies.functions.ts'
  },
  (opts) => getCompanyFn.__executeServer(opts)
)
var getCompanyFn = createServerFn()
  .inputValidator((data) => data)
  .handler(getCompanyFn_createServerFn_handler, async ({ data: { id } }) => {
    const data = await createServerApi()(`companies/${id}`)
    const result = companyDetailResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[companyDetailResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[companyDetailResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
//#endregion
export {
  getCompaniesFn_createServerFn_handler,
  getCompanyFn_createServerFn_handler
}
