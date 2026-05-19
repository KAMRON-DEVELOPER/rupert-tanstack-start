import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { CompanySchema } from '@/types/company'
import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react'

const formatLabel = (value: string) => value.replace(/_/g, ' ')

const CompanyDetails = ({ company }: { company: CompanySchema }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{company.name}</CardTitle>
            {company.tagline && <p className="text-muted-foreground mt-1">{company.tagline}</p>}
          </div>
          <Badge variant="secondary">{formatLabel(company.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {company.description && (
          <p className="text-muted-foreground whitespace-pre-wrap">{company.description}</p>
        )}

        <Separator />

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Building2 className="text-muted-foreground size-4" />
            <span>{formatLabel(company.type)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-muted-foreground size-4" />
            <span>
              {company.country}, {company.city}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="text-muted-foreground size-4" />
            <span>{company.openVacanciesCount ?? 0} open vacancies</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="text-muted-foreground size-4" />
            <span>{company.memberCount ?? company.members.length} members</span>
          </div>
          {company.websiteUrl && (
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <Globe className="text-muted-foreground size-4" />
              <span>{company.websiteUrl}</span>
            </a>
          )}
          {company.contactEmail && (
            <a
              href={`mailto:${company.contactEmail}`}
              className="flex items-center gap-2 hover:underline"
            >
              <Mail className="text-muted-foreground size-4" />
              <span>{company.contactEmail}</span>
            </a>
          )}
          {company.contactPhone && (
            <a
              href={`tel:${company.contactPhone}`}
              className="flex items-center gap-2 hover:underline"
            >
              <Phone className="text-muted-foreground size-4" />
              <span>{company.contactPhone}</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CompanyDetails
