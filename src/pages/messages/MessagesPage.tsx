import { Outlet } from '@tanstack/react-router';
import MessagesTabs from './MessagesTabs';

const MessagesPage = () => {
  return (
    <div>
      <Outlet />
      <MessagesTabs />
    </div>
  );
};

export default MessagesPage;
