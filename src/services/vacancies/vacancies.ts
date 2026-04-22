import { queryOptions } from '@tanstack/react-query';
import { getApplicationFn, getApplicationsFn, getVacanciesFn, getVacancyFn } from './vacancies.functions';
import { ApplicationSearch, VacancySearch } from '@/types/vacancy.schema';

export const useGetVacanciesQueryOptions = (data: VacancySearch) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacanciesFn({ data }),
  });

export const useGetVacancyQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacancyFn({ data }),
  });

export const useGetApplicationsQueryOptions = (data: ApplicationSearch) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationsFn({ data }),
  });

export const useGetApplicationQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationFn({ data }),
  });
