import '../_runtime.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  a as Root3,
  i as Provider,
  n as Content2,
  o as Trigger,
  r as Portal,
  t as Arrow2
} from '../_libs/radix-ui__react-tooltip.mjs'
require_react()
var import_jsx_runtime = require_jsx_runtime()
function TooltipProvider({ delayDuration = 0, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
    'data-slot': 'tooltip-provider',
    delayDuration,
    ...props
  })
}
function Tooltip$1({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, {
    'data-slot': 'tooltip',
    ...props
  })
}
function TooltipTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
    'data-slot': 'tooltip-trigger',
    ...props
  })
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
      'data-slot': 'tooltip-content',
      sideOffset,
      className: cn(
        'bg-foreground text-background data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md px-3 py-1.5 text-xs has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm',
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow2, {
          className:
            'bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs'
        })
      ]
    })
  })
}
//#endregion
export {
  TooltipTrigger as i,
  TooltipContent as n,
  TooltipProvider as r,
  Tooltip$1 as t
}
