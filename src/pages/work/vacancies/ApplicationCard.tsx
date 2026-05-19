import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useUpdateApplicationMutation } from '@/services/vacancies/vacancies'
import { ApplicationStatusList, type ApplicationStatus } from '@/types/literals'
import type { ApplicationCardSchema, ApplicationSchema } from '@/types/vacancy'
import { Link, useRouteContext } from '@tanstack/react-router'
import { toast } from 'sonner'

interface ApplicationCardProps {
  application: ApplicationCardSchema | ApplicationSchema
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const { api } = useRouteContext({ from: '__root__' })
  const updateApplication = useUpdateApplicationMutation(api)

  const updateStatus = async (status: ApplicationStatus) => {
    try {
      await updateApplication.mutateAsync({
        id: application.id,
        data: { status }
      })
      toast.success('Application updated')
    } catch {
      toast.error('Failed to update application')
    }
  }

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>
          <Link
            to="/work/applications/$id"
            params={{ id: application.id }}
            className="hover:underline"
          >
            {application.vacancy.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-muted-foreground text-sm">
          <p>{application.vacancy.company.name}</p>
          {application.resume && <p>Resume: {application.resume.title}</p>}
        </div>
        {application.coverLetter && (
          <p className="line-clamp-3 text-sm">{application.coverLetter}</p>
        )}
        <div className="flex items-center gap-2">
          <Select
            value={application.status}
            onValueChange={(value) => updateStatus(value as ApplicationStatus)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ApplicationStatusList.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button asChild variant="outline">
            <Link to="/work/applications/$id" params={{ id: application.id }}>
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ApplicationCard
