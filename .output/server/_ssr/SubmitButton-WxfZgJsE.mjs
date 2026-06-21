import '../_runtime.mjs'
import { t as cva } from '../_libs/class-variance-authority+clsx.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import { t as Button } from './button-DMup9fK5.mjs'
require_react()
var import_jsx_runtime = require_jsx_runtime()
var alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current'
      }
    },
    defaultVariants: { variant: 'default' }
  }
)
function Alert({ className, variant, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'alert',
    role: 'alert',
    className: cn(alertVariants({ variant }), className),
    ...props
  })
}
function AlertDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'alert-description',
    className: cn(
      'text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
      className
    ),
    ...props
  })
}
var FormError = ({ message }) => {
  if (!message) return null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
    variant: 'destructive',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
      children: message
    })
  })
}
var SubmitButton = ({
  children,
  isPending,
  pendingText = 'Saving...',
  disabled,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
    type: 'submit',
    disabled: disabled || isPending,
    ...props,
    children: isPending ? pendingText : children
  })
}
//#endregion
export { SubmitButton as n, FormError as t }
