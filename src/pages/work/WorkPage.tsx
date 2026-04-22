import { Outlet } from '@tanstack/react-router';
import WorkTabs from './WorkTabs';

const WorkPage = () => {
  return (
    <div className='grid md:grid-cols-4 min-h-screen px-8 gap-8'>
      <Outlet />
      <WorkTabs />
    </div>
  );
};

export default WorkPage;
