import { queryOptions } from '@tanstack/react-query';
import { getApplicationsFn, getVacanciesFn } from './vacancies.functions';
import { ApplicationSearch, VacancySearch } from '@/types/vacancy.schema';

export const useGetVacanciesQueryOptions = (data: VacancySearch) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacanciesFn({ data }),
  });

export const useGetApplicationsQueryOptions = (data: ApplicationSearch) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationsFn({ data }),
  });
