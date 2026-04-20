import { Link, useRouteContext } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import { Languages, LogIn, MenuIcon, Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import RupertSvg from '@/assets/icons/RupertSvg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import useIsMobile from '@/hooks/useIsMobile';
import { useState } from 'react';
import FlagUz from '@/components/svgs/FlagUz';
import FlagUk from '@/components/svgs/FlagUk';
import FlagRu from '@/components/svgs/FlagRu';
import clsx from 'clsx';
import useScrollDirection from '@/hooks/useScrollDirection';

const Navbar = () => {
  const dir = useScrollDirection();

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
        <Link to='/'>Home</Link>
        <Link to='/community'>Community</Link>
        <Link to='/jobs'>Jobs</Link>
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

export const NavbarLanguageSwitcherMenu = () => {
  type Langs = 'uz' | 'en' | 'ru';
  const [lang] = useState<Langs>('uz');
  const isMobile = useIsMobile();

  const size = isMobile ? 'icon-sm' : 'icon-lg';
  const variant = isMobile ? 'outline' : 'ghost';
  const className = (value: Langs) => (lang === value ? 'text-primary' : 'text-muted-foreground');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className='group'>
          <Languages className='text-muted-foreground group-hover:text-primary' />
          <span className='sr-only'>Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='mt-4'
        align='end'>
        <DropdownMenuItem className={className('uz')}>
          <FlagUz /> Uz
        </DropdownMenuItem>
        <DropdownMenuItem className={className('en')}>
          <FlagUk /> En
        </DropdownMenuItem>
        <DropdownMenuItem className={className('ru')}>
          <FlagRu /> Ru
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const NavbarThemeSwitcherMenu = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  const size = isMobile ? 'icon-sm' : 'icon-lg';
  const variant = isMobile ? 'outline' : 'ghost';
  const className = (value: 'light' | 'dark' | 'system') => (theme === value ? 'text-primary' : 'text-muted-foreground');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className='group'>
          <Sun className='scale-100 rotate-0 transition-all text-muted-foreground group-hover:text-primary dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute scale-0 rotate-90 transition-all text-muted-foreground group-hover:text-primary dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='mt-4'
        align='end'>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={className('light')}>
          <Sun size={4} />
          <span>Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={className('dark')}>
          <Moon size={4} />
          <span>Dark</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={className('system')}>
          <Monitor size={4} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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

const NavbarMenu = () => {
  const isMobile = useIsMobile();

  const size = isMobile ? 'icon-sm' : 'icon';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='md:hidden'
        asChild>
        <Button
          variant='outline'
          size={size}
          className='group'>
          <MenuIcon className='text-muted-foreground group-hover:text-primary' />
          <span className='sr-only'>Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='mt-4'
        align='end'>
        <DropdownMenuGroup>
          <DropdownMenuItem></DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href='#features'
              className='hover:text-foreground'>
              Features
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href='#pricing'
              className='hover:text-foreground'>
              Pricing
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
