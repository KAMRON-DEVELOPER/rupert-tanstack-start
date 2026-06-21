import { o as __toESM } from '../_runtime.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import { d as Link } from '../_libs/@tanstack/react-router+[...].mjs'
import { i as useSuspenseQuery } from '../_libs/tanstack__react-query.mjs'
import { t as useGetStatsQueryOptions } from './stats-CNR_NleR.mjs'
import { t as RupertSvg } from './RupertSvg-DJfJorbo.mjs'
import { c as Phone, g as Mail } from '../_libs/lucide-react.mjs'
import { t as SiTelegram } from '../_libs/icons-pack__react-simple-icons.mjs'
import {
  a as Legend,
  i as Tooltip,
  n as XAxis,
  o as ResponsiveContainer,
  r as Bar,
  t as BarChart
} from '../_libs/recharts+[...].mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/(public)-DLWtwESp.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var contact = [
  {
    href: 'mailto:atajanovkamronbek2003@gmail.com',
    icon: Mail,
    label: 'atajanovkamronbek2003@gmail.com'
  },
  {
    href: 'tel:+998971181203',
    icon: Phone,
    label: '+998 97 118 12 03'
  },
  {
    href: 'https://t.me/lockdown2003',
    icon: SiTelegram,
    label: '@lockdown2003'
  }
]
var Footer = () =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('footer', {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'grid space-x-32 border-y p-8 md:grid-cols-3',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                to: '/',
                className:
                  'flex items-center gap-2 text-lg font-semibold tracking-tighter',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RupertSvg, {
                    className: 'size-8'
                  }),
                  'Rupert'
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className: 'max-w-md text-sm',
                children:
                  'A platform for sharing projects, finding jobs, publishing posts, and connecting with the community.'
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'space-y-2 text-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h5', {
                className: 'font-semibold',
                children: 'Contact'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('ul', {
                className: 'text-muted-foreground space-y-2',
                children: contact.map(({ href, icon: Icon, label }) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    'li',
                    {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        'a',
                        {
                          href,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className: 'flex items-center gap-2',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
                              className: 'size-4'
                            }),
                            ' ',
                            label
                          ]
                        }
                      )
                    },
                    href
                  )
                )
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'space-y-2 text-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h5', {
                className: 'font-semibold',
                children: 'Company'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('ul', {
                className: 'text-muted-foreground space-y-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('li', {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      'a',
                      {
                        href: 'https://t.me/rupert_uz',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'flex items-center gap-2',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            SiTelegram,
                            { className: 'size-4' }
                          ),
                          ' Community'
                        ]
                      }
                    )
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('li', {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Link,
                      {
                        to: '/terms',
                        children: 'Terms of Service'
                      }
                    )
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('li', {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Link,
                      {
                        to: '/privacy',
                        children: 'Privacy Policy'
                      }
                    )
                  })
                ]
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
        className: 'py-2 text-center text-xs',
        children: [
          '© ',
          /* @__PURE__ */ new Date().getFullYear(),
          ' Rupert. All rights reserved.'
        ]
      })
    ]
  })
var THEMES = {
  light: '',
  dark: '.dark'
}
var INITIAL_DIMENSION = {
  width: 320,
  height: 200
}
var ChartContext = import_react.createContext(null)
function useChart() {
  const context = import_react.useContext(ChartContext)
  if (!context)
    throw new Error('useChart must be used within a <ChartContainer />')
  return context
}
function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}) {
  const uniqueId = import_react.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContext.Provider, {
    value: { config },
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
      'data-slot': 'chart',
      'data-chart': chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartStyle, {
          id: chartId,
          config
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
          initialDimension,
          children
        })
      ]
    })
  })
}
var ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )
  if (!colorConfig.length) return null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('style', {
    dangerouslySetInnerHTML: {
      __html: Object.entries(THEMES)
        .map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme] ?? itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`
        )
        .join('\n')
    }
  })
}
var ChartTooltip = Tooltip
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart()
  const tooltipLabel = import_react.useMemo(() => {
    if (hideLabel || !payload?.length) return null
    const [item] = payload
    const itemConfig = getPayloadConfigFromPayload(
      config,
      item,
      `${labelKey ?? item?.dataKey ?? item?.name ?? 'value'}`
    )
    const value =
      !labelKey && typeof label === 'string'
        ? (config[label]?.label ?? label)
        : itemConfig?.label
    if (labelFormatter)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: cn('font-medium', labelClassName),
        children: labelFormatter(value, payload)
      })
    if (!value) return null
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      className: cn('font-medium', labelClassName),
      children: value
    })
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ])
  if (!active || !payload?.length) return null
  const nestLabel = payload.length === 1 && indicator !== 'dot'
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: cn(
      'border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
      className
    ),
    children: [
      !nestLabel ? tooltipLabel : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'grid gap-1.5',
        children: payload
          .filter((item) => item.type !== 'none')
          .map((item, index) => {
            const itemConfig = getPayloadConfigFromPayload(
              config,
              item,
              `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`
            )
            const indicatorColor = color ?? item.payload?.fill ?? item.color
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              'div',
              {
                className: cn(
                  '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                  indicator === 'dot' && 'items-center'
                ),
                children:
                  formatter && item?.value !== void 0 && item.name
                    ? formatter(
                        item.value,
                        item.name,
                        item,
                        index,
                        item.payload
                      )
                    : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        import_jsx_runtime.Fragment,
                        {
                          children: [
                            itemConfig?.icon
                              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  itemConfig.icon,
                                  {}
                                )
                              : !hideIndicator &&
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  'div',
                                  {
                                    className: cn(
                                      'shrink-0 rounded-xs border-(--color-border) bg-(--color-bg)',
                                      {
                                        'h-2.5 w-2.5': indicator === 'dot',
                                        'w-1': indicator === 'line',
                                        'w-0 border-[1.5px] border-dashed bg-transparent':
                                          indicator === 'dashed',
                                        'my-0.5':
                                          nestLabel && indicator === 'dashed'
                                      }
                                    ),
                                    style: {
                                      '--color-bg': indicatorColor,
                                      '--color-border': indicatorColor
                                    }
                                  }
                                ),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                              'div',
                              {
                                className: cn(
                                  'flex flex-1 justify-between leading-none',
                                  nestLabel ? 'items-end' : 'items-center'
                                ),
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    'div',
                                    {
                                      className: 'grid gap-1.5',
                                      children: [
                                        nestLabel ? tooltipLabel : null,
                                        /* @__PURE__ */ (0,
                                        import_jsx_runtime.jsx)('span', {
                                          className: 'text-muted-foreground',
                                          children:
                                            itemConfig?.label ?? item.name
                                        })
                                      ]
                                    }
                                  ),
                                  item.value != null &&
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      'span',
                                      {
                                        className:
                                          'text-foreground font-mono font-medium tabular-nums',
                                        children:
                                          typeof item.value === 'number'
                                            ? item.value.toLocaleString()
                                            : String(item.value)
                                      }
                                    )
                                ]
                              }
                            )
                          ]
                        }
                      )
              },
              index
            )
          })
      })
    ]
  })
}
var ChartLegend = Legend
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey
}) {
  const { config } = useChart()
  if (!payload?.length) return null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: cn(
      'flex items-center justify-center gap-4',
      verticalAlign === 'top' ? 'pb-3' : 'pt-3',
      className
    ),
    children: payload
      .filter((item) => item.type !== 'none')
      .map((item, index) => {
        const itemConfig = getPayloadConfigFromPayload(
          config,
          item,
          `${nameKey ?? item.dataKey ?? 'value'}`
        )
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          'div',
          {
            className: cn(
              '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3'
            ),
            children: [
              itemConfig?.icon && !hideIcon
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    itemConfig.icon,
                    {}
                  )
                : /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                    className: 'h-2 w-2 shrink-0 rounded-xs',
                    style: { backgroundColor: item.color }
                  }),
              itemConfig?.label
            ]
          },
          index
        )
      })
  })
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== 'object' || payload === null) return
  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : void 0
  let configLabelKey = key
  if (key in payload && typeof payload[key] === 'string')
    configLabelKey = payload[key]
  else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === 'string'
  )
    configLabelKey = payloadPayload[key]
  return configLabelKey in config ? config[configLabelKey] : config[key]
}
var chartConfig = {
  count: {
    label: 'Registered',
    color: 'var(--chart-1)'
  },
  anonymousCount: {
    label: 'Anonymous',
    color: 'var(--chart-2)'
  }
}
var StatsDauChart = ({ data }) => {
  const totalRegistered = data.reduce((acc, d) => acc + d.count, 0)
  const totalAnonymous = data.reduce((acc, d) => acc + d.anonymousCount, 0)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'bg-card rounded-lg border',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'flex items-start justify-between gap-4 border-b px-4 py-3',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className: 'text-md font-medium',
                children: 'Daily Active Users'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className: 'text-muted-foreground text-sm',
                children: 'Last 30 days'
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex gap-4 text-right text-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'font-medium',
                    children: (
                      totalRegistered + totalAnonymous
                    ).toLocaleString()
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-muted-foreground',
                    children: 'total'
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'font-medium',
                    children: totalRegistered.toLocaleString()
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-muted-foreground',
                    children: 'registered'
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'font-medium',
                    children: totalAnonymous.toLocaleString()
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-muted-foreground',
                    children: 'anonymous'
                  })
                ]
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
          config: chartConfig,
          className: 'aspect-auto h-64 w-full',
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
            accessibilityLayer: true,
            data,
            margin: {
              left: 0,
              right: 0
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
                dataKey: 'date',
                tickLine: false,
                axisLine: false,
                tickMargin: 4,
                minTickGap: 28,
                tickFormatter: (value) =>
                  new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
                content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  ChartTooltipContent,
                  {
                    className: 'w-44',
                    labelFormatter: (value) =>
                      new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                  }
                )
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
                content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  ChartLegendContent,
                  {}
                )
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
                dataKey: 'count',
                stackId: 'a',
                fill: 'var(--color-count)',
                radius: [0, 0, 4, 4]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
                dataKey: 'anonymousCount',
                stackId: 'a',
                fill: 'var(--color-anonymousCount)',
                radius: [4, 4, 0, 0]
              })
            ]
          })
        })
      })
    ]
  })
}
var Stats = () => {
  const {
    data: {
      users: { total, dauChart, lookingForJobCount },
      vacancies: { total: vacanciesTotal, open },
      companies: { total: companiesTotal }
    }
  } = useSuspenseQuery(useGetStatsQueryOptions())
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('section', {
    className: 'mx-4 space-y-4 md:mx-8',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
        className: 'text-xl font-semibold',
        children: 'Statistics'
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('dl', {
        className: 'grid grid-cols-2 md:grid-cols-5',
        children: [
          {
            label: 'Total Users',
            value: total
          },
          {
            label: 'Looking for Job',
            value: lookingForJobCount
          },
          {
            label: 'Open Vacancies',
            value: open
          },
          {
            label: 'Total Vacancies',
            value: vacanciesTotal
          },
          {
            label: 'Companies',
            value: companiesTotal
          }
        ].map(({ label, value }) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            'div',
            {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('dt', {
                  className: 'text-sm',
                  children: label
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('dd', {
                  className: 'text-xl font-bold',
                  children: value.toLocaleString()
                })
              ]
            },
            label
          )
        )
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsDauChart, {
        data: dauChart
      })
    ]
  })
}
var Hero = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('section', {
    className:
      'relative flex h-[calc(100vh-3rem)] flex-col md:h-[calc(100vh-3.5rem)]',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className:
          'absolute inset-y-0 right-8 left-8 overflow-hidden rounded-2xl',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('img', {
          src: '/background.jpg',
          alt: 'background',
          className: 'h-full w-full object-cover'
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className:
          'font-jetbrains dark:text-background relative h-full text-center text-lg',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'h-[25%]'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
            className: 'text-center text-6xl',
            children: 'Rupert'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            className: 'text-xl tracking-tighter italic',
            children: 'Built by a dev, for devs.'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            className: 'text-xl tracking-tighter',
            children:
              'Share what you build, discover jobs, and stay close to the developer community.'
          })
        ]
      })
    ]
  })
}
var FeaturedArticles = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'text-md flex justify-between',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            children: 'Articles'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            children: 'See more'
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'grid grid-cols-2 gap-4 md:grid-cols-5',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'How SSR work?'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'What is hydration?'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Fearless concurrency in Rust'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Go corutines'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'OOP'
          })
        ]
      })
    ]
  })
}
var FeaturedCompanies = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'text-md flex justify-between',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            children: 'Companies'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            children: 'See more'
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'grid grid-cols-2 gap-4 md:grid-cols-5',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Exadel'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Uzum'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Epam'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Mohirdev'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Poddle'
          })
        ]
      })
    ]
  })
}
function FeaturedUsers() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'text-md flex justify-between',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            children: 'Users'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            children: 'See more'
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'grid grid-cols-2 gap-4 md:grid-cols-5',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Someone 1'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Someone 2'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Someone 3'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Someone 4'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Someone 5'
          })
        ]
      })
    ]
  })
}
var FeaturedVacancies = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'text-md flex justify-between',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            children: 'Vacancies'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            children: 'See more'
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'grid grid-cols-2 gap-4 md:grid-cols-5',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Full-stack developer'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Backend developer'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'Flutter developer'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'DevOps engineer'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            className: 'bg-card h-20 rounded-lg border text-center',
            children: 'React developer'
          })
        ]
      })
    ]
  })
}
var Featured = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('section', {
    className: 'mx-4 space-y-4 md:mx-8',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
        className: 'text-xl font-semibold',
        children: 'Featured'
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedCompanies, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedVacancies, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedUsers, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedArticles, {})
    ]
  })
}
var HomePage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-8',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Featured, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
    ]
  })
}
var SplitComponent = HomePage
//#endregion
export { SplitComponent as component }
