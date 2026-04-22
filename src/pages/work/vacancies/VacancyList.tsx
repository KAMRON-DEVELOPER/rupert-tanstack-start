import { getRouteApi } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useGetVacanciesQueryOptions } from '@/services/vacancies/vacancies';
import VacancyCard from './VacancyCard';

const VacancyList = () => {
  const deps = getRouteApi('/(apps)/(work)/work/vacancies/').useLoaderDeps();
  const {
    data: { data: vacancies, total },
  } = useSuspenseQuery(useGetVacanciesQueryOptions(deps));

  return (
    <div className='col-span-2 space-y-4 border p-0.5'>
      <p>Total vacancies: {total}</p>

      <div className='space-y-4'>
        {vacancies.map((v) => (
          <VacancyCard
            key={v.id}
            v={v}
          />
        ))}
      </div>
    </div>
  );
};

export default VacancyList;
