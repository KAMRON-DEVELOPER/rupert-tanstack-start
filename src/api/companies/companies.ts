import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { getCompaniesFn, getCompanyFn } from './companies.functions'
import type { CreateApi } from '@/api/api'
import type {
  CompanyCreateRequest,
  CompanyDetailResponse,
  CompanyListParams,
  CompanyMemberInviteRequest,
  CompanyMemberResponse,
  CompanyMemberRoleUpdateRequest,
  CompanyUpdateRequest
} from '@/types/companies/company'
import type { MessageResponse } from '@/types/shared/types'

export const useGetCompaniesQueryOptions = (data: CompanyListParams) =>
  queryOptions({
    queryKey: ['companies', data],
    queryFn: () => getCompaniesFn({ data }),
    staleTime: 30_000
  })

export const useGetCompanyQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['companies', data],
    queryFn: () => getCompanyFn({ data }),
    staleTime: 30_000
  })

export const useCreateCompanyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CompanyCreateRequest) =>
      api<CompanyDetailResponse>('companies/', { method: 'POST', data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    }
  })
}

export const useUpdateCompanyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CompanyUpdateRequest }) =>
      api<CompanyDetailResponse>(`companies/${id}`, { method: 'PATCH', data }),
    onSuccess: (company) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      queryClient.invalidateQueries({
        queryKey: ['companies', { id: company.id }]
      })
    }
  })
}

export const useDeleteCompanyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      api<MessageResponse>(`companies/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    }
  })
}

export const useAddCompanyMemberMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      companyId,
      data
    }: {
      companyId: string
      data: CompanyMemberInviteRequest
    }) =>
      api<CompanyMemberResponse>(`companies/${companyId}/members`, {
        method: 'POST',
        data
      }),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['companies', { id: companyId }]
      })
    }
  })
}

export const useUpdateCompanyMemberMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      companyId,
      memberId,
      data
    }: {
      companyId: string
      memberId: string
      data: CompanyMemberRoleUpdateRequest
    }) =>
      api<CompanyMemberResponse>(`companies/${companyId}/members/${memberId}`, {
        method: 'PATCH',
        data
      }),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['companies', { id: companyId }]
      })
    }
  })
}

export const useDeleteCompanyMemberMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      companyId,
      memberId
    }: {
      companyId: string
      memberId: string
    }) =>
      api<MessageResponse>(`companies/${companyId}/members/${memberId}`, {
        method: 'DELETE'
      }),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['companies', { id: companyId }]
      })
    }
  })
}
