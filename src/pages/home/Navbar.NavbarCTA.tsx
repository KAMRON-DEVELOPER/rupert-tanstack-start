import { Link, useRouteContext } from '@tanstack/react-router';

import { LogIn } from 'lucide-react';

import useIsMobile from '@/hooks/useIsMobile';

const NavbarCTA = () => {
  const isAuthenticated = useRouteContext({ from: '__root__' }).isAuthenticated;
  const isMobile = useIsMobile();

  const to = isAuthenticated ? '/' : '/auth';
  const label = isAuthenticated ? 'Go to Console' : 'Get Started';

  if (isMobile) {
    return (
      <Link
        to={to}
        aria-label={label}>
        <div className='btn-sm'>
          <LogIn size={4} />
        </div>
      </Link>
    );
  }

  return (
    <Link to={to}>
      <div className='btn-sm'>{label}</div>
    </Link>
  );
};

export default NavbarCTA;
