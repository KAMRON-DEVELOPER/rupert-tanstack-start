import BottomPillTabs from '@/components/navigation/BottomPillTabs'
import { linkOptions } from '@tanstack/react-router'

const tabs = linkOptions([
  {
    to: '/messages/chats',
    label: 'Chats'
  },
  {
    to: '/messages/groups',
    label: 'Groups',
    disabled: true
  }
])

const MessagesTabs = () => <BottomPillTabs tabs={tabs} />

export default MessagesTabs
