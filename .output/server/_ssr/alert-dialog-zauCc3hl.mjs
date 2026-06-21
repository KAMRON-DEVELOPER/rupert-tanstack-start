import '../_runtime.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  a as Overlay2,
  c as Title2,
  i as Description2,
  l as Trigger2,
  n as Cancel,
  o as Portal2,
  r as Content2,
  s as Root2,
  t as Action
} from '../_libs/@radix-ui/react-alert-dialog+[...].mjs'
import { t as Button } from './button-DMup9fK5.mjs'
require_react()
var import_jsx_runtime = require_jsx_runtime()
function AlertDialog$1({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
    'data-slot': 'alert-dialog',
    ...props
  })
}
function AlertDialogTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger2, {
    'data-slot': 'alert-dialog-trigger',
    ...props
  })
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
    'data-slot': 'alert-dialog-portal',
    ...props
  })
}
function AlertDialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
    'data-slot': 'alert-dialog-overlay',
    className: cn(
      'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs',
      className
    ),
    ...props
  })
}
function AlertDialogContent({ className, size = 'default', ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
        'data-slot': 'alert-dialog-content',
        'data-size': size,
        className: cn(
          'group/alert-dialog-content bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm',
          className
        ),
        ...props
      })
    ]
  })
}
function AlertDialogHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'alert-dialog-header',
    className: cn(
      'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
      className
    ),
    ...props
  })
}
function AlertDialogFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'alert-dialog-footer',
    className: cn(
      'bg-muted/50 -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
      className
    ),
    ...props
  })
}
function AlertDialogTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
    'data-slot': 'alert-dialog-title',
    className: cn(
      'font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
      className
    ),
    ...props
  })
}
function AlertDialogDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
    'data-slot': 'alert-dialog-description',
    className: cn(
      'text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3',
      className
    ),
    ...props
  })
}
function AlertDialogAction({
  className,
  variant = 'default',
  size = 'default',
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
    variant,
    size,
    asChild: true,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
      'data-slot': 'alert-dialog-action',
      className: cn(className),
      ...props
    })
  })
}
function AlertDialogCancel({
  className,
  variant = 'outline',
  size = 'default',
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
    variant,
    size,
    asChild: true,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
      'data-slot': 'alert-dialog-cancel',
      className: cn(className),
      ...props
    })
  })
}
//#endregion
export {
  AlertDialogDescription as a,
  AlertDialogTitle as c,
  AlertDialogContent as i,
  AlertDialogTrigger as l,
  AlertDialogAction as n,
  AlertDialogFooter as o,
  AlertDialogCancel as r,
  AlertDialogHeader as s,
  AlertDialog$1 as t
}
