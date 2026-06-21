import { t as zod_default } from '../_libs/zod.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/pagination-LyDEN9Vs.js
var paginationQuerySchema = zod_default.object({
  offset: zod_default.coerce.number().int().min(0).default(0),
  limit: zod_default.coerce.number().int().min(1).max(100).default(20)
})
var paginatedResponseSchema = (item) =>
  zod_default.object({
    data: zod_default.array(item),
    total: zod_default.number().int().min(0)
  })
//#endregion
export { paginationQuerySchema as n, paginatedResponseSchema as t }
