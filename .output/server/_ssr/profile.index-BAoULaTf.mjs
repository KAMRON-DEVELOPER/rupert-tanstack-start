import { o as __toESM } from '../_runtime.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import { m as useNavigate } from '../_libs/@tanstack/react-router+[...].mjs'
import {
  a as useQuery,
  i as useSuspenseQuery
} from '../_libs/tanstack__react-query.mjs'
import {
  c as Phone,
  g as Mail,
  h as MapPin,
  l as Pencil,
  n as Trash2,
  s as Plus,
  x as FileText
} from '../_libs/lucide-react.mjs'
import { r as SiGithub } from '../_libs/icons-pack__react-simple-icons.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Input } from './input-BAnSrTfB.mjs'
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
  r as DialogDescription,
  t as Dialog$1
} from './dialog-CaHgSF1L.mjs'
import { t as getErrorMessage } from './helper-CcD2XA6A.mjs'
import { n as toast } from '../_libs/sonner.mjs'
import {
  d as ProficiencyLevelList,
  p as SpecializationList
} from './literals-DmvvSYvr.mjs'
import { t as Badge } from './badge-CcIqhcdB.mjs'
import { r as useLogoutMutation } from './auth-D06X9tzE.mjs'
import {
  i as useUpdateProfileMutation,
  n as useGetProfileQueryOptions,
  t as useDeleteProfileMutation
} from './users-D-YVzfI_.mjs'
import {
  a as useGetFollowRequestsQueryOptions,
  c as useGetSessionsQueryOptions,
  d as useRevokeSessionMutation,
  f as useRevokeSessionsMutation,
  h as useUpdateWorkExperienceMutation,
  i as useDeleteWorkExperienceMutation,
  l as useGetUserSkillsQueryOptions,
  m as useUpdateUserSkillMutation,
  n as useCreateWorkExperienceMutation,
  o as useGetFollowersQueryOptions,
  p as useUpdateFollowRequestMutation,
  r as useDeleteUserSkillMutation,
  s as useGetFollowingQueryOptions,
  t as useAddUserSkillMutation,
  u as useGetWorkExperiencesQueryOptions
} from './work-experience-CA1o8zio.mjs'
import {
  i as useUpdateResumeMutation,
  n as useDeleteResumeMutation,
  r as useGetResumesQueryOptions,
  t as useCreateResumeMutation
} from './resume-DMYamUQJ.mjs'
import {
  n as AvatarFallback,
  r as AvatarImage,
  t as Avatar$1
} from './avatar-CGkcZU_Y.mjs'
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
//#region node_modules/.nitro/vite/services/ssr/assets/profile.index-BAoULaTf.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var ProfileEditDialog = ({ user, open, onOpenChange }) => {
  const [formData, setFormData] = (0, import_react.useState)({
    firstName: user.firstName,
    lastName: user.lastName,
    headline: user.headline,
    birthdate: user.birthdate,
    bio: user.bio,
    specialization: user.specialization,
    phoneNumber: user.phoneNumber,
    githubUrl: user.githubUrl,
    telegramUsername: user.telegramUsername,
    followPolicy: user.followPolicy,
    jobSearchStatus: user.jobSearchStatus,
    countryId: user.country?.id ?? '',
    cityId: user.city?.id ?? ''
  })
  const updateMutation = useUpdateProfileMutation()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        headline: formData.headline,
        birthdate: formData.birthdate,
        bio: formData.bio,
        specialization: formData.specialization,
        phoneNumber: formData.phoneNumber,
        githubUrl: formData.githubUrl,
        telegramUsername: formData.telegramUsername,
        followPolicy: formData.followPolicy,
        jobSearchStatus: formData.jobSearchStatus,
        countryId: formData.countryId || void 0,
        cityId: formData.cityId || void 0
      }
      await updateMutation.mutateAsync(payload)
      toast.success('Profile updated successfully')
      onOpenChange(false)
    } catch {
      toast.error('Failed to update profile')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      className: 'sm:max-w-131.25',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
              children: 'Edit Profile'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
              children:
                "Make changes to your profile here. Click save when you're done."
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
          onSubmit: handleSubmit,
          className: 'space-y-4 py-4',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'grid grid-cols-2 gap-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'firstName',
                      children: 'First name'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'firstName',
                      name: 'firstName',
                      value: formData.firstName ?? '',
                      onChange: handleChange,
                      required: true
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'lastName',
                      children: 'Last name'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'lastName',
                      name: 'lastName',
                      value: formData.lastName || '',
                      onChange: handleChange
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'space-y-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                  htmlFor: 'headline',
                  children: 'Headline'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  id: 'headline',
                  name: 'headline',
                  value: formData.headline || '',
                  onChange: handleChange,
                  placeholder: 'e.g. Senior Software Engineer'
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'space-y-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                  htmlFor: 'bio',
                  children: 'Bio'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                  id: 'bio',
                  name: 'bio',
                  value: formData.bio || '',
                  onChange: handleChange,
                  placeholder: 'Tell us about yourself',
                  rows: 4
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'grid grid-cols-2 gap-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'countryId',
                      children: 'Country ID'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'countryId',
                      name: 'countryId',
                      value: formData.countryId,
                      onChange: handleChange
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'cityId',
                      children: 'City ID'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'cityId',
                      name: 'cityId',
                      value: formData.cityId,
                      onChange: handleChange
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                type: 'submit',
                disabled: updateMutation.isPending,
                children: updateMutation.isPending
                  ? 'Saving...'
                  : 'Save changes'
              })
            })
          ]
        })
      ]
    })
  })
}
var ProfileHeader = ({ user }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = (0, import_react.useState)(
    false
  )
  const location = locationLabel(user.country, user.city)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    className: 'overflow-hidden border-none shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'from-primary/20 to-primary/10 relative h-32 bg-linear-to-r',
        children:
          user.bannerUrl &&
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('img', {
            src: user.bannerUrl,
            alt: 'Banner',
            className: 'h-full w-full object-cover'
          })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'px-6 pb-6',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'relative -mt-12 mb-4 flex items-end justify-between',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
                className:
                  'border-primary-foreground size-24 border-4 shadow-md',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
                    src: user.avatarUrl ?? void 0,
                    alt: user.firstName
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
                    className: 'text-2xl',
                    children: [user.firstName[0], user.lastName?.[0]]
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                variant: 'outline',
                size: 'sm',
                onClick: () => setIsEditDialogOpen(true),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
                    className: 'mr-2 size-4'
                  }),
                  'Edit Profile'
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'space-y-1',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('h1', {
                className: 'text-2xl font-bold',
                children: [user.firstName, ' ', user.lastName]
              }),
              user.headline &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  className: 'text-muted-foreground text-lg',
                  children: user.headline
                }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className:
                  'text-muted-foreground mt-3 flex flex-wrap gap-4 text-sm',
                children: [
                  location &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      className: 'flex items-center gap-1',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
                          className: 'size-4'
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                          children: location
                        })
                      ]
                    }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'flex gap-4',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            'strong',
                            {
                              className: 'text-foreground',
                              children: user.followersCount
                            }
                          ),
                          ' followers'
                        ]
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            'strong',
                            {
                              className: 'text-foreground',
                              children: user.followingsCount
                            }
                          ),
                          ' following'
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditDialog, {
        user,
        open: isEditDialogOpen,
        onOpenChange: setIsEditDialogOpen
      })
    ]
  })
}
var ProfileAbout = ({ bio }) => {
  if (!bio) return null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    className: 'border-none shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
          className: 'text-xl',
          children: 'About'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
          className:
            'text-muted-foreground leading-relaxed whitespace-pre-wrap',
          children: bio
        })
      })
    ]
  })
}
var ProfileSkills = ({ user }) => {
  const [isAddOpen, setIsAddOpen] = (0, import_react.useState)(false)
  const [skillId, setSkillId] = (0, import_react.useState)('')
  const [proficiency, setProficiency] = (0, import_react.useState)(
    'intermediate'
  )
  const addSkillMutation = useAddUserSkillMutation()
  const deleteSkillMutation = useDeleteUserSkillMutation()
  const updateSkillMutation = useUpdateUserSkillMutation()
  const { data: userSkills } = useQuery(useGetUserSkillsQueryOptions())
  const skills = userSkills?.data ?? user.skills
  const handleAddSkill = async () => {
    if (!skillId) return
    try {
      await addSkillMutation.mutateAsync({
        skillId,
        proficiency,
        lastUsedAt: void 0
      })
      toast.success('Skill added')
      setSkillId('')
      setIsAddOpen(false)
    } catch {
      toast.error('Failed to add skill')
    }
  }
  const handleDeleteSkill = async (skillLinkId) => {
    try {
      await deleteSkillMutation.mutateAsync(skillLinkId)
      toast.success('Skill removed')
    } catch {
      toast.error('Failed to remove skill')
    }
  }
  const handleUpdateSkill = async (skillLinkId, nextProficiency) => {
    try {
      await updateSkillMutation.mutateAsync({
        skillLinkId,
        proficiency: nextProficiency
      })
      toast.success('Skill updated')
    } catch {
      toast.error('Failed to update skill')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    className: 'border-none shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
        className: 'flex flex-row items-center justify-between pb-2',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
            className: 'text-xl',
            children: 'Skills'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            variant: 'ghost',
            size: 'sm',
            onClick: () => setIsAddOpen(true),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                className: 'mr-1 size-4'
              }),
              'Add Skill'
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
          className: 'flex flex-wrap gap-2',
          children:
            skills.length === 0
              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  className: 'text-muted-foreground text-sm',
                  children: 'No skills added yet.'
                })
              : skills.map((skillLink) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    Badge,
                    {
                      variant: 'secondary',
                      className: 'group flex items-center gap-2 px-3 py-1',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                          children: skillLink.skill.name
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                          value: skillLink.proficiency ?? void 0,
                          onValueChange: (value) =>
                            handleUpdateSkill(skillLink.id, value),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              SelectTrigger,
                              {
                                className:
                                  'h-6 w-30 border-0 px-1 text-[10px] uppercase shadow-none',
                                children: /* @__PURE__ */ (0,
                                import_jsx_runtime.jsx)(SelectValue, {})
                              }
                            ),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              SelectContent,
                              {
                                children: ProficiencyLevelList.map((level) =>
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    SelectItem,
                                    {
                                      value: level,
                                      children: level
                                    },
                                    level
                                  )
                                )
                              }
                            )
                          ]
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('button', {
                          onClick: () => handleDeleteSkill(skillLink.id),
                          className:
                            'hover:text-destructive ml-1 opacity-0 transition-opacity group-hover:opacity-100',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            Trash2,
                            { className: 'size-3' }
                          )
                        })
                      ]
                    },
                    skillLink.id
                  )
                )
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
        open: isAddOpen,
        onOpenChange: setIsAddOpen,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          className: 'sm:max-w-106.25',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                  children: 'Add Skill'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
                  children:
                    'Add a new skill and specify your proficiency level.'
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'space-y-4 py-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'skillId',
                      children: 'Skill ID'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'skillId',
                      value: skillId,
                      onChange: (e) => setSkillId(e.target.value),
                      placeholder: 'Existing skill UUID'
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'proficiency',
                      children: 'Proficiency'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                      value: proficiency,
                      onValueChange: (value) => setProficiency(value),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectTrigger,
                          {
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsx)(SelectValue, {
                              placeholder: 'Select proficiency'
                            })
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectContent,
                          {
                            children: ProficiencyLevelList.map((level) =>
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                SelectItem,
                                {
                                  value: level,
                                  children:
                                    level.charAt(0).toUpperCase() +
                                    level.slice(1)
                                },
                                level
                              )
                            )
                          }
                        )
                      ]
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                onClick: handleAddSkill,
                disabled: addSkillMutation.isPending,
                children: addSkillMutation.isPending ? 'Adding...' : 'Add Skill'
              })
            })
          ]
        })
      })
    ]
  })
}
var ProfileResumes = ({ user }) => {
  const [isAddOpen, setIsAddOpen] = (0, import_react.useState)(false)
  const [editingResumeId, setEditingResumeId] = (0, import_react.useState)(null)
  const [newResume, setNewResume] = (0, import_react.useState)({
    title: '',
    specialization: 'fullstack',
    countryId: user.country?.id ?? '',
    cityId: user.city?.id ?? ''
  })
  const createResumeMutation = useCreateResumeMutation()
  const updateResumeMutation = useUpdateResumeMutation()
  const deleteResumeMutation = useDeleteResumeMutation()
  const { data: resumesData } = useSuspenseQuery(useGetResumesQueryOptions())
  const resumes = resumesData.data
  const editingResume = resumes.find((resume) => resume.id === editingResumeId)
  const handleAddResume = async () => {
    if (!newResume.title || !newResume.specialization) return
    const resumeToAdd = {
      title: newResume.title,
      specialization: newResume.specialization,
      countryId: newResume.countryId,
      cityId: newResume.cityId
    }
    try {
      await createResumeMutation.mutateAsync(resumeToAdd)
      toast.success('Resume added')
      setIsAddOpen(false)
      setNewResume({
        title: '',
        specialization: 'fullstack',
        countryId: user.country?.id ?? '',
        cityId: user.city?.id ?? ''
      })
    } catch {
      toast.error('Failed to add resume')
    }
  }
  const handleDeleteResume = async (resumeId) => {
    try {
      await deleteResumeMutation.mutateAsync(resumeId)
      toast.success('Resume removed')
    } catch {
      toast.error('Failed to remove resume')
    }
  }
  const handleUpdateResume = async () => {
    if (!editingResumeId || !newResume.title || !newResume.specialization)
      return
    try {
      await updateResumeMutation.mutateAsync({
        resumeId: editingResumeId,
        data: {
          title: newResume.title,
          summary: newResume.summary ?? void 0,
          specialization: newResume.specialization,
          countryId: newResume.countryId,
          cityId: newResume.cityId || void 0
        }
      })
      toast.success('Resume updated')
      setEditingResumeId(null)
      setIsAddOpen(false)
    } catch {
      toast.error('Failed to update resume')
    }
  }
  const openEdit = (resume) => {
    setEditingResumeId(resume.id)
    setNewResume({
      title: resume.title,
      summary: resume.summary ?? '',
      specialization: resume.specialization,
      countryId: resume.country.id,
      cityId: resume.city?.id ?? ''
    })
    setIsAddOpen(true)
  }
  const openCreate = () => {
    setEditingResumeId(null)
    setNewResume({
      title: '',
      specialization: 'fullstack',
      countryId: user.country?.id ?? '',
      cityId: user.city?.id ?? ''
    })
    setIsAddOpen(true)
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    className: 'border-none shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
        className: 'flex flex-row items-center justify-between pb-2',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
            className: 'text-xl',
            children: 'Resumes'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            variant: 'ghost',
            size: 'sm',
            onClick: openCreate,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                className: 'mr-1 size-4'
              }),
              'Add Resume'
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
          className: 'space-y-4',
          children:
            resumes.length === 0
              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  className: 'text-muted-foreground text-sm',
                  children: 'No resumes added yet.'
                })
              : resumes.map((resume) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    'div',
                    {
                      className:
                        'group hover:border-primary flex items-center justify-between rounded-lg border p-3 transition-colors',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                              className: 'bg-primary/10 rounded-lg p-2',
                              children: /* @__PURE__ */ (0,
                              import_jsx_runtime.jsx)(FileText, {
                                className: 'text-primary size-5'
                              })
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                              'div',
                              {
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    'h4',
                                    {
                                      className: 'font-medium',
                                      children: resume.title
                                    }
                                  ),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    'p',
                                    {
                                      className:
                                        'text-muted-foreground text-xs',
                                      children: [
                                        resume.specialization,
                                        ' • ',
                                        locationLabel(
                                          resume.country,
                                          resume.city
                                        )
                                      ]
                                    }
                                  )
                                ]
                              }
                            )
                          ]
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          className: 'flex gap-1',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              Button,
                              {
                                variant: 'ghost',
                                size: 'icon-sm',
                                onClick: () => openEdit(resume),
                                className: 'text-muted-foreground',
                                children: /* @__PURE__ */ (0,
                                import_jsx_runtime.jsx)(Pencil, {
                                  className: 'size-4'
                                })
                              }
                            ),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              Button,
                              {
                                variant: 'ghost',
                                size: 'icon-sm',
                                onClick: () => handleDeleteResume(resume.id),
                                className:
                                  'text-muted-foreground hover:text-destructive',
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
                    resume.id
                  )
                )
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
        open: isAddOpen,
        onOpenChange: setIsAddOpen,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          className: 'sm:max-w-106.25',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                  children: editingResume ? 'Edit Resume' : 'Add Resume'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
                  children:
                    'Create a new resume profile. You can add more details later.'
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'space-y-4 py-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'title',
                      children: 'Resume Title'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'title',
                      value: newResume.title,
                      onChange: (e) =>
                        setNewResume((prev) => ({
                          ...prev,
                          title: e.target.value
                        })),
                      placeholder: 'e.g. Senior Frontend Developer'
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'summary',
                      children: 'Summary'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'summary',
                      value: newResume.summary ?? '',
                      onChange: (e) =>
                        setNewResume((prev) => ({
                          ...prev,
                          summary: e.target.value
                        }))
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'specialization',
                      children: 'Specialization'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                      value: newResume.specialization,
                      onValueChange: (value) =>
                        setNewResume((prev) => ({
                          ...prev,
                          specialization: value
                        })),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectTrigger,
                          {
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsx)(SelectValue, {
                              placeholder: 'Select specialization'
                            })
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectContent,
                          {
                            children: SpecializationList.map((spec) =>
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                SelectItem,
                                {
                                  value: spec,
                                  children:
                                    spec
                                      .replace(/_/g, ' ')
                                      .charAt(0)
                                      .toUpperCase() +
                                    spec.replace(/_/g, ' ').slice(1)
                                },
                                spec
                              )
                            )
                          }
                        )
                      ]
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'grid grid-cols-2 gap-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                          htmlFor: 'resume-country',
                          children: 'Country ID'
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          id: 'resume-country',
                          value: newResume.countryId,
                          onChange: (e) =>
                            setNewResume((prev) => ({
                              ...prev,
                              countryId: e.target.value
                            }))
                        })
                      ]
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                          htmlFor: 'resume-city',
                          children: 'City ID'
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          id: 'resume-city',
                          value: newResume.cityId,
                          onChange: (e) =>
                            setNewResume((prev) => ({
                              ...prev,
                              cityId: e.target.value
                            }))
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                onClick: editingResume ? handleUpdateResume : handleAddResume,
                disabled:
                  createResumeMutation.isPending ||
                  updateResumeMutation.isPending,
                children: editingResume
                  ? updateResumeMutation.isPending
                    ? 'Saving...'
                    : 'Save Resume'
                  : createResumeMutation.isPending
                    ? 'Adding...'
                    : 'Add Resume'
              })
            })
          ]
        })
      })
    ]
  })
}
var ProfileSidebar = ({ user }) => {
  const links = [
    {
      icon: Mail,
      label: 'Email',
      value: user.email,
      href: `mailto:${user.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: user.phoneNumber,
      href: user.phoneNumber ? `tel:${user.phoneNumber}` : void 0
    },
    {
      icon: SiGithub,
      label: 'GitHub',
      value: user.githubUrl?.replace('https://github.com/', ''),
      href: user.githubUrl
    }
  ]
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-6',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
        className: 'border-none shadow-sm',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
              className: 'text-xl',
              children: 'Contact Information'
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
            className: 'space-y-4',
            children: links.map((link) => {
              if (!link.value && !link.href) return null
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                'div',
                {
                  className: 'flex items-center gap-3',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      className: 'bg-muted rounded-lg p-2',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        link.icon,
                        { className: 'text-muted-foreground size-4' }
                      )
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      className: 'flex min-w-0 flex-col',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                          className: 'text-muted-foreground text-xs',
                          children: link.label
                        }),
                        link.href
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('a', {
                              href: link.href,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              className:
                                'truncate text-sm font-medium hover:underline',
                              children: link.value || 'Link'
                            })
                          : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              'span',
                              {
                                className: 'truncate text-sm font-medium',
                                children: link.value || 'Not provided'
                              }
                            )
                      ]
                    })
                  ]
                },
                link.label
              )
            })
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
        className: 'border-none shadow-sm',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
              className: 'text-xl',
              children: 'Additional Info'
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
            className: 'space-y-4',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex flex-col',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'text-muted-foreground text-xs',
                    children: 'Specialization'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'text-sm font-medium capitalize',
                    children:
                      user.specialization?.replace(/_/g, ' ') || 'Not specified'
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex flex-col',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'text-muted-foreground text-xs',
                    children: 'Job Search Status'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'text-sm font-medium capitalize',
                    children: user.jobSearchStatus.replace(/_/g, ' ')
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex flex-col',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'text-muted-foreground text-xs',
                    children: 'Member Since'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'text-sm font-medium',
                    children: new Date(user.createdAt).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        year: 'numeric'
                      }
                    )
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
var ProfileSessions = () => {
  const {
    data: sessions,
    isPending,
    isError
  } = useQuery(useGetSessionsQueryOptions())
  const revokeSession = useRevokeSessionMutation()
  const revokeSessions = useRevokeSessionsMutation()
  const revokeOne = async (sessionId) => {
    try {
      await revokeSession.mutateAsync(sessionId)
      toast.success('Session revoked')
    } catch {
      toast.error('Failed to revoke session')
    }
  }
  const revokeAll = async () => {
    try {
      await revokeSessions.mutateAsync({ include_current: false })
      toast.success('Other sessions revoked')
    } catch {
      toast.error('Failed to revoke sessions')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    className: 'border-none shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
        className: 'flex flex-row items-center justify-between',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
            className: 'text-xl',
            children: 'Sessions'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            variant: 'outline',
            size: 'sm',
            onClick: revokeAll,
            disabled: revokeSessions.isPending,
            children: 'Revoke others'
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-3',
        children: [
          isPending &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground text-sm',
              children: 'Loading sessions...'
            }),
          isError &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground text-sm',
              children: 'Sessions are not available.'
            }),
          sessions?.length === 0 &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
              title: 'No sessions'
            }),
          sessions?.map((session) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              'div',
              {
                className:
                  'flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                        className: 'font-medium',
                        children: session.deviceName || 'Unknown device'
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                        className: 'text-muted-foreground text-sm',
                        children: [
                          session.ipAddr || 'Unknown IP',
                          ' ·',
                          ' ',
                          new Date(session.lastActivityAt).toLocaleString()
                        ]
                      }),
                      session.isActive &&
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          className: 'text-muted-foreground text-xs',
                          children: 'Current active session'
                        })
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                    variant: 'outline',
                    size: 'sm',
                    onClick: () => revokeOne(session.id),
                    disabled: revokeSession.isPending,
                    children: 'Revoke'
                  })
                ]
              },
              session.id
            )
          )
        ]
      })
    ]
  })
}
var emptyForm = {
  countryId: '',
  cityId: '',
  companyName: '',
  location: '',
  position: '',
  description: '',
  startedAt: '',
  endedAt: ''
}
var ProfileWorkExperiences = () => {
  const {
    data: workExperiences,
    isPending,
    isError
  } = useQuery(useGetWorkExperiencesQueryOptions())
  const deleteWorkExperience = useDeleteWorkExperienceMutation()
  const [editing, setEditing] = (0, import_react.useState)(null)
  const [formOpen, setFormOpen] = (0, import_react.useState)(false)
  const remove = async (workExperienceId) => {
    try {
      await deleteWorkExperience.mutateAsync(workExperienceId)
      toast.success('Work experience deleted')
    } catch {
      toast.error('Failed to delete work experience')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    className: 'border-none shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
        className: 'flex flex-row items-center justify-between',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
            className: 'text-xl',
            children: 'Work Experience'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            variant: 'ghost',
            size: 'sm',
            onClick: () => {
              setEditing(null)
              setFormOpen(true)
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                className: 'size-4'
              }),
              'Add'
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-3',
        children: [
          isPending &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground text-sm',
              children: 'Loading...'
            }),
          isError &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground text-sm',
              children: 'Work experiences are not available.'
            }),
          workExperiences?.length === 0 &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
              title: 'No work experience'
            }),
          workExperiences?.map((item) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              'div',
              {
                className: 'rounded-lg border p-3',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'flex items-start justify-between gap-3',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            className: 'font-medium',
                            children: item.position
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                            className: 'text-muted-foreground text-sm',
                            children: [
                              item.companyName,
                              item.location ? ` · ${item.location}` : ''
                            ]
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                            className: 'text-muted-foreground text-xs',
                            children: [
                              item.startedAt,
                              ' - ',
                              item.isCurrent
                                ? 'Current'
                                : item.endedAt || 'Unknown'
                            ]
                          })
                        ]
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        className: 'flex gap-1',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                            variant: 'ghost',
                            size: 'icon-sm',
                            onClick: () => {
                              setEditing(item)
                              setFormOpen(true)
                            },
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsx)(Pencil, {
                              className: 'size-4'
                            })
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                            variant: 'ghost',
                            size: 'icon-sm',
                            onClick: () => remove(item.id),
                            disabled: deleteWorkExperience.isPending,
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsx)(Trash2, {
                              className: 'size-4'
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  item.description &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                      className:
                        'text-muted-foreground mt-2 text-sm whitespace-pre-wrap',
                      children: item.description
                    })
                ]
              },
              item.id
            )
          )
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkExperienceForm, {
        workExperience: editing,
        open: formOpen,
        onOpenChange: setFormOpen
      })
    ]
  })
}
var WorkExperienceForm = ({ workExperience, open, onOpenChange }) => {
  const createWorkExperience = useCreateWorkExperienceMutation()
  const updateWorkExperience = useUpdateWorkExperienceMutation()
  const [error, setError] = (0, import_react.useState)(null)
  const [isCurrent, setIsCurrent] = (0, import_react.useState)(
    workExperience?.isCurrent ?? false
  )
  const [form, setForm] = (0, import_react.useState)(
    workExperience
      ? {
          countryId: '',
          cityId: '',
          companyName: workExperience.companyName,
          location: workExperience.location ?? '',
          position: workExperience.position,
          description: workExperience.description ?? '',
          startedAt: workExperience.startedAt,
          endedAt: workExperience.endedAt ?? ''
        }
      : emptyForm
  )
  ;(0, import_react.useEffect)(() => {
    setIsCurrent(workExperience?.isCurrent ?? false)
    setForm(
      workExperience
        ? {
            countryId: '',
            cityId: '',
            companyName: workExperience.companyName,
            location: workExperience.location ?? '',
            position: workExperience.position,
            description: workExperience.description ?? '',
            startedAt: workExperience.startedAt,
            endedAt: workExperience.endedAt ?? ''
          }
        : emptyForm
    )
  }, [workExperience])
  const updateField = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value
    }))
  const submit = async (event) => {
    event.preventDefault()
    setError(null)
    const companyName = form.companyName.trim()
    const position = form.position.trim()
    const startedAt = form.startedAt.trim()
    const countryId = form.countryId.trim()
    if (!workExperience && !countryId) {
      setError('Country ID is required')
      return
    }
    if (!companyName || !position || !startedAt) {
      setError('Company, position, and start date are required')
      return
    }
    const payload = {
      countryId: countryId || void 0,
      cityId: form.cityId.trim() || void 0,
      companyName,
      location: form.location?.trim() || void 0,
      position,
      description: form.description?.trim() || void 0,
      startedAt,
      endedAt: isCurrent ? void 0 : form.endedAt || void 0
    }
    const createPayload = {
      countryId,
      cityId: form.cityId.trim() || void 0,
      companyName,
      location: form.location.trim() || void 0,
      position,
      description: form.description.trim() || void 0,
      startedAt,
      endedAt: isCurrent ? void 0 : form.endedAt || void 0
    }
    try {
      if (workExperience) {
        await updateWorkExperience.mutateAsync({
          workExperienceId: workExperience.id,
          data: payload
        })
        toast.success('Work experience updated')
      } else {
        await createWorkExperience.mutateAsync(createPayload)
        toast.success('Work experience created')
      }
      onOpenChange(false)
    } catch (err) {
      setError(
        isAxiosError(err)
          ? getErrorMessage(
              err.response?.data,
              'Failed to save work experience'
            )
          : 'Failed to save work experience'
      )
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
            children: workExperience
              ? 'Edit Work Experience'
              : 'Add Work Experience'
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'work-company',
                      children: 'Company'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'work-company',
                      value: form.companyName,
                      onChange: (event) =>
                        updateField('companyName', event.target.value),
                      required: true
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'work-position',
                      children: 'Position'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'work-position',
                      value: form.position,
                      onChange: (event) =>
                        updateField('position', event.target.value),
                      required: true
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'work-location',
                      children: 'Location'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'work-location',
                      value: form.location ?? '',
                      onChange: (event) =>
                        updateField('location', event.target.value)
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'work-country',
                      children: 'Country ID'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'work-country',
                      value: form.countryId,
                      onChange: (event) =>
                        updateField('countryId', event.target.value),
                      required: !workExperience
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'work-city',
                      children: 'City ID'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'work-city',
                      value: form.cityId,
                      onChange: (event) =>
                        updateField('cityId', event.target.value)
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'work-started',
                      children: 'Started at'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'work-started',
                      type: 'date',
                      value: form.startedAt,
                      onChange: (event) =>
                        updateField('startedAt', event.target.value),
                      required: true
                    })
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
                      checked: isCurrent,
                      onCheckedChange: setIsCurrent
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      children: 'Current role'
                    })
                  ]
                }),
                !isCurrent &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                        htmlFor: 'work-ended',
                        children: 'Ended at'
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        id: 'work-ended',
                        type: 'date',
                        value: form.endedAt ?? '',
                        onChange: (event) =>
                          updateField('endedAt', event.target.value)
                      })
                    ]
                  }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className: 'space-y-2 sm:col-span-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
                      htmlFor: 'work-description',
                      children: 'Description'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                      id: 'work-description',
                      value: form.description ?? '',
                      onChange: (event) =>
                        updateField('description', event.target.value)
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
                  isPending:
                    createWorkExperience.isPending ||
                    updateWorkExperience.isPending,
                  children: 'Save'
                })
              ]
            })
          ]
        })
      ]
    })
  })
}
var FollowPerson = ({ user }) => {
  if (!user)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
      children: 'Unknown user'
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
    children: [user.firstName, ' ', user.lastName]
  })
}
var ProfileFollows = () => {
  const followers = useQuery(
    useGetFollowersQueryOptions({
      offset: 0,
      limit: 10
    })
  )
  const following = useQuery(
    useGetFollowingQueryOptions({
      offset: 0,
      limit: 10
    })
  )
  const requests = useQuery(
    useGetFollowRequestsQueryOptions({
      offset: 0,
      limit: 10
    })
  )
  const updateRequest = useUpdateFollowRequestMutation()
  const decide = async (followId, status) => {
    try {
      await updateRequest.mutateAsync({
        followId,
        data: { status }
      })
      toast.success(`Request ${status}`)
    } catch {
      toast.error('Failed to update follow request')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    className: 'border-none shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
          className: 'text-xl',
          children: 'Follows'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-6',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowList, {
            title: 'Followers',
            follows: followers.data?.data ?? [],
            kind: 'followers'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowList, {
            title: 'Following',
            follows: following.data?.data ?? [],
            kind: 'following'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'space-y-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                className: 'font-medium',
                children: 'Follow requests'
              }),
              requests.isPending &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  className: 'text-muted-foreground text-sm',
                  children: 'Loading requests...'
                }),
              requests.data?.data.length === 0 &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
                  title: 'No follow requests'
                }),
              requests.data?.data.map((follow) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  'div',
                  {
                    className:
                      'flex items-center justify-between rounded-lg border p-3 text-sm',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        FollowPerson,
                        { user: follow.follower }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        className: 'flex gap-2',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                            size: 'sm',
                            onClick: () => decide(follow.id, 'accepted'),
                            disabled: updateRequest.isPending,
                            children: 'Accept'
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                            size: 'sm',
                            variant: 'outline',
                            onClick: () => decide(follow.id, 'declined'),
                            disabled: updateRequest.isPending,
                            children: 'Reject'
                          })
                        ]
                      })
                    ]
                  },
                  follow.id
                )
              )
            ]
          })
        ]
      })
    ]
  })
}
var FollowList = ({ title, follows, kind }) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
        className: 'font-medium',
        children: title
      }),
      follows.length === 0
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
            title: `No ${title.toLowerCase()}`
          })
        : follows.map((follow) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              'div',
              {
                className: 'rounded-lg border p-3 text-sm',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  FollowPerson,
                  {
                    user:
                      kind === 'followers' ? follow.follower : follow.following
                  }
                )
              },
              follow.id
            )
          )
    ]
  })
var ProfileAccount = () => {
  const navigate = useNavigate()
  const logout = useLogoutMutation()
  const deleteProfile = useDeleteProfileMutation()
  const handleLogout = async () => {
    try {
      await logout.mutateAsync()
      toast.success('Logged out')
      navigate({
        to: '/auth',
        replace: true
      })
    } catch {
      toast.error('Failed to log out')
    }
  }
  const handleDelete = async () => {
    if (!window.confirm('Delete your profile?')) return
    try {
      await deleteProfile.mutateAsync()
      toast.success('Profile deleted')
      navigate({
        to: '/auth',
        replace: true
      })
    } catch {
      toast.error('Failed to delete profile')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    className: 'border-none shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
          className: 'text-xl',
          children: 'Account'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'flex flex-col gap-2',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            variant: 'outline',
            onClick: handleLogout,
            disabled: logout.isPending,
            children: 'Logout'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            variant: 'destructive',
            onClick: handleDelete,
            disabled: deleteProfile.isPending,
            children: 'Delete profile'
          })
        ]
      })
    ]
  })
}
var ProfilePage = () => {
  const { data: user } = useSuspenseQuery(useGetProfileQueryOptions())
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'bg-muted/30 min-h-screen py-8',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      className: 'container mx-auto max-w-6xl px-4',
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'grid grid-cols-1 gap-8 lg:grid-cols-3',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'space-y-8 lg:col-span-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHeader, {
                user
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileAbout, {
                bio: user.bio
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSkills, {
                user
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileResumes, {
                user
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ProfileWorkExperiences,
                {}
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSessions, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileFollows, {})
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'space-y-8',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSidebar, {
                user
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileAccount, {})
            ]
          })
        ]
      })
    })
  })
}
var SplitComponent = ProfilePage
//#endregion
export { SplitComponent as component }
