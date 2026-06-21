import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as baseSchema } from './base-DM7IIzOg.mjs'
import {
  n as paginationQuerySchema,
  t as paginatedResponseSchema
} from './pagination-LyDEN9Vs.mjs'
import {
  c as FollowStatusList,
  l as JobSearchStatusList,
  p as SpecializationList,
  s as FollowPolicyList
} from './literals-DmvvSYvr.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/follow.function-k2eiGAUD.js
zod_default.object({ status: zod_default.enum(FollowStatusList) })
var followUserResponseSchema = baseSchema.extend({
  firstName: zod_default.string(),
  lastName: zod_default.string().nullish(),
  headline: zod_default.string().nullish(),
  avatarUrl: zod_default.string().nullish(),
  specialization: zod_default.enum(SpecializationList).nullish(),
  followPolicy: zod_default.enum(FollowPolicyList),
  jobSearchStatus: zod_default.enum(JobSearchStatusList),
  followersCount: zod_default.number().int(),
  followingsCount: zod_default.number().int()
})
var followResponseSchema = baseSchema.extend({
  followerId: uuid,
  followingId: uuid,
  status: zod_default.enum(FollowStatusList),
  follower: followUserResponseSchema.nullish(),
  following: followUserResponseSchema.nullish()
})
var followUserFn_createServerFn_handler = createServerRpc(
  {
    id: 'e6abaac6f1263e57c94f481ac9503cee5f9a6f0a2205d7c4296895cb28e5f084',
    name: 'followUserFn',
    filename: 'src/api/users/follow.function.ts'
  },
  (opts) => followUserFn.__executeServer(opts)
)
var followUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    followUserFn_createServerFn_handler,
    async ({ data: { followingId } }) => {
      const data = await createServerApi()(`users/${followingId}/follow`, {
        method: 'POST'
      })
      const result = followResponseSchema.safeParse(data)
      if (!result.success) {
        console.error(
          '[followResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[followResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
var unfollowUserFn_createServerFn_handler = createServerRpc(
  {
    id: '079782766e5434dec06fc303c3845a0ed4775d25205efeda74d25d4c0f130175',
    name: 'unfollowUserFn',
    filename: 'src/api/users/follow.function.ts'
  },
  (opts) => unfollowUserFn.__executeServer(opts)
)
var unfollowUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    unfollowUserFn_createServerFn_handler,
    async ({ data: { followingId } }) => {
      return createServerApi()(`users/${followingId}/follow`, {
        method: 'DELETE'
      })
    }
  )
var getFollowersFn_createServerFn_handler = createServerRpc(
  {
    id: '521a65821a32ea541346305e8d11a0474871ba56d7f741d798493e47a016b555',
    name: 'getFollowersFn',
    filename: 'src/api/users/follow.function.ts'
  },
  (opts) => getFollowersFn.__executeServer(opts)
)
var getFollowersFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(getFollowersFn_createServerFn_handler, async ({ data: params }) => {
    const data = await createServerApi()('users/followers', { params })
    const result = paginatedResponseSchema(followResponseSchema).safeParse(data)
    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var getFollowingFn_createServerFn_handler = createServerRpc(
  {
    id: 'a94b93e007749a0829929fe220432583e5988853487ea3ae40b4f482a6b11a54',
    name: 'getFollowingFn',
    filename: 'src/api/users/follow.function.ts'
  },
  (opts) => getFollowingFn.__executeServer(opts)
)
var getFollowingFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(getFollowingFn_createServerFn_handler, async ({ data: params }) => {
    const data = await createServerApi()('users/following', { params })
    const result = paginatedResponseSchema(followResponseSchema).safeParse(data)
    if (!result.success) {
      console.error(
        '[followResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[followResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var getFollowRequestsFn_createServerFn_handler = createServerRpc(
  {
    id: 'd93bd3a30132df15346ec9d693c823dc742eef53984c5b3ba37ef5241acec403',
    name: 'getFollowRequestsFn',
    filename: 'src/api/users/follow.function.ts'
  },
  (opts) => getFollowRequestsFn.__executeServer(opts)
)
var getFollowRequestsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(
    getFollowRequestsFn_createServerFn_handler,
    async ({ data: params }) => {
      const data = await createServerApi()('users/follow-requests', { params })
      const result =
        paginatedResponseSchema(followResponseSchema).safeParse(data)
      if (!result.success) {
        console.error(
          '[followResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[followResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
var updateFollowRequestFn_createServerFn_handler = createServerRpc(
  {
    id: 'a5e66de56443704aa714dd1f3d018fe6b85eb40875a28e6f71b0cd0994202fda',
    name: 'updateFollowRequestFn',
    filename: 'src/api/users/follow.function.ts'
  },
  (opts) => updateFollowRequestFn.__executeServer(opts)
)
var updateFollowRequestFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    updateFollowRequestFn_createServerFn_handler,
    async ({ data: { followId, data } }) => {
      const responseData = await createServerApi()(
        `users/follow-requests/${followId}`,
        {
          method: 'PATCH',
          data
        }
      )
      const result = followResponseSchema.safeParse(responseData)
      if (!result.success) {
        console.error(
          '[followResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[followResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
//#endregion
export {
  followUserFn_createServerFn_handler,
  getFollowRequestsFn_createServerFn_handler,
  getFollowersFn_createServerFn_handler,
  getFollowingFn_createServerFn_handler,
  unfollowUserFn_createServerFn_handler,
  updateFollowRequestFn_createServerFn_handler
}
