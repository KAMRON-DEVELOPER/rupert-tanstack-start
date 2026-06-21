import '../_runtime.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import { t as X } from '../_libs/lucide-react.mjs'
import {
  d as Content,
  f as Description,
  g as Title,
  h as Root,
  m as Portal,
  p as Overlay,
  u as Close
} from '../_libs/@radix-ui/react-alert-dialog+[...].mjs'
import { t as Button } from './button-DMup9fK5.mjs'
require_react()
var import_jsx_runtime = require_jsx_runtime()
function Dialog$1({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
    'data-slot': 'dialog',
    ...props
  })
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
    'data-slot': 'dialog-portal',
    ...props
  })
}
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
    'data-slot': 'dialog-overlay',
    className: cn(
      'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs',
      className
    ),
    ...props
  })
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
        'data-slot': 'dialog-content',
        className: cn(
          'bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none sm:max-w-sm',
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
              'data-slot': 'dialog-close',
              asChild: true,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                variant: 'ghost',
                className: 'absolute top-2 right-2',
                size: 'icon-sm',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'sr-only',
                    children: 'Close'
                  })
                ]
              })
            })
        ]
      })
    ]
  })
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'dialog-header',
    className: cn('flex flex-col gap-2', className),
    ...props
  })
}
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-slot': 'dialog-footer',
    className: cn(
      'bg-muted/50 -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4 sm:flex-row sm:justify-end',
      className
    ),
    ...props,
    children: [
      children,
      showCloseButton &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
          asChild: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            variant: 'outline',
            children: 'Close'
          })
        })
    ]
  })
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
    'data-slot': 'dialog-title',
    className: cn('font-heading text-base leading-none font-medium', className),
    ...props
  })
}
function DialogDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
    'data-slot': 'dialog-description',
    className: cn(
      'text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3',
      className
    ),
    ...props
  })
}
//#endregion
export {
  DialogHeader as a,
  DialogFooter as i,
  DialogContent as n,
  DialogTitle as o,
  DialogDescription as r,
  Dialog$1 as t
}
