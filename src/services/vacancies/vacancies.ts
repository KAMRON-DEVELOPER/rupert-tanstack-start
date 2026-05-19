import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  getApplicationFn,
  getApplicationsFn,
  getVacanciesFn,
  getVacancyFn
} from './vacancies.functions'
import { ApplicationSearch, VacancySearch } from '@/types/vacancy.schema'
import type { CreateApi } from '@/services/api'
import type { MessageResponse } from '@/types/types'
import type {
  ApplicationRequest,
  ApplicationSchema,
  ApplicationStatusUpdateRequest,
  VacancyRequest,
  VacancySchema,
  VacancySkillLinkRequest,
  VacancySkillLinkSchema,
  VacancySkillLinkUpdateRequest,
  VacancyUpdateRequest
} from '@/types/vacancy'

export const useGetVacanciesQueryOptions = (data: VacancySearch) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacanciesFn({ data })
  })

export const useGetVacancyQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacancyFn({ data })
  })

export const useGetApplicationsQueryOptions = (data: ApplicationSearch) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationsFn({ data })
  })

export const useGetApplicationQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationFn({ data })
  })

export const useCreateVacancyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      companyId,
      data
    }: {
      companyId: string
      data: VacancyRequest
    }) =>
      api<VacancySchema>(`vacancies/companies/${companyId}`, {
        method: 'POST',
        data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
    }
  })
}

export const useUpdateVacancyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: VacancyUpdateRequest }) =>
      api<VacancySchema>(`vacancies/${id}`, { method: 'PATCH', data }),
    onSuccess: (vacancy) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: vacancy.id }]
      })
    }
  })
}

export const useDeleteVacancyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      api<MessageResponse>(`vacancies/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
    }
  })
}

export const useAddVacancySkillMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      vacancyId,
      data
    }: {
      vacancyId: string
      data: VacancySkillLinkRequest
    }) =>
      api<VacancySkillLinkSchema>(`vacancies/${vacancyId}/skills`, {
        method: 'POST',
        data
      }),
    onSuccess: (_, { vacancyId }) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: vacancyId }]
      })
    }
  })
}

export const useUpdateVacancySkillMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      vacancyId,
      skillLinkId,
      data
    }: {
      vacancyId: string
      skillLinkId: string
      data: VacancySkillLinkUpdateRequest
    }) =>
      api<VacancySkillLinkSchema>(
        `vacancies/${vacancyId}/skills/${skillLinkId}`,
        {
          method: 'PATCH',
          data
        }
      ),
    onSuccess: (_, { vacancyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: vacancyId }]
      })
    }
  })
}

export const useDeleteVacancySkillMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      vacancyId,
      skillLinkId
    }: {
      vacancyId: string
      skillLinkId: string
    }) =>
      api<MessageResponse>(`vacancies/${vacancyId}/skills/${skillLinkId}`, {
        method: 'DELETE'
      }),
    onSuccess: (_, { vacancyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: vacancyId }]
      })
    }
  })
}

export const useSaveVacancyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      api<MessageResponse>(`vacancies/${id}/save`, { method: 'POST' }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
      queryClient.invalidateQueries({ queryKey: ['vacancies', { id }] })
    }
  })
}

export const useUnsaveVacancyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      api<MessageResponse>(`vacancies/${id}/save`, { method: 'DELETE' }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] })
      queryClient.invalidateQueries({ queryKey: ['vacancies', { id }] })
    }
  })
}

export const useCreateApplicationMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ApplicationRequest) =>
      api<ApplicationSchema>('vacancies/applications', {
        method: 'POST',
        data
      }),
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      queryClient.invalidateQueries({
        queryKey: ['vacancies', { id: application.vacancyId }]
      })
    }
  })
}

export const useUpdateApplicationMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: ApplicationStatusUpdateRequest
    }) =>
      api<ApplicationSchema>(`vacancies/applications/${id}`, {
        method: 'PATCH',
        data
      }),
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      queryClient.invalidateQueries({
        queryKey: ['applications', { id: application.id }]
      })
    }
  })
}
