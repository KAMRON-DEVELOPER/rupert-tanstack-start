import EmptyState from '@/components/forms/EmptyState'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetApplicationsQueryOptions } from '@/services/vacancies/vacancies'
import type { VacancySchema } from '@/types/vacancy'
import { useQuery } from '@tanstack/react-query'
import ApplicationCard from './ApplicationCard'

const VacancyApplications = ({ vacancy }: { vacancy: VacancySchema }) => {
  const { data, isPending, isError } = useQuery(
    useGetApplicationsQueryOptions({
      vacancyId: vacancy.id,
      offset: 0,
      limit: 20
    })
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isPending && <p className="text-muted-foreground text-sm">Loading applications...</p>}
        {isError && (
          <p className="text-muted-foreground text-sm">
            Applications are not available for this vacancy.
          </p>
        )}
        {data && data.data.length === 0 && <EmptyState title="No applications" />}
        {data?.data.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </CardContent>
    </Card>
  )
}

export default VacancyApplications
