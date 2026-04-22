import { createServerFn } from '@tanstack/react-start';
import { createServerApi } from '@/services/api.server';
import { ApplicationCardSchema, ApplicationSchema, VacancyCardSchema, VacancySchema } from '@/types/vacancy';
import { ListResponse } from '@/types/types';
import { ApplicationSearch, VacancySearch } from '@/types/vacancy.schema';

export const getVacanciesFn = createServerFn()
  .inputValidator((data: VacancySearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi();
    return api<ListResponse<VacancyCardSchema>>('/vacancies', { params });
  });

export const getVacancyFn = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    const api = createServerApi();
    return api<VacancySchema>(`/vacancies/${id}`);
  });

export const getApplicationsFn = createServerFn()
  .inputValidator((data: ApplicationSearch) => data)
  .handler(async ({ data: params }) => {
    const api = createServerApi();
    return api<ListResponse<ApplicationCardSchema>>('/vacancies/applications', { params });
  });

export const getApplicationFn = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    const api = createServerApi();
    return api<ApplicationSchema>(`/vacancies/applications/${id}`);
  });
