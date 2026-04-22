import { VacancySearch } from '@/types/vacancy.schema';
import { useNavigate } from '@tanstack/react-router';

const VacancyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/vacancies/' });

  const updateFilter = (newFilter: VacancySearch) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilter }),
    });
  };

  return (
    <div className='col-span-1 p-8 border'>
      <div onClick={() => updateFilter({ specialization: 'backend' })}>Filter `backend`</div>
    </div>
  );
};

export default VacancyLeftSidebar;
