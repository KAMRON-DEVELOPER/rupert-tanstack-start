import { Link, useRouteContext } from '@tanstack/react-router';

import RupertSvg from '@/assets/icons/RupertSvg';

import clsx from 'clsx';
import useScrollDirection from '@/hooks/useScrollDirection';
import { NavbarLanguageSwitcherMenu } from './Navbar.NavbarLanguageSwitcherMenu';
import { NavbarThemeSwitcherMenu } from './Navbar.NavbarThemeSwitcherMenu';
import NavbarCTA from './Navbar.NavbarCTA';
import NavbarMenu from './Navbar.NavbarMenu';

const Navbar = () => {
  const dir = useScrollDirection();
  const isAuthenticated = useRouteContext({ from: '__root__' }).isAuthenticated;

  return (
    <nav
      className={clsx(
        'fixed flex items-center justify-between w-full h-12 md:h-16 px-4 md:px-8 bg-background text-md font-semibold transition-transform duration-300 z-1',
        dir === 'up' ? 'translate-y-0' : '-translate-y-full',
      )}>
      {/* Left */}
      <div className='flex items-center gap-4'>
        <Link to='/'>
          <RupertSvg className='size-8' />
        </Link>
        <Link to={isAuthenticated ? '/feeds' : '/'}>{isAuthenticated ? 'Home' : 'Feed'}</Link>
        <Link to='/posts'>Posts</Link>
        <Link to='/work'>Work</Link>
        <Link to='/messages'>Messages</Link>
      </div>

      {/* Right */}
      <div className='flex items-center gap-2'>
        <NavbarLanguageSwitcherMenu />
        <NavbarThemeSwitcherMenu />
        <NavbarCTA />
        <NavbarMenu />
      </div>
    </nav>
  );
};

export default Navbar;
