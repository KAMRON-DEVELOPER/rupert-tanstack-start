import '../_runtime.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import { t as Root } from '../_libs/radix-ui__react-separator.mjs'
require_react()
var import_jsx_runtime = require_jsx_runtime()
function Separator$1({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
    'data-slot': 'separator',
    decorative,
    orientation,
    className: cn(
      'bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
      className
    ),
    ...props
  })
}
//#endregion
export { Separator$1 as t }
