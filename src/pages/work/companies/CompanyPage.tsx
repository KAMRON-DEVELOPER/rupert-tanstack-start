import { Separator } from '@/components/ui/separator';
import { useGetCompanyQueryOptions } from '@/services/companies/companies';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

const CompanyPage = () => {
  const params = useParams({ from: '/(apps)/(work)/work/companies/$id' });
  const { data } = useSuspenseQuery(useGetCompanyQueryOptions(params));
  return (
    <div>
      <h1>name: {data.name}</h1>
      <h1>tagline: {data.tagline}</h1>
      <h1>description: {data.description}</h1>
      <Separator />
      <h1>country: {data.country}</h1>
      <h1>city: {data.city}</h1>
      <Separator />
      <h1>status: {data.status}</h1>
      <h1>type: {data.type}</h1>
      <h1>openVacanciesCount: {data.openVacanciesCount}</h1>
    </div>
  );
};

export default CompanyPage;
