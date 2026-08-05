import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Banknote, Briefcase, Trash2 } from 'lucide-react'
import z from 'zod'

import { useGetCitiesQueryOptions, useGetCountriesQueryOptions } from '@/api/locations/locations'
import { useGetSkillsQueryOptions } from '@/api/skills/skills'
import { Button } from '@/components/ui/button'
import { MultiCombobox, SingleCombobox } from '@/components/combobox'
import type { ComboboxOption } from '@/components/combobox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  SalaryCurrencyList,
  SpecializationList,
  SubmissionTypeList,
  WorkFormatList,
  type SalaryCurrency
} from '@/types/shared/literals'
import { type VacancyListParams, vacancyListParamsSchema } from '@/types/vacancies/vacancy'

const SAVED_SEARCHES_STORAGE_KEY = 'vacancy-saved-search-filters'

const POSTED_WITHIN_OPTIONS = [
  { value: '1', label: 'Last 24 hours' },
  { value: '7', label: 'Within 7 days' },
  { value: '30', label: 'Within 30 days' }
] satisfies ComboboxOption[]

const SALARY_RANGES = {
  UZS: { min: 0, max: 50_000_000, step: 500_000 },
  KZT: { min: 0, max: 5_000_000, step: 50_000 },
  KGS: { min: 0, max: 500_000, step: 5_000 },
  TJS: { min: 0, max: 50_000, step: 500 },
  TMT: { min: 0, max: 50_000, step: 500 },
  USD: { min: 0, max: 20_000, step: 100 },
  EUR: { min: 0, max: 20_000, step: 100 },
  TRY: { min: 0, max: 500_000, step: 1_000 }
} satisfies Record<SalaryCurrency, { min: number; max: number; step: number }>

const savedSearchEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  filters: z.unknown()
})

type VacancySavedSearchFilters = {
  title?: VacancyListParams['title']
  submissionType?: VacancyListParams['submissionType']
  specialization?: VacancyListParams['specialization']
  salaryMin?: VacancyListParams['salaryMin']
  salaryMax?: VacancyListParams['salaryMax']
  salaryCurrency?: VacancyListParams['salaryCurrency']
  yearsOfExperienceMin?: VacancyListParams['yearsOfExperienceMin']
  workFormat?: VacancyListParams['workFormat']
  employmentType?: VacancyListParams['employmentType']
  status?: VacancyListParams['status']
  countryId?: VacancyListParams['countryId']
  cityId?: VacancyListParams['cityId']
  skillIds?: VacancyListParams['skillIds']
  postedWithinDays?: VacancyListParams['postedWithinDays']
}

type SavedSearch = {
  id: string
  name: string
  filters: VacancySavedSearchFilters
}

const formatLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())

const formatMoney = (value: number, currency: SalaryCurrency) =>
  `${new Intl.NumberFormat('en-US').format(value)} ${currency}`

const createSavedSearchId = () => {
  if (typeof window !== 'undefined' && typeof window.crypto?.randomUUID === 'function') {
    return window.crypto.randomUUID()
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

const sanitizeVacancySearch = (params: Partial<VacancyListParams>) => {
  const next: Partial<VacancyListParams> = {}

  const assign = <Key extends keyof VacancyListParams>(
    key: Key,
    value: VacancyListParams[Key] | undefined
  ) => {
    if (value == null) return
    if (typeof value === 'string' && !value) return
    if (Array.isArray(value) && value.length === 0) return

    next[key] = value
  }

  assign('offset', params.offset)
  assign('limit', params.limit)
  assign('title', params.title)
  assign('submissionType', params.submissionType)
  assign('specialization', params.specialization)
  assign('salaryMin', params.salaryMin)
  assign('salaryMax', params.salaryMax)
  assign('salaryCurrency', params.salaryCurrency)
  assign('yearsOfExperienceMin', params.yearsOfExperienceMin)
  assign('workFormat', params.workFormat)
  assign('employmentType', params.employmentType)
  assign('status', params.status)
  assign('countryId', params.countryId)
  assign('cityId', params.cityId)
  assign('skillIds', params.skillIds)
  assign('postedWithinDays', params.postedWithinDays)

  return next
}

const toSavedFilters = (params: VacancyListParams): VacancySavedSearchFilters => ({
  title: params.title,
  submissionType: params.submissionType,
  specialization: params.specialization,
  salaryMin: params.salaryMin,
  salaryMax: params.salaryMax,
  salaryCurrency: params.salaryCurrency,
  yearsOfExperienceMin: params.yearsOfExperienceMin,
  workFormat: params.workFormat,
  employmentType: params.employmentType,
  status: params.status,
  countryId: params.countryId,
  cityId: params.cityId,
  skillIds: params.skillIds,
  postedWithinDays: params.postedWithinDays
})

const parseSavedSearches = (value: unknown): SavedSearch[] => {
  if (!Array.isArray(value)) return []

  return value.reduce<SavedSearch[]>((validSearches, entry) => {
    const parsedEntry = savedSearchEntrySchema.safeParse(entry)
    if (!parsedEntry.success) return validSearches

    const parsedFilters = vacancyListParamsSchema.safeParse(parsedEntry.data.filters)
    if (!parsedFilters.success) return validSearches

    validSearches.push({
      id: parsedEntry.data.id,
      name: parsedEntry.data.name,
      filters: toSavedFilters(parsedFilters.data)
    })

    return validSearches
  }, [])
}

const getSalarySliderValue = (
  minValue: number | null | undefined,
  maxValue: number | null | undefined,
  range: (typeof SALARY_RANGES)[SalaryCurrency]
) => {
  const lower = Math.min(Math.max(minValue ?? range.min, range.min), range.max)
  const upper = Math.min(Math.max(maxValue ?? range.max, range.min), range.max)

  return lower <= upper ? [lower, upper] : [upper, lower]
}

const VacancyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/vacancies/' })
  const search = useSearch({ from: '/(apps)/(work)/work/vacancies/' })
  const { data: countriesData } = useQuery(useGetCountriesQueryOptions())
  const { data: skillsData } = useQuery(useGetSkillsQueryOptions())
  const { data: citiesData } = useQuery(
    useGetCitiesQueryOptions({ countryId: search.countryId ?? '' })
  )
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])

  const countries = countriesData?.data ?? []
  const cities = citiesData?.data ?? []
  const skills = skillsData?.data ?? []

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, label: country.name })),
    [countries]
  )
  const cityOptions = useMemo(
    () => cities.map((city) => ({ value: city.id, label: city.name })),
    [cities]
  )
  const skillOptions = useMemo(
    () => skills.map((skill) => ({ value: skill.id, label: skill.name })),
    [skills]
  )
  const specializationOptions = useMemo(
    () =>
      SpecializationList.map((specialization) => ({
        value: specialization,
        label: formatLabel(specialization)
      })),
    []
  )
  const salaryCurrencyOptions = useMemo(
    () => SalaryCurrencyList.map((currency) => ({ value: currency, label: currency })),
    []
  )

  const selectedSalaryCurrency = search.salaryCurrency ?? 'UZS'
  const salaryRange = SALARY_RANGES[selectedSalaryCurrency]
  const salarySliderValue = getSalarySliderValue(search.salaryMin, search.salaryMax, salaryRange)
  const [experienceSliderValue, setExperienceSliderValue] = useState([
    search.yearsOfExperienceMin ?? 0
  ])
  const [salarySliderDraftValue, setSalarySliderDraftValue] = useState(salarySliderValue)
  const isSalaryRangeDefault =
    salarySliderDraftValue[0] === salaryRange.min && salarySliderDraftValue[1] === salaryRange.max

  useEffect(() => {
    setExperienceSliderValue([search.yearsOfExperienceMin ?? 0])
  }, [search.yearsOfExperienceMin])

  useEffect(() => {
    setSalarySliderDraftValue(salarySliderValue)
  }, [search.salaryMin, search.salaryMax, selectedSalaryCurrency])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const rawValue = window.localStorage.getItem(SAVED_SEARCHES_STORAGE_KEY)
    if (!rawValue) return

    try {
      setSavedSearches(parseSavedSearches(JSON.parse(rawValue)))
    } catch {
      setSavedSearches([])
    }
  }, [])

  const updateFilter = (newFilter: Partial<VacancyListParams>) => {
    navigate({
      search: (prev) => sanitizeVacancySearch({ ...prev, offset: 0, ...newFilter })
    })
  }

  const clearFilters = () => {
    navigate({
      search: () => ({})
    })
  }

  const persistSavedSearches = (nextSearches: SavedSearch[]) => {
    setSavedSearches(nextSearches)
    if (typeof window === 'undefined') return

    window.localStorage.setItem(SAVED_SEARCHES_STORAGE_KEY, JSON.stringify(nextSearches))
  }

  const saveCurrentSearch = () => {
    if (typeof window === 'undefined') return

    const name = window.prompt('Saved search name')
    const trimmedName = name?.trim()
    if (!trimmedName) return

    persistSavedSearches([
      ...savedSearches,
      {
        id: createSavedSearchId(),
        name: trimmedName,
        filters: toSavedFilters(search)
      }
    ])
  }

  const applySavedSearch = (filters: VacancySavedSearchFilters) => {
    navigate({
      search: (prev) =>
        sanitizeVacancySearch({
          offset: 0,
          limit: prev.limit,
          ...filters
        })
    })
  }

  const deleteSavedSearch = (id: string) => {
    persistSavedSearches(savedSearches.filter((savedSearch) => savedSearch.id !== id))
  }

  const handleSalaryRangeChange = (values: number[]) => {
    const nextMin = values[0] ?? salaryRange.min
    const nextMax = values[1] ?? salaryRange.max

    updateFilter({
      salaryCurrency: search.salaryCurrency ?? selectedSalaryCurrency,
      salaryMin: nextMin === salaryRange.min ? undefined : nextMin,
      salaryMax: nextMax === salaryRange.max ? undefined : nextMax
    })
  }

  const activeFilterCount = Object.entries(search).filter(
    ([key, value]) =>
      key !== 'offset' &&
      key !== 'limit' &&
      value != null &&
      value !== '' &&
      (!Array.isArray(value) || value.length > 0)
  ).length

  return (
    <div className="bg-card flex flex-col gap-6 self-start rounded-xl border p-4 md:sticky md:top-16">
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} active
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Job Title</Label>
          <InputGroup>
            <InputGroupAddon>
              <Briefcase />
            </InputGroupAddon>
            <InputGroupInput
              id="title"
              placeholder="Search vacancies..."
              value={search.title ?? ''}
              onChange={(event) => updateFilter({ title: event.target.value || undefined })}
            />
          </InputGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="specialization">Specialization</Label>
          <MultiCombobox
            id="specialization"
            options={specializationOptions}
            values={search.specialization}
            placeholder="Select specializations"
            emptyLabel="No specializations found"
            onChange={(values) =>
              updateFilter({
                specialization: values.length ? values : undefined
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="skills">Skills</Label>
          <MultiCombobox
            id="skills"
            options={skillOptions}
            values={search.skillIds}
            placeholder="Select skills"
            emptyLabel="No skills found"
            onChange={(values) => updateFilter({ skillIds: values.length ? values : undefined })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label id="work-format-label">Work Format</Label>
          <ToggleGroup
            type="single"
            value={search.workFormat ?? ''}
            onValueChange={(value) => updateFilter({ workFormat: value || undefined })}
            aria-labelledby="work-format-label"
            variant="outline"
            size="sm"
            className="w-full"
          >
            {WorkFormatList.map((format) => (
              <ToggleGroupItem key={format} value={format} className="flex-1">
                {formatLabel(format)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Label id="submission-type-label">Submission Type</Label>
          <ToggleGroup
            type="single"
            value={search.submissionType ?? ''}
            onValueChange={(value) => updateFilter({ submissionType: value || undefined })}
            aria-labelledby="submission-type-label"
            variant="outline"
            size="sm"
            className="w-full"
          >
            {SubmissionTypeList.map((type) => (
              <ToggleGroupItem key={type} value={type} className="flex-1">
                {formatLabel(type)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="experience">Minimum Experience</Label>
            <span className="text-muted-foreground text-sm">
              {experienceSliderValue[0] ?? 0}+ years
            </span>
          </div>
          <Slider
            id="experience"
            min={0}
            max={20}
            step={1}
            value={experienceSliderValue}
            onValueChange={setExperienceSliderValue}
            onValueCommit={(values) =>
              updateFilter({ yearsOfExperienceMin: values[0] ? values[0] : undefined })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="posted-within">Posted</Label>
          <SingleCombobox
            id="posted-within"
            options={POSTED_WITHIN_OPTIONS}
            value={search.postedWithinDays ? String(search.postedWithinDays) : null}
            placeholder="Any time"
            onChange={(value) =>
              updateFilter({ postedWithinDays: value ? Number(value) : undefined })
            }
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="salary-currency">Salary Currency</Label>
          <SingleCombobox
            id="salary-currency"
            options={salaryCurrencyOptions}
            value={search.salaryCurrency}
            placeholder="Select currency"
            emptyLabel="No currencies found"
            onChange={(salaryCurrency) =>
              updateFilter({
                salaryCurrency: salaryCurrency ?? undefined,
                salaryMin: undefined,
                salaryMax: undefined
              })
            }
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="salary-range" className="flex items-center gap-2">
              <Banknote className="text-muted-foreground size-4" />
              Salary Range
            </Label>
            <span className="text-muted-foreground text-right text-sm">
              {isSalaryRangeDefault
                ? 'Any salary'
                : `${formatMoney(salarySliderDraftValue[0], selectedSalaryCurrency)} - ${formatMoney(
                    salarySliderDraftValue[1],
                    selectedSalaryCurrency
                  )}`}
            </span>
          </div>
          <Slider
            id="salary-range"
            min={salaryRange.min}
            max={salaryRange.max}
            step={salaryRange.step}
            value={salarySliderDraftValue}
            onValueChange={setSalarySliderDraftValue}
            onValueCommit={handleSalaryRangeChange}
          />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Saved searches
        </h3>
        <Button variant="outline" size="sm" onClick={saveCurrentSearch}>
          Save current search
        </Button>
        {savedSearches.length > 0 && (
          <div className="flex flex-col gap-1">
            {savedSearches.map((savedSearch) => (
              <div key={savedSearch.id} className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="min-w-0 flex-1 justify-start"
                  onClick={() => applySavedSearch(savedSearch.filters)}
                >
                  <span className="truncate">{savedSearch.name}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete ${savedSearch.name}`}
                  onClick={() => deleteSavedSearch(savedSearch.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VacancyLeftSidebar
