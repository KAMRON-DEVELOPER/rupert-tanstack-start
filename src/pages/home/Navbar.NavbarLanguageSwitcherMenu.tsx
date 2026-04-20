import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useIsMobile from '@/hooks/useIsMobile';
import { useState } from 'react';
import FlagUz from '@/components/svgs/FlagUz';
import FlagUk from '@/components/svgs/FlagUk';
import FlagRu from '@/components/svgs/FlagRu';

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
