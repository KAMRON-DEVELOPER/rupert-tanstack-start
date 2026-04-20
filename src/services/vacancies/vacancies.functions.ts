import { createServerFn } from '@tanstack/react-start';
import { createServerApi } from '@/services/api.server';
import { ApplicationCard, VacancyCard } from '@/types/vacancy';
import { ListResponse } from '@/types/types';
import { ApplicationSearch, VacancySearch } from '@/types/vacancy.schema';

export const getVacanciesFn = createServerFn()
  .inputValidator((data: VacancySearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi();
    return api<ListResponse<VacancyCard>>('/vacancies', { params });
  });

export const getApplicationsFn = createServerFn()
  .inputValidator((data: ApplicationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi();
    return api<ListResponse<ApplicationCard>>('/vacancies/applications', { params });
  });
