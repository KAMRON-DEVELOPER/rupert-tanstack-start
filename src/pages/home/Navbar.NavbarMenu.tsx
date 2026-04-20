import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import useIsMobile from '@/hooks/useIsMobile';

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

export default NavbarMenu;
