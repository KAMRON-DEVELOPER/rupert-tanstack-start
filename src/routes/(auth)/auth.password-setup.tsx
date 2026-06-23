import PasswordSetupPage from '@/pages/users/PasswordSetupPage'
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/(auth)/auth/password-setup')({
  validateSearch: z.object({
    token: z.string().nullish()
  }),
  beforeLoad: async ({ search }) => {
    if (!search.token) {
      console.warn('Password setup token not found')

      throw redirect({
        to: '/',
        replace: true
      })
    }
  },
  component: PasswordSetupPage
})
