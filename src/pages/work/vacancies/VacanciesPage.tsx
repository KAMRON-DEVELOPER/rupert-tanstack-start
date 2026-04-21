import VacancyList from './VacancyList';
import LeftSidebar from './LeftSidebar';

const VacanciesPage = () => {
  return (
    <div className='grid md:grid-cols-3 min-h-screen'>
      <LeftSidebar />
      <VacancyList />
    </div>
  );
};

export default VacanciesPage;
