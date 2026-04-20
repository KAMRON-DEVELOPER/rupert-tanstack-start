import FeedsContent from './FeedsContent';
import FeedsLeftSidebar from './FeedsLeftSidebar';
import FeedsRightSidebar from './FeedsRightSidebar';

const FeedsPage = () => {
  return (
    <div className='grid md:grid-cols-5 min-h-screen'>
      <FeedsLeftSidebar />
      <FeedsContent />
      <FeedsRightSidebar />
    </div>
  );
};

export default FeedsPage;
