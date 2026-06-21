import { o as __toESM } from '../_runtime.mjs'
import { t as cva } from '../_libs/class-variance-authority+clsx.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  d as Link,
  o as Outlet
} from '../_libs/@tanstack/react-router+[...].mjs'
import {
  h as MapPin,
  t as X,
  v as House,
  w as Code
} from '../_libs/lucide-react.mjs'
import {
  d as Content,
  f as Description,
  g as Title,
  h as Root,
  j as Slot,
  m as Portal,
  p as Overlay,
  u as Close
} from '../_libs/@radix-ui/react-alert-dialog+[...].mjs'
import {
  i as TooltipTrigger,
  n as TooltipContent,
  t as Tooltip$1
} from './tooltip-BTCtgc5W.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import './input-BAnSrTfB.mjs'
import './separator-vCZ5CfjF.mjs'
import './skeleton-Bn2kf3_D.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/admin-0D1_KAzh.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var MOBILE_BREAKPOINT = 768
function useIsMobile() {
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
function Sheet({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
    'data-slot': 'sheet',
    ...props
  })
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
    'data-slot': 'sheet-portal',
    ...props
  })
}
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
    'data-slot': 'sheet-overlay',
    className: cn(
      'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs',
      className
    ),
    ...props
  })
}
function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
        'data-slot': 'sheet-content',
        'data-side': side,
        className: cn(
          'bg-popover text-popover-foreground data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10 fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
              'data-slot': 'sheet-close',
              asChild: true,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                variant: 'ghost',
                className: 'absolute top-3 right-3',
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
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'sheet-header',
    className: cn('flex flex-col gap-0.5 p-4', className),
    ...props
  })
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
    'data-slot': 'sheet-title',
    className: cn(
      'font-heading text-foreground text-base font-medium',
      className
    ),
    ...props
  })
}
function SheetDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
    'data-slot': 'sheet-description',
    className: cn('text-muted-foreground text-sm', className),
    ...props
  })
}
var SIDEBAR_COOKIE_NAME = 'sidebar_state'
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7
var SIDEBAR_WIDTH = '16rem'
var SIDEBAR_WIDTH_MOBILE = '18rem'
var SIDEBAR_WIDTH_ICON = '3rem'
var SIDEBAR_KEYBOARD_SHORTCUT = 'b'
var SidebarContext = import_react.createContext(null)
function useSidebar() {
  const context = import_react.useContext(SidebarContext)
  if (!context)
    throw new Error('useSidebar must be used within a SidebarProvider.')
  return context
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = import_react.useState(false)
  const [_open, _setOpen] = import_react.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = import_react.useCallback(
    (value) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) setOpenProp(openState)
      else _setOpen(openState)
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )
  const toggleSidebar = import_react.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])
  import_react.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])
  const state = open ? 'expanded' : 'collapsed'
  const contextValue = import_react.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      'data-slot': 'sidebar-wrapper',
      style: {
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
        className
      ),
      ...props,
      children
    })
  })
}
function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  dir,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
  if (collapsible === 'none')
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      'data-slot': 'sidebar',
      className: cn(
        'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
        className
      ),
      ...props,
      children
    })
  if (isMobile)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
      open: openMobile,
      onOpenChange: setOpenMobile,
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
        dir,
        'data-sidebar': 'sidebar',
        'data-slot': 'sidebar',
        'data-mobile': 'true',
        className:
          'bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden',
        style: { '--sidebar-width': SIDEBAR_WIDTH_MOBILE },
        side,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
            className: 'sr-only',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
                children: 'Sidebar'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
                children: 'Displays the mobile sidebar.'
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'flex h-full w-full flex-col',
            children
          })
        ]
      })
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'group peer text-sidebar-foreground hidden md:block',
    'data-state': state,
    'data-collapsible': state === 'collapsed' ? collapsible : '',
    'data-variant': variant,
    'data-side': side,
    'data-slot': 'sidebar',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-slot': 'sidebar-gap',
        className: cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-slot': 'sidebar-container',
        'data-side': side,
        className: cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:-left-(--sidebar-width) data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:-right-(--sidebar-width) md:flex',
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        ),
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
          'data-sidebar': 'sidebar',
          'data-slot': 'sidebar-inner',
          className:
            'bg-sidebar group-data-[variant=floating]:ring-sidebar-border flex size-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1',
          children
        })
      })
    ]
  })
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar()
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('button', {
    'data-sidebar': 'rail',
    'data-slot': 'sidebar-rail',
    'aria-label': 'Toggle Sidebar',
    tabIndex: -1,
    onClick: toggleSidebar,
    title: 'Toggle Sidebar',
    className: cn(
      'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:inset-s-1/2 after:w-0.5 sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2',
      'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
      '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
      '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      className
    ),
    ...props
  })
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('main', {
    'data-slot': 'sidebar-inset',
    className: cn(
      'bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
      className
    ),
    ...props
  })
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'sidebar-header',
    'data-sidebar': 'header',
    className: cn('flex flex-col gap-2 p-2', className),
    ...props
  })
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'sidebar-content',
    'data-sidebar': 'content',
    className: cn(
      'no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
      className
    ),
    ...props
  })
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'sidebar-group',
    'data-sidebar': 'group',
    className: cn('relative flex w-full min-w-0 flex-col p-2', className),
    ...props
  })
}
function SidebarGroupLabel({ className, asChild = false, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : 'div', {
    'data-slot': 'sidebar-group-label',
    'data-sidebar': 'group-label',
    className: cn(
      'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      className
    ),
    ...props
  })
}
function SidebarGroupContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-slot': 'sidebar-group-content',
    'data-sidebar': 'group-content',
    className: cn('w-full text-sm', className),
    ...props
  })
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('ul', {
    'data-slot': 'sidebar-menu',
    'data-sidebar': 'menu',
    className: cn('flex w-full min-w-0 flex-col gap-0', className),
    ...props
  })
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('li', {
    'data-slot': 'sidebar-menu-item',
    'data-sidebar': 'menu-item',
    className: cn('group/menu-item relative', className),
    ...props
  })
}
var sidebarMenuButtonVariants = cva(
  'peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]'
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()
  const button = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
    'data-slot': 'sidebar-menu-button',
    'data-sidebar': 'menu-button',
    'data-size': size,
    'data-active': isActive,
    className: cn(
      sidebarMenuButtonVariants({
        variant,
        size
      }),
      className
    ),
    ...props
  })
  if (!tooltip) return button
  if (typeof tooltip === 'string') tooltip = { children: tooltip }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
        asChild: true,
        children: button
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
        side: 'right',
        align: 'center',
        hidden: state !== 'collapsed' || isMobile,
        ...tooltip
      })
    ]
  })
}
var NAV_GROUPS = [
  {
    label: 'Platform',
    items: [
      {
        name: 'Dashboard',
        path: '/admin',
        icon: House
      }
    ]
  },
  {
    label: 'Infrastructure',
    items: [
      {
        name: 'Locations',
        path: '/admin/locations',
        icon: MapPin
      },
      {
        name: 'Skills',
        path: '/admin/skills',
        icon: Code
      }
    ]
  }
]
function AdminSidebar() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
    collapsible: 'icon',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
          className:
            'flex h-14 items-center px-4 font-semibold group-data-[collapsible=icon]:hidden',
          children: 'Admin Panel'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {
        children: NAV_GROUPS.map((group) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            SidebarGroup,
            {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupLabel, {
                  children: group.label
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  SidebarGroupContent,
                  {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      SidebarMenu,
                      {
                        children: group.items.map((item) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            SidebarMenuItem,
                            {
                              children: /* @__PURE__ */ (0,
                              import_jsx_runtime.jsx)(SidebarMenuButton, {
                                asChild: true,
                                tooltip: item.name,
                                children: /* @__PURE__ */ (0,
                                import_jsx_runtime.jsxs)(Link, {
                                  to: item.path,
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      item.icon,
                                      {}
                                    ),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      'span',
                                      { children: item.name }
                                    )
                                  ]
                                })
                              })
                            },
                            item.path
                          )
                        )
                      }
                    )
                  }
                )
              ]
            },
            group.label
          )
        )
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarRail, {})
    ]
  })
}
function AdminLayout() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInset, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
          className: 'p-6',
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
        })
      })
    ]
  })
}
var SplitComponent = AdminLayout
//#endregion
export { SplitComponent as component }
