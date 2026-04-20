// import { useGetVacanciesQueryOptions } from '@/services/vacancies/vacancies';
// import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi, useParams } from '@tanstack/react-router';

const JobsContent = () => {
  useParams({ from: '' });
  getRouteApi('');
  // const {} = useSuspenseQuery(useGetVacanciesQueryOptions(deps));
  return <div className='col-span-3 border-x'></div>;
};

export default JobsContent;
