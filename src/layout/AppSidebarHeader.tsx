import RupertSvg from '@/assets/icons/RupertSvg'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { PanelLeftIcon } from 'lucide-react'

const AppSidebarHeader = ({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarMenu>) => {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <SidebarHeader>
      <SidebarMenu {...props}>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            onClick={() => isCollapsed && toggleSidebar()}
          >
            <Link
              to="/"
              disabled={isCollapsed}
              onClick={(e) => isCollapsed && e.preventDefault()}
              className="mr-auto flex w-full space-x-2"
            >
              <div className="flex aspect-square size-8 items-center justify-center">
                <RupertSvg
                  className={`transition-all duration-100 ${isCollapsed ? 'scale-[1.2]' : 'scale-[1.9]'}`}
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Rupert</span>
                <span className="truncate text-xs">Dev Platform</span>
              </div>
            </Link>
            <PanelLeftIcon onClick={toggleSidebar} className="cursor-pointer" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default AppSidebarHeader
