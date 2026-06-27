import { useSuspenseQuery } from '@tanstack/react-query'
import { useGetApplicationsQueryOptions } from '@/api/vacancies/vacancies'
import { applicationListParamsSchema } from '@/types/vacancies/vacancy'
import EmptyState from '@/components/forms/EmptyState'
import ApplicationCard from '@/pages/work/vacancies/ApplicationCard'
import { createFileRoute } from '@tanstack/react-router'
import { uuid } from '@/types/shared/primitives'

export const Route = createFileRoute('/(public)/profile/applications/')({
  validateSearch: applicationListParamsSchema.extend({ vacancyId: uuid }),
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(useGetApplicationsQueryOptions(deps))
  },
  component: ProfileApplicationsPage
})

function ProfileApplicationsPage() {
  const deps = Route.useLoaderDeps()
  const {
    data: { data: applications, total }
  } = useSuspenseQuery(useGetApplicationsQueryOptions(deps))

  return (
    <div className="space-y-3">
      <p className="text-sm">Total applications: {total}</p>
      {applications.length === 0 ? (
        <EmptyState title="No applications found" />
      ) : (
        applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))
      )}
    </div>
  )
}
