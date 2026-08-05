import type { VacancySummaryResponse } from '@/types/vacancies/vacancy'
import { Link } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { locationLabel } from '@/lib/location-label'
import { Banknote, Bookmark, Briefcase, Building2, Clock, Laptop, MapPin, Tag } from 'lucide-react'

const formatLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())

const VacancyCard = ({ v }: { v: VacancySummaryResponse }) => {
  const hasSalary = v.salaryMin != null || v.salaryMax != null

  return (
    <Card className="hover:ring-foreground/20 relative transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-10 rounded-md after:rounded-md">
            <AvatarImage src={`${v.company.logoUrl}`} alt={v.company.name} className="rounded-md" />
            <AvatarFallback className="rounded-md">
              <Building2 className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-0.5">
            <CardTitle>
              <Link
                to="/work/vacancies/$id"
                params={{ id: v.id }}
                className="group-hover/card:text-primary transition-colors after:absolute after:inset-0"
              >
                {v.title}
              </Link>
            </CardTitle>
            <CardDescription className="truncate">{v.company.name}</CardDescription>
          </div>
        </div>
        <CardAction className="text-muted-foreground text-xs whitespace-nowrap">
          {formatDistanceToNow(new Date(v.createdAt), { addSuffix: true })}
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="flex items-center gap-2">
            <Tag className="size-4 shrink-0" />
            <span>{formatLabel(v.specialization)}</span>
          </span>
          <span className="flex items-center gap-2">
            <Laptop className="size-4 shrink-0" />
            <span>{formatLabel(v.workFormat)}</span>
          </span>
          <span className="flex items-center gap-2">
            <Briefcase className="size-4 shrink-0" />
            <span>{formatLabel(v.employmentType)}</span>
          </span>
        </div>
        {(v.hasApplied || v.isSaved) && (
          <div className="flex flex-wrap gap-2">
            {v.hasApplied && <Badge>Applied</Badge>}
            {v.isSaved && (
              <Badge variant="secondary">
                <Bookmark data-icon="inline-start" />
                Saved
              </Badge>
            )}
          </div>
        )}
        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">{locationLabel(v.country, v.city)}</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span>{v.yearsOfExperienceMin ?? 0}+ years</span>
          </span>
          {hasSalary && (
            <span className="text-foreground flex items-center gap-2 font-medium">
              <Banknote className="text-muted-foreground size-4 shrink-0" />
              <span>
                {v.salaryMin != null && v.salaryMin.toLocaleString()}
                {v.salaryMin != null && v.salaryMax != null && ' - '}
                {v.salaryMax != null && v.salaryMax.toLocaleString()}
                {v.salaryCurrency ? ` ${v.salaryCurrency}` : ''}
              </span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default VacancyCard
