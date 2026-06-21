import { o as __toESM } from '../_runtime.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import { n as createServerFn } from './ssr.mjs'
import { t as createSsrRpc } from './createSsrRpc-C1p7zOu_.mjs'
import {
  a as useQuery,
  n as useMutation,
  s as useQueryClient
} from '../_libs/tanstack__react-query.mjs'
import {
  O as ChevronRight,
  h as MapPin,
  n as Trash2,
  r as SquarePen,
  s as Plus
} from '../_libs/lucide-react.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Input } from './input-BAnSrTfB.mjs'
import {
  i as CardTitle,
  n as CardContent,
  r as CardHeader,
  t as Card
} from './card-Dl6-vnQ9.mjs'
import { t as isAxiosError } from '../_libs/axios+[...].mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import {
  a as countryCreateRequestSchema,
  r as cityRequestSchema,
  s as countryUpdateRequestSchema
} from './location-ExHvl-rC.mjs'
import {
  n as useGetCountriesQueryOptions,
  t as useGetCitiesQueryOptions
} from './locations-DBFoHRWi.mjs'
import { t as Label$1 } from './label-RgPy5fsp.mjs'
import {
  a as DialogHeader,
  i as DialogFooter,
  n as DialogContent,
  o as DialogTitle,
  t as Dialog$1
} from './dialog-CaHgSF1L.mjs'
import { t as getErrorMessage } from './helper-CcD2XA6A.mjs'
import {
  a as AlertDialogDescription,
  c as AlertDialogTitle,
  i as AlertDialogContent,
  l as AlertDialogTrigger,
  n as AlertDialogAction,
  o as AlertDialogFooter,
  r as AlertDialogCancel,
  s as AlertDialogHeader,
  t as AlertDialog$1
} from './alert-dialog-zauCc3hl.mjs'
import { n as toast } from '../_libs/sonner.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/admin.locations-CviIsDGF.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var createCityFn = createServerFn({ method: 'POST' })
  .inputValidator(cityRequestSchema.extend({ countryId: zod_default.uuid() }))
  .handler(
    createSsrRpc(
      '08cb90fbf3c2d4a239c851de4666c7a062a9beaab03dd4062e2db940269617f4'
    )
  )
var updateCityFn = createServerFn({ method: 'POST' })
  .inputValidator(
    cityRequestSchema.extend({
      countryId: zod_default.uuid(),
      cityId: zod_default.uuid()
    })
  )
  .handler(
    createSsrRpc(
      '9d968fe39a796b8b4729eea27c5dffd0ce61173154d2b64c3b86372e230afb96'
    )
  )
var deleteCityFn = createServerFn({ method: 'POST' })
  .inputValidator(
    zod_default.object({
      countryId: zod_default.uuid(),
      cityId: zod_default.uuid()
    })
  )
  .handler(
    createSsrRpc(
      '10904fc877b0fe6ecb590eb639b6a9ab8cc1446d922857c61ef09cf58454f32a'
    )
  )
var useCreateCityMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createCityFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['countries', variables.countryId, 'cities']
      })
    }
  })
}
var useUpdateCityMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateCityFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['countries', variables.countryId, 'cities']
      })
    }
  })
}
var useDeleteCityMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => deleteCityFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['countries', variables.countryId, 'cities']
      })
    }
  })
}
function CountryForm({ initialData, onSubmit, onCancel, isLoading, title }) {
  const [code, setCode] = (0, import_react.useState)(initialData?.code || '')
  const [name, setName] = (0, import_react.useState)(initialData?.name || '')
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      code: code.trim().toUpperCase(),
      name: name.trim()
    })
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
    open: true,
    onOpenChange: (open) => !open && onCancel(),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
            children: title
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
          onSubmit: handleSubmit,
          className: 'space-y-4',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'space-y-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                  htmlFor: 'code',
                  children: 'Country Code (2 letters)'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  id: 'code',
                  value: code,
                  onChange: (e) => setCode(e.target.value.toUpperCase()),
                  placeholder: 'e.g. US, UZ',
                  maxLength: 2,
                  required: true
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'space-y-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                  htmlFor: 'name',
                  children: 'Country Name'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  id: 'name',
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: 'e.g. United States, Uzbekistan',
                  required: true
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  type: 'button',
                  variant: 'outline',
                  onClick: onCancel,
                  children: 'Cancel'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  type: 'submit',
                  disabled: isLoading,
                  children: isLoading ? 'Saving...' : 'Save'
                })
              ]
            })
          ]
        })
      ]
    })
  })
}
function CityForm({ initialData, onSubmit, onCancel, isLoading, title }) {
  const [name, setName] = (0, import_react.useState)(initialData?.name || '')
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name: name.trim() })
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
    open: true,
    onOpenChange: (open) => !open && onCancel(),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
            children: title
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
          onSubmit: handleSubmit,
          className: 'space-y-4',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'space-y-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                  htmlFor: 'name',
                  children: 'City Name'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  id: 'name',
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: 'e.g. Tashkent, New York',
                  required: true
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  type: 'button',
                  variant: 'outline',
                  onClick: onCancel,
                  children: 'Cancel'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  type: 'submit',
                  disabled: isLoading,
                  children: isLoading ? 'Saving...' : 'Save'
                })
              ]
            })
          ]
        })
      ]
    })
  })
}
var createCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(countryCreateRequestSchema)
  .handler(
    createSsrRpc(
      'bc9fad86e702cb7f7e804b70b999f37799336c3ee3195c5658458333d00573f0'
    )
  )
var updateCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(
    countryUpdateRequestSchema.extend({ countryId: zod_default.uuid() })
  )
  .handler(
    createSsrRpc(
      '6faa1e1ec0f86cf84b01c9aa4e1b1482b3b1d798e9ccb9d7d79f99e3f40d9178'
    )
  )
var deleteCountryFn = createServerFn({ method: 'POST' })
  .inputValidator(zod_default.object({ countryId: zod_default.uuid() }))
  .handler(
    createSsrRpc(
      '8dadf292b5bf0d4b4d6da41fc9b2bd816d83bc26ae12ed75d3da77a5ff38571a'
    )
  )
var useCreateCountryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createCountryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] })
    }
  })
}
var useUpdateCountryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateCountryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] })
    }
  })
}
var useDeleteCountryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => deleteCountryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] })
    }
  })
}
var toCountryUpdateRequest = (initialData, values) => {
  const data = {}
  const code = values.code.trim().toUpperCase()
  const name = values.name.trim()
  if (code !== initialData.code) data.code = code
  if (name !== initialData.name) data.name = name
  return data
}
var showMutationError = (error, fallback) => {
  const message = isAxiosError(error)
    ? getErrorMessage(error.response?.data, fallback)
    : fallback
  toast.error(message)
}
function AdminLocationsPage() {
  const [selectedCountry, setSelectedCountry] = (0, import_react.useState)(null)
  const [isCountryCreateOpen, setIsCountryCreateOpen] = (0,
  import_react.useState)(false)
  const [editingCountry, setEditingCountry] = (0, import_react.useState)(null)
  const [isCityCreateOpen, setIsCityCreateOpen] = (0, import_react.useState)(
    false
  )
  const [editingCity, setEditingCity] = (0, import_react.useState)(null)
  const { data: countries, isLoading: isCountriesLoading } = useQuery(
    useGetCountriesQueryOptions()
  )
  const { data: cities, isLoading: isCitiesLoading } = useQuery(
    useGetCitiesQueryOptions({ countryId: selectedCountry?.id ?? '' })
  )
  const createCountryMutation = useCreateCountryMutation()
  const updateCountryMutation = useUpdateCountryMutation()
  const createCityMutation = useCreateCityMutation()
  const updateCityMutation = useUpdateCityMutation()
  const deleteCountryMutation = useDeleteCountryMutation()
  const deleteCityMutation = useDeleteCityMutation()
  const handleDeleteCountry = (countryId) => {
    deleteCountryMutation.mutate(
      { countryId },
      {
        onSuccess: () => {
          if (selectedCountry?.id === countryId) setSelectedCountry(null)
          toast.success('Country deleted')
        },
        onError: (error) => showMutationError(error, 'Failed to delete country')
      }
    )
  }
  const handleDeleteCity = (countryId, cityId) => {
    deleteCityMutation.mutate(
      {
        countryId,
        cityId
      },
      {
        onSuccess: () => {
          toast.success('City deleted')
        },
        onError: (error) => showMutationError(error, 'Failed to delete city')
      }
    )
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-6',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'flex items-center justify-between',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
                className: 'text-3xl font-bold tracking-tight',
                children: 'Locations'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className: 'text-muted-foreground',
                children: 'Manage countries and cities.'
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            onClick: () => setIsCountryCreateOpen(true),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                className: 'mr-2 h-4 w-4'
              }),
              'Add Country'
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'grid grid-cols-1 gap-6 md:grid-cols-2',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  CardTitle,
                  { children: 'Countries' }
                )
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                className: 'space-y-2',
                children: isCountriesLoading
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      className:
                        'text-muted-foreground py-8 text-center text-sm',
                      children: 'Loading countries...'
                    })
                  : countries?.data?.length === 0
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                        className:
                          'text-muted-foreground py-8 text-center text-sm',
                        children: 'No countries found.'
                      })
                    : countries?.data?.map((country) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          'div',
                          {
                            className: `hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-2 transition-colors ${selectedCountry?.id === country.id ? 'bg-accent border-primary' : ''}`,
                            onClick: () => setSelectedCountry(country),
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                'div',
                                {
                                  className: 'flex items-center gap-2',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      'span',
                                      {
                                        className:
                                          'bg-muted rounded px-1 font-mono text-xs',
                                        children: country.code
                                      }
                                    ),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      'span',
                                      { children: country.name }
                                    )
                                  ]
                                }
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                'div',
                                {
                                  className: 'flex items-center gap-1',
                                  onClick: (e) => e.stopPropagation(),
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      Button,
                                      {
                                        variant: 'ghost',
                                        size: 'icon-sm',
                                        onClick: () =>
                                          setEditingCountry(country),
                                        children: /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)(SquarePen, {
                                          className: 'h-3 w-3'
                                        })
                                      }
                                    ),
                                    /* @__PURE__ */ (0,
                                    import_jsx_runtime.jsxs)(AlertDialog$1, {
                                      children: [
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)(
                                          AlertDialogTrigger,
                                          {
                                            asChild: true,
                                            children: /* @__PURE__ */ (0,
                                            import_jsx_runtime.jsx)(Button, {
                                              variant: 'ghost',
                                              size: 'icon-sm',
                                              title: 'Delete country',
                                              children: /* @__PURE__ */ (0,
                                              import_jsx_runtime.jsx)(Trash2, {
                                                className:
                                                  'text-destructive h-3 w-3'
                                              })
                                            })
                                          }
                                        ),
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsxs)(
                                          AlertDialogContent,
                                          {
                                            children: [
                                              /* @__PURE__ */ (0,
                                              import_jsx_runtime.jsxs)(
                                                AlertDialogHeader,
                                                {
                                                  children: [
                                                    /* @__PURE__ */ (0,
                                                    import_jsx_runtime.jsx)(
                                                      AlertDialogTitle,
                                                      {
                                                        children:
                                                          'Delete Country'
                                                      }
                                                    ),
                                                    /* @__PURE__ */ (0,
                                                    import_jsx_runtime.jsxs)(
                                                      AlertDialogDescription,
                                                      {
                                                        children: [
                                                          'Are you sure you want to delete "',
                                                          country.name,
                                                          '"? This will also remove all associated cities. This action cannot be undone.'
                                                        ]
                                                      }
                                                    )
                                                  ]
                                                }
                                              ),
                                              /* @__PURE__ */ (0,
                                              import_jsx_runtime.jsxs)(
                                                AlertDialogFooter,
                                                {
                                                  children: [
                                                    /* @__PURE__ */ (0,
                                                    import_jsx_runtime.jsx)(
                                                      AlertDialogCancel,
                                                      { children: 'Cancel' }
                                                    ),
                                                    /* @__PURE__ */ (0,
                                                    import_jsx_runtime.jsx)(
                                                      AlertDialogAction,
                                                      {
                                                        variant: 'destructive',
                                                        onClick: () =>
                                                          handleDeleteCountry(
                                                            country.id
                                                          ),
                                                        children: 'Delete'
                                                      }
                                                    )
                                                  ]
                                                }
                                              )
                                            ]
                                          }
                                        )
                                      ]
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      ChevronRight,
                                      { className: 'h-4 w-4 opacity-50' }
                                    )
                                  ]
                                }
                              )
                            ]
                          },
                          country.id
                        )
                      )
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                className:
                  'flex flex-row items-center justify-between space-y-0',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
                    children: [
                      'Cities ',
                      selectedCountry ? `in ${selectedCountry.name}` : ''
                    ]
                  }),
                  selectedCountry &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                      size: 'sm',
                      onClick: () => setIsCityCreateOpen(true),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                          className: 'mr-2 h-4 w-4'
                        }),
                        'Add City'
                      ]
                    })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                className: 'space-y-2',
                children: !selectedCountry
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      className:
                        'text-muted-foreground py-10 text-center text-sm',
                      children: 'Select a country to manage its cities.'
                    })
                  : isCitiesLoading
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                        className:
                          'text-muted-foreground py-10 text-center text-sm',
                        children: 'Loading cities...'
                      })
                    : cities?.data?.length === 0
                      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          className:
                            'text-muted-foreground py-10 text-center text-sm',
                          children: 'No cities found for this country.'
                        })
                      : cities?.data?.map((city) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            'div',
                            {
                              className:
                                'flex items-center justify-between rounded-lg border p-2',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                  'div',
                                  {
                                    className: 'flex items-center gap-2',
                                    children: [
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)(MapPin, {
                                        className:
                                          'text-muted-foreground h-3 w-3'
                                      }),
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)('span', {
                                        children: city.name
                                      })
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                  'div',
                                  {
                                    className: 'flex items-center gap-1',
                                    children: [
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)(Button, {
                                        variant: 'ghost',
                                        size: 'icon-sm',
                                        onClick: () => setEditingCity(city),
                                        children: /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)(SquarePen, {
                                          className: 'h-3 w-3'
                                        })
                                      }),
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsxs)(AlertDialog$1, {
                                        children: [
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)(
                                            AlertDialogTrigger,
                                            {
                                              asChild: true,
                                              children: /* @__PURE__ */ (0,
                                              import_jsx_runtime.jsx)(Button, {
                                                variant: 'ghost',
                                                size: 'icon-sm',
                                                title: 'Delete city',
                                                children: /* @__PURE__ */ (0,
                                                import_jsx_runtime.jsx)(
                                                  Trash2,
                                                  {
                                                    className:
                                                      'text-destructive h-3 w-3'
                                                  }
                                                )
                                              })
                                            }
                                          ),
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsxs)(
                                            AlertDialogContent,
                                            {
                                              children: [
                                                /* @__PURE__ */ (0,
                                                import_jsx_runtime.jsxs)(
                                                  AlertDialogHeader,
                                                  {
                                                    children: [
                                                      /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsx)(
                                                        AlertDialogTitle,
                                                        {
                                                          children:
                                                            'Delete City'
                                                        }
                                                      ),
                                                      /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsxs)(
                                                        AlertDialogDescription,
                                                        {
                                                          children: [
                                                            'Are you sure you want to delete "',
                                                            city.name,
                                                            '"? This action cannot be undone.'
                                                          ]
                                                        }
                                                      )
                                                    ]
                                                  }
                                                ),
                                                /* @__PURE__ */ (0,
                                                import_jsx_runtime.jsxs)(
                                                  AlertDialogFooter,
                                                  {
                                                    children: [
                                                      /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsx)(
                                                        AlertDialogCancel,
                                                        { children: 'Cancel' }
                                                      ),
                                                      /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsx)(
                                                        AlertDialogAction,
                                                        {
                                                          variant:
                                                            'destructive',
                                                          onClick: () =>
                                                            handleDeleteCity(
                                                              city.countryId,
                                                              city.id
                                                            ),
                                                          children: 'Delete'
                                                        }
                                                      )
                                                    ]
                                                  }
                                                )
                                              ]
                                            }
                                          )
                                        ]
                                      })
                                    ]
                                  }
                                )
                              ]
                            },
                            city.id
                          )
                        )
              })
            ]
          })
        ]
      }),
      isCountryCreateOpen &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryForm, {
          title: 'Add Country',
          onSubmit: (data) =>
            createCountryMutation.mutate(data, {
              onSuccess: () => {
                setIsCountryCreateOpen(false)
                toast.success('Country created')
              },
              onError: (error) =>
                showMutationError(error, 'Failed to create country')
            }),
          onCancel: () => setIsCountryCreateOpen(false),
          isLoading: createCountryMutation.isPending
        }),
      editingCountry &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryForm, {
          title: 'Edit Country',
          initialData: editingCountry,
          onSubmit: (values) => {
            const data = toCountryUpdateRequest(editingCountry, values)
            if (Object.keys(data).length === 0) {
              setEditingCountry(null)
              return
            }
            updateCountryMutation.mutate(
              {
                countryId: editingCountry.id,
                ...data
              },
              {
                onSuccess: (_country) => {
                  setEditingCountry(null)
                  toast.success('Country updated')
                },
                onError: (error) =>
                  showMutationError(error, 'Failed to update country')
              }
            )
          },
          onCancel: () => setEditingCountry(null),
          isLoading: updateCountryMutation.isPending
        }),
      isCityCreateOpen &&
        selectedCountry &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityForm, {
          title: `Add City to ${selectedCountry.name}`,
          onSubmit: (data) => {
            if (!selectedCountry) return
            createCityMutation.mutate(
              {
                countryId: selectedCountry.id,
                ...data
              },
              {
                onSuccess: () => {
                  setIsCityCreateOpen(false)
                  toast.success('City created')
                },
                onError: (error) =>
                  showMutationError(error, 'Failed to create city')
              }
            )
          },
          onCancel: () => setIsCityCreateOpen(false),
          isLoading: createCityMutation.isPending
        }),
      editingCity &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityForm, {
          title: 'Edit City',
          initialData: editingCity,
          onSubmit: (data) => {
            if (!selectedCountry) return
            updateCityMutation.mutate(
              {
                countryId: selectedCountry.id,
                cityId: editingCity.id,
                ...data
              },
              {
                onSuccess: () => {
                  setEditingCity(null)
                  toast.success('City updated')
                },
                onError: (error) =>
                  showMutationError(error, 'Failed to update city')
              }
            )
          },
          onCancel: () => setEditingCity(null),
          isLoading: updateCityMutation.isPending
        })
    ]
  })
}
var SplitComponent = AdminLocationsPage
//#endregion
export { SplitComponent as component }
