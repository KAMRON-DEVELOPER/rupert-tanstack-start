import { Link, useRouteContext } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import { Languages, LogIn, MenuIcon, Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import PoddleSvg from '@/assets/icons/PoddleSvg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import FlagUz from '@/components/svgs/FlagUz';
import FlagUk from '@/components/svgs/FlagUk';
import FlagRu from '@/components/svgs/FlagRu';
import { Separator } from '@/components/ui/separator';

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className='fixed w-full bg-background z-50 border-b border-primary/15'>
      <div className='px-4 md:px-8 h-12 md:h-16 flex items-center justify-between'>
        <Link
          to='/'
          className='flex items-center cursor-pointer gap-2'>
          <PoddleSvg className='size-7' />
          <span className='text-md md:text-lg font-bold'>Poddle</span>
        </Link>

        <div className='flex items-center gap-2'>
          <div className='hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground'>
            <a
              href='#features'
              className='hover:text-foreground'>
              Features
            </a>
            <a
              href='#pricing'
              className='hover:text-foreground'>
              Pricing
            </a>
          </div>
          {!isMobile && (
            <Separator
              orientation='vertical'
              className='ml-2'
            />
          )}
          <NavbarLanguageSwitcherMenu />
          <NavbarThemeSwitcherMenu />
          {!isMobile && (
            <Separator
              orientation='vertical'
              className='mr-2'
            />
          )}
          <NavbarCTA />
          <NavbarMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavbarLanguageSwitcherMenu = () => {
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

const NavbarThemeSwitcherMenu = () => {
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
      className='text-sm font-semibold transition hover:opacity-90 px-4 rounded-full'>
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
