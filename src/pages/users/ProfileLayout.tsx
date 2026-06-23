import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, useLocation } from '@tanstack/react-router'
import {
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  LayoutDashboard,
  ScrollText,
  UserCheck,
  UserPlus,
  Wrench
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useGetProfileQueryOptions } from '@/api/users/users'
import { cn } from '@/lib/utils'

type NavItem = {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const workItems: NavItem[] = [
  { to: '/profile/applications', label: 'My Applications', icon: ScrollText },
  { to: '/profile/company', label: 'My Company', icon: BriefcaseBusiness }
]

const profileItems: NavItem[] = [
  { to: '/profile/', label: 'Overview', icon: LayoutDashboard },
  { to: '/profile/skills', label: 'Skills', icon: Wrench },
  { to: '/profile/resumes', label: 'Resumes', icon: FileText },
  { to: '/profile/work-experience', label: 'Work Experience', icon: FolderKanban },
  { to: '/profile/sessions', label: 'Sessions', icon: UserCheck },
  { to: '/profile/follows', label: 'Follows', icon: UserPlus }
]

const ProfileLayout = () => {
  const { data: user } = useSuspenseQuery(useGetProfileQueryOptions())
  const location = useLocation()

  const initials = [user.firstName, user.lastName]
    .filter((n): n is string => Boolean(n))
    .map((n) => n[0])
    .join('')

  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="container mx-auto flex max-w-6xl gap-8 px-4 py-8">
        <aside className="sticky top-24 hidden h-fit w-56 shrink-0 md:block">
          <div className="bg-background rounded-lg border p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={user.avatarUrl ?? undefined} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
                {user.headline && (
                  <p className="text-muted-foreground truncate text-xs">{user.headline}</p>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-1">
              <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
                Work
              </p>
              {workItems.map((item) => (
                <NavLink
                  key={item.to}
                  item={item}
                  isActive={isActive(item.to, location.pathname)}
                />
              ))}

              <Separator className="my-3" />

              <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
                Profile
              </p>
              {profileItems.map((item) => (
                <NavLink
                  key={item.to}
                  item={item}
                  isActive={isActive(item.to, location.pathname)}
                />
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      size="sm"
      className={cn('w-full justify-start gap-2', !isActive && 'text-muted-foreground')}
      asChild
    >
      <Link to={item.to}>
        <item.icon className="size-4" />
        {item.label}
      </Link>
    </Button>
  )
}

function isActive(to: string, pathname: string) {
  if (to === '/profile/') return pathname === '/profile/' || pathname === '/profile'
  return pathname.startsWith(to)
}

export default ProfileLayout
