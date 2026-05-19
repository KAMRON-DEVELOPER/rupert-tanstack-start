import { CompanyCardSchema } from '@/types/company'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2, MapPin, Briefcase } from 'lucide-react'

const CompanyCard = ({ c }: { c: CompanyCardSchema }) => {
  return (
    <Card className="transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={`https://avatar.vercel.sh/${c.name}.png`} alt={c.name} />
          <AvatarFallback>
            <Building2 className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg leading-none font-semibold">
              <Link
                to="/work/companies/$id"
                params={{ id: c.id }}
                className="hover:text-primary transition-colors"
              >
                {c.name}
              </Link>
            </h3>
            <Badge variant="secondary" className="text-[10px] tracking-wider uppercase">
              {c.type.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-muted-foreground line-clamp-1 text-sm">{c.tagline}</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>
            {c.country}
            {c.city ? `, ${c.city}` : ''}
          </span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Briefcase className="h-4 w-4" />
          <span>{c.openVacanciesCount} open vacancies</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompanyCard
