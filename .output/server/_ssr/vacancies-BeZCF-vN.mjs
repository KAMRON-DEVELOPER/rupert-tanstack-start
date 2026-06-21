import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import {
  n as useMutation,
  r as queryOptions,
  s as useQueryClient
} from '../_libs/tanstack__react-query.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  a as vacancyListParamsSchema,
  n as applicationListParamsSchema
} from './vacancy-BU3XEoF-.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/vacancies-BeZCF-vN.js
var getVacanciesFn = createServerFn()
  .inputValidator(vacancyListParamsSchema)
  .handler(
    createSsrRpc(
      '1cfe67b18d4875567e1323a55b11579a633907de444cb0da49b88f5141a42b67'
    )
  )
var getVacancyFn = createServerFn()
  .inputValidator(zod_default.object({ id: zod_default.uuid() }))
  .handler(
    createSsrRpc(
      '23608d1ce4dd9141ce459b8b9b2b4a2562f774a42239db2875534087b0854b46'
    )
  )
var getApplicationsFn = createServerFn()
  .inputValidator(applicationListParamsSchema)
  .handler(
    createSsrRpc(
      'b7d6f5a60197c487f50eb5bf88908a40522f2e0778ea0b58d7bdb5c62f3448da'
    )
  )
var getApplicationFn = createServerFn()
  .inputValidator(zod_default.object({ id: zod_default.uuid() }))
  .handler(
    createSsrRpc(
      '6183ac05653f3949294e86763ae45ca91c2fa3272918cba589d0b21081e5824a'
    )
  )
var useGetVacanciesQueryOptions = (data) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacanciesFn({ data }),
    staleTime: 3e4
  })
var useGetVacancyQueryOptions = (data) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacancyFn({ data }),
    staleTime: 3e4
  })
var useGetApplicationsQueryOptions = (data) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationsFn({ data }),
    staleTime: 3e4
  })
var useGetApplicationQueryOptions = (data) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationFn({ data }),
    staleTime: 3e4
  })
var useCreateVacancyMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ companyId, data }) =>
      api(`vacancies/companies/${companyId}`, {
        method: 'POST',
        data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
    }
  })
}
var useUpdateVacancyMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) =>
      api(`vacancies/${id}`, {
        method: 'PATCH',
        data
      }),
    onSuccess: (vacancy) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: vacancy.id }]
      })
    }
  })
}
var useDeleteVacancyMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => api(`vacancies/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
    }
  })
}
var useAddVacancySkillMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ vacancyId, data }) =>
      api(`vacancies/${vacancyId}/skills`, {
        method: 'POST',
        data
      }),
    onSuccess: (_, { vacancyId }) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: vacancyId }]
      })
    }
  })
}
var useUpdateVacancySkillMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ vacancyId, skillLinkId, data }) =>
      api(`vacancies/${vacancyId}/skills/${skillLinkId}`, {
        method: 'PATCH',
        data
      }),
    onSuccess: (_, { vacancyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: vacancyId }]
      })
    }
  })
}
var useDeleteVacancySkillMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ vacancyId, skillLinkId }) =>
      api(`vacancies/${vacancyId}/skills/${skillLinkId}`, { method: 'DELETE' }),
    onSuccess: (_, { vacancyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: vacancyId }]
      })
    }
  })
}
var useSaveVacancyMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => api(`vacancies/${id}/save`, { method: 'POST' }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
      queryClient.invalidateQueries({ queryKey: ['vacancies', { id }] })
    }
  })
}
var useUnsaveVacancyMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => api(`vacancies/${id}/save`, { method: 'DELETE' }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
      queryClient.invalidateQueries({ queryKey: ['vacancies', { id }] })
    }
  })
}
var useCreateApplicationMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) =>
      api('vacancies/applications', {
        method: 'POST',
        data
      }),
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: application.vacancyId }]
      })
    }
  })
}
var useUpdateApplicationMutation = (api) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) =>
      api(`vacancies/applications/${id}`, {
        method: 'PATCH',
        data
      }),
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      queryClient.invalidateQueries({
        queryKey: ['applications', { id: application.id }]
      })
    }
  })
}
//#endregion
export {
  useDeleteVacancySkillMutation as a,
  useGetVacanciesQueryOptions as c,
  useUnsaveVacancyMutation as d,
  useUpdateApplicationMutation as f,
  useDeleteVacancyMutation as i,
  useGetVacancyQueryOptions as l,
  useUpdateVacancySkillMutation as m,
  useCreateApplicationMutation as n,
  useGetApplicationQueryOptions as o,
  useUpdateVacancyMutation as p,
  useCreateVacancyMutation as r,
  useGetApplicationsQueryOptions as s,
  useAddVacancySkillMutation as t,
  useSaveVacancyMutation as u
}
