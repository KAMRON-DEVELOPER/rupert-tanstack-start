import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useIsMobile from '@/hooks/useIsMobile';

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
