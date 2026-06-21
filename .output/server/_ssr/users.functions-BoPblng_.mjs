import { n as createServerFn } from './ssr.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
import { n as userSearchResponseSchema } from './ws-BasjsCG1.mjs'
import {
  r as userUpdateRequestSchema,
  t as userDetailResponseSchema
} from './user-DgDcvuBc.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/users.functions-BoPblng_.js
var searchUsersFn_createServerFn_handler = createServerRpc(
  {
    id: 'da404f30d1e3250f798b28b9035e0032cae56d58f5af79b10c6c10ac4605fe43',
    name: 'searchUsersFn',
    filename: 'src/api/users/users.functions.ts'
  },
  (opts) => searchUsersFn.__executeServer(opts)
)
var searchUsersFn = createServerFn()
  .inputValidator((data) => data)
  .handler(
    searchUsersFn_createServerFn_handler,
    async ({ data: { q, ...params } }) => {
      const data = await createServerApi()('users/search', { params })
      const result = userSearchResponseSchema.safeParse(data)
      if (!result.success) {
        console.error(
          '[userSearchResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[userSearchResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
var getProfileFn_createServerFn_handler = createServerRpc(
  {
    id: '2701c98ed69c50bf9c1149ed54398e1327518895ba0050bc7d02d8762a0430b8',
    name: 'getProfileFn',
    filename: 'src/api/users/users.functions.ts'
  },
  (opts) => getProfileFn.__executeServer(opts)
)
var getProfileFn = createServerFn().handler(
  getProfileFn_createServerFn_handler,
  async () => {
    const data = await createServerApi()('users/')
    const result = userDetailResponseSchema.safeParse(data)
    if (!result.success) {
      console.error(
        '[userDetailResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[userDetailResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  }
)
var updateProfileFn_createServerFn_handler = createServerRpc(
  {
    id: '2118d1cb95ed145b3597816e3f10a3c40b0489a7a2c9fb9d71c4f52aa8c821a9',
    name: 'updateProfileFn',
    filename: 'src/api/users/users.functions.ts'
  },
  (opts) => updateProfileFn.__executeServer(opts)
)
var updateProfileFn = createServerFn({ method: 'POST' })
  .inputValidator(userUpdateRequestSchema)
  .handler(updateProfileFn_createServerFn_handler, async ({ data }) => {
    await createServerApi()('users/', {
      method: 'PATCH',
      data
    })
    return null
  })
var deleteProfileFn_createServerFn_handler = createServerRpc(
  {
    id: '4b5bde810533f7c2b286513a124bb3638eeb8aa5f374653b0505278aaa7a4439',
    name: 'deleteProfileFn',
    filename: 'src/api/users/users.functions.ts'
  },
  (opts) => deleteProfileFn.__executeServer(opts)
)
var deleteProfileFn = createServerFn({ method: 'POST' }).handler(
  deleteProfileFn_createServerFn_handler,
  async () => {
    await createServerApi()('users/', { method: 'DELETE' })
    return null
  }
)
//#endregion
export {
  deleteProfileFn_createServerFn_handler,
  getProfileFn_createServerFn_handler,
  searchUsersFn_createServerFn_handler,
  updateProfileFn_createServerFn_handler
}
