import { VacancySearch } from '@/types/vacancy.schema';
import { useNavigate } from '@tanstack/react-router';

const LeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/vacancies/' });

  const updateFilter = (newFilter: VacancySearch) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilter }),
    });
  };

  return (
    <div className='p-8'>
      <div onClick={() => updateFilter({ specialization: 'backend' })}>Filter `backend`</div>
    </div>
  );
};

export default LeftSidebar;
