import useScrollDirection from '@/hooks/useScrollDirection';
import { Link, LinkProps } from '@tanstack/react-router';
import clsx from 'clsx';

export type BottomPillTabItem = LinkProps & {
  label: string;
  exact?: boolean;
};

interface BottomPillTabsProps {
  tabs: ReadonlyArray<BottomPillTabItem>;
}

const BottomPillTabs = ({ tabs }: BottomPillTabsProps) => {
  const dir = useScrollDirection();

  return (
    <div className={clsx('fixed left-1/2 bottom-4 -translate-x-1/2 transition-all duration-300', dir === 'down' ? 'translate-y-24' : 'translate-y-0')}>
      <nav className='flex items-center justify-between p-1 bg-muted/50 backdrop-blur-sm border rounded-full'>
        {tabs.map(({ label, exact, ...linkProps }, i) => {
          return (
            <Link
              key={i}
              {...linkProps}
              activeOptions={{ exact }}>
              {({ isActive }) => (
                <div className={clsx('btn-sm', !isActive && 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-transparent')}>{label}</div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomPillTabs;
