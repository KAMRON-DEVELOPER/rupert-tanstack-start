import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  i as cityResponseSchema,
  r as cityRequestSchema
} from './location-ExHvl-rC.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/city.functions-3mmX3e0N.js
var createCityFn_createServerFn_handler = createServerRpc(
  {
    id: '08cb90fbf3c2d4a239c851de4666c7a062a9beaab03dd4062e2db940269617f4',
    name: 'createCityFn',
    filename: 'src/api/admin/city.functions.ts'
  },
  (opts) => createCityFn.__executeServer(opts)
)
var createCityFn = createServerFn({ method: 'POST' })
  .inputValidator(cityRequestSchema.extend({ countryId: zod_default.uuid() }))
  .handler(
    createCityFn_createServerFn_handler,
    async ({ data: { countryId, ...data } }) => {
      const response = await createServerApi()(
        `admin/locations/${countryId}/cities`,
        {
          method: 'POST',
          data
        }
      )
      const result = cityResponseSchema.safeParse(response)
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
var updateCityFn_createServerFn_handler = createServerRpc(
  {
    id: '9d968fe39a796b8b4729eea27c5dffd0ce61173154d2b64c3b86372e230afb96',
    name: 'updateCityFn',
    filename: 'src/api/admin/city.functions.ts'
  },
  (opts) => updateCityFn.__executeServer(opts)
)
var updateCityFn = createServerFn({ method: 'POST' })
  .inputValidator(
    cityRequestSchema.extend({
      countryId: zod_default.uuid(),
      cityId: zod_default.uuid()
    })
  )
  .handler(
    updateCityFn_createServerFn_handler,
    async ({ data: { countryId, cityId, ...data } }) => {
      await createServerApi()(`admin/locations/${countryId}/cities/${cityId}`, {
        method: 'PATCH',
        data
      })
    }
  )
var deleteCityFn_createServerFn_handler = createServerRpc(
  {
    id: '10904fc877b0fe6ecb590eb639b6a9ab8cc1446d922857c61ef09cf58454f32a',
    name: 'deleteCityFn',
    filename: 'src/api/admin/city.functions.ts'
  },
  (opts) => deleteCityFn.__executeServer(opts)
)
var deleteCityFn = createServerFn({ method: 'POST' })
  .inputValidator(
    zod_default.object({
      countryId: zod_default.uuid(),
      cityId: zod_default.uuid()
    })
  )
  .handler(
    deleteCityFn_createServerFn_handler,
    async ({ data: { countryId, cityId } }) => {
      await createServerApi()(`admin/locations/${countryId}/cities/${cityId}`, {
        method: 'DELETE'
      })
    }
  )
//#endregion
export {
  createCityFn_createServerFn_handler,
  deleteCityFn_createServerFn_handler,
  updateCityFn_createServerFn_handler
}
