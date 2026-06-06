import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useGetProfileQueryOptions } from '@/api/users/auth'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useRouteContext } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'

const AppSidebarFooter = ({ ...props }: ComponentPropsWithoutRef<typeof SidebarMenu>) => {
  const isAuthenticated = useRouteContext({ from: '__root__' }).isAuthenticated

  return (
    <SidebarFooter>
      <SidebarMenu {...props}>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            {isAuthenticated ? (
              <AppSidebarFooterAuthenticated />
            ) : (
              <AppSidebarFooterUnauthenticated />
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export default AppSidebarFooter

const AppSidebarFooterUnauthenticated = () => {
  return (
    <Link to="/auth" className="flex items-center gap-x-2">
      <div>
        <LogIn className="size-8" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Sign in</span>
      </div>
    </Link>
  )
}

const AppSidebarFooterAuthenticated = () => {
  const { data: user } = useSuspenseQuery(useGetProfileQueryOptions())

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')

  const initials = [user.firstName, user.lastName]
    .map((name) => name?.charAt(0))
    .filter(Boolean)
    .join('')
    .toUpperCase()

  return (
    <Link to="/" className="flex w-full items-center justify-between space-x-2">
      <Avatar className="size-8">
        <AvatarImage src={user.avatarUrl || undefined} alt={initials} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{fullName}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </Link>
  )
}
