import { Link } from '@tanstack/react-router';

import RupertSvg from '@/assets/icons/RupertSvg';

import clsx from 'clsx';
import useScrollDirection from '@/hooks/useScrollDirection';
import { NavbarLanguageSwitcherMenu } from './Navbar.NavbarLanguageSwitcherMenu';
import { NavbarThemeSwitcherMenu } from './Navbar.NavbarThemeSwitcherMenu';
import NavbarCTA from './Navbar.NavbarCTA';
import NavbarMenu from './Navbar.NavbarMenu';

const Navbar = () => {
  const dir = useScrollDirection();

  return (
    <div className={clsx('fixed transition-all duration-300 w-full border-b', dir === 'up' ? 'translate-y-0' : '-translate-y-full')}>
      <nav className='flex items-center justify-between h-12 md:h-16 px-4 md:px-8 bg-background text-md font-semibold z-1'>
        {/* Left */}
        <Link
          to='/'
          className='flex items-center gap-2'>
          <RupertSvg className='size-8 fill-primary' />
          Rupert
        </Link>

        <div className='flex items-center gap-4 text-muted-foreground'>
          <Link
            to='/feeds'
            disabled={true}
            className='text-muted-foreground hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground'>
            Feed
          </Link>
          <Link
            to='/posts'
            disabled={true}
            className='text-muted-foreground hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground'>
            Posts
          </Link>
          <Link
            to='/work'
            activeOptions={{ exact: false }}
            className='text-muted-foreground hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground'>
            Work
          </Link>
          <Link
            to='/messages'
            activeOptions={{ exact: false }}
            disabled={true}
            className='text-muted-foreground hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground'>
            Messages
          </Link>
        </div>

        {/* Right */}
        <div className='flex items-center gap-2'>
          <NavbarLanguageSwitcherMenu />
          <NavbarThemeSwitcherMenu />
          <NavbarCTA />
          <NavbarMenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
