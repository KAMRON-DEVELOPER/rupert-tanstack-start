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
  A as Check,
  l as Pencil,
  n as Trash2,
  s as Plus,
  t as X
} from '../_libs/lucide-react.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Input } from './input-BAnSrTfB.mjs'
import { t as isAxiosError } from '../_libs/axios+[...].mjs'
import { t as zod_default } from '../_libs/zod.mjs'
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
import { t as useGetSkillsQueryOptions } from './skills-CR1xJB9f.mjs'
import {
  a as skillResponseSchema,
  i as skillRequestSchema
} from './skill-WC7CHsIh.mjs'
import { t as Badge } from './badge-CcIqhcdB.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/admin.skills-BuPJkJdX.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var createSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillRequestSchema)
  .handler(
    createSsrRpc(
      'e7d9491a74adc2cab9ef1ed5aec7254bbb6347f3be0f354392e504ef028ca826'
    )
  )
var updateSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillRequestSchema.extend({ skillId: zod_default.uuid() }))
  .handler(
    createSsrRpc(
      '4f167d949175e8d0767305f0bf25c7c99bb55dd33a68134272c1dc7ccc5c8530'
    )
  )
var deleteSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(zod_default.object({ skillId: zod_default.uuid() }))
  .handler(
    createSsrRpc(
      '0654a4dc85021aa78dde4baf518b85fa2858b512dd92903674d94b738617f541'
    )
  )
var useCreateSkillMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    }
  })
}
var useUpdateSkillMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    }
  })
}
var useDeleteSkillMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => deleteSkillFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    }
  })
}
var isEditableSkill = (skill) => skillResponseSchema.safeParse(skill).success
function SkillList({ skills, onRename, onDelete }) {
  const [editingId, setEditingId] = (0, import_react.useState)(null)
  const [editValue, setEditValue] = (0, import_react.useState)('')
  const startRename = (skill) => {
    setEditingId(skill.id)
    setEditValue(skill.name)
  }
  const cancelRename = () => {
    setEditingId(null)
    setEditValue('')
  }
  const submitRename = (skill) => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== skill.name) onRename(skill, trimmed)
    setEditingId(null)
    setEditValue('')
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'flex flex-wrap gap-2',
    children: skills.map((skill) => {
      const canEdit = isEditableSkill(skill)
      if (canEdit && editingId === skill.id)
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          'div',
          {
            className: 'flex items-center gap-1',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                value: editValue,
                onChange: (e) => setEditValue(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === 'Enter') submitRename(skill)
                  if (e.key === 'Escape') cancelRename()
                },
                autoFocus: true,
                className: 'h-6 w-32 text-xs'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                variant: 'ghost',
                size: 'icon-sm',
                onClick: () => submitRename(skill),
                disabled: !editValue.trim(),
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
                  className: 'h-3 w-3 text-green-600'
                })
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                variant: 'ghost',
                size: 'icon-sm',
                onClick: cancelRename,
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
                  className: 'h-3 w-3'
                })
              })
            ]
          },
          skill.name
        )
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        Badge,
        {
          variant: 'secondary',
          className: 'group flex items-center gap-1.5 px-2.5 py-1 text-sm',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
              children: skill.name
            }),
            canEdit &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                import_jsx_runtime.Fragment,
                {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('button', {
                      onClick: () => startRename(skill),
                      className:
                        'hover:text-foreground ml-0.5 opacity-0 transition-opacity group-hover:opacity-100',
                      title: 'Rename skill',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        Pencil,
                        { className: 'h-3 w-3' }
                      )
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      AlertDialog$1,
                      {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            AlertDialogTrigger,
                            {
                              asChild: true,
                              children: /* @__PURE__ */ (0,
                              import_jsx_runtime.jsx)('button', {
                                className:
                                  'hover:text-destructive ml-0.5 opacity-0 transition-opacity group-hover:opacity-100',
                                title: 'Delete skill',
                                children: /* @__PURE__ */ (0,
                                import_jsx_runtime.jsx)(Trash2, {
                                  className: 'h-3 w-3'
                                })
                              })
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            AlertDialogContent,
                            {
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                  AlertDialogHeader,
                                  {
                                    children: [
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)(
                                        AlertDialogTitle,
                                        { children: 'Delete Skill' }
                                      ),
                                      /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsxs)(
                                        AlertDialogDescription,
                                        {
                                          children: [
                                            'Are you sure you want to delete "',
                                            skill.name,
                                            '"? This action cannot be undone.'
                                          ]
                                        }
                                      )
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
                                          onClick: () => onDelete(skill),
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
                      }
                    )
                  ]
                }
              )
          ]
        },
        skill.name
      )
    })
  })
}
function SkillForm({ initialData, onSubmit, onCancel, isLoading, title }) {
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
                  children: 'Skill Name'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  id: 'name',
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: 'e.g. React, TypeScript',
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
var showMutationError = (error, fallback) => {
  const message = isAxiosError(error)
    ? getErrorMessage(error.response?.data, fallback)
    : fallback
  toast.error(message)
}
function AdminSkillsPage() {
  const [isCreateOpen, setIsCreateOpen] = (0, import_react.useState)(false)
  const { data: skills, isLoading } = useQuery(useGetSkillsQueryOptions())
  const createSkillMutation = useCreateSkillMutation()
  const updateSkillMutation = useUpdateSkillMutation()
  const deleteSkillMutation = useDeleteSkillMutation()
  const handleCreate = (data) => {
    createSkillMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateOpen(false)
        toast.success('Skill created')
      },
      onError: (error) => showMutationError(error, 'Failed to create skill')
    })
  }
  const handleRename = (skill, newName) => {
    updateSkillMutation.mutate(
      {
        skillId: skill.id,
        name: newName
      },
      {
        onSuccess: () => {
          toast.success('Skill renamed')
        },
        onError: (error) => showMutationError(error, 'Failed to rename skill')
      }
    )
  }
  const handleDelete = (skill) => {
    deleteSkillMutation.mutate(
      { skillId: skill.id },
      {
        onSuccess: () => {
          toast.success('Skill deleted')
        },
        onError: (error) => showMutationError(error, 'Failed to delete skill')
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
                children: 'Skills'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className: 'text-muted-foreground',
                children: 'Manage platform skills.'
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            onClick: () => setIsCreateOpen(true),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                className: 'mr-2 h-4 w-4'
              }),
              'Add Skill'
            ]
          })
        ]
      }),
      isLoading
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'text-muted-foreground py-10 text-center text-sm',
            children: 'Loading skills...'
          })
        : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillList, {
            skills: skills?.data || [],
            onRename: handleRename,
            onDelete: handleDelete
          }),
      isCreateOpen &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillForm, {
          title: 'Add New Skill',
          onSubmit: handleCreate,
          onCancel: () => setIsCreateOpen(false),
          isLoading: createSkillMutation.isPending
        })
    ]
  })
}
var SplitComponent = AdminSkillsPage
//#endregion
export { SplitComponent as component }
