import { o as __toESM } from '../_runtime.mjs'
import { t as cva } from '../_libs/class-variance-authority+clsx.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  a as ComboboxValue$1,
  c as ComboboxItem$1,
  d as ComboboxPortal,
  f as ComboboxList$1,
  h as ComboboxTrigger$1,
  i as ComboboxItemIndicator,
  k as require_react,
  l as ComboboxPopup,
  m as ComboboxInput$1,
  n as ComboboxChip$1,
  o as ComboboxRoot,
  p as ComboboxClear$1,
  r as ComboboxChips$1,
  s as ComboboxEmpty$1,
  t as ComboboxChipRemove,
  u as ComboboxPositioner
} from '../_libs/@base-ui/react+[...].mjs'
import { A as Check, k as ChevronDown, t as X } from '../_libs/lucide-react.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Input } from './input-BAnSrTfB.mjs'
import './textarea-DVlELMeu.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/combobox-y4Vg4coy.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'input-group',
    role: 'group',
    className: cn(
      'group/input-group border-input has-disabled:bg-input/50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 relative flex h-8 w-full min-w-0 items-center rounded-lg border transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5',
      className
    ),
    ...props
  })
}
var inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start':
          'order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]',
        'inline-end':
          'order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]',
        'block-start':
          'order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
        'block-end':
          'order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2'
      }
    },
    defaultVariants: { align: 'inline-start' }
  }
)
function InputGroupAddon({ className, align = 'inline-start', ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    role: 'group',
    'data-slot': 'input-group-addon',
    'data-align': align,
    className: cn(inputGroupAddonVariants({ align }), className),
    onClick: (e) => {
      if (e.target.closest('button')) return
      e.currentTarget.parentElement?.querySelector('input')?.focus()
    },
    ...props
  })
}
var inputGroupButtonVariants = cva(
  'flex items-center gap-2 text-sm shadow-none',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: '',
        'icon-xs':
          'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0'
      }
    },
    defaultVariants: { size: 'xs' }
  }
)
function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
    type,
    'data-size': size,
    variant,
    className: cn(inputGroupButtonVariants({ size }), className),
    ...props
  })
}
function InputGroupInput({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
    'data-slot': 'input-group-control',
    className: cn(
      'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
      className
    ),
    ...props
  })
}
var Combobox$1 = ComboboxRoot
function ComboboxValue({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxValue$1, {
    'data-slot': 'combobox-value',
    ...props
  })
}
function ComboboxTrigger({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxTrigger$1, {
    'data-slot': 'combobox-trigger',
    className: cn("[&_svg:not([class*='size-'])]:size-4", className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
        className: 'text-muted-foreground pointer-events-none size-4'
      })
    ]
  })
}
function ComboboxClear({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxClear$1, {
    'data-slot': 'combobox-clear',
    render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
      variant: 'ghost',
      size: 'icon-xs'
    }),
    className: cn(className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
      className: 'pointer-events-none'
    })
  })
}
function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
    className: cn('w-auto', className),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInput$1, {
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
          disabled
        }),
        ...props
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroupAddon, {
        align: 'inline-end',
        children: [
          showTrigger &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
              size: 'icon-xs',
              variant: 'ghost',
              asChild: true,
              'data-slot': 'input-group-button',
              className:
                'group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent',
              disabled,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ComboboxTrigger,
                {}
              )
            }),
          showClear &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxClear, {
              disabled
            })
        ]
      }),
      children
    ]
  })
}
function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxPortal, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxPositioner, {
      side,
      sideOffset,
      align,
      alignOffset,
      anchor,
      className: 'isolate z-50',
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxPopup, {
        'data-slot': 'combobox-content',
        'data-chips': !!anchor,
        className: cn(
          'group/combobox-content bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+(--spacing(7)))] origin-(--transform-origin) overflow-hidden rounded-lg shadow-md ring-1 duration-100 data-[chips=true]:min-w-(--anchor-width) *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none',
          className
        ),
        ...props
      })
    })
  })
}
function ComboboxList({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxList$1, {
    'data-slot': 'combobox-list',
    className: cn(
      'no-scrollbar max-h-[min(calc(--spacing(72)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0',
      className
    ),
    ...props
  })
}
function ComboboxItem({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxItem$1, {
    'data-slot': 'combobox-item',
    className: cn(
      "data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxItemIndicator, {
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
          className:
            'pointer-events-none absolute right-2 flex size-4 items-center justify-center'
        }),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
          className: 'pointer-events-none'
        })
      })
    ]
  })
}
function ComboboxEmpty({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxEmpty$1, {
    'data-slot': 'combobox-empty',
    className: cn(
      'text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex',
      className
    ),
    ...props
  })
}
function ComboboxChips({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxChips$1, {
    'data-slot': 'combobox-chips',
    className: cn(
      'border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40 flex min-h-8 flex-wrap items-center gap-1 rounded-lg border bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:ring-3 has-aria-invalid:ring-3 has-data-[slot=combobox-chip]:px-1',
      className
    ),
    ...props
  })
}
function ComboboxChip({ className, children, showRemove = true, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxChip$1, {
    'data-slot': 'combobox-chip',
    className: cn(
      'bg-muted text-foreground flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0',
      className
    ),
    ...props,
    children: [
      children,
      showRemove &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxChipRemove, {
          render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            variant: 'ghost',
            size: 'icon-xs'
          }),
          className: '-ml-1 opacity-50 hover:opacity-100',
          'data-slot': 'combobox-chip-remove',
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
            className: 'pointer-events-none'
          })
        })
    ]
  })
}
function ComboboxChipsInput({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInput$1, {
    'data-slot': 'combobox-chip-input',
    className: cn('min-w-16 flex-1 outline-none', className),
    ...props
  })
}
function useComboboxAnchor() {
  return import_react.useRef(null)
}
//#endregion
export {
  ComboboxContent as a,
  ComboboxItem as c,
  InputGroup as d,
  InputGroupAddon as f,
  ComboboxChipsInput as i,
  ComboboxList as l,
  useComboboxAnchor as m,
  ComboboxChip as n,
  ComboboxEmpty as o,
  InputGroupInput as p,
  ComboboxChips as r,
  ComboboxInput as s,
  Combobox$1 as t,
  ComboboxValue as u
}
