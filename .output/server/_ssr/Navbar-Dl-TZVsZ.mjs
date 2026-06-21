import { o as __toESM } from '../_runtime.mjs'
import { n as clsx } from '../_libs/class-variance-authority+clsx.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  d as Link,
  p as useRouteContext
} from '../_libs/@tanstack/react-router+[...].mjs'
import { t as RupertSvg } from './RupertSvg-DJfJorbo.mjs'
import { _ as LogIn, m as Menu } from '../_libs/lucide-react.mjs'
import {
  a as Root2,
  i as Portal2,
  n as Group2,
  o as Trigger,
  r as Item2,
  t as Content2
} from '../_libs/@radix-ui/react-dropdown-menu+[...].mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as useScrollDirection } from './useScrollDirection-CiV8-4EP.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/Navbar-Dl-TZVsZ.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var MOBILE_BREAKPOINT = 768
var useIsMobile = () => {
  const [isMobile, setIsMobile] = import_react.useState(void 0)
  import_react.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return !!isMobile
}
var NavbarCTA = () => {
  const isAuthenticated = useRouteContext({ from: '__root__' }).isAuthenticated
  const isMobile = useIsMobile()
  const label = isAuthenticated ? 'Profile' : 'Get Started'
  if (isMobile)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
      to: isAuthenticated ? '/profile' : '/auth',
      'aria-label': label,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'btn-sm',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {
          size: 4
        })
      })
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
    to: isAuthenticated ? '/profile' : '/auth',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      className: 'btn-sm',
      children: label
    })
  })
}
function DropdownMenu$1({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
    'data-slot': 'dropdown-menu',
    ...props
  })
}
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
    'data-slot': 'dropdown-menu-trigger',
    ...props
  })
}
function DropdownMenuContent({
  className,
  align = 'start',
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
      'data-slot': 'dropdown-menu-content',
      sideOffset,
      align,
      className: cn(
        'bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg p-1 shadow-md ring-1 duration-100 data-[state=closed]:overflow-hidden',
        className
      ),
      ...props
    })
  })
}
function DropdownMenuGroup({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group2, {
    'data-slot': 'dropdown-menu-group',
    ...props
  })
}
function DropdownMenuItem({ className, inset, variant = 'default', ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
    'data-slot': 'dropdown-menu-item',
    'data-inset': inset,
    'data-variant': variant,
    className: cn(
      "group/dropdown-menu-item focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:*:[svg]:text-destructive relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    ),
    ...props
  })
}
var NavbarMenu = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu$1, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
        className: 'md:hidden',
        asChild: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
          variant: 'outline',
          size: useIsMobile() ? 'icon-sm' : 'icon',
          className: 'group',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
              className: 'text-muted-foreground group-hover:text-primary'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
              className: 'sr-only',
              children: 'Menu'
            })
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
        className: 'mt-4',
        align: 'end',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          DropdownMenuGroup,
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('a', {
                  href: '#features',
                  className: 'hover:text-foreground',
                  children: 'Features'
                })
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('a', {
                  href: '#pricing',
                  className: 'hover:text-foreground',
                  children: 'Pricing'
                })
              })
            ]
          }
        )
      })
    ]
  })
}
var Navbar = () => {
  const isAuthenticated = useRouteContext({ from: '__root__' }).isAuthenticated
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: clsx(
      'fixed z-1 w-full transition-all duration-300',
      useScrollDirection() === 'up' ? 'translate-y-0' : '-translate-y-full'
    ),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('nav', {
      className:
        'bg-primary-foreground/50 text-md flex h-12 items-center justify-between px-4 font-semibold backdrop-blur-sm md:h-14 md:px-8',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
          to: '/',
          className: 'flex items-center gap-2',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RupertSvg, {
              className: 'fill-primary size-8'
            }),
            'Rupert'
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className: 'text-muted-foreground hidden items-center gap-4 md:flex',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: '/feeds',
              disabled: true,
              className:
                'hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground',
              children: 'Feed'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: '/posts',
              disabled: true,
              className:
                'hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground',
              children: 'Posts'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: '/work',
              activeOptions: { exact: false },
              className:
                'hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground',
              children: 'Work'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: '/messages',
              activeOptions: { exact: false },
              disabled: isAuthenticated ? false : true,
              className:
                'hover:text-foreground data-[status=active]:text-primary aria-disabled:hover:text-muted-foreground',
              children: 'Messages'
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className: 'flex items-center gap-2',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavbarCTA, {}),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavbarMenu, {})
          ]
        })
      ]
    })
  })
}
//#endregion
export { Navbar as t }
