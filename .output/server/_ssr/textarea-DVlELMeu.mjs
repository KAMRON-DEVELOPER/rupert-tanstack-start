import '../_runtime.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
require_react()
var import_jsx_runtime = require_jsx_runtime()
var locationLabel = (country, city) =>
  [city?.name, country?.name].filter(Boolean).join(', ')
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('textarea', {
    'data-slot': 'textarea',
    className: cn(
      'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
      className
    ),
    ...props
  })
}
//#endregion
export { locationLabel as n, Textarea as t }
