import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import AppSidebarFooter from './AppSidebarFooter'
import AppSidebarContent from './AppSidebarContent'
import AppSidebarHeader from './AppSidebarHeader'

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
