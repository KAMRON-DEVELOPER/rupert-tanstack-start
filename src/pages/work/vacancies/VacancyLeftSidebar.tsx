import { VacancySearch } from '@/types/vacancy.schema';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SpecializationList, WorkFormatList } from '@/types/literals';
import { Search, Briefcase, Globe, MapPin, FilterX, Clock, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VacancyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/vacancies/' });
  const search = useSearch({ from: '/(apps)/(work)/work/vacancies/' });

  const updateFilter = (newFilter: Partial<VacancySearch>) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilter }),
    });
  };

  const clearFilters = () => {
    navigate({
      search: () => ({}),
    });
  };

  return (
    <div className='flex flex-col gap-6 p-6 border rounded-xl bg-card h-fit sticky top-24'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold flex items-center gap-2'>
          <Search className='h-5 w-5 text-primary' />
          Filters
        </h2>
        <Button
          variant='ghost'
          size='sm'
          onClick={clearFilters}
          className='h-8 text-xs text-muted-foreground hover:text-destructive'>
          <FilterX className='h-3.5 w-3.5 mr-1' />
          Reset
        </Button>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='title'>Job Title</Label>
          <div className='relative'>
            <Input
              id='title'
              placeholder='Search vacancies...'
              value={search.title || ''}
              onChange={(e) => updateFilter({ title: e.target.value || undefined })}
              className='pl-9'
            />
            <Briefcase className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          </div>
        </div>

        <div className='space-y-2'>
          <Label>Specialization</Label>
          <Select
            value={search.specialization || 'all'}
            onValueChange={(val) => updateFilter({ specialization: val === 'all' ? undefined : (val as any) })}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select specialization' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Specializations</SelectItem>
              {SpecializationList.map((spec) => (
                <SelectItem
                  key={spec}
                  value={spec}>
                  {spec.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-1 gap-4'>
          <div className='space-y-2'>
            <Label>Work Format</Label>
            <Select
              value={search.workFormat || 'all'}
              onValueChange={(val) => updateFilter({ workFormat: val === 'all' ? undefined : (val as any) })}>
              <SelectTrigger>
                <SelectValue placeholder='Any' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Any Format</SelectItem>
                {WorkFormatList.map((format) => (
                  <SelectItem
                    key={format}
                    value={format}>
                    {format.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='country'>Location</Label>
          <div className='flex flex-col gap-2'>
            <div className='relative'>
              <Input
                id='country'
                placeholder='Country'
                value={search.country || ''}
                onChange={(e) => updateFilter({ country: e.target.value || undefined })}
                className='pl-9'
              />
              <Globe className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            </div>
            <div className='relative'>
              <Input
                id='city'
                placeholder='City'
                value={search.city || ''}
                onChange={(e) => updateFilter({ city: e.target.value || undefined })}
                className='pl-9'
              />
              <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            </div>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='exp'>Min. Experience (Years)</Label>
          <div className='relative'>
            <Input
              id='exp'
              type='number'
              min='0'
              placeholder='0'
              value={search.yearsOfExperienceMin || ''}
              onChange={(e) => updateFilter({ yearsOfExperienceMin: e.target.value ? parseInt(e.target.value) : undefined })}
              className='pl-9'
            />
            <Clock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='salary'>Min. Salary</Label>
          <div className='relative'>
            <Input
              id='salary'
              type='number'
              min='0'
              placeholder='Minimum salary'
              value={search.salaryMin || ''}
              onChange={(e) => updateFilter({ salaryMin: e.target.value ? parseInt(e.target.value) : undefined })}
              className='pl-9'
            />
            <Banknote className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyLeftSidebar;
