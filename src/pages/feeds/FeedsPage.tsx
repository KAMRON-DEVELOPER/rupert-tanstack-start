import FeedList from './FeedList';
import FeedsLeftSidebar from './FeedsLeftSidebar';
import FeedsRightSidebar from './FeedsRightSidebar';

const FeedsPage = () => {
  return (
    <div className='grid md:grid-cols-5 min-h-screen'>
      <FeedsLeftSidebar />
      <FeedList />
      <FeedsRightSidebar />
    </div>
  );
};

export default FeedsPage;
