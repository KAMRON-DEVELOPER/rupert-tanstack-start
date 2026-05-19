import FeedList from './FeedList'
import FeedLeftSidebar from './FeedLeftSidebar'
import FeedRightSidebar from './FeedRightSidebar'

const FeedPage = () => {
  return (
    <div className="grid min-h-screen md:grid-cols-5">
      <FeedLeftSidebar />
      <FeedList />
      <FeedRightSidebar />
    </div>
  )
}

export default FeedPage
