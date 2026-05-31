import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { ChevronDown, LucideLayoutDashboard, Plus } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import AppContentFooter from './AppContentFooter'

const AppSidebarContent = ({ ...props }: ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarContent>
      {/* Feed */}
      <SidebarGroup {...props}>
        <SidebarGroupLabel>Feed</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* Following */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={false} tooltip="Following">
                <Link to="/">
                  <LucideLayoutDashboard className="size-4" />
                  <span>Following</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuAction></SidebarMenuAction>
              <SidebarMenuBadge></SidebarMenuBadge>
            </SidebarMenuItem>
            {/* Discover */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={false} tooltip="Discover">
                <Link to="/">
                  <LucideLayoutDashboard className="size-4" />
                  <span>Discover</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuBadge>24</SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Collapsible */}
      <Collapsible defaultOpen={false} className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Collapsible
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link to="/">
                      <span>A</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link to="/">
                      <span>B</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link to="/">
                      <span>C</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

      {/* Sub */}
      <SidebarGroup {...props}>
        <SidebarGroupLabel>Sub</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link to="/">
                  <span>R</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>T</SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/">
                      <span>Q</span>
                    </Link>
                  </SidebarMenuSubButton>
                  <SidebarMenuSubButton asChild>
                    <Link to="/">
                      <span>X</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Group Action */}
      <SidebarGroup>
        <SidebarGroupLabel>Group Action</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus />
        </SidebarGroupAction>
        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>

      <AppContentFooter className="mt-auto" />
    </SidebarContent>
  )
}

export default AppSidebarContent
