import { Link } from '@tanstack/react-router'

import RupertSvg from '@/assets/icons/RupertSvg'

import clsx from 'clsx'
import useScrollDirection from '@/hooks/useScrollDirection'
import { NavbarLanguageSwitcherMenu } from './Navbar.NavbarLanguageSwitcherMenu'
import { NavbarThemeSwitcherMenu } from './Navbar.NavbarThemeSwitcherMenu'
import NavbarCTA from './Navbar.NavbarCTA'
import NavbarMenu from './Navbar.NavbarMenu'

const Navbar = () => {
  const dir = useScrollDirection()

  return (
    <div
      className={clsx(
        'fixed z-1 w-full transition-all duration-300',
        dir === 'up' ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <nav className="bg-primary-foreground/50 text-md flex h-12 items-center justify-between px-4 font-semibold backdrop-blur-sm md:h-14 md:px-8">
        {/* Left */}
        <Link to="/" className="flex items-center gap-2">
          <RupertSvg className="fill-primary size-8" />
          Rupert
        </Link>

        <div className="text-muted-foreground flex items-center gap-4">
          <Link
            to="/feeds"
            disabled={true}
            className="text-muted-foreground hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground"
          >
            Feed
          </Link>
          <Link
            to="/posts"
            disabled={true}
            className="text-muted-foreground hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground"
          >
            Posts
          </Link>
          <Link
            to="/work"
            activeOptions={{ exact: false }}
            className="text-muted-foreground hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground"
          >
            Work
          </Link>
          <Link
            to="/messages"
            activeOptions={{ exact: false }}
            disabled={true}
            className="text-muted-foreground hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground"
          >
            Messages
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <NavbarLanguageSwitcherMenu />
          <NavbarThemeSwitcherMenu />
          <NavbarCTA />
          <NavbarMenu />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
