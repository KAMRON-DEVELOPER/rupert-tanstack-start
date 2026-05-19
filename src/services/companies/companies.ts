import {
  queryOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { getCompaniesFn, getCompanyFn } from './companies.functions'
import { CompanySearch } from '@/types/company.schema'
import type { CreateApi } from '@/services/api'
import type {
  CompanyCreateRequest,
  CompanyMemberInviteRequest,
  CompanyMemberRoleUpdateRequest,
  CompanyMemberSchema,
  CompanySchema,
  CompanyUpdateRequest
} from '@/types/company'
import type { MessageResponse } from '@/types/types'

export const useGetCompaniesQueryOptions = (data: CompanySearch) =>
  queryOptions({
    queryKey: ['companies', data],
    queryFn: () => getCompaniesFn({ data })
  })

export const useGetCompanyQueryOptions = (data: { id: string }) =>
  queryOptions({
    queryKey: ['companies', data],
    queryFn: () => getCompanyFn({ data })
  })

export const useCreateCompanyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CompanyCreateRequest) =>
      api<CompanySchema>('companies/', { method: 'POST', data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    }
  })
}

export const useUpdateCompanyMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CompanyUpdateRequest }) =>
      api<CompanySchema>(`companies/${id}`, { method: 'PATCH', data }),
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
      api<CompanyMemberSchema>(`companies/${companyId}/members`, {
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
      api<CompanyMemberSchema>(`companies/${companyId}/members/${memberId}`, {
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
