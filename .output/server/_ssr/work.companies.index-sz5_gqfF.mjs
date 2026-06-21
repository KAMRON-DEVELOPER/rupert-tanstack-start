import { o as __toESM } from '../_runtime.mjs'
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
  N as Building2,
  P as Briefcase,
  b as FunnelX,
  h as MapPin,
  j as ChartColumn,
  o as Search
} from '../_libs/lucide-react.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import {
  n as CardContent,
  r as CardHeader,
  t as Card
} from './card-Dl6-vnQ9.mjs'
import {
  n as useGetCountriesQueryOptions,
  t as useGetCitiesQueryOptions
} from './locations-DBFoHRWi.mjs'
import { t as Label$1 } from './label-RgPy5fsp.mjs'
import { a as CompanyTypeList } from './literals-DmvvSYvr.mjs'
import { t as Badge } from './badge-CcIqhcdB.mjs'
import {
  n as AvatarFallback,
  r as AvatarImage,
  t as Avatar$1
} from './avatar-CGkcZU_Y.mjs'
import { t as EmptyState } from './EmptyState-Bowh_nnF.mjs'
import { n as locationLabel } from './textarea-DVlELMeu.mjs'
import { t as Switch$1 } from './switch-XVX7zzhD.mjs'
import { a as useGetCompaniesQueryOptions } from './companies-DOgslJIC.mjs'
import {
  a as ComboboxContent,
  c as ComboboxItem,
  d as InputGroup,
  f as InputGroupAddon,
  l as ComboboxList,
  o as ComboboxEmpty,
  p as InputGroupInput,
  s as ComboboxInput,
  t as Combobox$1
} from './combobox-y4Vg4coy.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work.companies.index-sz5_gqfF.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var formatLabel = (value) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
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
var CompanyLeftSidebar = () => {
  const navigate = useNavigate({ from: '/work/companies/' })
  const search = useSearch({ from: '/(apps)/(work)/work/companies/' })
  const { data: countriesData } = useQuery(useGetCountriesQueryOptions())
  const { data: citiesData } = useQuery(
    useGetCitiesQueryOptions({ countryId: search.countryId ?? '' })
  )
  const countries = countriesData?.data ?? []
  const cities = citiesData?.data ?? []
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
  const companyTypeOptions = (0, import_react.useMemo)(
    () =>
      CompanyTypeList.map((type) => ({
        value: type,
        label: formatLabel(type)
      })),
    []
  )
  const updateFilter = (newFilter) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...newFilter,
        page: 1
      })
    })
  }
  const clearFilters = () => {
    navigate({ search: (prev) => (prev.own ? { own: prev.own } : {}) })
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
                htmlFor: 'name',
                children: 'Company Name'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Building2,
                      {}
                    )
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
                    id: 'name',
                    placeholder: 'Search companies...',
                    value: search.name ?? '',
                    onChange: (e) =>
                      updateFilter({ name: e.target.value || void 0 })
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'type',
                children: 'Company Type'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleCombobox, {
                id: 'type',
                options: companyTypeOptions,
                value: search.type,
                placeholder: 'Select type',
                emptyLabel: 'No types found',
                onChange: (type) => updateFilter({ type: type ?? void 0 })
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
            className: 'flex items-center justify-between pt-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                htmlFor: 'vacancies',
                className: 'cursor-pointer',
                children: 'Open Vacancies'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
                id: 'vacancies',
                checked: search.hasOpenVacancies || false,
                onCheckedChange: (checked) =>
                  updateFilter({ hasOpenVacancies: checked || void 0 })
              })
            ]
          })
        ]
      })
    ]
  })
}
var CompanyCard = ({ c }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
        className: 'flex flex-row items-center gap-4 space-y-0',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
            className: 'h-12 w-12 border',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
                src: `https://avatar.vercel.sh/${c.name}.png`,
                alt: c.name
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  Building2,
                  { className: 'h-6 w-6' }
                )
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-1',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                    className: 'text-lg leading-none font-semibold',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Link,
                      {
                        to: '/work/companies/$id',
                        params: { id: c.id },
                        className: 'hover:text-primary',
                        children: c.name
                      }
                    )
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                    variant: 'secondary',
                    className: 'text-[10px] tracking-wider uppercase',
                    children: c.type.replace('_', ' ')
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className: 'text-muted-foreground line-clamp-1 text-sm',
                children: c.tagline
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'grid gap-2',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'text-muted-foreground flex items-center gap-2 text-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
                className: 'h-4 w-4'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                children: locationLabel(c.country, c.city)
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'text-muted-foreground flex items-center gap-2 text-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, {
                className: 'h-4 w-4'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                children: [c.openVacanciesCount, ' open vacancies']
              })
            ]
          })
        ]
      })
    ]
  })
}
var CompanyList = () => {
  const {
    data: { data: companies, total }
  } = useSuspenseQuery(
    useGetCompaniesQueryOptions(
      getRouteApi('/(apps)/(work)/work/companies/').useLoaderDeps()
    )
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'col-span-2 space-y-2 rounded-lg border border-dashed p-4',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
        children: ['Total companies: ', total]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'space-y-2',
        children:
          companies.length === 0
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
                title: 'No companies found'
              })
            : companies.map((c) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  CompanyCard,
                  { c },
                  c.id
                )
              )
      })
    ]
  })
}
var CompanyRightSidebar = () => {
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
        children: 'Company insights will appear here.'
      })
    ]
  })
}
var CompaniesPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_jsx_runtime.Fragment,
    {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyLeftSidebar, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyList, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyRightSidebar, {})
      ]
    }
  )
}
var SplitComponent = CompaniesPage
//#endregion
export { SplitComponent as component }
