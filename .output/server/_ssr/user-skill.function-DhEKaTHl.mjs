import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { o as uuid } from './primitives-BmQBoQXc.mjs'
import { t as paginatedResponseSchema } from './pagination-LyDEN9Vs.mjs'
import {
  n as skillLinkResponseSchema,
  r as skillLinkUpdateRequestSchema,
  t as skillLinkCreateRequestSchema
} from './skill-WC7CHsIh.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/user-skill.function-DhEKaTHl.js
var getUserSkillsFn_createServerFn_handler = createServerRpc(
  {
    id: 'e9ad0ad555b1b2c1b00abd984a331de538bd632510f322193e3072f9f97bd5b6',
    name: 'getUserSkillsFn',
    filename: 'src/api/users/user-skill.function.ts'
  },
  (opts) => getUserSkillsFn.__executeServer(opts)
)
var getUserSkillsFn = createServerFn().handler(
  getUserSkillsFn_createServerFn_handler,
  async () => {
    const data = await createServerApi()('users/skills')
    const result = paginatedResponseSchema(skillLinkResponseSchema).safeParse(
      data
    )
    if (!result.success) {
      console.error(
        '[skillLinkResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[skillLinkResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  }
)
var createUserSkillFn_createServerFn_handler = createServerRpc(
  {
    id: '0fefc7e97d9dcb259dfa69a7647a7b66b9621205db47e7fc8194cc79bf373f84',
    name: 'createUserSkillFn',
    filename: 'src/api/users/user-skill.function.ts'
  },
  (opts) => createUserSkillFn.__executeServer(opts)
)
var createUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillLinkCreateRequestSchema)
  .handler(createUserSkillFn_createServerFn_handler, async ({ data }) => {
    const responseData = await createServerApi()('users/skills', {
      method: 'POST',
      data
    })
    const result = skillLinkResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[skillLinkResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[skillLinkResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var updateUserSkillFn_createServerFn_handler = createServerRpc(
  {
    id: 'fedec73ecf7685613c6267cf6ec76b4028b2b7493e1f26463075983e718d81a1',
    name: 'updateUserSkillFn',
    filename: 'src/api/users/user-skill.function.ts'
  },
  (opts) => updateUserSkillFn.__executeServer(opts)
)
var updateUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillLinkUpdateRequestSchema.extend({ skillLinkId: uuid }))
  .handler(
    updateUserSkillFn_createServerFn_handler,
    async ({ data: { skillLinkId, ...data } }) => {
      const responseData = await createServerApi()(
        `users/skills/${skillLinkId}`,
        {
          method: 'PATCH',
          data
        }
      )
      const result = skillLinkResponseSchema.safeParse(responseData)
      if (!result.success) {
        console.error(
          '[skillLinkResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[skillLinkResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
var deleteUserSkillFn_createServerFn_handler = createServerRpc(
  {
    id: 'a4fb37ee67f8224cefcc29fd008e2762a90ffbccbe3d85c31d2ea6e516286312',
    name: 'deleteUserSkillFn',
    filename: 'src/api/users/user-skill.function.ts'
  },
  (opts) => deleteUserSkillFn.__executeServer(opts)
)
var deleteUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(zod_default.object({ skillLinkId: uuid }))
  .handler(
    deleteUserSkillFn_createServerFn_handler,
    async ({ data: { skillLinkId } }) => {
      return createServerApi()(`users/skills/${skillLinkId}`, {
        method: 'DELETE'
      })
    }
  )
//#endregion
export {
  createUserSkillFn_createServerFn_handler,
  deleteUserSkillFn_createServerFn_handler,
  getUserSkillsFn_createServerFn_handler,
  updateUserSkillFn_createServerFn_handler
}
