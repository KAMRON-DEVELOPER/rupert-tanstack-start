import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import { r as queryOptions } from '../_libs/tanstack__react-query.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { n as paginationQuerySchema } from './pagination-LyDEN9Vs.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/locations-DBFoHRWi.js
var getCountriesFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(
    createSsrRpc(
      '0b7cf93159d3934851ad6ecc1fa172985c3ad015cc9b83992cc2c65b1f2d610b'
    )
  )
var getCitiesFn = createServerFn()
  .inputValidator(
    paginationQuerySchema.extend({ countryId: zod_default.string() })
  )
  .handler(
    createSsrRpc(
      '6a1194b6b9c66d807333c1f589ccebb10c1082deed76a73bcaecbc18bb3acc41'
    )
  )
var useGetCountriesQueryOptions = (
  data = {
    offset: 0,
    limit: 100
  }
) =>
  queryOptions({
    queryKey:
      Object.keys(data).length > 0 ? ['countries', data] : ['countries'],
    queryFn: () => getCountriesFn({ data }),
    staleTime: 3e4
  })
var useGetCitiesQueryOptions = (data) =>
  queryOptions({
    queryKey: ['countries', data.countryId, 'cities', data],
    queryFn: () =>
      getCitiesFn({
        data: {
          offset: 0,
          limit: 100,
          ...data
        }
      }),
    enabled: Boolean(data.countryId),
    staleTime: 36e5
  })
//#endregion
export { useGetCountriesQueryOptions as n, useGetCitiesQueryOptions as t }
