import { createFileRoute } from '@tanstack/react-router'
import { AdminLocationsPage } from '@/pages/admin/AdminLocationsPage'

export const Route = createFileRoute('/(admin)/admin/locations')({
  component: AdminLocationsPage
})
