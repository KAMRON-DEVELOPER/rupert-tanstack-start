import { o as __toESM } from '../_runtime.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  g as useParams,
  m as useNavigate,
  p as useRouteContext
} from '../_libs/@tanstack/react-router+[...].mjs'
import {
  a as useQuery,
  i as useSuspenseQuery
} from '../_libs/tanstack__react-query.mjs'
import {
  N as Building2,
  c as Phone,
  g as Mail,
  h as MapPin,
  l as Pencil,
  n as Trash2,
  y as Globe
} from '../_libs/lucide-react.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Input } from './input-BAnSrTfB.mjs'
import { t as Separator$1 } from './separator-vCZ5CfjF.mjs'
import {
  i as CardTitle,
  n as CardContent,
  r as CardHeader,
  t as Card
} from './card-Dl6-vnQ9.mjs'
import { t as isAxiosError } from '../_libs/axios+[...].mjs'
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
import { n as toast } from '../_libs/sonner.mjs'
import {
  a as CompanyTypeList,
  r as CompanyMemberRoleList
} from './literals-DmvvSYvr.mjs'
import { t as Badge } from './badge-CcIqhcdB.mjs'
import {
  a as SelectValue,
  i as SelectTrigger,
  n as SelectContent,
  r as SelectItem,
  t as Select$1
} from './select-BXkScN6D.mjs'
import { t as EmptyState } from './EmptyState-Bowh_nnF.mjs'
import { n as locationLabel, t as Textarea } from './textarea-DVlELMeu.mjs'
import { n as SubmitButton, t as FormError } from './SubmitButton-WxfZgJsE.mjs'
import {
  c as useUpdateCompanyMutation,
  i as useDeleteCompanyMutation,
  n as useCreateCompanyMutation,
  o as useGetCompanyQueryOptions,
  r as useDeleteCompanyMemberMutation,
  s as useUpdateCompanyMemberMutation,
  t as useAddCompanyMemberMutation
} from './companies-DOgslJIC.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work.companies._id-BBX0w0Td.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var formatLabel = (value) => value.replace(/_/g, ' ')
var CompanyDetails = ({ company }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className: 'flex items-start justify-between gap-4',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                  className: 'text-xl',
                  children: company.name
                }),
                company.tagline &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-muted-foreground mt-1',
                    children: company.tagline
                  })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
              variant: 'secondary',
              children: formatLabel(company.status)
            })
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-4',
        children: [
          company.description &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground whitespace-pre-wrap',
              children: company.description
            }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'grid gap-3 text-sm sm:grid-cols-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
                    className: 'text-muted-foreground size-4'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    children: formatLabel(company.type)
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
                    className: 'text-muted-foreground size-4'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    children: locationLabel(company.country, company.city)
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
                    className: 'text-muted-foreground size-4'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                    children: [
                      company.openVacanciesCount ?? 0,
                      ' open vacancies'
                    ]
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
                    className: 'text-muted-foreground size-4'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                    children: [
                      company.memberCount ?? company.members.length,
                      ' members'
                    ]
                  })
                ]
              }),
              company.websiteUrl &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('a', {
                  href: company.websiteUrl,
                  target: '_blank',
                  rel: 'noreferrer',
                  className: 'flex items-center gap-2 hover:underline',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
                      className: 'text-muted-foreground size-4'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                      children: company.websiteUrl
                    })
                  ]
                }),
              company.contactEmail &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('a', {
                  href: `mailto:${company.contactEmail}`,
                  className: 'flex items-center gap-2 hover:underline',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
                      className: 'text-muted-foreground size-4'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                      children: company.contactEmail
                    })
                  ]
                }),
              company.contactPhone &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('a', {
                  href: `tel:${company.contactPhone}`,
                  className: 'flex items-center gap-2 hover:underline',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
                      className: 'text-muted-foreground size-4'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                      children: company.contactPhone
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
var emptyToNull = (value) => {
  const trimmed = value.trim()
  return trimmed ? trimmed : void 0
}
var RequiredLabel = ({ htmlFor, children }) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label$1, {
    htmlFor,
    children: [
      children,
      ' ',
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
        className: 'text-destructive',
        children: '*'
      })
    ]
  })
var CompanyForm = ({ company, open, onOpenChange }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const createMutation = useCreateCompanyMutation(api)
  const updateMutation = useUpdateCompanyMutation(api)
  const [error, setError] = (0, import_react.useState)(null)
  const [form, setForm] = (0, import_react.useState)({
    name: company?.name ?? '',
    tagline: company?.tagline ?? '',
    description: company?.description ?? '',
    logoUrl: company?.logoUrl ?? '',
    websiteUrl: company?.websiteUrl ?? '',
    type: company?.type ?? 'startup',
    countryId: company?.country.id ?? '',
    cityId: company?.city?.id ?? '',
    contactEmail: company?.contactEmail ?? '',
    contactPhone: company?.contactPhone ?? ''
  })
  const { data: countriesData } = useQuery(useGetCountriesQueryOptions())
  const { data: citiesData } = useQuery(
    useGetCitiesQueryOptions({ countryId: form.countryId })
  )
  const countries = countriesData?.data ?? []
  const cities = citiesData?.data ?? []
  const isPending = createMutation.isPending || updateMutation.isPending
  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }))
  }
  const handleCountryChange = (countryId) => {
    setForm((prev) => ({
      ...prev,
      countryId,
      cityId: ''
    }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    const payload = {
      ...form,
      name: form.name.trim(),
      countryId: form.countryId.trim(),
      cityId: emptyToNull(form.cityId ?? ''),
      tagline: emptyToNull(form.tagline ?? ''),
      description: emptyToNull(form.description ?? ''),
      logoUrl: emptyToNull(form.logoUrl ?? ''),
      websiteUrl: emptyToNull(form.websiteUrl ?? ''),
      contactEmail: emptyToNull(form.contactEmail ?? ''),
      contactPhone: emptyToNull(form.contactPhone ?? '')
    }
    try {
      if (company) {
        await updateMutation.mutateAsync({
          id: company.id,
          data: payload
        })
        toast.success('Company updated')
      } else {
        await createMutation.mutateAsync(payload)
        toast.success('Company created')
      }
      onOpenChange(false)
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Company save failed')
          : 'Company save failed'
      )
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      className: 'sm:max-w-131.25',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
            children: company ? 'Edit Company' : 'Create Company'
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
          onSubmit: handleSubmit,
          className: 'space-y-4',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormError, {
              message: error
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'grid gap-3 sm:grid-cols-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredLabel, {
                      htmlFor: 'company-name',
                      children: 'Name'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'company-name',
                      value: form.name,
                      onChange: (event) =>
                        updateField('name', event.target.value),
                      required: true
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredLabel, {
                      htmlFor: 'company-type',
                      children: 'Type'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                      value: form.type,
                      onValueChange: (value) => updateField('type', value),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectTrigger,
                          {
                            id: 'company-type',
                            className: 'w-full',
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsx)(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectContent,
                          {
                            children: CompanyTypeList.map((type) =>
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                SelectItem,
                                {
                                  value: type,
                                  children: type.replace(/_/g, ' ')
                                },
                                type
                              )
                            )
                          }
                        )
                      ]
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredLabel, {
                      htmlFor: 'company-country',
                      children: 'Country'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                      value: form.countryId,
                      onValueChange: handleCountryChange,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectTrigger,
                          {
                            id: 'company-country',
                            className: 'w-full',
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsx)(SelectValue, {
                              placeholder: 'Select country'
                            })
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectContent,
                          {
                            children: countries.map((country) =>
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                SelectItem,
                                {
                                  value: country.id,
                                  children: country.name
                                },
                                country.id
                              )
                            )
                          }
                        )
                      ]
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'company-city',
                      children: 'City'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                      value: form.cityId ?? '',
                      onValueChange: (value) => updateField('cityId', value),
                      disabled: !form.countryId,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectTrigger,
                          {
                            id: 'company-city',
                            className: 'w-full',
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsx)(SelectValue, {
                              placeholder: 'Select city'
                            })
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectContent,
                          {
                            children: cities.map((city) =>
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                SelectItem,
                                {
                                  value: city.id,
                                  children: city.name
                                },
                                city.id
                              )
                            )
                          }
                        )
                      ]
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2 sm:col-span-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'company-tagline',
                      children: 'Tagline'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'company-tagline',
                      value: form.tagline ?? '',
                      onChange: (event) =>
                        updateField('tagline', event.target.value)
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2 sm:col-span-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'company-description',
                      children: 'Description'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                      id: 'company-description',
                      value: form.description ?? '',
                      onChange: (event) =>
                        updateField('description', event.target.value),
                      rows: 4
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'company-website',
                      children: 'Website'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'company-website',
                      value: form.websiteUrl ?? '',
                      onChange: (event) =>
                        updateField('websiteUrl', event.target.value)
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'company-logo',
                      children: 'Logo URL'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'company-logo',
                      value: form.logoUrl ?? '',
                      onChange: (event) =>
                        updateField('logoUrl', event.target.value)
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'company-email',
                      children: 'Contact email'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'company-email',
                      type: 'email',
                      value: form.contactEmail ?? '',
                      onChange: (event) =>
                        updateField('contactEmail', event.target.value)
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'company-phone',
                      children: 'Contact phone'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'company-phone',
                      value: form.contactPhone ?? '',
                      onChange: (event) =>
                        updateField('contactPhone', event.target.value)
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  type: 'button',
                  variant: 'outline',
                  onClick: () => onOpenChange(false),
                  children: 'Cancel'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
                  isPending,
                  children: company ? 'Save changes' : 'Create company'
                })
              ]
            })
          ]
        })
      ]
    })
  })
}
var CompanyMembers = ({ company }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const addMember = useAddCompanyMemberMutation(api)
  const updateMember = useUpdateCompanyMemberMutation(api)
  const deleteMember = useDeleteCompanyMemberMutation(api)
  const [userId, setUserId] = (0, import_react.useState)('')
  const [role, setRole] = (0, import_react.useState)('member')
  const [error, setError] = (0, import_react.useState)(null)
  const submitMember = async (event) => {
    event.preventDefault()
    setError(null)
    try {
      await addMember.mutateAsync({
        companyId: company.id,
        data: {
          userId: userId.trim(),
          role
        }
      })
      setUserId('')
      setRole('member')
      toast.success('Member added')
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Failed to add member')
          : 'Failed to add member'
      )
    }
  }
  const changeRole = async (memberId, nextRole) => {
    try {
      await updateMember.mutateAsync({
        companyId: company.id,
        memberId,
        data: { role: nextRole }
      })
      toast.success('Member role updated')
    } catch {
      toast.error('Failed to update member role')
    }
  }
  const removeMember = async (memberId) => {
    try {
      await deleteMember.mutateAsync({
        companyId: company.id,
        memberId
      })
      toast.success('Member removed')
    } catch {
      toast.error('Failed to remove member')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
          children: 'Members'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-4',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
            onSubmit: submitMember,
            className: 'space-y-3 rounded-lg border p-3',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormError, {
                message: error
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'grid gap-3 sm:grid-cols-[1fr_160px_auto]',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                        htmlFor: 'company-member-user',
                        children: 'User ID'
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        id: 'company-member-user',
                        value: userId,
                        onChange: (event) => setUserId(event.target.value),
                        placeholder: 'Existing user UUID',
                        required: true
                      })
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                        children: 'Role'
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                        value: role,
                        onValueChange: (value) => setRole(value),
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            SelectTrigger,
                            {
                              className: 'w-full',
                              children: /* @__PURE__ */ (0,
                              import_jsx_runtime.jsx)(SelectValue, {})
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            SelectContent,
                            {
                              children: CompanyMemberRoleList.map((item) =>
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  SelectItem,
                                  {
                                    value: item,
                                    children: item
                                  },
                                  item
                                )
                              )
                            }
                          )
                        ]
                      })
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                    className: 'flex items-end',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      SubmitButton,
                      {
                        isPending: addMember.isPending,
                        children: 'Add'
                      }
                    )
                  })
                ]
              })
            ]
          }),
          company.members.length === 0
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
                title: 'No members',
                description: 'Add a member by user ID.'
              })
            : /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                className: 'space-y-2',
                children: company.members.map((member) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    'div',
                    {
                      className:
                        'flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                              className: 'font-medium',
                              children: [
                                member.user.firstName,
                                ' ',
                                member.user.lastName
                              ]
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                              className: 'text-muted-foreground text-sm',
                              children: member.user.headline
                            })
                          ]
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                              Select$1,
                              {
                                value: member.role,
                                onValueChange: (value) =>
                                  changeRole(member.id, value),
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    SelectTrigger,
                                    {
                                      className: 'w-36',
                                      children: /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)(SelectValue, {})
                                    }
                                  ),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    SelectContent,
                                    {
                                      children: CompanyMemberRoleList.map(
                                        (item) =>
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)(
                                            SelectItem,
                                            {
                                              value: item,
                                              children: item
                                            },
                                            item
                                          )
                                      )
                                    }
                                  )
                                ]
                              }
                            ),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              Button,
                              {
                                type: 'button',
                                variant: 'ghost',
                                size: 'icon-sm',
                                onClick: () => removeMember(member.id),
                                disabled: deleteMember.isPending,
                                children: /* @__PURE__ */ (0,
                                import_jsx_runtime.jsx)(Trash2, {
                                  className: 'size-4'
                                })
                              }
                            )
                          ]
                        })
                      ]
                    },
                    member.id
                  )
                )
              })
        ]
      })
    ]
  })
}
var CompanyPage = () => {
  const params = useParams({ from: '/(apps)/(work)/work/companies/$id' })
  const navigate = useNavigate()
  const { api } = useRouteContext({ from: '__root__' })
  const { data: company } = useSuspenseQuery(useGetCompanyQueryOptions(params))
  const deleteCompany = useDeleteCompanyMutation(api)
  const [editOpen, setEditOpen] = (0, import_react.useState)(false)
  const handleDelete = async () => {
    if (!window.confirm('Delete this company?')) return
    try {
      await deleteCompany.mutateAsync(company.id)
      toast.success('Company deleted')
      navigate({ to: '/work/companies' })
    } catch {
      toast.error('Failed to delete company')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'col-span-3 space-y-4',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'flex justify-end gap-2',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            variant: 'outline',
            onClick: () => setEditOpen(true),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
                className: 'size-4'
              }),
              'Edit'
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            variant: 'destructive',
            onClick: handleDelete,
            disabled: deleteCompany.isPending,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
                className: 'size-4'
              }),
              'Delete'
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyDetails, { company }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyMembers, { company }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyForm, {
        company,
        open: editOpen,
        onOpenChange: setEditOpen
      })
    ]
  })
}
var SplitComponent = CompanyPage
//#endregion
export { SplitComponent as component }
