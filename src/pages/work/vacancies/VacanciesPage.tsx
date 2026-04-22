import VacancyList from './VacancyList';
import VacancyLeftSidebar from './VacancyLeftSidebar';
import VacancyRightSidebar from './VacancyRightSidebar';

const VacanciesPage = () => {
  return (
    <>
      <VacancyLeftSidebar />
      <VacancyList />
      <VacancyRightSidebar />
    </>
  );
};

export default VacanciesPage;
