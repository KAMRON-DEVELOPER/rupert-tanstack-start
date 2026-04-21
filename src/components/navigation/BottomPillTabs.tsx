import useScrollDirection from '@/hooks/useScrollDirection';
import { Link, LinkProps } from '@tanstack/react-router';
import clsx from 'clsx';

export type BottomPillTabItem = LinkProps & {
  label: string;
  exact?: boolean;
};

interface BottomPillTabsProps {
  tabs: BottomPillTabItem[];
}

const BottomPillTabs = ({ tabs }: BottomPillTabsProps) => {
  const dir = useScrollDirection();

  return (
    <div
      className={clsx(
        'fixed left-1/2 bottom-4 md:bottom-6 -translate-x-1/2 z-50 transition-all duration-300',
        dir === 'down' ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100',
      )}>
      <nav
        className={clsx(
          'flex items-center gap-1 rounded-full border px-2 py-2 shadow-lg',
          'bg-background/60 supports-backdrop-filter:bg-background/40',
          'backdrop-blur-xl backdrop-saturate-150',
          'border-white/10 dark:border-white/10',
        )}>
        {tabs.map(({ label, exact, ...linkProps }, i) => {
          return (
            <Link
              key={i}
              {...linkProps}
              activeOptions={{ exact }}>
              {({ isActive }) => (
                <span
                  className={clsx(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap',
                    isActive ? 'bg-foreground text-background shadow-sm' : 'text-foreground/70 hover:text-foreground hover:bg-white/10',
                  )}>
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomPillTabs;
