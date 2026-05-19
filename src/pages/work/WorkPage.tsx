import { Outlet } from '@tanstack/react-router'
import WorkTabs from './WorkTabs'

const WorkPage = () => {
  return (
    <div className="grid min-h-screen gap-8 px-8 md:grid-cols-4">
      <Outlet />
      <WorkTabs />
    </div>
  )
}

export default WorkPage
