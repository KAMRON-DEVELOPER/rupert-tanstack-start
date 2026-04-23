import { getRouteApi } from '@tanstack/react-router';
import ProfileHeader from './profile/ProfileHeader';
import ProfileAbout from './profile/ProfileAbout';
import ProfileSkills from './profile/ProfileSkills';
import ProfileResumes from './profile/ProfileResumes';
import ProfileSidebar from './profile/ProfileSidebar';

const ProfilePage = () => {
  const user = getRouteApi('/(public)/profile/').useLoaderData();

  return (
    <div className='bg-muted/30 min-h-screen py-8'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            <ProfileHeader user={user} />
            <ProfileAbout bio={user.bio} />
            <ProfileSkills user={user} />
            <ProfileResumes user={user} />
          </div>
          <div className='space-y-8'>
            <ProfileSidebar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
