import { Link, useRouteContext } from '@tanstack/react-router';

import { LogIn } from 'lucide-react';

import useIsMobile from '@/hooks/useIsMobile';

const NavbarCTA = () => {
  const isAuthenticated = useRouteContext({ from: '__root__' }).isAuthenticated;
  const isMobile = useIsMobile();

  const label = isAuthenticated ? 'Profile' : 'Get Started';

  if (isMobile) {
    return (
      <Link
        to={isAuthenticated ? '/profile' : '/auth'}
        aria-label={label}>
        <div className='btn-sm'>
          <LogIn size={4} />
        </div>
      </Link>
    );
  }

  return (
    <Link to={isAuthenticated ? '/profile' : '/auth'}>
      <div className='btn-sm'>{label}</div>
    </Link>
  );
};

export default NavbarCTA;
