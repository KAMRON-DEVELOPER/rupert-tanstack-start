import EmptyState from '@/components/forms/EmptyState'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  useGetSessionsQueryOptions,
  useRevokeSessionMutation,
  useRevokeSessionsMutation
} from '@/services/users/users'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const ProfileSessions = () => {
  const { data: sessions, isPending, isError } = useQuery(useGetSessionsQueryOptions())
  const revokeSession = useRevokeSessionMutation()
  const revokeSessions = useRevokeSessionsMutation()

  const revokeOne = async (sessionId: string) => {
    try {
      await revokeSession.mutateAsync(sessionId)
      toast.success('Session revoked')
    } catch {
      toast.error('Failed to revoke session')
    }
  }

  const revokeAll = async () => {
    try {
      await revokeSessions.mutateAsync({ includeCurrent: false })
      toast.success('Other sessions revoked')
    } catch {
      toast.error('Failed to revoke sessions')
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Sessions</CardTitle>
        <Button variant="outline" size="sm" onClick={revokeAll} disabled={revokeSessions.isPending}>
          Revoke others
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {isPending && <p className="text-muted-foreground text-sm">Loading sessions...</p>}
        {isError && <p className="text-muted-foreground text-sm">Sessions are not available.</p>}
        {sessions?.length === 0 && <EmptyState title="No sessions" />}
        {sessions?.map((session) => (
          <div
            key={session.id}
            className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{session.deviceName || 'Unknown device'}</p>
              <p className="text-muted-foreground text-sm">
                {session.ipAddr || 'Unknown IP'} ·{' '}
                {new Date(session.lastActivityAt).toLocaleString()}
              </p>
              {session.isActive && (
                <p className="text-muted-foreground text-xs">Current active session</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => revokeOne(session.id)}
              disabled={revokeSession.isPending}
            >
              Revoke
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ProfileSessions
