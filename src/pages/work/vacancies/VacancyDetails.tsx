import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { VacancySchema } from '@/types/vacancy'
import { Link } from '@tanstack/react-router'
import { Banknote, Building2, Clock, MapPin } from 'lucide-react'

const formatLabel = (value: string) => value.replace(/_/g, ' ')

const VacancyDetails = ({ vacancy }: { vacancy: VacancySchema }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-xl">{vacancy.title}</CardTitle>
            <Link
              to="/work/companies/$id"
              params={{ id: vacancy.company.id }}
              className="text-muted-foreground mt-1 inline-flex items-center gap-2 text-sm hover:underline"
            >
              <Building2 className="size-4" />
              {vacancy.company.name}
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{formatLabel(vacancy.status)}</Badge>
            <Badge variant="secondary">{formatLabel(vacancy.submissionType)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground whitespace-pre-wrap">{vacancy.description}</p>
        <Separator />
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <MapPin className="text-muted-foreground size-4" />
            <span>
              {vacancy.country}, {vacancy.city}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground size-4" />
            <span>
              {vacancy.workHoursPerWeek
                ? `${vacancy.workHoursPerWeek} hours/week`
                : 'Hours not specified'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="text-muted-foreground size-4" />
            <span>
              {formatLabel(vacancy.specialization)} · {formatLabel(vacancy.workFormat)} ·{' '}
              {formatLabel(vacancy.employmentType)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground size-4" />
            <span>{vacancy.yearsOfExperienceMin ?? 0}+ years experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="text-muted-foreground size-4" />
            <span>
              {vacancy.salaryMin ?? 'Any'} - {vacancy.salaryMax ?? 'Any'}{' '}
              {vacancy.salaryCurrency ?? ''}
              {vacancy.paymentFrequency ? ` / ${formatLabel(vacancy.paymentFrequency)}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="text-muted-foreground size-4" />
            <span>
              Applied: {vacancy.hasApplied ? 'yes' : 'no'} · Saved: {vacancy.isSaved ? 'yes' : 'no'}
            </span>
          </div>
        </div>
        {vacancy.externalApplyUrl && (
          <a
            href={vacancy.externalApplyUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:underline"
          >
            External application link
          </a>
        )}
      </CardContent>
    </Card>
  )
}

export default VacancyDetails
