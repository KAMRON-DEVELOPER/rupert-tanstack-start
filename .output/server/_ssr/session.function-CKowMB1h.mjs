import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { a as isoDateTime, o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as baseSchema } from './base-DM7IIzOg.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/session.function-CKowMB1h.js
var sessionDetailResponseSchema = baseSchema.extend({
  userId: uuid,
  userAgent: zod_default.string().nullish(),
  ipAddr: zod_default.string().nullish(),
  deviceName: zod_default.string().nullish(),
  isActive: zod_default.boolean(),
  lastActivityAt: isoDateTime
})
var getSessionsFn_createServerFn_handler = createServerRpc(
  {
    id: 'a9c92772b1954c49da79c9ea6a1cd02243ee41a6e252a85be04dfa57322705f7',
    name: 'getSessionsFn',
    filename: 'src/api/users/session.function.ts'
  },
  (opts) => getSessionsFn.__executeServer(opts)
)
var getSessionsFn = createServerFn().handler(
  getSessionsFn_createServerFn_handler,
  async () => {
    const data = await createServerApi()('users/sessions')
    const result = sessionDetailResponseSchema.array().safeParse(data)
    if (!result.success) {
      console.error(
        '[sessionDetailResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[sessionDetailResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  }
)
var revokeSessionFn_createServerFn_handler = createServerRpc(
  {
    id: '2071446b06c9c645d5aec0d687e719e68b169cc44116df5a487d0e1e993799a1',
    name: 'revokeSessionFn',
    filename: 'src/api/users/session.function.ts'
  },
  (opts) => revokeSessionFn.__executeServer(opts)
)
var revokeSessionFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    revokeSessionFn_createServerFn_handler,
    async ({ data: { sessionId } }) => {
      return createServerApi()(`users/sessions/${sessionId}`, {
        method: 'DELETE'
      })
    }
  )
var revokeSessionsFn_createServerFn_handler = createServerRpc(
  {
    id: '6bce4c6a19b7d2c5719505574862d32890dabd09da7090447326313a82989214',
    name: 'revokeSessionsFn',
    filename: 'src/api/users/session.function.ts'
  },
  (opts) => revokeSessionsFn.__executeServer(opts)
)
var revokeSessionsFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    revokeSessionsFn_createServerFn_handler,
    async ({ data: params }) => {
      return createServerApi()('users/sessions', {
        method: 'DELETE',
        params
      })
    }
  )
//#endregion
export {
  getSessionsFn_createServerFn_handler,
  revokeSessionFn_createServerFn_handler,
  revokeSessionsFn_createServerFn_handler
}
