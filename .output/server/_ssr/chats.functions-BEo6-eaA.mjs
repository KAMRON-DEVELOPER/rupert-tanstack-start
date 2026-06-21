import { n as createServerFn } from './ssr.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  n as paginationQuerySchema,
  t as paginatedResponseSchema
} from './pagination-LyDEN9Vs.mjs'
import {
  n as createServerRpc,
  t as createServerApi
} from './api.server-DOJ6Jc1U.mjs'
import { n as chatListItemResponseSchema } from './chat-Di9wjxRA.mjs'
import { t as chatMessagesResponseSchema } from './ws-BasjsCG1.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/chats.functions-BEo6-eaA.js
var getChatsFn_createServerFn_handler = createServerRpc(
  {
    id: 'd3762ab5affb3ab5e2448288d3ffcdb2cd2615e12410fd666f30b7939d6d3be3',
    name: 'getChatsFn',
    filename: 'src/api/chats/chats.functions.ts'
  },
  (opts) => getChatsFn.__executeServer(opts)
)
var getChatsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(getChatsFn_createServerFn_handler, async ({ data: params }) => {
    const data = await createServerApi()('chats/', { params })
    const result = paginatedResponseSchema(
      chatListItemResponseSchema
    ).safeParse(data)
    if (!result.success) {
      console.error(
        '[chatListItemResponseSchema] parse failed:',
        result.error.message
      )
      throw new Error(
        '[chatListItemResponseSchema] Unexpected response shape from backend'
      )
    }
    return result.data
  })
var getChatMessagesFn_createServerFn_handler = createServerRpc(
  {
    id: '2f80f3be7a7d00480e77d6e03bc5f3eb6299b5f37957fdf688ce8bbdea76be2c',
    name: 'getChatMessagesFn',
    filename: 'src/api/chats/chats.functions.ts'
  },
  (opts) => getChatMessagesFn.__executeServer(opts)
)
var getChatMessagesFn = createServerFn()
  .inputValidator(
    paginationQuerySchema.extend({ chatId: zod_default.string() })
  )
  .handler(
    getChatMessagesFn_createServerFn_handler,
    async ({ data: { chatId, ...params } }) => {
      const data = await createServerApi()(`chats/${chatId}/messages`, {
        params
      })
      const result = chatMessagesResponseSchema.safeParse(data)
      if (!result.success) {
        console.error(
          '[chatMessagesResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[chatMessagesResponseSchema] Unexpected response shape from backend'
        )
      }
      return result.data
    }
  )
//#endregion
export {
  getChatMessagesFn_createServerFn_handler,
  getChatsFn_createServerFn_handler
}
