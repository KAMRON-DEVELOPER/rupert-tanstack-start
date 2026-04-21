import { Outlet } from '@tanstack/react-router';
import WorkTabs from './WorkTabs';

const WorkPage = () => {
  return (
    <div>
      <Outlet />
      <WorkTabs />
    </div>
  );
};

export default WorkPage;
