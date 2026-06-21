import '../_runtime.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  A as Check,
  D as ChevronUp,
  k as ChevronDown
} from '../_libs/lucide-react.mjs'
import {
  a as ItemText,
  c as ScrollDownButton,
  d as Value,
  f as Viewport,
  i as ItemIndicator,
  l as ScrollUpButton,
  n as Icon,
  o as Portal,
  r as Item,
  s as Root2,
  t as Content2,
  u as Trigger
} from '../_libs/@radix-ui/react-select+[...].mjs'
require_react()
var import_jsx_runtime = require_jsx_runtime()
function Select$1({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
    'data-slot': 'select',
    ...props
  })
}
function SelectValue({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
    'data-slot': 'select-value',
    ...props
  })
}
function SelectTrigger({ className, size = 'default', children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger, {
    'data-slot': 'select-trigger',
    'data-size': size,
    className: cn(
      "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex w-fit items-center justify-between gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
        asChild: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
          className: 'text-muted-foreground pointer-events-none size-4'
        })
      })
    ]
  })
}
function SelectContent({
  className,
  children,
  position = 'item-aligned',
  align = 'center',
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
      'data-slot': 'select-content',
      'data-align-trigger': position === 'item-aligned',
      className: cn(
        'bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg shadow-md ring-1 duration-100 data-[align-trigger=true]:animate-none',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
          'data-position': position,
          className: cn(
            'data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)',
            position === 'popper' && ''
          ),
          children
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
      ]
    })
  })
}
function SelectItem({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
    'data-slot': 'select-item',
    className: cn(
      "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
        className:
          'pointer-events-none absolute right-2 flex size-4 items-center justify-center',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
            className: 'pointer-events-none'
          })
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemText, { children })
    ]
  })
}
function SelectScrollUpButton({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollUpButton, {
    'data-slot': 'select-scroll-up-button',
    className: cn(
      "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {})
  })
}
function SelectScrollDownButton({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollDownButton, {
    'data-slot': 'select-scroll-down-button',
    className: cn(
      "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {})
  })
}
//#endregion
export {
  SelectValue as a,
  SelectTrigger as i,
  SelectContent as n,
  SelectItem as r,
  Select$1 as t
}
