import { PaginationQuery } from '@/types/shared/pagination'
import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  followUserFn,
  getFollowersFn,
  getFollowingFn,
  getFollowRequestsFn,
  unfollowUserFn,
  updateFollowRequestFn
} from './follow.function'
import { FollowUpdateRequest } from '@/types/users/follow'

export const useGetFollowersQueryOptions = (data: PaginationQuery) =>
  queryOptions({
    queryKey: ['followers', data],
    queryFn: () => getFollowersFn({ data }),
    staleTime: 30_000
  })

export const useGetFollowingQueryOptions = (data: PaginationQuery) =>
  queryOptions({
    queryKey: ['following', data],
    queryFn: () => getFollowingFn({ data }),
    staleTime: 30_000
  })

export const useGetFollowRequestsQueryOptions = (data: PaginationQuery) =>
  queryOptions({
    queryKey: ['follow-requests', data],
    queryFn: () => getFollowRequestsFn({ data }),
    staleTime: 30_000
  })

export const useFollowUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (followingId: string) =>
      followUserFn({ data: { followingId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] })
      queryClient.invalidateQueries({ queryKey: ['following'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}

export const useUnfollowUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (followingId: string) =>
      unfollowUserFn({ data: { followingId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] })
      queryClient.invalidateQueries({ queryKey: ['following'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}

export const useUpdateFollowRequestMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      followId,
      data
    }: {
      followId: string
      data: FollowUpdateRequest
    }) => updateFollowRequestFn({ data: { followId, data } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-requests'] })
      queryClient.invalidateQueries({ queryKey: ['followers'] })
    }
  })
}
