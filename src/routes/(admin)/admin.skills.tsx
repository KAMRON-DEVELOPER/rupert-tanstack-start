import { createFileRoute } from '@tanstack/react-router'
import { AdminSkillsPage } from '@/pages/admin/AdminSkillsPage'

export const Route = createFileRoute('/(admin)/admin/skills')({
  component: AdminSkillsPage
})
