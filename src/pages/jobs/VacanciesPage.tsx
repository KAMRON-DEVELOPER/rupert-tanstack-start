import VacancyList from './VacancyList';
import VacancyFiltersSidebar from './VacancyFiltersSidebar';
import CompanySpotlightSidebar from './CompanySpotlightSidebar';

const VacanciesPage = () => {
  return (
    <div className='grid md:grid-cols-5 min-h-screen'>
      <VacancyFiltersSidebar />
      <VacancyList />
      <CompanySpotlightSidebar />
    </div>
  );
};

export default VacanciesPage;
