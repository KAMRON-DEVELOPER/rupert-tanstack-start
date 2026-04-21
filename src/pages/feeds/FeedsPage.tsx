import FeedList from './FeedList';
import FeedLeftSidebar from './FeedLeftSidebar';
import FeedRightSidebar from './FeedRightSidebar';

const FeedsPage = () => {
  return (
    <div className='grid md:grid-cols-5 min-h-screen'>
      <FeedLeftSidebar />
      <FeedList />
      <FeedRightSidebar />
    </div>
  );
};

export default FeedsPage;
