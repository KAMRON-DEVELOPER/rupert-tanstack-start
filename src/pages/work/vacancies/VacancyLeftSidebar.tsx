import { VacancySearch } from '@/types/vacancy.schema';
import { useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';

const VacancyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/vacancies/' });

  const updateFilter = (newFilter: VacancySearch) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilter }),
    });
  };

  return (
    <div className='col-span-1 p-8 border'>
      <div className='grid grid-cols-5 gap-2'>
        <input
          type='search'
          name='search-vacancies'
          id='search-vacancies'
          className='col-span-4 px-4 border rounded-l-full'
        />
        <div className='col-span-1 bg-primary rounded-r-full'>
          <Search className='text-primary-foreground' />
        </div>
      </div>
      <div onClick={() => updateFilter({ specialization: 'backend' })}>Filter `backend`</div>
    </div>
  );
};

export default VacancyLeftSidebar;
