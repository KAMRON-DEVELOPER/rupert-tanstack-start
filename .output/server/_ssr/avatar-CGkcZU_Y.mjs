import '../_runtime.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  n as Image,
  r as Root,
  t as Fallback
} from '../_libs/@radix-ui/react-avatar+[...].mjs'
require_react()
var import_jsx_runtime = require_jsx_runtime()
function Avatar$1({ className, size = 'default', ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
    'data-slot': 'avatar',
    'data-size': size,
    className: cn(
      'group/avatar after:border-border relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten',
      className
    ),
    ...props
  })
}
function AvatarImage({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
    'data-slot': 'avatar-image',
    className: cn(
      'aspect-square size-full rounded-full object-cover',
      className
    ),
    ...props
  })
}
function AvatarFallback({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {
    'data-slot': 'avatar-fallback',
    className: cn(
      'bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs',
      className
    ),
    ...props
  })
}
//#endregion
export { AvatarFallback as n, AvatarImage as r, Avatar$1 as t }
