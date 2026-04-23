import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileAboutProps {
  bio?: string;
}

const ProfileAbout = ({ bio }: ProfileAboutProps) => {
  if (!bio) return null;

  return (
    <Card className='border-none shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='whitespace-pre-wrap text-muted-foreground leading-relaxed'>{bio}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileAbout;
