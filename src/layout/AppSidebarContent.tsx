import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { ArrowLeftRight, BriefcaseBusiness, FileText, Rss, Send } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import AppContentFooter from './AppContentFooter'

const AppSidebarContent = ({ ...props }: ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarContent>
      {/* Feed */}
      <SidebarGroup {...props}>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* Feed */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={false} tooltip="Feed">
                <Link to="/feeds">
                  <Rss className="size-4" />
                  <span>Feed</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuBadge>0</SidebarMenuBadge>
            </SidebarMenuItem>
            {/* Post */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={false} tooltip="Post">
                <Link to="/posts">
                  <FileText className="size-4" />
                  <span>Post</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuBadge>0</SidebarMenuBadge>
            </SidebarMenuItem>
            {/* Work */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={false} tooltip="Work">
                <Link to="/work">
                  <BriefcaseBusiness className="size-4" />
                  <span>Work</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuAction>
                <ArrowLeftRight />
              </SidebarMenuAction>
            </SidebarMenuItem>
            {/* Message */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={false} tooltip="Message">
                <Link to="/messages">
                  <Send className="size-4" />
                  <span>Message</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuBadge>0</SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <AppContentFooter className="mt-auto" />
    </SidebarContent>
  )
}

export default AppSidebarContent
