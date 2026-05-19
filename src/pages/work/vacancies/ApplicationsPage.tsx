import EmptyState from '@/components/forms/EmptyState'
import { useGetApplicationsQueryOptions } from '@/services/vacancies/vacancies'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import ApplicationCard from './ApplicationCard'

const ApplicationsPage = () => {
  const deps = getRouteApi('/(apps)/(work)/work/applications/').useLoaderDeps()
  const {
    data: { data: applications, total }
  } = useSuspenseQuery(useGetApplicationsQueryOptions(deps))

  return (
    <div className="col-span-3 space-y-3">
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

export default ApplicationsPage
