import { t as zod_default } from '../_libs/zod.mjs'
import { a as isoDateTime, o as uuid } from './primitives-BmQBoQXc.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/base-DM7IIzOg.js
var baseSchema = zod_default.object({
  id: uuid,
  createdAt: isoDateTime,
  updatedAt: isoDateTime
})
//#endregion
export { baseSchema as t }
