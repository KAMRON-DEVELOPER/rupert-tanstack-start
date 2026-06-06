import { createFileRoute } from '@tanstack/react-router'
import HomePage from '@/pages/home/HomePage'
import { useGetStatsQueryOptions } from '@/api/stats/stats'

export const Route = createFileRoute('/(public)/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(useGetStatsQueryOptions())
  },
  component: HomePage
})
