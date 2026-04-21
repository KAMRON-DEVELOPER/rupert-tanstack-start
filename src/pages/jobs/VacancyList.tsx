import { getRouteApi } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useGetVacanciesQueryOptions } from '@/services/vacancies/vacancies';
import VacancyCard from './VacancyCard';

const VacancyList = () => {
  const deps = getRouteApi('/(public)/jobs/').useLoaderDeps();
  const {
    data: { data: vacancies, total },
  } = useSuspenseQuery(useGetVacanciesQueryOptions(deps));

  return (
    <div className='col-span-3 space-y-2 border-x'>
      <p>Total vacancies: {total}</p>

      <div>
        {vacancies.map((v) => (
          <VacancyCard v={v} />
        ))}
      </div>
    </div>
  );
};

export default VacancyList;
