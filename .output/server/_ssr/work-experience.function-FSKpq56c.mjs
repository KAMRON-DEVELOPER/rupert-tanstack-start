import { n as createServerFn } from './ssr.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
import { t as workExperienceResponseSchema } from './work-experience-lv5LN9sE.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work-experience.function-FSKpq56c.js
var getWorkExperiencesFn_createServerFn_handler = createServerRpc(
  {
    id: '55921c90d29d1772e7a23a31fbaec83a5e29891063dae0b9b609e58f93f92204',
    name: 'getWorkExperiencesFn',
    filename: 'src/api/users/work-experience.function.ts'
  },
  (opts) => getWorkExperiencesFn.__executeServer(opts)
)
var getWorkExperiencesFn = createServerFn().handler(
  getWorkExperiencesFn_createServerFn_handler,
  async () => {
    const data = await createServerApi()('users/work-experiences')
    const result = workExperienceResponseSchema.array().safeParse(data)
    if (!result.success) {
      console.error(
        '[workExperienceResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[workExperienceResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  }
)
var createWorkExperienceFn_createServerFn_handler = createServerRpc(
  {
    id: 'a6a2567837110fc2c538af43721d6fd7e477f255a63c0fa27f3f2aa8e0c8b8a3',
    name: 'createWorkExperienceFn',
    filename: 'src/api/users/work-experience.function.ts'
  },
  (opts) => createWorkExperienceFn.__executeServer(opts)
)
var createWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(createWorkExperienceFn_createServerFn_handler, async ({ data }) => {
    const responseData = await createServerApi()('users/work-experiences', {
      method: 'POST',
      data
    })
    const result = workExperienceResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[workExperienceResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[workExperienceResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var updateWorkExperienceFn_createServerFn_handler = createServerRpc(
  {
    id: 'ef498db43b8606709655310fd7f028976d3948380e659e3be83dc2fd4d44ea02',
    name: 'updateWorkExperienceFn',
    filename: 'src/api/users/work-experience.function.ts'
  },
  (opts) => updateWorkExperienceFn.__executeServer(opts)
)
var updateWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    updateWorkExperienceFn_createServerFn_handler,
    async ({ data: { workExperienceId, data } }) => {
      const responseData = await createServerApi()(
        `users/work-experiences/${workExperienceId}`,
        {
          method: 'PATCH',
          data
        }
      )
      const result = workExperienceResponseSchema.safeParse(responseData)
      if (!result.success) {
        console.error(
          '[workExperienceResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[workExperienceResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
var deleteWorkExperienceFn_createServerFn_handler = createServerRpc(
  {
    id: 'dee5cd9c2ddb9be48695e08da942045843925b10c7383203acd9da59a8c9d501',
    name: 'deleteWorkExperienceFn',
    filename: 'src/api/users/work-experience.function.ts'
  },
  (opts) => deleteWorkExperienceFn.__executeServer(opts)
)
var deleteWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    deleteWorkExperienceFn_createServerFn_handler,
    async ({ data: { workExperienceId } }) => {
      return createServerApi()(`users/work-experiences/${workExperienceId}`, {
        method: 'DELETE'
      })
    }
  )
//#endregion
export {
  createWorkExperienceFn_createServerFn_handler,
  deleteWorkExperienceFn_createServerFn_handler,
  getWorkExperiencesFn_createServerFn_handler,
  updateWorkExperienceFn_createServerFn_handler
}
