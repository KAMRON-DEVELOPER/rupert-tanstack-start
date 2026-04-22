import { getRouteApi } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useGetCompaniesQueryOptions } from '@/services/companies/companies';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
  const deps = getRouteApi('/(apps)/(work)/work/companies/').useLoaderDeps();
  const {
    data: { data: vacancies, total },
  } = useSuspenseQuery(useGetCompaniesQueryOptions(deps));

  return (
    <div className='col-span-2 space-y-2 border-x'>
      <p>Total companies: {total}</p>

      <div>
        {vacancies.map((c) => (
          <CompanyCard
            key={c.id}
            v={c}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
