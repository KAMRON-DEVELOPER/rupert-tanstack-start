import { n as createServerFn } from './ssr.mjs'
import {
  n as paginationQuerySchema,
  t as paginatedResponseSchema
} from './pagination-LyDEN9Vs.mjs'
import { a as skillResponseSchema } from './skill-WC7CHsIh.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/skills.functions-CnHW5fD9.js
var getSkillsFn_createServerFn_handler = createServerRpc(
  {
    id: '4061c953889ee1a90607708364ef4b4ee157a7e7d58c04148355ffbc55aeaafc',
    name: 'getSkillsFn',
    filename: 'src/api/skills/skills.functions.ts'
  },
  (opts) => getSkillsFn.__executeServer(opts)
)
var getSkillsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(getSkillsFn_createServerFn_handler, async ({ data: params }) => {
    const data = await createServerApi()('skills/', { params })
    const result = paginatedResponseSchema(skillResponseSchema).safeParse(data)
    if (!result.success) {
      console.error('[skillResponseSchema] parse failed:', result.error.message)
      throw new Error(
        '[skillResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
//#endregion
export { getSkillsFn_createServerFn_handler }
