import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import {
  n as useMutation,
  r as queryOptions,
  s as useQueryClient
} from '../_libs/tanstack__react-query.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/auth-D06X9tzE.js
var authProbeFn = createServerFn().handler(
  createSsrRpc(
    '6c3041275883677eb5a3f71a33c969adce92b7bcf82a747f8b93d3d312034eab'
  )
)
var logoutFn = createServerFn({ method: 'POST' }).handler(
  createSsrRpc(
    '81cb0dd57190c4a1218003ed3d18befcc20dad8680d12ed19c7351690aec090f'
  )
)
var useGetAuthProbeQueryOptions = () =>
  queryOptions({
    queryKey: ['authProbe'],
    queryFn: () => authProbeFn(),
    staleTime: 3e4
  })
var useEmailAuthMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) =>
      api('users/auth/email', {
        method: 'POST',
        data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    }
  })
}
var usePasswordSetupMutation = (api) => {
  return useMutation({
    mutationFn: ({ password, token }) =>
      api('users/auth/password-setup', {
        method: 'POST',
        data: { password },
        params: { token }
      })
  })
}
var useVerifyMutation = (api) => {
  return useMutation({
    mutationFn: (params) =>
      api('users/auth/verify', {
        method: 'POST',
        params
      })
  })
}
var useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => logoutFn(),
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
//#endregion
export {
  useVerifyMutation as a,
  usePasswordSetupMutation as i,
  useGetAuthProbeQueryOptions as n,
  useLogoutMutation as r,
  useEmailAuthMutation as t
}
