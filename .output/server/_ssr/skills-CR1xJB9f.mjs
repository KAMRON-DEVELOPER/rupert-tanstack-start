import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import { r as queryOptions } from '../_libs/tanstack__react-query.mjs'
import { n as paginationQuerySchema } from './pagination-LyDEN9Vs.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/skills-CR1xJB9f.js
var getSkillsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(
    createSsrRpc(
      '4061c953889ee1a90607708364ef4b4ee157a7e7d58c04148355ffbc55aeaafc'
    )
  )
var useGetSkillsQueryOptions = (
  data = {
    offset: 0,
    limit: 100
  }
) =>
  queryOptions({
    queryKey: Object.keys(data).length > 0 ? ['skills', data] : ['skills'],
    queryFn: () => getSkillsFn({ data }),
    staleTime: 36e5
  })
//#endregion
export { useGetSkillsQueryOptions as t }
