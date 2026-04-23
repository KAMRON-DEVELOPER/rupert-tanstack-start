import { VacancyCardSchema } from '@/types/vacancy';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, MapPin, Clock, Banknote } from 'lucide-react';

const VacancyCard = ({ v }: { v: VacancyCardSchema }) => {
  return (
    <Card className='hover:shadow-md transition-shadow duration-200'>
      <CardHeader className='flex flex-row items-center gap-4 space-y-0'>
        <Avatar className='h-10 w-10 border rounded-md'>
          <AvatarImage
            src={`https://avatar.vercel.sh/${v.company.name}.png`}
            alt={v.company.name}
          />
          <AvatarFallback className='rounded-md'>
            <Building2 className='h-5 w-5' />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-0.5'>
          <h3 className='font-semibold text-base leading-none'>
            <Link
              to='/work/vacancies/$id'
              params={{ id: v.id }}
              className='hover:text-primary transition-colors'>
              {v.title}
            </Link>
          </h3>
          <p className='text-sm text-muted-foreground'>{v.company.name}</p>
        </div>
      </CardHeader>
      <CardContent className='grid gap-3'>
        <div className='flex flex-wrap gap-2'>
          <Badge
            variant='outline'
            className='text-[10px] uppercase'>
            {v.specialization.replace('_', ' ')}
          </Badge>
          <Badge
            variant='secondary'
            className='text-[10px] uppercase'>
            {v.workFormat.replace('_', ' ')}
          </Badge>
          <Badge
            variant='secondary'
            className='text-[10px] uppercase'>
            {v.employmentType.replace('_', ' ')}
          </Badge>
        </div>
        <div className='grid grid-cols-2 gap-2 text-sm text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 shrink-0' />
            <span className='truncate'>
              {v.country}
              {v.city ? `, ${v.city}` : ''}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 shrink-0' />
            <span>{v.yearsOfExperienceMin}+ years</span>
          </div>
          {(v.salaryMin || v.salaryMax) && (
            <div className='flex items-center gap-2 col-span-2 text-foreground font-medium'>
              <Banknote className='h-4 w-4 shrink-0 text-muted-foreground' />
              <span>
                {v.salaryMin && `${v.salaryMin.toLocaleString()}`}
                {v.salaryMin && v.salaryMax && ' - '}
                {v.salaryMax && `${v.salaryMax.toLocaleString()}`}
                {` ${v.salaryCurrency}`}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VacancyCard;
