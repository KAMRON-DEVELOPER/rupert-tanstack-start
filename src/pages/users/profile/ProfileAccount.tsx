import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDeleteProfileMutation, useLogoutMutation } from '@/services/users/auth'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

const ProfileAccount = () => {
  const navigate = useNavigate()
  const logout = useLogoutMutation()
  const deleteProfile = useDeleteProfileMutation()

  const handleLogout = async () => {
    try {
      await logout.mutateAsync()
      toast.success('Logged out')
      navigate({ to: '/auth', replace: true })
    } catch {
      toast.error('Failed to log out')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete your profile?')) return

    try {
      await deleteProfile.mutateAsync()
      toast.success('Profile deleted')
      navigate({ to: '/auth', replace: true })
    } catch {
      toast.error('Failed to delete profile')
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button variant="outline" onClick={handleLogout} disabled={logout.isPending}>
          Logout
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={deleteProfile.isPending}>
          Delete profile
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProfileAccount
