import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import {
  n as useMutation,
  r as queryOptions,
  s as useQueryClient
} from '../_libs/tanstack__react-query.mjs'
import { n as companyListParamsSchema } from './company-Ceac0N8k.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/companies-DOgslJIC.js
var getCompaniesFn = createServerFn()
  .inputValidator(companyListParamsSchema)
  .handler(
    createSsrRpc(
      '9270e2c7fe6ae3297d6a13e2af48862017fd1b2403fdc94af7661a9be3bb2090'
    )
  )
var getCompanyFn = createServerFn()
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      '512a5b71f05f26ff24776603ff4b89552798aa29d6a5348cecd28a7e70eb3369'
    )
  )
var useGetCompaniesQueryOptions = (data) =>
  queryOptions({
    queryKey: ['companies', data],
    queryFn: () => getCompaniesFn({ data }),
    staleTime: 3e4
  })
var useGetCompanyQueryOptions = (data) =>
  queryOptions({
    queryKey: ['companies', data],
    queryFn: () => getCompanyFn({ data }),
    staleTime: 3e4
  })
var useCreateCompanyMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) =>
      api('companies/', {
        method: 'POST',
        data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    }
  })
}
var useUpdateCompanyMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) =>
      api(`companies/${id}`, {
        method: 'PATCH',
        data
      }),
    onSuccess: (company) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      queryClient.invalidateQueries({
        queryKey: ['companies', { id: company.id }]
      })
    }
  })
}
var useDeleteCompanyMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => api(`companies/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    }
  })
}
var useAddCompanyMemberMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ companyId, data }) =>
      api(`companies/${companyId}/members`, {
        method: 'POST',
        data
      }),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['companies', { id: companyId }]
      })
    }
  })
}
var useUpdateCompanyMemberMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ companyId, memberId, data }) =>
      api(`companies/${companyId}/members/${memberId}`, {
        method: 'PATCH',
        data
      }),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['companies', { id: companyId }]
      })
    }
  })
}
var useDeleteCompanyMemberMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ companyId, memberId }) =>
      api(`companies/${companyId}/members/${memberId}`, { method: 'DELETE' }),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['companies', { id: companyId }]
      })
    }
  })
}
//#endregion
export {
  useGetCompaniesQueryOptions as a,
  useUpdateCompanyMutation as c,
  useDeleteCompanyMutation as i,
  useCreateCompanyMutation as n,
  useGetCompanyQueryOptions as o,
  useDeleteCompanyMemberMutation as r,
  useUpdateCompanyMemberMutation as s,
  useAddCompanyMemberMutation as t
}
