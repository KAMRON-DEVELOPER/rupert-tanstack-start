import { useSuspenseQuery } from '@tanstack/react-query'
import { useGetProfileQueryOptions } from '@/api/users/users'
import ProfileHeader from '@/pages/users/profile/ProfileHeader'
import ProfileAbout from '@/pages/users/profile/ProfileAbout'
import ProfileContactInfo from '@/pages/users/profile/ProfileContactInfo'
import ProfileEditDialog from '@/pages/users/profile/ProfileEditDialog'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export const Route = createFileRoute('/(public)/profile/')({
  component: ProfileOverviewPage
})

function ProfileOverviewPage() {
  const { data: user } = useSuspenseQuery(useGetProfileQueryOptions())
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
          <Pencil className="mr-1 size-4" />
          Edit Profile
        </Button>
      </div>
      <ProfileHeader user={user} />
      <ProfileAbout bio={user.bio} />
      <ProfileContactInfo user={user} />
      <ProfileEditDialog user={user} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  )
}
