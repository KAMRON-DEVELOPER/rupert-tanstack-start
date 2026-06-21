import { t as zod_default } from '../_libs/zod.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/helper-CcD2XA6A.js
zod_default.object({ message: zod_default.string() })
var errorResponseSchema = zod_default.object({
  details: zod_default.union([
    zod_default.string(),
    zod_default.array(zod_default.string())
  ])
})
zod_default.object({ name: zod_default.string() })
function isErrorResponse(data) {
  return errorResponseSchema.safeParse(data).success
}
function getErrorMessage(data, fallback = 'Something went wrong') {
  if (!isErrorResponse(data)) return fallback
  return Array.isArray(data.details) ? data.details.join('\n') : data.details
}
//#endregion
export { getErrorMessage as t }
