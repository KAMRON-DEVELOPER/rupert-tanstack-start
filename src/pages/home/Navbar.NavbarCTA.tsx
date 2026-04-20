import { Link, useRouteContext } from '@tanstack/react-router';

import { LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useIsMobile from '@/hooks/useIsMobile';

const NavbarCTA = () => {
  const isAuthenticated = useRouteContext({ from: '__root__' }).isAuthenticated;
  const isMobile = useIsMobile();

  const size = isMobile ? 'icon-sm' : 'icon-lg';
  const to = isAuthenticated ? '/' : '/auth';
  const label = isAuthenticated ? 'Go to Console' : 'Get Started';

  if (isMobile) {
    return (
      <Button
        asChild
        variant='outline'
        size={size}
        className='group'>
        <Link
          to={to}
          aria-label={label}>
          <LogIn
            size={4}
            className='text-muted-foreground group-hover:text-primary'
          />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      size='lg'
      className='px-4 text-sm transition hover:bg-accent rounded-full'>
      <Link to={to}>{label}</Link>
    </Button>
  );
};

export default NavbarCTA;
