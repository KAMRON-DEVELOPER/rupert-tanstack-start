import {
  useMutation,
  useQueryClient,
  queryOptions
} from '@tanstack/react-query'

import { CreateApi } from '@/services/api'
import type {
  EmailAuthRequest,
  PasswordSetupRequest,
  UserSchema,
  UserUpdateRequest
} from '@/types/user'
import type { MessageResponse } from '@/types/types'
import {
  deleteProfileFn,
  getProfileFn,
  logoutFn,
  updateProfileFn
} from './auth.functions'

const appendFormDataValue = (
  formData: FormData,
  key: string,
  value: unknown
) => {
  if (value === undefined || value === null) return

  if (typeof File !== 'undefined' && value instanceof File) {
    formData.append(key, value)
    return
  }

  formData.append(key, String(value))
}

const toUserUpdateFormData = (data: UserUpdateRequest) => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    appendFormDataValue(formData, key, value)
  })

  return formData
}

export const useGetProfileQueryOptions = () =>
  queryOptions({
    queryKey: ['profile'],
    queryFn: () => getProfileFn()
  })

export const useEmailAuthMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EmailAuthRequest) =>
      api<UserSchema | MessageResponse>('users/auth/email', {
        method: 'POST',
        data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    }
  })
}

export const usePasswordSetupMutation = (api: CreateApi) => {
  return useMutation({
    mutationFn: ({
      password,
      token
    }: PasswordSetupRequest & { token: string }) =>
      api<null>('users/auth/password-setup', {
        method: 'POST',
        data: { password },
        params: { token }
      })
  })
}

export const useVerifyMutation = (api: CreateApi) => {
  return useMutation({
    mutationFn: (params: { token: string }) =>
      api('users/auth/verify', { method: 'POST', params })
  })
}

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserUpdateRequest) =>
      updateProfileFn({ data: toUserUpdateFormData(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}

export const useDeleteProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteProfileFn(),
    onSuccess: () => {
      queryClient.clear()
    }
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logoutFn(),
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
