import { getRouteApi } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useGetVacanciesQueryOptions } from '@/services/vacancies/vacancies';

const JobsContent = () => {
  const deps = getRouteApi('/(public)/(jobs)/jobs/').useLoaderDeps();
  const {
    data: { data: vacancies, total },
  } = useSuspenseQuery(useGetVacanciesQueryOptions(deps));

  return (
    <div className='col-span-3 space-y-2 border-x'>
      <p>Total vacancies: {total}</p>
      {vacancies.map((v) => (
        <div>{v.title}</div>
      ))}
    </div>
  );
};

export default JobsContent;
