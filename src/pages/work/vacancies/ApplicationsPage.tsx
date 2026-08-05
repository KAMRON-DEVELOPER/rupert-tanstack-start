import EmptyState from '@/components/forms/EmptyState'
import { useGetApplicationsQueryOptions } from '@/api/vacancies/vacancies'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import ApplicationCard from './ApplicationCard'

const ApplicationsPage = () => {
  const search = getRouteApi('/(apps)/(work)/work/applications/').useSearch()
  const {
    data: { data: applications, total }
  } = useSuspenseQuery(useGetApplicationsQueryOptions(search))

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
