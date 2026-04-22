import { Separator } from '@/components/ui/separator';
import { useGetVacancyQueryOptions } from '@/services/vacancies/vacancies';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

const VacancyPage = () => {
  const params = useParams({ from: '/(apps)/(work)/work/vacancies/$id' });
  const { data } = useSuspenseQuery(useGetVacancyQueryOptions(params));
  return (
    <div>
      <h1>title: {data.title}</h1>
      <h1>description: {data.description}</h1>
      <h1>status: {data.status}</h1>
      <Separator />
      <h1>company name: {data.company.name}</h1>
      <h1>country: {data.country}</h1>
      <h1>city: {data.city}</h1>
      <Separator />
      <h1>yearsOfExperienceMin: {data.yearsOfExperienceMin}</h1>
      <h1>hasApplied: {data.hasApplied}</h1>
      <h1>isSaved: {data.isSaved}</h1>
      <h1>employmentType: {data.employmentType}</h1>
      <h1>
        price: {data.salaryMin}/{data.salaryMax} {data.salaryCurrency}
      </h1>
    </div>
  );
};

export default VacancyPage;
