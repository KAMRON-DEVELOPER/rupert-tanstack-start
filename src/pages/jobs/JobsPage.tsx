import JobsContent from './JobsContent';
import JobsLeftSidebar from './JobsLeftSidebar';
import JobsRightSidebar from './JobsRightSidebar';

const JobsPage = () => {
  return (
    <div className='grid md:grid-cols-5 min-h-screen'>
      <JobsLeftSidebar />
      <JobsContent />
      <JobsRightSidebar />
    </div>
  );
};

export default JobsPage;
