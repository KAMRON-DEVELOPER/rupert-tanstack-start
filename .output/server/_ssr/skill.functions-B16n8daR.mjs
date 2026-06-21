import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  a as skillResponseSchema,
  i as skillRequestSchema
} from './skill-WC7CHsIh.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/skill.functions-B16n8daR.js
var createSkillFn_createServerFn_handler = createServerRpc(
  {
    id: 'e7d9491a74adc2cab9ef1ed5aec7254bbb6347f3be0f354392e504ef028ca826',
    name: 'createSkillFn',
    filename: 'src/api/admin/skill.functions.ts'
  },
  (opts) => createSkillFn.__executeServer(opts)
)
var createSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillRequestSchema)
  .handler(createSkillFn_createServerFn_handler, async ({ data }) => {
    const response = await createServerApi()('admin/skills', {
      method: 'POST',
      data
    })
    const result = skillResponseSchema.safeParse(response)
    if (!result.success) {
      console.error('[skillResponseSchema] parse failed:', result.error.message)
      throw new Error(
        '[skillResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var updateSkillFn_createServerFn_handler = createServerRpc(
  {
    id: '4f167d949175e8d0767305f0bf25c7c99bb55dd33a68134272c1dc7ccc5c8530',
    name: 'updateSkillFn',
    filename: 'src/api/admin/skill.functions.ts'
  },
  (opts) => updateSkillFn.__executeServer(opts)
)
var updateSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillRequestSchema.extend({ skillId: zod_default.uuid() }))
  .handler(
    updateSkillFn_createServerFn_handler,
    async ({ data: { name, skillId } }) => {
      await createServerApi()(`admin/skills/${skillId}`, {
        method: 'PATCH',
        data: { name }
      })
    }
  )
var deleteSkillFn_createServerFn_handler = createServerRpc(
  {
    id: '0654a4dc85021aa78dde4baf518b85fa2858b512dd92903674d94b738617f541',
    name: 'deleteSkillFn',
    filename: 'src/api/admin/skill.functions.ts'
  },
  (opts) => deleteSkillFn.__executeServer(opts)
)
var deleteSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(zod_default.object({ skillId: zod_default.uuid() }))
  .handler(
    deleteSkillFn_createServerFn_handler,
    async ({ data: { skillId } }) => {
      await createServerApi()(`admin/skills/${skillId}`, { method: 'DELETE' })
    }
  )
//#endregion
export {
  createSkillFn_createServerFn_handler,
  deleteSkillFn_createServerFn_handler,
  updateSkillFn_createServerFn_handler
}
