import { o as __toESM } from '../_runtime.mjs'
import { k as require_react } from './@base-ui/react+[...].mjs'
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var mergeClasses = (...classes) =>
  classes
    .filter((className, index, array) => {
      return (
        Boolean(className) &&
        className.trim() !== '' &&
        array.indexOf(className) === index
      )
    })
    .join(' ')
    .trim()
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var toKebabCase = (string) =>
  string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var toCamelCase = (string) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase()
  )
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string)
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
}
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var hasA11yProp = (props) => {
  for (const prop in props)
    if (prop.startsWith('aria-') || prop === 'role' || prop === 'title')
      return true
  return false
}
//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var LucideContext = (0, import_react.createContext)({})
var useLucideContext = () => (0, import_react.useContext)(LucideContext)
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Icon = (0, import_react.forwardRef)(
  (
    {
      color,
      size,
      strokeWidth,
      absoluteStrokeWidth,
      className = '',
      children,
      iconNode,
      ...rest
    },
    ref
  ) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      color: contextColor = 'currentColor',
      className: contextClass = ''
    } = useLucideContext() ?? {}
    const calculatedStrokeWidth =
      (absoluteStrokeWidth ?? contextAbsoluteStrokeWidth)
        ? (Number(strokeWidth ?? contextStrokeWidth) * 24) /
          Number(size ?? contextSize)
        : (strokeWidth ?? contextStrokeWidth)
    return (0, import_react.createElement)(
      'svg',
      {
        ref,
        ...defaultAttributes,
        width: size ?? contextSize ?? defaultAttributes.width,
        height: size ?? contextSize ?? defaultAttributes.height,
        stroke: color ?? contextColor,
        strokeWidth: calculatedStrokeWidth,
        className: mergeClasses('lucide', contextClass, className),
        ...(!children && !hasA11yProp(rest) && { 'aria-hidden': 'true' }),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) =>
          (0, import_react.createElement)(tag, attrs)
        ),
        ...(Array.isArray(children) ? children : [children])
      ]
    )
  }
)
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react.forwardRef)(
    ({ className, ...props }, ref) =>
      (0, import_react.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
  )
  Component.displayName = toPascalCase(iconName)
  return Component
}
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ArrowLeft = createLucideIcon('arrow-left', [
  [
    'path',
    {
      d: 'm12 19-7-7 7-7',
      key: '1l729n'
    }
  ],
  [
    'path',
    {
      d: 'M19 12H5',
      key: 'x3x0zl'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ArrowUp = createLucideIcon('arrow-up', [
  [
    'path',
    {
      d: 'm5 12 7-7 7 7',
      key: 'hav0vg'
    }
  ],
  [
    'path',
    {
      d: 'M12 19V5',
      key: 'x0mq9r'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Banknote = createLucideIcon('banknote', [
  [
    'rect',
    {
      width: '20',
      height: '12',
      x: '2',
      y: '6',
      rx: '2',
      key: '9lu3g6'
    }
  ],
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '2',
      key: '1c9p78'
    }
  ],
  [
    'path',
    {
      d: 'M6 12h.01M18 12h.01',
      key: '113zkx'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Bookmark = createLucideIcon('bookmark', [
  [
    'path',
    {
      d: 'M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z',
      key: 'oz39mx'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Briefcase = createLucideIcon('briefcase', [
  [
    'path',
    {
      d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
      key: 'jecpp'
    }
  ],
  [
    'rect',
    {
      width: '20',
      height: '14',
      x: '2',
      y: '6',
      rx: '2',
      key: 'i6l2r4'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Building2 = createLucideIcon('building-2', [
  [
    'path',
    {
      d: 'M10 12h4',
      key: 'a56b0p'
    }
  ],
  [
    'path',
    {
      d: 'M10 8h4',
      key: '1sr2af'
    }
  ],
  [
    'path',
    {
      d: 'M14 21v-3a2 2 0 0 0-4 0v3',
      key: '1rgiei'
    }
  ],
  [
    'path',
    {
      d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2',
      key: 'secmi2'
    }
  ],
  [
    'path',
    {
      d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16',
      key: '16ra0t'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Camera = createLucideIcon('camera', [
  [
    'path',
    {
      d: 'M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z',
      key: '18u6gg'
    }
  ],
  [
    'circle',
    {
      cx: '12',
      cy: '13',
      r: '3',
      key: '1vg3eu'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ChartColumn = createLucideIcon('chart-column', [
  [
    'path',
    {
      d: 'M3 3v16a2 2 0 0 0 2 2h16',
      key: 'c24i48'
    }
  ],
  [
    'path',
    {
      d: 'M18 17V9',
      key: '2bz60n'
    }
  ],
  [
    'path',
    {
      d: 'M13 17V5',
      key: '1frdt8'
    }
  ],
  [
    'path',
    {
      d: 'M8 17v-3',
      key: '17ska0'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Check = createLucideIcon('check', [
  [
    'path',
    {
      d: 'M20 6 9 17l-5-5',
      key: '1gmf2c'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ChevronDown = createLucideIcon('chevron-down', [
  [
    'path',
    {
      d: 'm6 9 6 6 6-6',
      key: 'qrunsl'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ChevronRight = createLucideIcon('chevron-right', [
  [
    'path',
    {
      d: 'm9 18 6-6-6-6',
      key: 'mthhwq'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ChevronUp = createLucideIcon('chevron-up', [
  [
    'path',
    {
      d: 'm18 15-6-6-6 6',
      key: '153udz'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var CircleAlert = createLucideIcon('circle-alert', [
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '10',
      key: '1mglay'
    }
  ],
  [
    'line',
    {
      x1: '12',
      x2: '12',
      y1: '8',
      y2: '12',
      key: '1pkeuh'
    }
  ],
  [
    'line',
    {
      x1: '12',
      x2: '12.01',
      y1: '16',
      y2: '16',
      key: '4dfq90'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Clock = createLucideIcon('clock', [
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '10',
      key: '1mglay'
    }
  ],
  [
    'path',
    {
      d: 'M12 6v6l4 2',
      key: 'mmk7yg'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Code = createLucideIcon('code', [
  [
    'path',
    {
      d: 'm16 18 6-6-6-6',
      key: 'eg8j8'
    }
  ],
  [
    'path',
    {
      d: 'm8 6-6 6 6 6',
      key: 'ppft3o'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var EyeOff = createLucideIcon('eye-off', [
  [
    'path',
    {
      d: 'M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49',
      key: 'ct8e1f'
    }
  ],
  [
    'path',
    {
      d: 'M14.084 14.158a3 3 0 0 1-4.242-4.242',
      key: '151rxh'
    }
  ],
  [
    'path',
    {
      d: 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143',
      key: '13bj9a'
    }
  ],
  [
    'path',
    {
      d: 'm2 2 20 20',
      key: '1ooewy'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Eye = createLucideIcon('eye', [
  [
    'path',
    {
      d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
      key: '1nclc0'
    }
  ],
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '3',
      key: '1v7zrd'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var FileText = createLucideIcon('file-text', [
  [
    'path',
    {
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
      key: '1oefj6'
    }
  ],
  [
    'path',
    {
      d: 'M14 2v5a1 1 0 0 0 1 1h5',
      key: 'wfsgrz'
    }
  ],
  [
    'path',
    {
      d: 'M10 9H8',
      key: 'b1mrlr'
    }
  ],
  [
    'path',
    {
      d: 'M16 13H8',
      key: 't4e002'
    }
  ],
  [
    'path',
    {
      d: 'M16 17H8',
      key: 'z1uh3a'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var FunnelX = createLucideIcon('funnel-x', [
  [
    'path',
    {
      d: 'M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473',
      key: 'ol2ft2'
    }
  ],
  [
    'path',
    {
      d: 'm16.5 3.5 5 5',
      key: '15e6fa'
    }
  ],
  [
    'path',
    {
      d: 'm21.5 3.5-5 5',
      key: 'm0lwru'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Globe = createLucideIcon('globe', [
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '10',
      key: '1mglay'
    }
  ],
  [
    'path',
    {
      d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20',
      key: '13o1zl'
    }
  ],
  [
    'path',
    {
      d: 'M2 12h20',
      key: '9i4pu4'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var House = createLucideIcon('house', [
  [
    'path',
    {
      d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8',
      key: '5wwlr5'
    }
  ],
  [
    'path',
    {
      d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
      key: 'r6nss1'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var LogIn = createLucideIcon('log-in', [
  [
    'path',
    {
      d: 'm10 17 5-5-5-5',
      key: '1bsop3'
    }
  ],
  [
    'path',
    {
      d: 'M15 12H3',
      key: '6jk70r'
    }
  ],
  [
    'path',
    {
      d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4',
      key: 'u53s6r'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Mail = createLucideIcon('mail', [
  [
    'path',
    {
      d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7',
      key: '132q7q'
    }
  ],
  [
    'rect',
    {
      x: '2',
      y: '4',
      width: '20',
      height: '16',
      rx: '2',
      key: 'izxlao'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var MapPin = createLucideIcon('map-pin', [
  [
    'path',
    {
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
      key: '1r0f0z'
    }
  ],
  [
    'circle',
    {
      cx: '12',
      cy: '10',
      r: '3',
      key: 'ilqhr7'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Menu = createLucideIcon('menu', [
  [
    'path',
    {
      d: 'M4 5h16',
      key: '1tepv9'
    }
  ],
  [
    'path',
    {
      d: 'M4 12h16',
      key: '1lakjw'
    }
  ],
  [
    'path',
    {
      d: 'M4 19h16',
      key: '1djgab'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var MessageCircle = createLucideIcon('message-circle', [
  [
    'path',
    {
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
      key: '1sd12s'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var MessageSquare = createLucideIcon('message-square', [
  [
    'path',
    {
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
      key: '18887p'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Mic = createLucideIcon('mic', [
  [
    'path',
    {
      d: 'M12 19v3',
      key: 'npa21l'
    }
  ],
  [
    'path',
    {
      d: 'M19 10v2a7 7 0 0 1-14 0v-2',
      key: '1vc78b'
    }
  ],
  [
    'rect',
    {
      x: '9',
      y: '2',
      width: '6',
      height: '13',
      rx: '3',
      key: 's6n7sd'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Paperclip = createLucideIcon('paperclip', [
  [
    'path',
    {
      d: 'm16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551',
      key: '1miecu'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Pencil = createLucideIcon('pencil', [
  [
    'path',
    {
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
      key: '1a8usu'
    }
  ],
  [
    'path',
    {
      d: 'm15 5 4 4',
      key: '1mk7zo'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Phone = createLucideIcon('phone', [
  [
    'path',
    {
      d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
      key: '9njp5v'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Plus = createLucideIcon('plus', [
  [
    'path',
    {
      d: 'M5 12h14',
      key: '1ays0h'
    }
  ],
  [
    'path',
    {
      d: 'M12 5v14',
      key: 's699le'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Search = createLucideIcon('search', [
  [
    'path',
    {
      d: 'm21 21-4.34-4.34',
      key: '14j7rj'
    }
  ],
  [
    'circle',
    {
      cx: '11',
      cy: '11',
      r: '8',
      key: '4ej97u'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Send = createLucideIcon('send', [
  [
    'path',
    {
      d: 'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
      key: '1ffxy3'
    }
  ],
  [
    'path',
    {
      d: 'm21.854 2.147-10.94 10.939',
      key: '12cjpa'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Smile = createLucideIcon('smile', [
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '10',
      key: '1mglay'
    }
  ],
  [
    'path',
    {
      d: 'M8 14s1.5 2 4 2 4-2 4-2',
      key: '1y1vjs'
    }
  ],
  [
    'line',
    {
      x1: '9',
      x2: '9.01',
      y1: '9',
      y2: '9',
      key: 'yxxnd0'
    }
  ],
  [
    'line',
    {
      x1: '15',
      x2: '15.01',
      y1: '9',
      y2: '9',
      key: '1p4y9e'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var SquarePen = createLucideIcon('square-pen', [
  [
    'path',
    {
      d: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
      key: '1m0v6g'
    }
  ],
  [
    'path',
    {
      d: 'M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z',
      key: 'ohrbg2'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Trash2 = createLucideIcon('trash-2', [
  [
    'path',
    {
      d: 'M10 11v6',
      key: 'nco0om'
    }
  ],
  [
    'path',
    {
      d: 'M14 11v6',
      key: 'outv1u'
    }
  ],
  [
    'path',
    {
      d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
      key: 'miytrc'
    }
  ],
  [
    'path',
    {
      d: 'M3 6h18',
      key: 'd0wm0j'
    }
  ],
  [
    'path',
    {
      d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
      key: 'e791ji'
    }
  ]
])
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var X = createLucideIcon('x', [
  [
    'path',
    {
      d: 'M18 6 6 18',
      key: '1bl5f8'
    }
  ],
  [
    'path',
    {
      d: 'm6 6 12 12',
      key: 'd8bk6v'
    }
  ]
])
//#endregion
export {
  Check as A,
  EyeOff as C,
  ChevronUp as D,
  CircleAlert as E,
  Bookmark as F,
  Banknote as I,
  ArrowUp as L,
  Camera as M,
  Building2 as N,
  ChevronRight as O,
  Briefcase as P,
  ArrowLeft as R,
  Eye as S,
  Clock as T,
  LogIn as _,
  Send as a,
  FunnelX as b,
  Phone as c,
  Mic as d,
  MessageSquare as f,
  Mail as g,
  MapPin as h,
  Smile as i,
  ChartColumn as j,
  ChevronDown as k,
  Pencil as l,
  Menu as m,
  Trash2 as n,
  Search as o,
  MessageCircle as p,
  SquarePen as r,
  Plus as s,
  X as t,
  Paperclip as u,
  House as v,
  Code as w,
  FileText as x,
  Globe as y
}
