import { o as __toESM } from '../_runtime.mjs'
import { t as cva } from '../_libs/class-variance-authority+clsx.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  d as Link,
  h as useSearch,
  m as useNavigate,
  u as getRouteApi
} from '../_libs/@tanstack/react-router+[...].mjs'
import {
  a as useQuery,
  i as useSuspenseQuery
} from '../_libs/tanstack__react-query.mjs'
import {
  I as Banknote,
  N as Building2,
  P as Briefcase,
  T as Clock,
  b as FunnelX,
  h as MapPin,
  j as ChartColumn,
  n as Trash2,
  o as Search
} from '../_libs/lucide-react.mjs'
import {
  i as Track,
  n as Root,
  r as Thumb,
  t as Range
} from '../_libs/radix-ui__react-slider.mjs'
import {
  n as Root2,
  t as Item2
} from '../_libs/radix-ui__react-toggle-group.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Separator$1 } from './separator-vCZ5CfjF.mjs'
import {
  n as CardContent,
  r as CardHeader,
  t as Card
} from './card-Dl6-vnQ9.mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  n as useGetCountriesQueryOptions,
  t as useGetCitiesQueryOptions
} from './locations-DBFoHRWi.mjs'
import { t as Label$1 } from './label-RgPy5fsp.mjs'
import { t as useGetSkillsQueryOptions } from './skills-CR1xJB9f.mjs'
import {
  f as SalaryCurrencyList,
  m as SubmissionTypeList,
  p as SpecializationList,
  v as WorkFormatList
} from './literals-DmvvSYvr.mjs'
import { t as Badge } from './badge-CcIqhcdB.mjs'
import {
  n as AvatarFallback,
  r as AvatarImage,
  t as Avatar$1
} from './avatar-CGkcZU_Y.mjs'
import { t as EmptyState } from './EmptyState-Bowh_nnF.mjs'
import { n as locationLabel } from './textarea-DVlELMeu.mjs'
import { a as vacancyListParamsSchema } from './vacancy-BU3XEoF-.mjs'
import { c as useGetVacanciesQueryOptions } from './vacancies-BeZCF-vN.mjs'
import {
  a as ComboboxContent,
  c as ComboboxItem,
  d as InputGroup,
  f as InputGroupAddon,
  i as ComboboxChipsInput,
  l as ComboboxList,
  m as useComboboxAnchor,
  n as ComboboxChip,
  o as ComboboxEmpty,
  p as InputGroupInput,
  r as ComboboxChips,
  s as ComboboxInput,
  t as Combobox$1,
  u as ComboboxValue
} from './combobox-y4Vg4coy.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work.vacancies.index-DYF4PJT4.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var VacancyCard = ({ v }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
        className: 'flex flex-row items-center gap-4 space-y-0',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
            className: 'h-10 w-10 rounded-md border',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
                src: `https://avatar.vercel.sh/${v.company.name}.png`,
                alt: v.company.name
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
                className: 'rounded-md',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  Building2,
                  { className: 'h-5 w-5' }
                )
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-0.5',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                className: 'text-base leading-none font-semibold',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                  to: '/work/vacancies/$id',
                  params: { id: v.id },
                  className: 'hover:text-primary',
                  children: v.title
                })
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className: 'text-muted-foreground text-sm',
                children: v.company.name
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'grid gap-3',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-wrap gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                variant: 'outline',
                className: 'text-[10px] uppercase',
                children: v.specialization.replace('_', ' ')
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                variant: 'secondary',
                className: 'text-[10px] uppercase',
                children: v.workFormat.replace('_', ' ')
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                variant: 'secondary',
                className: 'text-[10px] uppercase',
                children: v.employmentType.replace('_', ' ')
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'text-muted-foreground grid grid-cols-2 gap-2 text-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
                    className: 'h-4 w-4 shrink-0'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'truncate',
                    children: locationLabel(v.country, v.city)
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
                    className: 'h-4 w-4 shrink-0'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                    children: [v.yearsOfExperienceMin, '+ years']
                  })
                ]
              }),
              (v.salaryMin || v.salaryMax) &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className:
                    'text-foreground col-span-2 flex items-center gap-2 font-medium',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, {
                      className: 'text-muted-foreground h-4 w-4 shrink-0'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                      children: [
                        v.salaryMin && `${v.salaryMin.toLocaleString()}`,
                        v.salaryMin && v.salaryMax && ' - ',
                        v.salaryMax && `${v.salaryMax.toLocaleString()}`,
                        ` ${v.salaryCurrency}`
                      ]
                    })
                  ]
                })
            ]
          })
        ]
      })
    ]
  })
}
var VacancyList = () => {
  const {
    data: { data: vacancies, total }
  } = useSuspenseQuery(
    useGetVacanciesQueryOptions(
      getRouteApi('/(apps)/(work)/work/vacancies/').useLoaderDeps()
    )
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'col-span-2 space-y-4 rounded-lg border border-dashed p-4',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
        children: ['Total vacancies: ', total]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'space-y-4',
        children:
          vacancies.length === 0
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
                title: 'No vacancies found'
              })
            : vacancies.map((v) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  VacancyCard,
                  { v },
                  v.id
                )
              )
      })
    ]
  })
}
function Slider$1({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = import_react.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
    'data-slot': 'slider',
    defaultValue,
    value,
    min,
    max,
    className: cn(
      'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Track, {
        'data-slot': 'slider-track',
        className:
          'bg-muted relative grow overflow-hidden rounded-full data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
          'data-slot': 'slider-range',
          className:
            'bg-primary absolute select-none data-horizontal:h-full data-vertical:w-full'
        })
      }),
      Array.from({ length: _values.length }, (_, index) =>
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Thumb,
          {
            'data-slot': 'slider-thumb',
            className:
              'border-ring ring-ring/50 relative block size-3 shrink-0 rounded-full border bg-white transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50'
          },
          index
        )
      )
    ]
  })
}
var toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-muted'
      },
      size: {
        default:
          'h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
var ToggleGroupContext = import_react.createContext({
  size: 'default',
  variant: 'default',
  spacing: 2,
  orientation: 'horizontal'
})
function ToggleGroup$1({
  className,
  variant,
  size,
  spacing = 2,
  orientation = 'horizontal',
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
    'data-slot': 'toggle-group',
    'data-variant': variant,
    'data-size': size,
    'data-spacing': spacing,
    'data-orientation': orientation,
    style: { '--gap': spacing },
    className: cn(
      'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-vertical:flex-col data-vertical:items-stretch data-[size=sm]:rounded-[min(var(--radius-md),10px)]',
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ToggleGroupContext.Provider,
      {
        value: {
          variant,
          size,
          spacing,
          orientation
        },
        children
      }
    )
  })
}
function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}) {
  const context = import_react.useContext(ToggleGroupContext)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
    'data-slot': 'toggle-group-item',
    'data-variant': context.variant || variant,
    'data-size': context.size || size,
    'data-spacing': context.spacing,
    className: cn(
      'shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
      toggleVariants({
        variant: context.variant || variant,
        size: context.size || size
      }),
      className
    ),
    ...props,
    children
  })
}
var SAVED_SEARCHES_STORAGE_KEY = 'vacancy-saved-search-filters'
var POSTED_WITHIN_OPTIONS = [
  {
    value: '1',
    label: 'Last 24 hours'
  },
  {
    value: '7',
    label: 'Within 7 days'
  },
  {
    value: '30',
    label: 'Within 30 days'
  }
]
var SALARY_RANGES = {
  UZS: {
    min: 0,
    max: 5e7,
    step: 5e5
  },
  KZT: {
    min: 0,
    max: 5e6,
    step: 5e4
  },
  KGS: {
    min: 0,
    max: 5e5,
    step: 5e3
  },
  TJS: {
    min: 0,
    max: 5e4,
    step: 500
  },
  TMT: {
    min: 0,
    max: 5e4,
    step: 500
  },
  USD: {
    min: 0,
    max: 2e4,
    step: 100
  },
  EUR: {
    min: 0,
    max: 2e4,
    step: 100
  },
  TRY: {
    min: 0,
    max: 5e5,
    step: 1e3
  }
}
var savedSearchEntrySchema = zod_default.object({
  id: zod_default.string(),
  name: zod_default.string(),
  filters: zod_default.unknown()
})
var formatLabel = (value) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
var formatMoney = (value, currency) =>
  `${new Intl.NumberFormat('en-US').format(value)} ${currency}`
var createSavedSearchId = () => {
  if (
    typeof window !== 'undefined' &&
    typeof window.crypto?.randomUUID === 'function'
  )
    return window.crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}
var sanitizeVacancySearch = (params) => {
  const next = {}
  const assign = (key, value) => {
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
var toSavedFilters = (params) => ({
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
var parseSavedSearches = (value) => {
  if (!Array.isArray(value)) return []
  return value.reduce((validSearches, entry) => {
    const parsedEntry = savedSearchEntrySchema.safeParse(entry)
    if (!parsedEntry.success) return validSearches
    const parsedFilters = vacancyListParamsSchema.safeParse(
      parsedEntry.data.filters
    )
    if (!parsedFilters.success) return validSearches
    validSearches.push({
      id: parsedEntry.data.id,
      name: parsedEntry.data.name,
      filters: toSavedFilters(parsedFilters.data)
    })
    return validSearches
  }, [])
}
var getSalarySliderValue = (minValue, maxValue, range) => {
  const lower = Math.min(Math.max(minValue ?? range.min, range.min), range.max)
  const upper = Math.min(Math.max(maxValue ?? range.max, range.min), range.max)
  return lower <= upper ? [lower, upper] : [upper, lower]
}
function SingleCombobox({
  id,
  options,
  value,
  placeholder,
  emptyLabel = 'No results found',
  disabled = false,
  onChange
}) {
  const selectedOption =
    options.find((option) => option.value === value) ?? null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Combobox$1, {
    items: options,
    value: selectedOption,
    disabled,
    itemToStringLabel: (option) => option.label,
    itemToStringValue: (option) => option.label,
    isItemEqualToValue: (item, selected) => item.value === selected.value,
    onValueChange: (option) => onChange(option?.value ?? null),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInput, {
        id,
        className: 'w-full',
        placeholder,
        showClear: Boolean(selectedOption),
        disabled
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxContent, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxEmpty, {
            children: emptyLabel
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxList, {
            children: (option) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ComboboxItem,
                {
                  value: option,
                  children: option.label
                },
                option.value
              )
          })
        ]
      })
    ]
  })
}
function MultiCombobox({
  id,
  options,
  values,
  placeholder,
  emptyLabel = 'No results found',
  onChange
}) {
  const anchorRef = useComboboxAnchor()
  const selectedOptions = options.filter((option) =>
    values?.includes(option.value)
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Combobox$1, {
    items: options,
    multiple: true,
    value: selectedOptions,
    itemToStringLabel: (option) => option.label,
    itemToStringValue: (option) => option.label,
    isItemEqualToValue: (item, selected) => item.value === selected.value,
    onValueChange: (nextOptions) =>
      onChange(nextOptions.map((option) => option.value)),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxChips, {
        ref: anchorRef,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxValue, {
            children: selectedOptions.map((option) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ComboboxChip,
                { children: option.label },
                option.value
              )
            )
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxChipsInput, {
            id,
            placeholder: selectedOptions.length ? '' : placeholder
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxContent, {
        anchor: anchorRef,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInput, {
            placeholder: 'Search...'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxEmpty, {
            children: emptyLabel
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxList, {
            children: (option) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ComboboxItem,
                {
                  value: option,
                  children: option.label
                },
                option.value
              )
          })
        ]
      })
    ]
  })
}
var VacancyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/vacancies/' })
  const search = useSearch({ from: '/(apps)/(work)/work/vacancies/' })
  const { data: countriesData } = useQuery(useGetCountriesQueryOptions())
  const { data: skillsData } = useQuery(useGetSkillsQueryOptions())
  const { data: citiesData } = useQuery(
    useGetCitiesQueryOptions({ countryId: search.countryId ?? '' })
  )
  const [savedSearches, setSavedSearches] = (0, import_react.useState)([])
  const countries = countriesData?.data ?? []
  const cities = citiesData?.data ?? []
  const skills = skillsData?.data ?? []
  const countryOptions = (0, import_react.useMemo)(
    () =>
      countries.map((country) => ({
        value: country.id,
        label: country.name
      })),
    [countries]
  )
  const cityOptions = (0, import_react.useMemo)(
    () =>
      cities.map((city) => ({
        value: city.id,
        label: city.name
      })),
    [cities]
  )
  const skillOptions = (0, import_react.useMemo)(
    () =>
      skills.map((skill) => ({
        value: skill.id,
        label: skill.name
      })),
    [skills]
  )
  const specializationOptions = (0, import_react.useMemo)(
    () =>
      SpecializationList.map((specialization) => ({
        value: specialization,
        label: formatLabel(specialization)
      })),
    []
  )
  const salaryCurrencyOptions = (0, import_react.useMemo)(
    () =>
      SalaryCurrencyList.map((currency) => ({
        value: currency,
        label: currency
      })),
    []
  )
  const selectedSalaryCurrency = search.salaryCurrency ?? 'UZS'
  const salaryRange = SALARY_RANGES[selectedSalaryCurrency]
  const salarySliderValue = getSalarySliderValue(
    search.salaryMin,
    search.salaryMax,
    salaryRange
  )
  const [experienceSliderValue, setExperienceSliderValue] = (0,
  import_react.useState)([search.yearsOfExperienceMin ?? 0])
  const [salarySliderDraftValue, setSalarySliderDraftValue] = (0,
  import_react.useState)(salarySliderValue)
  const isSalaryRangeDefault =
    salarySliderDraftValue[0] === salaryRange.min &&
    salarySliderDraftValue[1] === salaryRange.max
  ;(0, import_react.useEffect)(() => {
    setExperienceSliderValue([search.yearsOfExperienceMin ?? 0])
  }, [search.yearsOfExperienceMin])
  ;(0, import_react.useEffect)(() => {
    setSalarySliderDraftValue(salarySliderValue)
  }, [search.salaryMin, search.salaryMax, selectedSalaryCurrency])
  ;(0, import_react.useEffect)(() => {
    if (typeof window === 'undefined') return
    const rawValue = window.localStorage.getItem(SAVED_SEARCHES_STORAGE_KEY)
    if (!rawValue) return
    try {
      setSavedSearches(parseSavedSearches(JSON.parse(rawValue)))
    } catch {
      setSavedSearches([])
    }
  }, [])
  const updateFilter = (newFilter) => {
    navigate({
      search: (prev) =>
        sanitizeVacancySearch({
          ...prev,
          ...newFilter
        })
    })
  }
  const clearFilters = () => {
    navigate({ search: () => ({}) })
  }
  const persistSavedSearches = (nextSearches) => {
    setSavedSearches(nextSearches)
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      SAVED_SEARCHES_STORAGE_KEY,
      JSON.stringify(nextSearches)
    )
  }
  const saveCurrentSearch = () => {
    if (typeof window === 'undefined') return
    const trimmedName = window.prompt('Saved search name')?.trim()
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
  const applySavedSearch = (filters) => {
    navigate({
      search: (prev) =>
        sanitizeVacancySearch({
          offset: 0,
          limit: prev.limit,
          ...filters
        })
    })
  }
  const deleteSavedSearch = (id) => {
    persistSavedSearches(
      savedSearches.filter((savedSearch) => savedSearch.id !== id)
    )
  }
  const handleSalaryRangeChange = (values) => {
    const nextMin = values[0] ?? salaryRange.min
    const nextMax = values[1] ?? salaryRange.max
    updateFilter({
      salaryCurrency: search.salaryCurrency ?? selectedSalaryCurrency,
      salaryMin: nextMin === salaryRange.min ? void 0 : nextMin,
      salaryMax: nextMax === salaryRange.max ? void 0 : nextMax
    })
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'flex flex-col gap-6 rounded-lg border border-dashed p-4',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'flex items-center justify-between',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('h2', {
            className: 'flex items-center gap-2 text-lg font-semibold',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
                className: 'text-primary size-5'
              }),
              'Filters'
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            variant: 'ghost',
            size: 'sm',
            onClick: clearFilters,
            className: 'text-muted-foreground hover:text-destructive',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelX, {
                'data-icon': 'inline-start'
              }),
              'Reset'
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'flex flex-col gap-4',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'title',
                children: 'Job Title'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Briefcase,
                      {}
                    )
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
                    id: 'title',
                    placeholder: 'Search vacancies...',
                    value: search.title ?? '',
                    onChange: (event) =>
                      updateFilter({ title: event.target.value || void 0 })
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'specialization',
                children: 'Specialization'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiCombobox, {
                id: 'specialization',
                options: specializationOptions,
                values: search.specialization,
                placeholder: 'Select specializations',
                emptyLabel: 'No specializations found',
                onChange: (values) =>
                  updateFilter({
                    specialization: values.length ? values : void 0
                  })
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'skills',
                children: 'Skills'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiCombobox, {
                id: 'skills',
                options: skillOptions,
                values: search.skillIds,
                placeholder: 'Select skills',
                emptyLabel: 'No skills found',
                onChange: (values) =>
                  updateFilter({ skillIds: values.length ? values : void 0 })
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                id: 'work-format-label',
                children: 'Work Format'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup$1, {
                type: 'single',
                value: search.workFormat ?? 'hybrid',
                onValueChange: (value) =>
                  updateFilter({ workFormat: value || void 0 }),
                'aria-labelledby': 'work-format-label',
                variant: 'outline',
                size: 'sm',
                className: 'w-full',
                children: WorkFormatList.map((format) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    ToggleGroupItem,
                    {
                      value: format,
                      className: 'flex-1',
                      children: formatLabel(format)
                    },
                    format
                  )
                )
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                id: 'submission-type-label',
                children: 'Submission Type'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup$1, {
                type: 'single',
                value: search.submissionType ?? '',
                onValueChange: (value) =>
                  updateFilter({ submissionType: value || void 0 }),
                'aria-labelledby': 'submission-type-label',
                variant: 'outline',
                size: 'sm',
                className: 'w-full',
                children: SubmissionTypeList.map((type) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    ToggleGroupItem,
                    {
                      value: type,
                      className: 'flex-1',
                      children: formatLabel(type)
                    },
                    type
                  )
                )
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'country',
                children: 'Country'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleCombobox, {
                id: 'country',
                options: countryOptions,
                value: search.countryId,
                placeholder: 'Select country',
                emptyLabel: 'No countries found',
                onChange: (countryId) =>
                  updateFilter({
                    countryId: countryId ?? void 0,
                    cityId: void 0
                  })
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'city',
                children: 'City'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleCombobox, {
                id: 'city',
                options: cityOptions,
                value: search.cityId,
                placeholder: search.countryId
                  ? 'Select city'
                  : 'Select a country first',
                emptyLabel: 'No cities found',
                disabled: !search.countryId,
                onChange: (cityId) => updateFilter({ cityId: cityId ?? void 0 })
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-3',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center justify-between gap-3',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                    htmlFor: 'experience',
                    children: 'Minimum Experience'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                    className: 'text-muted-foreground text-sm',
                    children: [experienceSliderValue[0] ?? 0, '+ years']
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
                id: 'experience',
                min: 0,
                max: 20,
                step: 1,
                value: experienceSliderValue,
                onValueChange: setExperienceSliderValue,
                onValueCommit: (values) =>
                  updateFilter({
                    yearsOfExperienceMin: values[0] ? values[0] : void 0
                  })
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'salary-currency',
                children: 'Salary Currency'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleCombobox, {
                id: 'salary-currency',
                options: salaryCurrencyOptions,
                value: search.salaryCurrency,
                placeholder: 'Select currency',
                emptyLabel: 'No currencies found',
                onChange: (salaryCurrency) =>
                  updateFilter({
                    salaryCurrency: salaryCurrency ?? void 0,
                    salaryMin: void 0,
                    salaryMax: void 0
                  })
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-3',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center justify-between gap-3',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label$1, {
                    htmlFor: 'salary-range',
                    className: 'flex items-center gap-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, {
                        className: 'text-muted-foreground size-4'
                      }),
                      'Salary Range'
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'text-muted-foreground text-right text-sm',
                    children: isSalaryRangeDefault
                      ? 'Any salary'
                      : `${formatMoney(salarySliderDraftValue[0], selectedSalaryCurrency)} - ${formatMoney(salarySliderDraftValue[1], selectedSalaryCurrency)}`
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
                id: 'salary-range',
                min: salaryRange.min,
                max: salaryRange.max,
                step: salaryRange.step,
                value: salarySliderDraftValue,
                onValueChange: setSalarySliderDraftValue,
                onValueCommit: handleSalaryRangeChange
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'posted-within',
                children: 'Posted'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleCombobox, {
                id: 'posted-within',
                options: POSTED_WITHIN_OPTIONS,
                value: search.postedWithinDays
                  ? String(search.postedWithinDays)
                  : null,
                placeholder: 'Any time',
                onChange: (value) =>
                  updateFilter({
                    postedWithinDays: value ? Number(value) : void 0
                  })
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'flex flex-col gap-3',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            variant: 'outline',
            size: 'sm',
            onClick: saveCurrentSearch,
            children: 'Save current search'
          }),
          savedSearches.length > 0 &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              className: 'flex flex-col gap-1',
              children: savedSearches.map((savedSearch) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  'div',
                  {
                    className: 'flex items-center gap-1',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                        variant: 'ghost',
                        size: 'sm',
                        className: 'min-w-0 flex-1 justify-start',
                        onClick: () => applySavedSearch(savedSearch.filters),
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          'span',
                          {
                            className: 'truncate',
                            children: savedSearch.name
                          }
                        )
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                        variant: 'ghost',
                        size: 'icon-sm',
                        'aria-label': `Delete ${savedSearch.name}`,
                        onClick: () => deleteSavedSearch(savedSearch.id),
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          Trash2,
                          {}
                        )
                      })
                    ]
                  },
                  savedSearch.id
                )
              )
            })
        ]
      })
    ]
  })
}
var VacancyRightSidebar = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className:
      'flex flex-col items-center gap-3 rounded-lg border border-dashed p-4 text-center',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {
        className: 'text-muted-foreground size-8'
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
        className: 'text-sm font-semibold',
        children: 'Insights'
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
        className: 'text-muted-foreground text-xs',
        children: 'Vacancy insights will appear here.'
      })
    ]
  })
}
var VacanciesPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_jsx_runtime.Fragment,
    {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VacancyLeftSidebar, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VacancyList, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VacancyRightSidebar, {})
      ]
    }
  )
}
var SplitComponent = VacanciesPage
//#endregion
export { SplitComponent as component }
