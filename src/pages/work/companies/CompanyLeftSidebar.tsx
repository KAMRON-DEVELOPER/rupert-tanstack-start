import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Building2, FilterX, Search } from 'lucide-react'

import { useGetCitiesQueryOptions, useGetCountriesQueryOptions } from '@/api/locations/locations'
import { SingleCombobox } from '@/components/combobox'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { CompanyListParams } from '@/types/companies/company'
import { CompanyTypeList } from '@/types/shared/literals'

const formatLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())

const CompanyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/companies/' })
  const search = useSearch({ from: '/(apps)/(work)/work/companies/' })
  const { data: countriesData } = useQuery(useGetCountriesQueryOptions())
  const { data: citiesData } = useQuery(
    useGetCitiesQueryOptions({ countryId: search.countryId ?? '' })
  )

  const countries = countriesData?.data ?? []
  const cities = citiesData?.data ?? []

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, label: country.name })),
    [countries]
  )
  const cityOptions = useMemo(
    () => cities.map((city) => ({ value: city.id, label: city.name })),
    [cities]
  )
  const companyTypeOptions = useMemo(
    () => CompanyTypeList.map((type) => ({ value: type, label: formatLabel(type) })),
    []
  )

  const updateFilter = (newFilter: Partial<CompanyListParams>) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilter, page: 1 })
    })
  }

  const clearFilters = () => {
    navigate({
      search: (prev) => (prev.own ? { own: prev.own } : {})
    })
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-dashed p-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Search className="text-primary size-5" />
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-destructive"
        >
          <FilterX data-icon="inline-start" />
          Reset
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Company Name</Label>
          <InputGroup>
            <InputGroupAddon>
              <Building2 />
            </InputGroupAddon>
            <InputGroupInput
              id="name"
              placeholder="Search companies..."
              value={search.name ?? ''}
              onChange={(e) => updateFilter({ name: e.target.value || undefined })}
            />
          </InputGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Company Type</Label>
          <SingleCombobox
            id="type"
            options={companyTypeOptions}
            value={search.type}
            placeholder="Select type"
            emptyLabel="No types found"
            onChange={(type) => updateFilter({ type: type ?? undefined })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <SingleCombobox
            id="country"
            options={countryOptions}
            value={search.countryId}
            placeholder="Select country"
            emptyLabel="No countries found"
            onChange={(countryId) =>
              updateFilter({ countryId: countryId ?? undefined, cityId: undefined })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="city">City</Label>
          <SingleCombobox
            id="city"
            options={cityOptions}
            value={search.cityId}
            placeholder={search.countryId ? 'Select city' : 'Select a country first'}
            emptyLabel="No cities found"
            disabled={!search.countryId}
            onChange={(cityId) => updateFilter({ cityId: cityId ?? undefined })}
          />
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
