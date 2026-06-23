import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import VerifyPage from '@/pages/users/VerifyPage'

export const Route = createFileRoute('/(auth)/auth/verify')({
  validateSearch: z.object({
    token: z.string().nullish()
  }),
  beforeLoad: async ({ search }) => {
    if (!search.token) {
      console.warn('Verification token not found')

      throw redirect({
        to: '/',
        replace: true
      })
    }
  },
  component: VerifyPage
})
