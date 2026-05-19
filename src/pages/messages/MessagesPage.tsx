import { Outlet } from '@tanstack/react-router'
import MessagesTabs from './MessagesTabs'

const MessagesPage = () => {
  return (
    <div className="grid min-h-screen gap-8 px-8 md:grid-cols-4">
      <Outlet />
      <MessagesTabs />
    </div>
  )
}

export default MessagesPage
