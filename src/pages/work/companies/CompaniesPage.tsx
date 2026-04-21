import CompanyLeftSidebar from './CompanyLeftSidebar';
import CompanyList from './CompanyList';

const CompaniesPage = () => {
  return (
    <div className='grid md:grid-cols-3 min-h-screen'>
      <CompanyLeftSidebar />
      <CompanyList />
    </div>
  );
};

export default CompaniesPage;
