import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import {
  n as useMutation,
  r as queryOptions,
  s as useQueryClient
} from '../_libs/tanstack__react-query.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { n as resumeUpdateRequestSchema } from './resume-CN48r55P.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/resume-DMYamUQJ.js
var getResumesFn = createServerFn().handler(
  createSsrRpc(
    '6621bb1fb7f76133520b7693829da11a9fd42752aaf97d30710cb719975aeaac'
  )
)
var createResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      '893364ffe5f0cf5c746bbfceec018585d63f7b10ca21f0231ac36d7ffcb75211'
    )
  )
createServerFn()
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      '3f155b40fdaec00b5c4270b981dc970152a6f10bd2dd046f80cf5b231f3f90a2'
    )
  )
var updateResumeFn = createServerFn({ method: 'POST' })
  .inputValidator(
    resumeUpdateRequestSchema.extend({ resumeId: zod_default.uuid() })
  )
  .handler(
    createSsrRpc(
      'eace28894f3d66e4eea57364435934c4a50b3f1a1aaf7bd9671ea0a599cc3449'
    )
  )
var deleteResumeFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(
    createSsrRpc(
      '56f211fd91e3e384d2ba36626987500c4f50acc47113e81ccaf73fd4fb35b0d5'
    )
  )
var useGetResumesQueryOptions = () =>
  queryOptions({
    queryKey: ['resumes'],
    queryFn: () => getResumesFn(),
    staleTime: 3e4
  })
var useCreateResumeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createResumeFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    }
  })
}
var useUpdateResumeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ resumeId, data }) =>
      updateResumeFn({
        data: {
          resumeId,
          ...data
        }
      }),
    onSuccess: (resume) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
      queryClient.invalidateQueries({
        queryKey: ['resumes', { resumeId: resume.id }]
      })
    }
  })
}
var useDeleteResumeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (resumeId) => deleteResumeFn({ data: { resumeId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    }
  })
}
//#endregion
export {
  useUpdateResumeMutation as i,
  useDeleteResumeMutation as n,
  useGetResumesQueryOptions as r,
  useCreateResumeMutation as t
}
