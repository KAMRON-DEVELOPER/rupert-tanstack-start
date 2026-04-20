import { useGetStatsQueryOptions } from '@/services/stats/stats';
import { useSuspenseQuery } from '@tanstack/react-query';

const Stats = () => {
  const {
    data: {
      users: { total },
      vacancies: { total: vacanciesTotal },
      companies: { total: companiesTotal },
    },
  } = useSuspenseQuery(useGetStatsQueryOptions());

  return (
    <section className='py-8 border-y'>
      <h1 className='text-2xl'>Statistics</h1>
      <div>total users: {total}</div>
      <div>total vacancies: {vacanciesTotal}</div>
      <div>total companies: {companiesTotal}</div>
    </section>
  );
};

export default Stats;
