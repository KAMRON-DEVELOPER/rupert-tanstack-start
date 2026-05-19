import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetApplicationQueryOptions } from '@/services/vacancies/vacancies'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import ApplicationCard from './ApplicationCard'

const ApplicationPage = () => {
  const params = useParams({ from: '/(apps)/(work)/work/applications/$id' })
  const { data: application } = useSuspenseQuery(useGetApplicationQueryOptions(params))

  return (
    <div className="col-span-3 space-y-4">
      <ApplicationCard application={application} />
      <Card>
        <CardHeader>
          <CardTitle>Application details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="text-muted-foreground">Applicant</p>
            <p>
              {application.applicant.firstName} {application.applicant.lastName}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Vacancy</p>
            <Link
              to="/work/vacancies/$id"
              params={{ id: application.vacancyId }}
              className="hover:underline"
            >
              {application.vacancy.title}
            </Link>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground">Cover letter</p>
            <p className="whitespace-pre-wrap">{application.coverLetter || 'No cover letter'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Recruiter note</p>
            <p className="whitespace-pre-wrap">
              {application.recruiterNote || 'No recruiter note'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ApplicationPage
