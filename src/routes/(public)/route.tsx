import RupertSvg from '@/assets/icons/RupertSvg'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'
import { useLogoutMutation, useGetProfileQueryOptions } from '@/services/users/auth'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  BadgeCheck,
  ChartBar,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Database,
  LifeBuoy,
  LogOut,
  LucideLayoutDashboard,
  PencilRuler,
  Plus,
  Rocket,
  Send,
  Settings,
  Workflow
} from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/(public)')({
  component: RouteComponent
})

const isActivePath = (path: string) => {
  return location.pathname === path || location.pathname.startsWith(path + '/')
}

function RouteComponent() {
  return (
    <SidebarProvider>
      <Sidebar>
        <Header />
        <Content />
        <Footer />
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}

const Header = ({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarMenu>) => {
  const { toggleSidebar } = useSidebar()

  return (
    <SidebarHeader>
      <SidebarMenu {...props} onClick={toggleSidebar}>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center">
              <RupertSvg className="text-primary size-48" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-primary truncate font-medium">Rupert</span>
              <span className="text-muted-foreground truncate text-xs">Dev Platform</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

const Content = ({ ...props }: ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarContent>
      <SidebarGroup {...props}>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* Dashboard */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActivePath('/dashboard')} tooltip="Dashboard">
                <Link to="/">
                  <LucideLayoutDashboard className="size-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Collapsible asChild defaultOpen={true} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip="Projects"
                    isActive={isActivePath('/projects') || isActivePath('/projects/')}
                  >
                    <Rocket className="size-4" />
                    <span>Projects</span>

                    <div className="ml-auto flex items-center gap-2">
                      <ChevronRight className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-0.5">
                  <SidebarMenuSub>
                    {/* Existing Projects */}
                    {['proj1', 'proj2'].map((project) => (
                      <SidebarMenuSubItem key={project}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === `/projects/${project}`}
                        >
                          <Link to={`/`} params={{ projectId: project }}>
                            <span>{project}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Databases */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActivePath('/databases')} tooltip="Databases">
                <Link to="/">
                  <Database className="h-4 w-4" />
                  <span>Databases</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Tracing */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActivePath('/tracing')} tooltip="Tracing">
                <Link to="/">
                  <ChartBar className="h-4 w-4" />
                  <span>Tracing</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Tables */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActivePath('/tables')} tooltip="Tables">
                <Link to="/">
                  <Workflow className="h-4 w-4" />
                  <span>Tables</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Shapes */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActivePath('/shapes')} tooltip="Shapes">
                <Link to="/">
                  <PencilRuler className="h-4 w-4" />
                  <span>Shapes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <ContentFooter />
      </SidebarGroup>

      <Separator />

      <SidebarGroup {...props}>
        <SidebarGroupLabel>Social</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus /> <span className="sr-only">Add Social</span>
        </SidebarGroupAction>
        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>

      <Separator />

      <SidebarGroup>
        <SidebarGroupLabel>Work</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus /> <span className="sr-only">Add Work</span>
        </SidebarGroupAction>
        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>

      <Separator />

      <SidebarGroup>
        <SidebarGroupLabel>Work</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus /> <span className="sr-only">Add Work</span>
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            {['some', 'thing', 'big'].map((name) => (
              <SidebarMenuItem key={name}>
                <SidebarMenuButton asChild>
                  <span>{name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <Separator />

      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Help
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent />
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

      <Separator />
    </SidebarContent>
  )
}

const ContentFooter = ({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  const items = [
    {
      title: 'Support',
      url: '#',
      Icon: LifeBuoy,
      onCLick: (e: any) => {
        const recipient = 'atajanovkamronbek2003@gmail.com'
        const subject = ''
        const body = ''
        const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.location.href = mailto
        e.preventDefault()
      }
    },
    {
      title: 'Feedback',
      url: '#',
      Icon: Send,
      onCLick: () => {
        toast.info('Deployment started')
        toast.warning('High memory usage')
        toast.error('Build failed')
        toast.success('Deployment completed')
      }
    }
  ]

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, url, Icon, onCLick }) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton asChild size="sm">
                <a href={url} onClick={(e) => onCLick(e)}>
                  <Icon />
                  <span>{title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const Footer = ({ ...props }: ComponentPropsWithoutRef<typeof SidebarMenu>) => {
  const navigate = useNavigate()
  const logoutMutation = useLogoutMutation()
  const { isMobile } = useSidebar()

  const { data: user } = useSuspenseQuery(useGetProfileQueryOptions())

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
    } catch (err) {
      toast.error('Logout failed')
      console.error('🚨 Logout failed:', err)
    } finally {
      navigate({ to: '/', replace: true })
    }
  }

  return (
    <SidebarMenu {...props}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatarUrl || undefined} alt={user.firstName} />
                <AvatarFallback>{user.firstName}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.firstName + user.lastName}</span>
                <span className="truncate text-xs">
                  {user.emailVerified ? 'emil verified' : 'your email not verified'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={16}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatarUrl || undefined} alt={user.firstName} />
                  <AvatarFallback className="rounded-lg">{user.firstName}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.firstName + user.lastName}</span>
                  <span className="truncate text-xs">
                    {user.emailVerified ? 'emil verified' : 'your email not verified'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
