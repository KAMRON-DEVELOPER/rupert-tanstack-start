import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import {
  n as useMutation,
  r as queryOptions,
  s as useQueryClient
} from '../_libs/tanstack__react-query.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { o as uuid } from './primitives-BmQBoQXc.mjs'
import { n as paginationQuerySchema } from './pagination-LyDEN9Vs.mjs'
import {
  r as skillLinkUpdateRequestSchema,
  t as skillLinkCreateRequestSchema
} from './skill-WC7CHsIh.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work-experience-CA1o8zio.js
createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      'e6abaac6f1263e57c94f481ac9503cee5f9a6f0a2205d7c4296895cb28e5f084'
    )
  )
createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      '079782766e5434dec06fc303c3845a0ed4775d25205efeda74d25d4c0f130175'
    )
  )
var getFollowersFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(
    createSsrRpc(
      '521a65821a32ea541346305e8d11a0474871ba56d7f741d798493e47a016b555'
    )
  )
var getFollowingFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(
    createSsrRpc(
      'a94b93e007749a0829929fe220432583e5988853487ea3ae40b4f482a6b11a54'
    )
  )
var getFollowRequestsFn = createServerFn()
  .inputValidator(paginationQuerySchema)
  .handler(
    createSsrRpc(
      'd93bd3a30132df15346ec9d693c823dc742eef53984c5b3ba37ef5241acec403'
    )
  )
var updateFollowRequestFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      'a5e66de56443704aa714dd1f3d018fe6b85eb40875a28e6f71b0cd0994202fda'
    )
  )
var useGetFollowersQueryOptions = (data) =>
  queryOptions({
    queryKey: ['followers', data],
    queryFn: () => getFollowersFn({ data }),
    staleTime: 3e4
  })
var useGetFollowingQueryOptions = (data) =>
  queryOptions({
    queryKey: ['following', data],
    queryFn: () => getFollowingFn({ data }),
    staleTime: 3e4
  })
var useGetFollowRequestsQueryOptions = (data) =>
  queryOptions({
    queryKey: ['follow-requests', data],
    queryFn: () => getFollowRequestsFn({ data }),
    staleTime: 3e4
  })
var useUpdateFollowRequestMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ followId, data }) =>
      updateFollowRequestFn({
        data: {
          followId,
          data
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-requests'] })
      queryClient.invalidateQueries({ queryKey: ['followers'] })
    }
  })
}
var getSessionsFn = createServerFn().handler(
  createSsrRpc(
    'a9c92772b1954c49da79c9ea6a1cd02243ee41a6e252a85be04dfa57322705f7'
  )
)
var revokeSessionFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      '2071446b06c9c645d5aec0d687e719e68b169cc44116df5a487d0e1e993799a1'
    )
  )
var revokeSessionsFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      '6bce4c6a19b7d2c5719505574862d32890dabd09da7090447326313a82989214'
    )
  )
var useGetSessionsQueryOptions = () =>
  queryOptions({
    queryKey: ['sessions'],
    queryFn: () => getSessionsFn(),
    staleTime: 3e4
  })
var useRevokeSessionsMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => revokeSessionsFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    }
  })
}
var useRevokeSessionMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (sessionId) => revokeSessionFn({ data: { sessionId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    }
  })
}
var getUserSkillsFn = createServerFn().handler(
  createSsrRpc(
    'e9ad0ad555b1b2c1b00abd984a331de538bd632510f322193e3072f9f97bd5b6'
  )
)
var createUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillLinkCreateRequestSchema)
  .handler(
    createSsrRpc(
      '0fefc7e97d9dcb259dfa69a7647a7b66b9621205db47e7fc8194cc79bf373f84'
    )
  )
var updateUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillLinkUpdateRequestSchema.extend({ skillLinkId: uuid }))
  .handler(
    createSsrRpc(
      'fedec73ecf7685613c6267cf6ec76b4028b2b7493e1f26463075983e718d81a1'
    )
  )
var deleteUserSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(zod_default.object({ skillLinkId: uuid }))
  .handler(
    createSsrRpc(
      'a4fb37ee67f8224cefcc29fd008e2762a90ffbccbe3d85c31d2ea6e516286312'
    )
  )
var useGetUserSkillsQueryOptions = () =>
  queryOptions({
    queryKey: ['user-skills'],
    queryFn: () => getUserSkillsFn(),
    staleTime: 3e4
  })
var useAddUserSkillMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createUserSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-skills'] })
    }
  })
}
var useUpdateUserSkillMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateUserSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-skills'] })
    }
  })
}
var useDeleteUserSkillMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (skillLinkId) => deleteUserSkillFn({ data: { skillLinkId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['user-skills'] })
    }
  })
}
var getWorkExperiencesFn = createServerFn().handler(
  createSsrRpc(
    '55921c90d29d1772e7a23a31fbaec83a5e29891063dae0b9b609e58f93f92204'
  )
)
var createWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      'a6a2567837110fc2c538af43721d6fd7e477f255a63c0fa27f3f2aa8e0c8b8a3'
    )
  )
var updateWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      'ef498db43b8606709655310fd7f028976d3948380e659e3be83dc2fd4d44ea02'
    )
  )
var deleteWorkExperienceFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      'dee5cd9c2ddb9be48695e08da942045843925b10c7383203acd9da59a8c9d501'
    )
  )
var useGetWorkExperiencesQueryOptions = () =>
  queryOptions({
    queryKey: ['work-experiences'],
    queryFn: () => getWorkExperiencesFn(),
    staleTime: 3e4
  })
var useCreateWorkExperienceMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createWorkExperienceFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['work-experiences'] })
    }
  })
}
var useUpdateWorkExperienceMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ workExperienceId, data }) =>
      updateWorkExperienceFn({
        data: {
          workExperienceId,
          data
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['work-experiences'] })
    }
  })
}
var useDeleteWorkExperienceMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (workExperienceId) =>
      deleteWorkExperienceFn({ data: { workExperienceId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['work-experiences'] })
    }
  })
}
//#endregion
export {
  useGetFollowRequestsQueryOptions as a,
  useGetSessionsQueryOptions as c,
  useRevokeSessionMutation as d,
  useRevokeSessionsMutation as f,
  useUpdateWorkExperienceMutation as h,
  useDeleteWorkExperienceMutation as i,
  useGetUserSkillsQueryOptions as l,
  useUpdateUserSkillMutation as m,
  useCreateWorkExperienceMutation as n,
  useGetFollowersQueryOptions as o,
  useUpdateFollowRequestMutation as p,
  useDeleteUserSkillMutation as r,
  useGetFollowingQueryOptions as s,
  useAddUserSkillMutation as t,
  useGetWorkExperiencesQueryOptions as u
}
