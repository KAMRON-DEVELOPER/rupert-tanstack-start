import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  i as cityResponseSchema,
  o as countryResponseSchema
} from './location-ExHvl-rC.mjs'
import {
  n as paginationQuerySchema,
  t as paginatedResponseSchema
} from './pagination-LyDEN9Vs.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/locations.functions-uC03fO8c.js
var getCountriesFn_createServerFn_handler = createServerRpc(
  {
    id: '0b7cf93159d3934851ad6ecc1fa172985c3ad015cc9b83992cc2c65b1f2d610b',
    name: 'getCountriesFn',
    filename: 'src/api/locations/locations.functions.ts'
  },
  (opts) => getCountriesFn.__executeServer(opts)
)
var getCountriesFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(getCountriesFn_createServerFn_handler, async ({ data: params }) => {
    const data = await createServerApi()('locations/countries', { params })
    const result = paginatedResponseSchema(countryResponseSchema).safeParse(
      data
    )
    if (!result.success) {
      console.error(
        '[countryResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[countryResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var getCitiesFn_createServerFn_handler = createServerRpc(
  {
    id: '6a1194b6b9c66d807333c1f589ccebb10c1082deed76a73bcaecbc18bb3acc41',
    name: 'getCitiesFn',
    filename: 'src/api/locations/locations.functions.ts'
  },
  (opts) => getCitiesFn.__executeServer(opts)
)
var getCitiesFn = createServerFn()
  .inputValidator(
    paginationQuerySchema.extend({ countryId: zod_default.string() })
  )
  .handler(
    getCitiesFn_createServerFn_handler,
    async ({ data: { countryId, ...params } }) => {
      const data = await createServerApi()(
        `locations/countries/${countryId}/cities`,
        { params }
      )
      const result = paginatedResponseSchema(cityResponseSchema).safeParse(data)
      if (!result.success) {
        console.error(
          '[cityResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[cityResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
//#endregion
export {
  getCitiesFn_createServerFn_handler,
  getCountriesFn_createServerFn_handler
}
