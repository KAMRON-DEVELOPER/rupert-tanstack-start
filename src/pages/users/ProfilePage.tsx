import ProfileHeader from './profile/ProfileHeader'
import ProfileAbout from './profile/ProfileAbout'
import ProfileSkills from './profile/ProfileSkills'
import ProfileResumes from './profile/ProfileResumes'
import ProfileSidebar from './profile/ProfileSidebar'
import ProfileSessions from './profile/ProfileSessions'
import ProfileWorkExperiences from './profile/ProfileWorkExperiences'
import ProfileFollows from './profile/ProfileFollows'
import ProfileAccount from './profile/ProfileAccount'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useGetProfileQueryOptions } from '@/services/users/auth'

const ProfilePage = () => {
  const { data: user } = useSuspenseQuery(useGetProfileQueryOptions())

  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <ProfileHeader user={user} />
            <ProfileAbout bio={user.bio} />
            <ProfileSkills user={user} />
            <ProfileResumes user={user} />
            <ProfileWorkExperiences />
            <ProfileSessions />
            <ProfileFollows />
          </div>
          <div className="space-y-8">
            <ProfileSidebar user={user} />
            <ProfileAccount />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
