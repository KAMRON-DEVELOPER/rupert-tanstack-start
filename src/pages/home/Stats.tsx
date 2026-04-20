import { useGetStatsQueryOptions } from '@/services/stats/stats';
import { useSuspenseQuery } from '@tanstack/react-query';

import StatsDauChart from './Stats.DauChart';

const Stats = () => {
  const {
    data: {
      users: { total, dauChart, lookingForJobCount },
      vacancies: { total: vacanciesTotal, open },
      companies: { total: companiesTotal },
    },
  } = useSuspenseQuery(useGetStatsQueryOptions());

  const stats = [
    { label: 'Total Users', value: total },
    { label: 'Looking for Job', value: lookingForJobCount },
    { label: 'Open Vacancies', value: open },
    { label: 'Total Vacancies', value: vacanciesTotal },
    { label: 'Companies', value: companiesTotal },
  ];

  return (
    <section className='space-y-4 mx-4 md:mx-8'>
      <h1 className='text-xl font-semibold'>Statistics</h1>

      <dl className='grid grid-cols-2 md:grid-cols-5'>
        {stats.map(({ label, value }) => (
          <div key={label}>
            <dt className='text-sm'>{label}</dt>
            <dd className='text-xl font-bold'>{value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>

      <StatsDauChart data={dauChart} />
    </section>
  );
};

export default Stats;
