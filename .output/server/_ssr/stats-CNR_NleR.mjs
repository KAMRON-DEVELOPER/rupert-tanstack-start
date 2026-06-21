import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import { r as queryOptions } from '../_libs/tanstack__react-query.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/stats-CNR_NleR.js
var getStatsFn = createServerFn().handler(
  createSsrRpc(
    '5d1554e43fd6e986a4e0012d7e64d9b29239b76a5a82236a4fbb4860f97246fe'
  )
)
var useGetStatsQueryOptions = () =>
  queryOptions({
    queryKey: ['stats'],
    queryFn: () => getStatsFn(),
    staleTime: 3e4
  })
//#endregion
export { useGetStatsQueryOptions as t }
