import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserSchema } from '@/types/user';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Globe, Mail, Phone } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

interface ProfileSidebarProps {
  user: UserSchema;
}

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  const links = [
    {
      icon: Mail,
      label: 'Email',
      value: user.email,
      href: `mailto:${user.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: user.phoneNumber,
      href: user.phoneNumber ? `tel:${user.phoneNumber}` : undefined,
    },
    {
      icon: SiGithub,
      label: 'GitHub',
      value: user.githubUrl?.replace('https://github.com/', ''),
      href: user.githubUrl,
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: user.linkedinUrl?.replace('https://linkedin.com/in/', ''),
      href: user.linkedinUrl,
    },
    {
      icon: Globe,
      label: 'Portfolio',
      value: user.portfolioUrl?.replace(/^https?:\/\//, ''),
      href: user.portfolioUrl,
    },
  ];

  return (
    <div className='space-y-6'>
      <Card className='border-none shadow-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {links.map((link) => {
            if (!link.value && !link.href) return null;
            return (
              <div
                key={link.label}
                className='flex items-center gap-3'>
                <div className='p-2 bg-muted rounded-lg'>
                  <link.icon className='size-4 text-muted-foreground' />
                </div>
                <div className='flex flex-col min-w-0'>
                  <span className='text-xs text-muted-foreground'>{link.label}</span>
                  {link.href ? (
                    <a
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm font-medium hover:underline truncate'>
                      {link.value || 'Link'}
                    </a>
                  ) : (
                    <span className='text-sm font-medium truncate'>{link.value || 'Not provided'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className='border-none shadow-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Additional Info</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-col'>
            <span className='text-xs text-muted-foreground'>Specialization</span>
            <span className='text-sm font-medium capitalize'>{user.specialization?.replace(/_/g, ' ') || 'Not specified'}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-muted-foreground'>Job Search Status</span>
            <span className='text-sm font-medium capitalize'>{user.jobSearchStatus.replace(/_/g, ' ')}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-muted-foreground'>Member Since</span>
            <span className='text-sm font-medium'>
              {/* Assuming there's a createdAt field in the actual data, even if not in Schema */}
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
