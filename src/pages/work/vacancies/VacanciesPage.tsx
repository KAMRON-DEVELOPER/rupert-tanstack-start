import VacancyList from './VacancyList';
import VacancyLeftSidebar from './VacancyLeftSidebar';

const VacanciesPage = () => {
  return (
    <div className='grid md:grid-cols-3 min-h-screen'>
      <VacancyLeftSidebar />
      <VacancyList />
    </div>
  );
};

export default VacanciesPage;
