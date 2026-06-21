import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { t as paginatedResponseSchema } from './pagination-LyDEN9Vs.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
import {
  n as resumeUpdateRequestSchema,
  t as resumeResponseSchema
} from './resume-CN48r55P.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/resume.function-Bbwow48L.js
var getResumesFn_createServerFn_handler = createServerRpc(
  {
    id: '6621bb1fb7f76133520b7693829da11a9fd42752aaf97d30710cb719975aeaac',
    name: 'getResumesFn',
    filename: 'src/api/users/resume.function.ts'
  },
  (opts) => getResumesFn.__executeServer(opts)
)
var getResumesFn = createServerFn().handler(
  getResumesFn_createServerFn_handler,
  async () => {
    const data = await createServerApi()('users/resumes')
    const result = paginatedResponseSchema(resumeResponseSchema).safeParse(data)
    if (!result.success) {
      console.error(
        '[resumeResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[resumeResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  }
)
var createResumeFn_createServerFn_handler = createServerRpc(
  {
    id: '893364ffe5f0cf5c746bbfceec018585d63f7b10ca21f0231ac36d7ffcb75211',
    name: 'createResumeFn',
    filename: 'src/api/users/resume.function.ts'
  },
  (opts) => createResumeFn.__executeServer(opts)
)
var createResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(createResumeFn_createServerFn_handler, async ({ data }) => {
    const responseData = await createServerApi()('users/resumes', {
      method: 'POST',
      data
    })
    const result = resumeResponseSchema.safeParse(responseData)
    if (!result.success) {
      console.error(
        '[resumeResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[resumeResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var getResumeFn_createServerFn_handler = createServerRpc(
  {
    id: '3f155b40fdaec00b5c4270b981dc970152a6f10bd2dd046f80cf5b231f3f90a2',
    name: 'getResumeFn',
    filename: 'src/api/users/resume.function.ts'
  },
  (opts) => getResumeFn.__executeServer(opts)
)
var getResumeFn = createServerFn()
  .inputValidator((data) => data)
  .handler(
    getResumeFn_createServerFn_handler,
    async ({ data: { resumeId } }) => {
      const data = await createServerApi()(`users/resumes/${resumeId}`)
      const result = resumeResponseSchema.safeParse(data)
      if (!result.success) {
        console.error(
          '[resumeResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[resumeResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
var updateResumeFn_createServerFn_handler = createServerRpc(
  {
    id: 'eace28894f3d66e4eea57364435934c4a50b3f1a1aaf7bd9671ea0a599cc3449',
    name: 'updateResumeFn',
    filename: 'src/api/users/resume.function.ts'
  },
  (opts) => updateResumeFn.__executeServer(opts)
)
var updateResumeFn = createServerFn({ method: 'POST' })
  .inputValidator(
    resumeUpdateRequestSchema.extend({ resumeId: zod_default.uuid() })
  )
  .handler(
    updateResumeFn_createServerFn_handler,
    async ({ data: { resumeId, ...data } }) => {
      const responseData = await createServerApi()(
        `users/resumes/${resumeId}`,
        {
          method: 'PATCH',
          data
        }
      )
      const result = resumeResponseSchema.safeParse(responseData)
      if (!result.success) {
        console.error(
          '[resumeResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[resumeResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
var deleteResumeFn_createServerFn_handler = createServerRpc(
  {
    id: '56f211fd91e3e384d2ba36626987500c4f50acc47113e81ccaf73fd4fb35b0d5',
    name: 'deleteResumeFn',
    filename: 'src/api/users/resume.function.ts'
  },
  (opts) => deleteResumeFn.__executeServer(opts)
)
var deleteResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    deleteResumeFn_createServerFn_handler,
    async ({ data: { resumeId } }) => {
      return createServerApi()(`users/resumes/${resumeId}`, {
        method: 'DELETE'
      })
    }
  )
//#endregion
export {
  createResumeFn_createServerFn_handler,
  deleteResumeFn_createServerFn_handler,
  getResumeFn_createServerFn_handler,
  getResumesFn_createServerFn_handler,
  updateResumeFn_createServerFn_handler
}
