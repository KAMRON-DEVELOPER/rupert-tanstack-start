import { VacancySearch } from '@/types/vacancy.schema';
import { useNavigate } from '@tanstack/react-router';

const JobsLeftSidebar = () => {
  const navigate = useNavigate({ from: '/jobs/' });

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

export default JobsLeftSidebar;
