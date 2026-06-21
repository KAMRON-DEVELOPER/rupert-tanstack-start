import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import {
  n as useMutation,
  r as queryOptions,
  s as useQueryClient
} from '../_libs/tanstack__react-query.mjs'
import { r as userUpdateRequestSchema } from './user-DgDcvuBc.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/users-D-YVzfI_.js
var searchUsersFn = createServerFn()
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      'da404f30d1e3250f798b28b9035e0032cae56d58f5af79b10c6c10ac4605fe43'
    )
  )
var getProfileFn = createServerFn().handler(
  createSsrRpc(
    '2701c98ed69c50bf9c1149ed54398e1327518895ba0050bc7d02d8762a0430b8'
  )
)
var updateProfileFn = createServerFn({ method: 'POST' })
  .inputValidator(userUpdateRequestSchema)
  .handler(
    createSsrRpc(
      '2118d1cb95ed145b3597816e3f10a3c40b0489a7a2c9fb9d71c4f52aa8c821a9'
    )
  )
var deleteProfileFn = createServerFn({ method: 'POST' }).handler(
  createSsrRpc(
    '4b5bde810533f7c2b286513a124bb3638eeb8aa5f374653b0505278aaa7a4439'
  )
)
var useSearchUsersQueryOptions = (data) =>
  queryOptions({
    queryKey: ['users', 'search', data],
    queryFn: () => searchUsersFn({ data }),
    staleTime: 3e4
  })
var useGetProfileQueryOptions = () =>
  queryOptions({
    queryKey: ['profile'],
    queryFn: () => getProfileFn(),
    staleTime: 3e4
  })
var useUpdateProfileMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateProfileFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}
var useDeleteProfileMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteProfileFn(),
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
//#endregion
export {
  useUpdateProfileMutation as i,
  useGetProfileQueryOptions as n,
  useSearchUsersQueryOptions as r,
  useDeleteProfileMutation as t
}
