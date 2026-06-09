import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CreateApi } from '@/api/api'
import {
  EmailAuthRequest,
  EmailAuthResponse,
  PasswordSetupRequest
} from '@/types/users/auth'
import { logoutFn } from './auth.functions'

export const useEmailAuthMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EmailAuthRequest) =>
      api<EmailAuthResponse>('users/auth/email', {
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

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logoutFn(),
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
