import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { LifeBuoy, Send } from 'lucide-react'
import { toast } from 'sonner'

const AppContentFooter = ({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
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

export default AppContentFooter
