import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  getSessionsFn,
  revokeSessionFn,
  revokeSessionsFn
} from './session.function'

export const useGetSessionsQueryOptions = () =>
  queryOptions({
    queryKey: ['sessions'],
    queryFn: () => getSessionsFn()
  })

export const useRevokeSessionsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { include_current?: boolean }) =>
      revokeSessionsFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    }
  })
}

export const useRevokeSessionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sessionId: string) => revokeSessionFn({ data: { sessionId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    }
  })
}
