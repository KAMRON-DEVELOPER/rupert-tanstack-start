import { Outlet } from '@tanstack/react-router';
import MessagesTabs from './MessagesTabs';

const MessagesPage = () => {
  return (
    <div className='grid md:grid-cols-4 gap-8 min-h-screen px-8'>
      <Outlet />
      <MessagesTabs />
    </div>
  );
};

export default MessagesPage;
