import { Outlet } from '@tanstack/react-router';
import WorkTabs from './WorkTabs';

const WorkPage = () => {
  return (
    <div className='grid md:grid-cols-4 gap-8 min-h-screen px-8'>
      <Outlet />
      <WorkTabs />
    </div>
  );
};

export default WorkPage;
