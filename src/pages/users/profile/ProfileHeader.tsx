import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserSchema } from '@/types/user';
import { MapPin, Pencil } from 'lucide-react';
import ProfileEditDialog from './ProfileEditDialog';
import { useState } from 'react';

interface ProfileHeaderProps {
  user: UserSchema;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <Card className='overflow-hidden border-none shadow-sm'>
      <div className='h-32 bg-linear-to-r from-primary/20 to-primary/10 relative'>
        {user.bannerUrl && (
          <img
            src={user.bannerUrl}
            alt='Banner'
            className='w-full h-full object-cover'
          />
        )}
      </div>
      <div className='px-6 pb-6'>
        <div className='relative flex justify-between items-end -mt-12 mb-4'>
          <Avatar className='size-24 border-4 border-primary-foreground shadow-md'>
            <AvatarImage
              src={user.avatarUrl}
              alt={user.firstName}
            />
            <AvatarFallback className='text-2xl'>
              {user.firstName[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className='size-4 mr-2' />
            Edit Profile
          </Button>
        </div>

        <div className='space-y-1'>
          <h1 className='text-2xl font-bold'>
            {user.firstName} {user.lastName}
          </h1>
          {user.headline && <p className='text-muted-foreground text-lg'>{user.headline}</p>}
          <div className='flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground'>
            {(user.city || user.country) && (
              <div className='flex items-center gap-1'>
                <MapPin className='size-4' />
                <span>
                  {user.city}
                  {user.city && user.country ? ', ' : ''}
                  {user.country}
                </span>
              </div>
            )}
            <div className='flex gap-4'>
              <span>
                <strong className='text-foreground'>{user.followersCount}</strong> followers
              </span>
              <span>
                <strong className='text-foreground'>{user.followingsCount}</strong> following
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProfileEditDialog
        user={user}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </Card>
  );
};

export default ProfileHeader;
