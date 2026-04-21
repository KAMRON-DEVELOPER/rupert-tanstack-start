import BottomPillTabs, { BottomPillTabItem } from '@/components/navigation/BottomPillTabs';
import { linkOptions } from '@tanstack/react-router';

const tabs = linkOptions([
  {
    to: '/messages/chats',
    label: 'Chats',
  },
  {
    to: '/messages/groups',
    label: 'Groups',
  },
]) as BottomPillTabItem[];

const MessagesTabs = () => <BottomPillTabs tabs={tabs} />;

export default MessagesTabs;
