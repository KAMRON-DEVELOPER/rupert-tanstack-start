import { CompanySearch } from '@/types/company.schema';
import { useNavigate } from '@tanstack/react-router';

const CompanyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/vacancies/' });

  const updateFilter = (newFilter: CompanySearch) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilter }),
    });
  };

  return (
    <div className='p-8'>
      <div onClick={() => updateFilter({ type: 'startup' })}>Filter `startup`</div>
    </div>
  );
};

export default CompanyLeftSidebar;
