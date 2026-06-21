import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  a as countryCreateRequestSchema,
  o as countryResponseSchema,
  s as countryUpdateRequestSchema
} from './location-ExHvl-rC.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/country.functions-CaArw5Oi.js
var createCountryFn_createServerFn_handler = createServerRpc(
  {
    id: 'bc9fad86e702cb7f7e804b70b999f37799336c3ee3195c5658458333d00573f0',
    name: 'createCountryFn',
    filename: 'src/api/admin/country.functions.ts'
  },
  (opts) => createCountryFn.__executeServer(opts)
)
var createCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(countryCreateRequestSchema)
  .handler(createCountryFn_createServerFn_handler, async ({ data }) => {
    const response = await createServerApi()('admin/locations/countries', {
      method: 'POST',
      data
    })
    const result = countryResponseSchema.safeParse(response)
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
var updateCountryFn_createServerFn_handler = createServerRpc(
  {
    id: '6faa1e1ec0f86cf84b01c9aa4e1b1482b3b1d798e9ccb9d7d79f99e3f40d9178',
    name: 'updateCountryFn',
    filename: 'src/api/admin/country.functions.ts'
  },
  (opts) => updateCountryFn.__executeServer(opts)
)
var updateCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(
    countryUpdateRequestSchema.extend({ countryId: zod_default.uuid() })
  )
  .handler(
    updateCountryFn_createServerFn_handler,
    async ({ data: { countryId, ...data } }) => {
      await createServerApi()(`admin/locations/countries/${countryId}`, {
        method: 'PATCH',
        data
      })
    }
  )
var deleteCountryFn_createServerFn_handler = createServerRpc(
  {
    id: '8dadf292b5bf0d4b4d6da41fc9b2bd816d83bc26ae12ed75d3da77a5ff38571a',
    name: 'deleteCountryFn',
    filename: 'src/api/admin/country.functions.ts'
  },
  (opts) => deleteCountryFn.__executeServer(opts)
)
var deleteCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(zod_default.object({ countryId: zod_default.uuid() }))
  .handler(
    deleteCountryFn_createServerFn_handler,
    async ({ data: { countryId } }) => {
      await createServerApi()(`admin/locations/countries/${countryId}`, {
        method: 'DELETE'
      })
    }
  )
//#endregion
export {
  createCountryFn_createServerFn_handler,
  deleteCountryFn_createServerFn_handler,
  updateCountryFn_createServerFn_handler
}
