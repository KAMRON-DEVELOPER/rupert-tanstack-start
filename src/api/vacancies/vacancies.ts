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
import type {
  ApplicationListParams,
  VacancyListParams
} from '@/types/vacancies/vacancy'
import type { CreateApi } from '@/api/api'
import type { MessageResponse } from '@/types/shared/types'
import type {
  ApplicationRequest,
  ApplicationDetailResponse,
  ApplicationStatusUpdateRequest,
  VacancyCreateRequest,
  VacancyDetailResponse,
  VacancySkillLinkRequest,
  VacancySkillLinkResponse,
  VacancySkillLinkUpdateRequest,
  VacancyUpdateRequest
} from '@/types/vacancies/vacancy'

export const useGetVacanciesQueryOptions = (data: VacancyListParams) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacanciesFn({ data }),
    staleTime: 30_000
  })

export const useGetVacancyQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['vacancies', data],
    queryFn: () => getVacancyFn({ data }),
    staleTime: 30_000
  })

export const useGetApplicationsQueryOptions = (
  data: ApplicationListParams & { vacancyId: string }
) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationsFn({ data }),
    staleTime: 30_000
  })

export const useGetApplicationQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['applications', data],
    queryFn: () => getApplicationFn({ data }),
    staleTime: 30_000
  })

export const useCreateVacancyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      companyId,
      data
    }: {
      companyId: string
      data: VacancyCreateRequest
    }) =>
      api<VacancyDetailResponse>(`vacancies/companies/${companyId}`, {
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
      api<VacancyDetailResponse>(`vacancies/${id}`, { method: 'PATCH', data }),
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
      api<VacancySkillLinkResponse>(`vacancies/${vacancyId}/skills`, {
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
      api<VacancySkillLinkResponse>(
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
      api<ApplicationDetailResponse>('vacancies/applications', {
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
      api<ApplicationDetailResponse>(`vacancies/applications/${id}`, {
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
