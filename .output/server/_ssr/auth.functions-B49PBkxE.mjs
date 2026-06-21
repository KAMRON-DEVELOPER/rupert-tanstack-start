import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { i as isoDate } from './primitives-BmQBoQXc.mjs'
import { n as baseNullableLocationResponseSchema } from './location-ExHvl-rC.mjs'
import {
  g as UserStatusList,
  h as UserRoleList,
  l as JobSearchStatusList,
  p as SpecializationList,
  s as FollowPolicyList
} from './literals-DmvvSYvr.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-B49PBkxE.js
var authProbeResponseSchema = zod_default.object({
  isAuthenticated: zod_default.boolean()
})
zod_default.object({
  email: zod_default.email(),
  password: zod_default.string().min(8).max(24),
  firstName: zod_default.string().min(8).max(24).nullish(),
  lastName: zod_default.string().min(8).max(24).nullish()
})
var emailAuthSuccessResponseSchema = baseNullableLocationResponseSchema.extend({
  email: zod_default.string(),
  emailVerified: zod_default.boolean(),
  firstName: zod_default.string(),
  lastName: zod_default.string().nullish(),
  headline: zod_default.string().nullish(),
  birthdate: isoDate.nullish(),
  bio: zod_default.string().nullish(),
  avatarUrl: zod_default.string().nullish(),
  bannerUrl: zod_default.string().nullish(),
  specialization: zod_default.enum(SpecializationList).nullish(),
  phoneNumber: zod_default.string().nullish(),
  githubUrl: zod_default.string().nullish(),
  telegramUsername: zod_default.string().nullish(),
  role: zod_default.enum(UserRoleList),
  status: zod_default.enum(UserStatusList),
  followPolicy: zod_default.enum(FollowPolicyList),
  jobSearchStatus: zod_default.enum(JobSearchStatusList)
})
var emailAuthNewUserSchema = zod_default.object({
  kind: zod_default.literal('new_user')
})
var emailAuthSetupPasswordSchema = zod_default.object({
  kind: zod_default.literal('setup_password'),
  message: zod_default.string()
})
var emailAuthSuccessSchema = emailAuthSuccessResponseSchema.extend({
  kind: zod_default.literal('success')
})
zod_default.discriminatedUnion('kind', [
  emailAuthNewUserSchema,
  emailAuthSetupPasswordSchema,
  emailAuthSuccessSchema
])
zod_default.object({ password: zod_default.string().min(8).max(24) })
var authProbeFn_createServerFn_handler = createServerRpc(
  {
    id: '6c3041275883677eb5a3f71a33c969adce92b7bcf82a747f8b93d3d312034eab',
    name: 'authProbeFn',
    filename: 'src/api/users/auth.functions.ts'
  },
  (opts) => authProbeFn.__executeServer(opts)
)
var authProbeFn = createServerFn().handler(
  authProbeFn_createServerFn_handler,
  async () => {
    const api = createServerApi()
    try {
      const data = await api('users/auth/probe')
      const result = authProbeResponseSchema.safeParse(data)
      if (!result.success) {
        console.error(
          '[authProbeResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[authProbeResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data.isAuthenticated
    } catch (err) {
      console.error(`🚨 Failed authProbeFn`, err)
      throw err
    }
  }
)
var logoutFn_createServerFn_handler = createServerRpc(
  {
    id: '81cb0dd57190c4a1218003ed3d18befcc20dad8680d12ed19c7351690aec090f',
    name: 'logoutFn',
    filename: 'src/api/users/auth.functions.ts'
  },
  (opts) => logoutFn.__executeServer(opts)
)
var logoutFn = createServerFn({ method: 'POST' }).handler(
  logoutFn_createServerFn_handler,
  async () => {
    await createServerApi()('users/auth/logout', { method: 'POST' })
    return null
  }
)
//#endregion
export { authProbeFn_createServerFn_handler, logoutFn_createServerFn_handler }
