import CommunityContent from './CommunityContent';
import CommunityLeftSidebar from './CommunityLeftSidebar';
import CommunityRightSidebar from './CommunityRightSidebar';

const CommunityPage = () => {
  return (
    <div className='grid md:grid-cols-5 min-h-screen'>
      <CommunityLeftSidebar />
      <CommunityContent />
      <CommunityRightSidebar />
    </div>
  );
};

export default CommunityPage;
