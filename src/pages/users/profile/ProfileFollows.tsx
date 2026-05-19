import EmptyState from '@/components/forms/EmptyState'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  useGetFollowersQueryOptions,
  useGetFollowingQueryOptions,
  useGetFollowRequestsQueryOptions,
  useUpdateFollowRequestMutation
} from '@/services/users/users'
import type { FollowSchema, FollowUserSchema } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const FollowPerson = ({ user }: { user: FollowUserSchema | null }) => {
  if (!user) return <span>Unknown user</span>
  return (
    <span>
      {user.firstName} {user.lastName}
    </span>
  )
}

const ProfileFollows = () => {
  const followers = useQuery(useGetFollowersQueryOptions({ offset: 0, limit: 10 }))
  const following = useQuery(useGetFollowingQueryOptions({ offset: 0, limit: 10 }))
  const requests = useQuery(useGetFollowRequestsQueryOptions({ offset: 0, limit: 10 }))
  const updateRequest = useUpdateFollowRequestMutation()

  const decide = async (followId: string, status: 'accepted' | 'declined') => {
    try {
      await updateRequest.mutateAsync({ followId, data: { status } })
      toast.success(`Request ${status}`)
    } catch {
      toast.error('Failed to update follow request')
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Follows</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FollowList title="Followers" follows={followers.data?.data ?? []} kind="followers" />
        <FollowList title="Following" follows={following.data?.data ?? []} kind="following" />
        <div className="space-y-2">
          <h3 className="font-medium">Follow requests</h3>
          {requests.isPending && (
            <p className="text-muted-foreground text-sm">Loading requests...</p>
          )}
          {requests.data?.data.length === 0 && <EmptyState title="No follow requests" />}
          {requests.data?.data.map((follow) => (
            <div
              key={follow.id}
              className="flex items-center justify-between rounded-lg border p-3 text-sm"
            >
              <FollowPerson user={follow.follower} />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => decide(follow.id, 'accepted')}
                  disabled={updateRequest.isPending}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => decide(follow.id, 'declined')}
                  disabled={updateRequest.isPending}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const FollowList = ({
  title,
  follows,
  kind
}: {
  title: string
  follows: FollowSchema[]
  kind: 'followers' | 'following'
}) => (
  <div className="space-y-2">
    <h3 className="font-medium">{title}</h3>
    {follows.length === 0 ? (
      <EmptyState title={`No ${title.toLowerCase()}`} />
    ) : (
      follows.map((follow) => (
        <div key={follow.id} className="rounded-lg border p-3 text-sm">
          <FollowPerson user={kind === 'followers' ? follow.follower : follow.following} />
        </div>
      ))
    )}
  </div>
)

export default ProfileFollows
