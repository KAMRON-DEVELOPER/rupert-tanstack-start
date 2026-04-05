import { useGetStatsQueryOptions } from '@/services/users/auth';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';

const Stats = () => {
  const { api } = useRouteContext({ from: '__root__' });
  useSuspenseQuery(useGetStatsQueryOptions(api));

  return <section className='py-8 border-y'></section>;
};

export default Stats;
