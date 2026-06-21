import { o as __toESM } from '../_runtime.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  d as Link,
  g as useParams,
  m as useNavigate,
  p as useRouteContext
} from '../_libs/@tanstack/react-router+[...].mjs'
import {
  a as useQuery,
  i as useSuspenseQuery
} from '../_libs/tanstack__react-query.mjs'
import {
  F as Bookmark,
  I as Banknote,
  N as Building2,
  T as Clock,
  h as MapPin,
  l as Pencil,
  n as Trash2
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
  _ as VacancyStatusList,
  d as ProficiencyLevelList,
  f as SalaryCurrencyList,
  m as SubmissionTypeList,
  o as EmploymentTypeList,
  p as SpecializationList,
  u as PaymentFrequencyList,
  v as WorkFormatList
} from './literals-DmvvSYvr.mjs'
import { t as Badge } from './badge-CcIqhcdB.mjs'
import { r as useGetResumesQueryOptions } from './resume-DMYamUQJ.mjs'
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
import { t as Switch$1 } from './switch-XVX7zzhD.mjs'
import {
  a as useDeleteVacancySkillMutation,
  d as useUnsaveVacancyMutation,
  i as useDeleteVacancyMutation,
  l as useGetVacancyQueryOptions,
  m as useUpdateVacancySkillMutation,
  n as useCreateApplicationMutation,
  p as useUpdateVacancyMutation,
  r as useCreateVacancyMutation,
  s as useGetApplicationsQueryOptions,
  t as useAddVacancySkillMutation,
  u as useSaveVacancyMutation
} from './vacancies-BeZCF-vN.mjs'
import { t as ApplicationCard } from './ApplicationCard-6YWFvyHX.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work.vacancies._id-BE31f9om.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var ApplicationForm = ({ vacancy }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const { data: resumes } = useSuspenseQuery(useGetResumesQueryOptions())
  const createApplication = useCreateApplicationMutation(api)
  const [resumeId, setResumeId] = (0, import_react.useState)('none')
  const [coverLetter, setCoverLetter] = (0, import_react.useState)('')
  const [error, setError] = (0, import_react.useState)(null)
  const submit = async (event) => {
    event.preventDefault()
    setError(null)
    try {
      await createApplication.mutateAsync({
        vacancyId: vacancy.id,
        resumeId: resumeId === 'none' ? void 0 : resumeId,
        coverLetter: coverLetter.trim() || void 0
      })
      toast.success('Application submitted')
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Failed to submit application')
          : 'Failed to submit application'
      )
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
          children: 'Apply'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
        children: vacancy.hasApplied
          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground text-sm',
              children: 'You have already applied to this vacancy.'
            })
          : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
              onSubmit: submit,
              className: 'space-y-3',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormError, {
                  message: error
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      children: 'Resume'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                      value: resumeId,
                      onValueChange: setResumeId,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectTrigger,
                          {
                            className: 'w-full',
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsx)(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          SelectContent,
                          {
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                SelectItem,
                                {
                                  value: 'none',
                                  children: 'No resume'
                                }
                              ),
                              resumes.data.map((resume) =>
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  SelectItem,
                                  {
                                    value: resume.id,
                                    children: resume.title
                                  },
                                  resume.id
                                )
                              )
                            ]
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
                      htmlFor: 'cover-letter',
                      children: 'Cover letter'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                      id: 'cover-letter',
                      value: coverLetter,
                      onChange: (event) => setCoverLetter(event.target.value),
                      rows: 4
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
                  isPending: createApplication.isPending,
                  children: 'Submit application'
                })
              ]
            })
      })
    ]
  })
}
var VacancyApplications = ({ vacancy }) => {
  const { data, isPending, isError } = useQuery(
    useGetApplicationsQueryOptions({
      vacancyId: vacancy.id,
      offset: 0,
      limit: 20
    })
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
          children: 'Applications'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-3',
        children: [
          isPending &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground text-sm',
              children: 'Loading applications...'
            }),
          isError &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground text-sm',
              children: 'Applications are not available for this vacancy.'
            }),
          data &&
            data.data.length === 0 &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
              title: 'No applications'
            }),
          data?.data.map((application) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ApplicationCard,
              { application },
              application.id
            )
          )
        ]
      })
    ]
  })
}
var formatLabel = (value) => value.replace(/_/g, ' ')
var VacancyDetails = ({ vacancy }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className:
            'flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                  className: 'text-xl',
                  children: vacancy.title
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                  to: '/work/companies/$id',
                  params: { id: vacancy.company.id },
                  className:
                    'text-muted-foreground mt-1 inline-flex items-center gap-2 text-sm hover:underline',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
                      className: 'size-4'
                    }),
                    vacancy.company.name
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'flex flex-wrap gap-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                  children: formatLabel(vacancy.status)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                  variant: 'secondary',
                  children: formatLabel(vacancy.submissionType)
                })
              ]
            })
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-4',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            className: 'text-muted-foreground whitespace-pre-wrap',
            children: vacancy.description
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'grid gap-3 text-sm sm:grid-cols-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
                    className: 'text-muted-foreground size-4'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    children: locationLabel(vacancy.country, vacancy.city)
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
                    className: 'text-muted-foreground size-4'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    children: vacancy.workHoursPerWeek
                      ? `${vacancy.workHoursPerWeek} hours/week`
                      : 'Hours not specified'
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
                      formatLabel(vacancy.specialization),
                      ' · ',
                      formatLabel(vacancy.workFormat),
                      ' ·',
                      ' ',
                      formatLabel(vacancy.employmentType)
                    ]
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
                    className: 'text-muted-foreground size-4'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                    children: [
                      vacancy.yearsOfExperienceMin ?? 0,
                      '+ years experience'
                    ]
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, {
                    className: 'text-muted-foreground size-4'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                    children: [
                      vacancy.salaryMin ?? 'Any',
                      ' - ',
                      vacancy.salaryMax ?? 'Any',
                      ' ',
                      vacancy.salaryCurrency ?? '',
                      vacancy.paymentFrequency
                        ? ` / ${formatLabel(vacancy.paymentFrequency)}`
                        : ''
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
                      'Applied: ',
                      vacancy.hasApplied ? 'yes' : 'no',
                      ' · Saved: ',
                      vacancy.isSaved ? 'yes' : 'no'
                    ]
                  })
                ]
              })
            ]
          }),
          vacancy.externalApplyUrl &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('a', {
              href: vacancy.externalApplyUrl,
              target: '_blank',
              rel: 'noreferrer',
              className: 'text-sm hover:underline',
              children: 'External application link'
            })
        ]
      })
    ]
  })
}
var toOptionalString = (value) => {
  const trimmed = value.trim()
  return trimmed ? trimmed : void 0
}
var toOptionalNumber = (value) => {
  if (!value.trim()) return void 0
  return Number(value)
}
var VacancyForm = ({ vacancy, open, onOpenChange }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const createVacancy = useCreateVacancyMutation(api)
  const updateVacancy = useUpdateVacancyMutation(api)
  const [error, setError] = (0, import_react.useState)(null)
  const [companyId, setCompanyId] = (0, import_react.useState)(
    vacancy?.company.id ?? ''
  )
  const [title, setTitle] = (0, import_react.useState)(vacancy?.title ?? '')
  const [description, setDescription] = (0, import_react.useState)(
    vacancy?.description ?? ''
  )
  const [countryId, setCountryId] = (0, import_react.useState)(
    vacancy?.country.id ?? ''
  )
  const [cityId, setCityId] = (0, import_react.useState)(
    vacancy?.city?.id ?? ''
  )
  const [externalApplyUrl, setExternalApplyUrl] = (0, import_react.useState)(
    vacancy?.externalApplyUrl ?? ''
  )
  const [submissionType, setSubmissionType] = (0, import_react.useState)(
    vacancy?.submissionType ?? 'profile'
  )
  const [specialization, setSpecialization] = (0, import_react.useState)(
    vacancy?.specialization ?? 'fullstack'
  )
  const [salaryMin, setSalaryMin] = (0, import_react.useState)(
    vacancy?.salaryMin?.toString() ?? ''
  )
  const [salaryMax, setSalaryMax] = (0, import_react.useState)(
    vacancy?.salaryMax?.toString() ?? ''
  )
  const [salaryCurrency, setSalaryCurrency] = (0, import_react.useState)(
    vacancy?.salaryCurrency ?? 'none'
  )
  const [paymentFrequency, setPaymentFrequency] = (0, import_react.useState)(
    vacancy?.paymentFrequency ?? 'none'
  )
  const [yearsOfExperienceMin, setYearsOfExperienceMin] = (0,
  import_react.useState)(vacancy?.yearsOfExperienceMin?.toString() ?? '')
  const [workFormat, setWorkFormat] = (0, import_react.useState)(
    vacancy?.workFormat ?? 'remote'
  )
  const [workHoursPerWeek, setWorkHoursPerWeek] = (0, import_react.useState)(
    vacancy?.workHoursPerWeek?.toString() ?? ''
  )
  const [employmentType, setEmploymentType] = (0, import_react.useState)(
    vacancy?.employmentType ?? 'full_time'
  )
  const [status, setStatus] = (0, import_react.useState)(
    vacancy?.status ?? 'open'
  )
  const isPending = createVacancy.isPending || updateVacancy.isPending
  const submit = async (event) => {
    event.preventDefault()
    setError(null)
    const payload = {
      title: title.trim(),
      description: description.trim(),
      countryId: countryId.trim(),
      cityId: toOptionalString(cityId),
      externalApplyUrl: toOptionalString(externalApplyUrl),
      submissionType,
      specialization,
      salaryMin: toOptionalNumber(salaryMin),
      salaryMax: toOptionalNumber(salaryMax),
      salaryCurrency: salaryCurrency === 'none' ? void 0 : salaryCurrency,
      paymentFrequency: paymentFrequency === 'none' ? void 0 : paymentFrequency,
      yearsOfExperienceMin: toOptionalNumber(yearsOfExperienceMin),
      workFormat,
      workHoursPerWeek: toOptionalNumber(workHoursPerWeek),
      employmentType,
      status
    }
    try {
      if (vacancy) {
        await updateVacancy.mutateAsync({
          id: vacancy.id,
          data: payload
        })
        toast.success('Vacancy updated')
      } else {
        await createVacancy.mutateAsync({
          companyId: companyId.trim(),
          data: payload
        })
        toast.success('Vacancy created')
      }
      onOpenChange(false)
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Vacancy save failed')
          : 'Vacancy save failed'
      )
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      className: 'sm:max-w-150',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
            children: vacancy ? 'Edit Vacancy' : 'Create Vacancy'
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
          onSubmit: submit,
          className: 'space-y-4',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormError, {
              message: error
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'grid gap-3 sm:grid-cols-2',
              children: [
                !vacancy &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'space-y-2 sm:col-span-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                        htmlFor: 'vacancy-company',
                        children: 'Company ID'
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        id: 'vacancy-company',
                        value: companyId,
                        onChange: (event) => setCompanyId(event.target.value),
                        required: true
                      })
                    ]
                  }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2 sm:col-span-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'vacancy-title',
                      children: 'Title'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'vacancy-title',
                      value: title,
                      onChange: (event) => setTitle(event.target.value),
                      required: true
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2 sm:col-span-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'vacancy-description',
                      children: 'Description'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                      id: 'vacancy-description',
                      value: description,
                      onChange: (event) => setDescription(event.target.value),
                      rows: 5,
                      required: true
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'vacancy-country',
                      children: 'Country ID'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'vacancy-country',
                      value: countryId,
                      onChange: (event) => setCountryId(event.target.value),
                      required: true
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'vacancy-city',
                      children: 'City ID'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'vacancy-city',
                      value: cityId,
                      onChange: (event) => setCityId(event.target.value)
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
                  label: 'Submission',
                  value: submissionType,
                  values: SubmissionTypeList,
                  onValueChange: (value) => setSubmissionType(value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
                  label: 'Specialization',
                  value: specialization,
                  values: SpecializationList,
                  onValueChange: (value) => setSpecialization(value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
                  label: 'Work format',
                  value: workFormat,
                  values: WorkFormatList,
                  onValueChange: (value) => setWorkFormat(value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
                  label: 'Employment',
                  value: employmentType,
                  values: EmploymentTypeList,
                  onValueChange: (value) => setEmploymentType(value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
                  label: 'Status',
                  value: status,
                  values: VacancyStatusList,
                  onValueChange: (value) => setStatus(value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
                  label: 'Salary currency',
                  value: salaryCurrency,
                  values: ['none', ...SalaryCurrencyList],
                  onValueChange: (value) => setSalaryCurrency(value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
                  label: 'Payment frequency',
                  value: paymentFrequency,
                  values: ['none', ...PaymentFrequencyList],
                  onValueChange: (value) => setPaymentFrequency(value)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
                  label: 'Salary min',
                  value: salaryMin,
                  onChange: setSalaryMin
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
                  label: 'Salary max',
                  value: salaryMax,
                  onChange: setSalaryMax
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
                  label: 'Min experience',
                  value: yearsOfExperienceMin,
                  onChange: setYearsOfExperienceMin
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
                  label: 'Hours/week',
                  value: workHoursPerWeek,
                  onChange: setWorkHoursPerWeek
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2 sm:col-span-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'vacancy-external-url',
                      children: 'External apply URL'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'vacancy-external-url',
                      value: externalApplyUrl,
                      onChange: (event) =>
                        setExternalApplyUrl(event.target.value)
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
                  children: vacancy ? 'Save changes' : 'Create vacancy'
                })
              ]
            })
          ]
        })
      ]
    })
  })
}
var SelectField = ({ label, value, values, onValueChange }) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
        value,
        onValueChange,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
            className: 'w-full',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              SelectValue,
              {}
            )
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
            children: values.map((item) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                SelectItem,
                {
                  value: item,
                  children: item.replace(/_/g, ' ')
                },
                item
              )
            )
          })
        ]
      })
    ]
  })
var NumberField = ({ label, value, onChange }) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
        type: 'number',
        min: '0',
        value,
        onChange: (event) => onChange(event.target.value)
      })
    ]
  })
var VacancySkills = ({ vacancy }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const addSkill = useAddVacancySkillMutation(api)
  const updateSkill = useUpdateVacancySkillMutation(api)
  const deleteSkill = useDeleteVacancySkillMutation(api)
  const [skillId, setSkillId] = (0, import_react.useState)('')
  const [proficiency, setProficiency] = (0, import_react.useState)(
    'intermediate'
  )
  const [years, setYears] = (0, import_react.useState)('')
  const [isRequired, setIsRequired] = (0, import_react.useState)(true)
  const [error, setError] = (0, import_react.useState)(null)
  const submit = async (event) => {
    event.preventDefault()
    setError(null)
    try {
      await addSkill.mutateAsync({
        vacancyId: vacancy.id,
        data: {
          skillId: skillId.trim(),
          proficiency,
          yearsOfExperienceMin: years ? Number(years) : void 0,
          isRequired
        }
      })
      setSkillId('')
      setYears('')
      setProficiency('intermediate')
      setIsRequired(true)
      toast.success('Skill added')
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(err.response?.data, 'Failed to add skill')
          : 'Failed to add skill'
      )
    }
  }
  const changeProficiency = async (skillLinkId, nextProficiency) => {
    try {
      await updateSkill.mutateAsync({
        vacancyId: vacancy.id,
        skillLinkId,
        data: { proficiency: nextProficiency }
      })
      toast.success('Skill updated')
    } catch {
      toast.error('Failed to update skill')
    }
  }
  const removeSkill = async (skillLinkId) => {
    try {
      await deleteSkill.mutateAsync({
        vacancyId: vacancy.id,
        skillLinkId
      })
      toast.success('Skill removed')
    } catch {
      toast.error('Failed to remove skill')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
          children: 'Skills'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-4',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
            onSubmit: submit,
            className: 'space-y-3 rounded-lg border p-3',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormError, {
                message: error
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'grid gap-3 sm:grid-cols-[1fr_160px_120px_auto]',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                        htmlFor: 'vacancy-skill-id',
                        children: 'Skill ID'
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        id: 'vacancy-skill-id',
                        value: skillId,
                        onChange: (event) => setSkillId(event.target.value),
                        placeholder: 'Existing skill UUID',
                        required: true
                      })
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                        children: 'Proficiency'
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                        value: proficiency,
                        onValueChange: (value) => setProficiency(value),
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
                              children: ProficiencyLevelList.map((item) =>
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
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                        htmlFor: 'vacancy-skill-years',
                        children: 'Years'
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        id: 'vacancy-skill-years',
                        type: 'number',
                        min: '0',
                        value: years,
                        onChange: (event) => setYears(event.target.value)
                      })
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'flex items-end gap-3',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        className: 'flex h-8 items-center gap-2',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            Switch$1,
                            {
                              checked: isRequired,
                              onCheckedChange: setIsRequired
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                            children: 'Required'
                          })
                        ]
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        SubmitButton,
                        {
                          isPending: addSkill.isPending,
                          children: 'Add'
                        }
                      )
                    ]
                  })
                ]
              })
            ]
          }),
          vacancy.skillLinks.length === 0
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
                title: 'No skills'
              })
            : /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                className: 'space-y-2',
                children: vacancy.skillLinks.map((skillLink) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    'div',
                    {
                      className:
                        'flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                              className: 'font-medium',
                              children: skillLink.skill.name
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                              className: 'text-muted-foreground text-sm',
                              children: [
                                skillLink.isRequired ? 'Required' : 'Optional',
                                ' ·',
                                ' ',
                                skillLink.yearsOfExperienceMin ?? 0,
                                '+ years'
                              ]
                            })
                          ]
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                              Select$1,
                              {
                                value: skillLink.proficiency,
                                onValueChange: (value) =>
                                  changeProficiency(skillLink.id, value),
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
                                      children: ProficiencyLevelList.map(
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
                                onClick: () => removeSkill(skillLink.id),
                                disabled: deleteSkill.isPending,
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
                    skillLink.id
                  )
                )
              })
        ]
      })
    ]
  })
}
var VacancyPage = () => {
  const params = useParams({ from: '/(apps)/(work)/work/vacancies/$id' })
  const navigate = useNavigate()
  const { api } = useRouteContext({ from: '__root__' })
  const { data: vacancy } = useSuspenseQuery(useGetVacancyQueryOptions(params))
  const deleteVacancy = useDeleteVacancyMutation(api)
  const saveVacancy = useSaveVacancyMutation(api)
  const unsaveVacancy = useUnsaveVacancyMutation(api)
  const [editOpen, setEditOpen] = (0, import_react.useState)(false)
  const toggleSaved = async () => {
    try {
      if (vacancy.isSaved) {
        await unsaveVacancy.mutateAsync(vacancy.id)
        toast.success('Vacancy unsaved')
      } else {
        await saveVacancy.mutateAsync(vacancy.id)
        toast.success('Vacancy saved')
      }
    } catch {
      toast.error('Failed to update saved vacancy')
    }
  }
  const handleDelete = async () => {
    if (!window.confirm('Delete this vacancy?')) return
    try {
      await deleteVacancy.mutateAsync(vacancy.id)
      toast.success('Vacancy deleted')
      navigate({ to: '/work/vacancies' })
    } catch {
      toast.error('Failed to delete vacancy')
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
            onClick: toggleSaved,
            disabled: saveVacancy.isPending || unsaveVacancy.isPending,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
                className: 'size-4'
              }),
              vacancy.isSaved ? 'Unsave' : 'Save'
            ]
          }),
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
            disabled: deleteVacancy.isPending,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
                className: 'size-4'
              }),
              'Delete'
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VacancyDetails, { vacancy }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationForm, { vacancy }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VacancySkills, { vacancy }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VacancyApplications, {
        vacancy
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VacancyForm, {
        vacancy,
        open: editOpen,
        onOpenChange: setEditOpen
      })
    ]
  })
}
var SplitComponent = VacancyPage
//#endregion
export { SplitComponent as component }
