import { CompanySearch } from '@/types/company.schema'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { CompanyTypeList, type CompanyType } from '@/types/literals'
import { Search, Building2, Globe, MapPin, FilterX } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CompanyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/companies/' })
  const search = useSearch({ from: '/(apps)/(work)/work/companies/' })

  const updateFilter = (newFilter: Partial<CompanySearch>) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilter, page: 1 })
    })
  }

  const clearFilters = () => {
    navigate({
      search: () => ({})
    })
  }

  return (
    <div className="bg-card sticky top-24 flex h-fit flex-col gap-6 rounded-xl border p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Search className="text-primary h-5 w-5" />
          Search
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-destructive h-8 text-xs"
        >
          <FilterX className="mr-1 h-3.5 w-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <div className="relative">
            <Input
              id="name"
              placeholder="Search companies..."
              value={search.name || ''}
              onChange={(e) => updateFilter({ name: e.target.value || undefined })}
              className="pl-9"
            />
            <Building2 className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Company Type</Label>
          <Select
            value={search.type || 'all'}
            onValueChange={(val) =>
              updateFilter({ type: val === 'all' ? undefined : (val as CompanyType) })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {CompanyTypeList.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <div className="relative">
            <Input
              id="country"
              placeholder="Filter by country..."
              value={search.country || ''}
              onChange={(e) => updateFilter({ country: e.target.value || undefined })}
              className="pl-9"
            />
            <Globe className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <div className="relative">
            <Input
              id="city"
              placeholder="Filter by city..."
              value={search.city || ''}
              onChange={(e) => updateFilter({ city: e.target.value || undefined })}
              className="pl-9"
            />
            <MapPin className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="vacancies" className="cursor-pointer">
            Open Vacancies
          </Label>
          <Switch
            id="vacancies"
            checked={search.hasOpenVacancies || false}
            onCheckedChange={(checked) => updateFilter({ hasOpenVacancies: checked || undefined })}
          />
        </div>
      </div>
    </div>
  )
}

export default CompanyLeftSidebar
