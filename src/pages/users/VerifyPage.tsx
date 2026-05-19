import { useVerifyMutation } from '@/services/users/auth'
import { getErrorMessage } from '@/types/helper'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { toast } from 'sonner'

const VerifyPage = () => {
  const navigate = useNavigate()
  const route = getRouteApi('/(users)/auth/verify')
  const api = route.useRouteContext().api
  const mutation = useVerifyMutation(api)
  const { token } = route.useSearch()

  useEffect(() => {
    if (!token) {
      toast.error('Invalid verification link')
      return
    }

    mutation.mutate(
      { token },
      {
        onSuccess: () => {
          toast.success('Email verified successfully')

          setTimeout(() => {
            navigate({ to: '/', replace: true })
          }, 500)
        },
        onError: (err) => {
          if (isAxiosError(err)) {
            toast.error(getErrorMessage(err.response?.data, 'Email verification failed'))
          } else {
            toast.error('Email verification failed')
          }
        }
      }
    )
  }, [token, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
        <p>Verifying your email...</p>
      </div>
    </div>
  )
}

export default VerifyPage
