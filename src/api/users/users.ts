import { UserUpdateRequest } from '@/types/users/user'
import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  deleteProfileFn,
  getProfileFn,
  searchUsersFn,
  updateProfileFn
} from './users.functions'

export const useSearchUsersQueryOptions = (data: {
  q: string
  offset?: number
  limit?: number
}) =>
  queryOptions({
    queryKey: ['users', 'search', data],
    queryFn: () => searchUsersFn({ data }),
    staleTime: 30_000
  })

export const useGetProfileQueryOptions = () =>
  queryOptions({
    queryKey: ['profile'],
    queryFn: () => getProfileFn(),
    staleTime: 30_000
  })

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserUpdateRequest) => updateProfileFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}

export const useDeleteProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteProfileFn(),
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
