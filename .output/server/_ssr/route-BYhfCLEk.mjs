import { o as __toESM } from '../_runtime.mjs'
import { t as cva } from '../_libs/class-variance-authority+clsx.mjs'
import { t as cn } from './utils-C_uf36nf.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  a as useQuery,
  t as useInfiniteQuery
} from '../_libs/tanstack__react-query.mjs'
import {
  E as CircleAlert,
  L as ArrowUp,
  M as Camera,
  a as Send,
  d as Mic,
  f as MessageSquare,
  i as Smile,
  o as Search,
  p as MessageCircle,
  u as Paperclip
} from '../_libs/lucide-react.mjs'
import {
  a as Viewport,
  i as ScrollAreaThumb,
  n as Root,
  r as ScrollAreaScrollbar,
  t as Corner
} from '../_libs/radix-ui__react-scroll-area.mjs'
import {
  n as Root2,
  r as Trigger,
  t as List
} from '../_libs/radix-ui__react-tabs.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Input } from './input-BAnSrTfB.mjs'
import { t as Skeleton } from './skeleton-Bn2kf3_D.mjs'
import { r as useSearchUsersQueryOptions } from './users-D-YVzfI_.mjs'
import {
  n as AvatarFallback,
  r as AvatarImage,
  t as Avatar$1
} from './avatar-CGkcZU_Y.mjs'
import {
  a as useWebSocketEvent,
  i as useWebSocket,
  n as getChatMessagesFn,
  r as useGetChatsQueryOptions
} from './chats-BF_hTLAY.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/route-BYhfCLEk.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
function Tabs$1({ className, orientation = 'horizontal', ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
    'data-slot': 'tabs',
    'data-orientation': orientation,
    className: cn('group/tabs flex gap-2 data-horizontal:flex-col', className),
    ...props
  })
}
var tabsListVariants = cva(
  'group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'gap-1 bg-transparent'
      }
    },
    defaultVariants: { variant: 'default' }
  }
)
function TabsList({ className, variant = 'default', ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
    'data-slot': 'tabs-list',
    'data-variant': variant,
    className: cn(tabsListVariants({ variant }), className),
    ...props
  })
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
    'data-slot': 'tabs-trigger',
    className: cn(
      "text-foreground/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
      'data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground',
      'after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-1.25 group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100',
      className
    ),
    ...props
  })
}
function ScrollArea$1({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
    'data-slot': 'scroll-area',
    className: cn('relative', className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
        'data-slot': 'scroll-area-viewport',
        className:
          'focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1',
        children
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
    ]
  })
}
function ScrollBar({ className, orientation = 'vertical', ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
    'data-slot': 'scroll-area-scrollbar',
    'data-orientation': orientation,
    orientation,
    className: cn(
      'flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, {
      'data-slot': 'scroll-area-thumb',
      className: 'bg-border relative flex-1 rounded-full'
    })
  })
}
var PAGE_SIZE$1 = 20
var ChatList = ({ selectedChatId, onSelectChat, onStartChat }) => {
  const [search, setSearch] = (0, import_react.useState)('')
  const [offset, setOffset] = (0, import_react.useState)(0)
  const debouncedSearch = (0, import_react.useDeferredValue)(search)
  const isSearching = debouncedSearch.trim().length > 0
  const chatsQuery = useQuery(
    useGetChatsQueryOptions({
      offset,
      limit: PAGE_SIZE$1
    })
  )
  const chats = chatsQuery.data?.data ?? []
  const total = chatsQuery.data?.total ?? 0
  const userSearchQuery = useQuery(
    useSearchUsersQueryOptions({
      q: debouncedSearch.trim(),
      offset: 0,
      limit: PAGE_SIZE$1
    })
  )
  const searchResults = userSearchQuery.data?.data ?? []
  const canLoadMore = offset + PAGE_SIZE$1 < total
  const handleLoadMore = () => {
    setOffset((prev) => prev + PAGE_SIZE$1)
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'flex min-h-0 flex-1 flex-col',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'shrink-0 px-3 pt-2 pb-1',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className: 'relative',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
              className:
                'text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: 'Search',
              className: 'pl-9'
            })
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
        className: 'min-h-0 flex-1',
        children: isSearching
          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserSearchResults, {
              results: searchResults,
              isLoading: userSearchQuery.isLoading,
              onStartChat: (participantId) => {
                onStartChat(participantId)
                setSearch('')
              }
            })
          : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              import_jsx_runtime.Fragment,
              {
                children: [
                  chatsQuery.isLoading &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      className: 'space-y-1 p-2',
                      children: Array.from({ length: 6 }).map((_, i) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          'div',
                          {
                            className: 'flex items-center gap-3 rounded-lg p-2',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                Skeleton,
                                { className: 'size-10 shrink-0 rounded-full' }
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                'div',
                                {
                                  className: 'flex-1 space-y-1.5',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      Skeleton,
                                      { className: 'h-4 w-28' }
                                    ),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      Skeleton,
                                      { className: 'h-3 w-40' }
                                    )
                                  ]
                                }
                              )
                            ]
                          },
                          i
                        )
                      )
                    }),
                  !chatsQuery.isLoading &&
                    chats.length === 0 &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                      className:
                        'text-muted-foreground px-4 py-8 text-center text-sm',
                      children: 'No chats yet'
                    }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                    className: 'space-y-0.5 px-1.5',
                    children: chats.map((chat) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        ChatListItem,
                        {
                          chat,
                          isSelected: chat.id === selectedChatId,
                          onSelect: () => onSelectChat(chat)
                        },
                        chat.id
                      )
                    )
                  }),
                  canLoadMore &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      className: 'p-3',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        Button,
                        {
                          variant: 'ghost',
                          size: 'sm',
                          className: 'w-full',
                          onClick: handleLoadMore,
                          disabled: chatsQuery.isFetching,
                          children: chatsQuery.isFetching
                            ? 'Loading...'
                            : 'Load more'
                        }
                      )
                    })
                ]
              }
            )
      })
    ]
  })
}
var UserSearchResults = ({ results, isLoading, onStartChat }) => {
  if (isLoading)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      className: 'space-y-1 p-2',
      children: Array.from({ length: 4 }).map((_, i) =>
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          'div',
          {
            className: 'flex items-center gap-3 rounded-lg p-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                className: 'size-10 shrink-0 rounded-full'
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                className: 'flex-1',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  Skeleton,
                  { className: 'h-4 w-32' }
                )
              })
            ]
          },
          i
        )
      )
    })
  if (results.length === 0)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
      className: 'text-muted-foreground px-4 py-8 text-center text-sm',
      children: 'No users found'
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'space-y-0.5 px-1.5',
    children: results.map((user) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        UserSearchItem,
        {
          user,
          onStartChat: () => onStartChat(user.id)
        },
        user.id
      )
    )
  })
}
var UserSearchItem = ({ user, onStartChat }) => {
  const initials = getInitials$1(user.firstName, user.lastName)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className:
      'hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
            src: user.avatarUrl ?? void 0
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
            children: initials
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
        className: 'min-w-0 flex-1 truncate text-sm font-medium',
        children: user.name
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
        variant: 'ghost',
        size: 'icon',
        className: 'size-8 shrink-0',
        onClick: onStartChat,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
          className: 'size-4'
        })
      })
    ]
  })
}
var ChatListItem = ({ chat, isSelected, onSelect }) => {
  const initials = getInitials$1(chat.user.firstName, chat.user.lastName)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('button', {
    type: 'button',
    onClick: onSelect,
    className: cn(
      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
      isSelected ? 'bg-accent' : 'hover:bg-muted'
    ),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'relative shrink-0',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
                src: chat.user.avatarUrl ?? void 0
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
                children: initials
              })
            ]
          }),
          chat.user.isOnline &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
              className:
                'border-background absolute right-0 bottom-0 block size-2.5 rounded-full bg-green-500 ring-2'
            })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'min-w-0 flex-1',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex items-center justify-between',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                className: cn(
                  'truncate text-sm font-medium',
                  chat.unreadCount > 0 && 'font-semibold'
                ),
                children: chat.user.name
              }),
              chat.lastMessage &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                  className: 'text-muted-foreground ml-2 shrink-0 text-xs',
                  children: formatTime(chat.lastMessage.createdAt)
                })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex items-center justify-between',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className: 'text-muted-foreground truncate text-xs',
                children: chat.lastMessage?.message ?? 'No messages'
              }),
              chat.unreadCount > 0 &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                  className:
                    'bg-primary text-primary-foreground ml-2 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium',
                  children: chat.unreadCount > 99 ? '99+' : chat.unreadCount
                })
            ]
          })
        ]
      })
    ]
  })
}
function getInitials$1(firstName, lastName) {
  return (
    (
      (firstName?.charAt(0) ?? '') + (lastName?.charAt(0) ?? '')
    ).toUpperCase() || '?'
  )
}
function formatTime(iso) {
  const date = new Date(iso)
  const now = /* @__PURE__ */ new Date()
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  if (date.getFullYear() === now.getFullYear())
    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    })
  return date.toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
var MAX_TEXTAREA_HEIGHT = 160
var MessageComposer = ({ onSend, disabled }) => {
  const [text, setText] = (0, import_react.useState)('')
  const [captureMode, setCaptureMode] = (0, import_react.useState)('audio')
  const textareaRef = (0, import_react.useRef)(null)
  const longPressTimer = (0, import_react.useRef)(null)
  const isLongPress = (0, import_react.useRef)(false)
  const resizeTextarea = (0, import_react.useCallback)(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0'
    el.style.height = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px'
  }, [])
  const handleChange = (e) => {
    setText(e.target.value)
    requestAnimationFrame(resizeTextarea)
  }
  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = 'auto'
    })
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  const handleCapturePointerDown = () => {
    isLongPress.current = false
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true
    }, 500)
  }
  const handleCapturePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    if (!isLongPress.current)
      setCaptureMode((prev) => (prev === 'audio' ? 'video' : 'audio'))
  }
  const handleCapturePointerLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }
  const hasText = text.trim().length > 0
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'flex items-end gap-2 px-4 py-3',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className:
          'bg-muted flex min-h-[2.75rem] flex-1 items-center gap-1 rounded-full px-1.5 py-1.5',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            type: 'button',
            variant: 'ghost',
            size: 'icon-xs',
            className: 'shrink-0 rounded-full',
            disabled,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, {
              className: 'size-4'
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('textarea', {
            ref: textareaRef,
            value: text,
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            placeholder: 'Message',
            rows: 1,
            disabled,
            className:
              'placeholder:text-muted-foreground field-sizing-content max-h-40 min-h-0 flex-1 resize-none bg-transparent px-1 py-1 text-sm outline-none'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            type: 'button',
            variant: 'ghost',
            size: 'icon-xs',
            className: 'shrink-0 rounded-full',
            disabled,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, {
              className: 'size-4'
            })
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
        type: 'button',
        variant: hasText ? 'default' : 'secondary',
        size: 'icon',
        className: 'shrink-0 rounded-full',
        disabled,
        onClick: hasText ? handleSend : void 0,
        onPointerDown: !hasText ? handleCapturePointerDown : void 0,
        onPointerUp: !hasText ? handleCapturePointerUp : void 0,
        onPointerLeave: !hasText ? handleCapturePointerLeave : void 0,
        children: hasText
          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
              className: 'size-4'
            })
          : captureMode === 'audio'
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
                className: 'size-4'
              })
            : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
                className: 'size-4'
              })
      })
    ]
  })
}
var PAGE_SIZE = 20
var ChatDetails = ({ chat, send, wsStatus }) => {
  const messagesEndRef = (0, import_react.useRef)(null)
  const scrollContainerRef = (0, import_react.useRef)(null)
  const shouldAutoScrollRef = (0, import_react.useRef)(true)
  const prevScrollHeightRef = (0, import_react.useRef)(0)
  const messagesQuery = useInfiniteQuery({
    queryKey: ['chats', chat.id, 'messages'],
    queryFn: ({ pageParam }) =>
      getChatMessagesFn({
        data: {
          chatId: chat.id,
          offset: pageParam,
          limit: PAGE_SIZE
        }
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const nextOffset = lastPageParam + PAGE_SIZE
      return nextOffset < lastPage.total ? nextOffset : void 0
    }
  })
  const allMessages = (messagesQuery.data?.pages ?? []).flatMap((p) =>
    [...p.data].reverse()
  )
  const hasOlder = messagesQuery.hasNextPage
  ;(0, import_react.useLayoutEffect)(() => {
    const el = scrollContainerRef.current
    if (!el) return
    if (prevScrollHeightRef.current > 0) {
      const delta = el.scrollHeight - prevScrollHeightRef.current
      if (delta > 0) el.scrollTop += delta
      prevScrollHeightRef.current = 0
    } else if (shouldAutoScrollRef.current)
      messagesEndRef.current?.scrollIntoView()
  }, [allMessages.length])
  const handleScroll = (0, import_react.useCallback)(() => {
    const el = scrollContainerRef.current
    if (!el) return
    shouldAutoScrollRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }, [])
  const handleLoadOlder = () => {
    const el = scrollContainerRef.current
    if (el) prevScrollHeightRef.current = el.scrollHeight
    messagesQuery.fetchNextPage()
  }
  const handleSend = (text) => {
    if (wsStatus !== 'open') return
    if (
      send({
        type: 'send_message',
        message: text,
        chatId: chat.id,
        participantId: null,
        replyId: null,
        attachments: []
      })
    )
      shouldAutoScrollRef.current = true
  }
  const initials = getInitials(chat.user.firstName, chat.user.lastName)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'flex h-full flex-col',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'shrink-0 border-b px-4 py-3',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className: 'flex items-center gap-3',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'relative shrink-0',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
                      src: chat.user.avatarUrl ?? void 0
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      AvatarFallback,
                      { children: initials }
                    )
                  ]
                }),
                chat.user.isOnline &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className:
                      'border-background absolute right-0 bottom-0 block size-2.5 rounded-full bg-green-500 ring-2'
                  })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  className: 'text-sm font-medium',
                  children: chat.user.name
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  className: 'text-muted-foreground text-xs',
                  children: chat.user.isOnline ? 'online' : 'offline'
                })
              ]
            })
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        ref: scrollContainerRef,
        onScroll: handleScroll,
        className: 'min-h-0 flex-1 overflow-y-auto px-4 py-3',
        children: [
          messagesQuery.isLoading &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              className: 'space-y-3',
              children: Array.from({ length: 5 }).map((_, i) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  'div',
                  {
                    className: cn(
                      'flex',
                      i % 2 === 0 ? 'justify-start' : 'justify-end'
                    ),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Skeleton,
                      { className: 'h-10 w-48 rounded-2xl' }
                    )
                  },
                  i
                )
              )
            }),
          hasOlder &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              className: 'mb-3 flex justify-center',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                variant: 'ghost',
                size: 'sm',
                onClick: handleLoadOlder,
                disabled: messagesQuery.isFetchingNextPage,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
                    className: 'mr-1 size-3'
                  }),
                  messagesQuery.isFetchingNextPage
                    ? 'Loading...'
                    : 'Load older messages'
                ]
              })
            }),
          !messagesQuery.isLoading &&
            allMessages.length === 0 &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className:
                'flex h-full flex-col items-center justify-center text-center',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
                  className: 'text-muted-foreground/50 size-10'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  className: 'text-muted-foreground mt-2 text-sm',
                  children: 'No messages yet'
                })
              ]
            }),
          allMessages.map((msg) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              MessageBubble,
              {
                message: msg,
                isOwn: msg.senderId !== null && msg.senderId !== chat.user.id
              },
              msg.id
            )
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            ref: messagesEndRef
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'shrink-0',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageComposer, {
          onSend: handleSend,
          disabled: wsStatus !== 'open'
        })
      })
    ]
  })
}
var MessageBubble = ({ message, isOwn }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: cn('mb-1.5 flex', isOwn ? 'justify-end' : 'justify-start'),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
      className: cn(
        'max-w-[75%] rounded-2xl px-3.5 py-2 text-sm',
        isOwn
          ? 'bg-primary text-primary-foreground rounded-br-md'
          : 'bg-muted rounded-bl-md'
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
          className: 'wrap-break-word whitespace-pre-wrap',
          children: message.message ?? '[attachment]'
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
          className: cn(
            'mt-0.5 text-[10px]',
            isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
          ),
          children: formatMessageTime(message.createdAt)
        })
      ]
    })
  })
}
function getInitials(firstName, lastName) {
  return (
    (
      (firstName?.charAt(0) ?? '') + (lastName?.charAt(0) ?? '')
    ).toUpperCase() || '?'
  )
}
function formatMessageTime(iso) {
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}
var MessagesPage = () => {
  const [selectedChat, setSelectedChat] = (0, import_react.useState)(null)
  const { status, send, authFailed } = useWebSocket()
  const chats = useQuery(useGetChatsQueryOptions()).data?.data ?? []
  const pendingRef = (0, import_react.useRef)(null)
  ;(0, import_react.useEffect)(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedChat(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  useWebSocketEvent('chat_created', (event) => {
    if (!pendingRef.current) return
    if (event.item.user.id === pendingRef.current.participantId) {
      pendingRef.current = null
      setSelectedChat(event.item)
    }
  })
  ;(0, import_react.useEffect)(() => {
    const pending = pendingRef.current
    if (!pending || !pending.chatId) return
    const match = chats.find((c) => c.id === pending.chatId)
    if (match) {
      pendingRef.current = null
      setSelectedChat(match)
    }
  }, [chats])
  const handleStartChat = (participantId) => {
    pendingRef.current = {
      participantId,
      chatId: null
    }
    send({
      type: 'create_chat',
      participantId
    })
  }
  if (authFailed)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
      className:
        'flex h-[calc(100vh-3rem)] flex-col items-center justify-center gap-4 md:h-[calc(100vh-3.5rem)]',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
          className: 'text-destructive size-12'
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className: 'text-center',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-lg font-medium',
              children: 'Something went wrong'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-muted-foreground mt-1 text-sm',
              children: 'Please refresh the page to try again.'
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
          onClick: () => window.location.reload(),
          children: 'Refresh'
        })
      ]
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'flex h-[calc(100vh-3rem)] md:h-[calc(100vh-3.5rem)]',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('aside', {
        className: 'flex w-full shrink-0 flex-col border-r md:w-80',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
          defaultValue: 'chats',
          className: 'flex min-h-0 flex-1 flex-col',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              className: 'shrink-0 px-3 pt-2',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
                variant: 'line',
                className: 'w-full',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                    value: 'chats',
                    className: 'flex-1',
                    children: 'Chats'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                    value: 'groups',
                    className: 'flex-1',
                    disabled: true,
                    children: 'Groups'
                  })
                ]
              })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatList, {
              selectedChatId: selectedChat?.id ?? null,
              onSelectChat: setSelectedChat,
              onStartChat: handleStartChat
            })
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('main', {
        className: 'hidden min-w-0 flex-1 md:block',
        children: selectedChat
          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ChatDetails,
              {
                chat: selectedChat,
                send,
                wsStatus: status
              },
              selectedChat.id
            )
          : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {})
      })
    ]
  })
}
var EmptyState = () =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'flex h-full flex-col items-center justify-center text-center',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
        className: 'text-muted-foreground/40 size-16'
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
        className: 'text-muted-foreground mt-4 text-lg font-medium',
        children: 'Select a chat'
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
        className: 'text-muted-foreground/70 mt-1 text-sm',
        children: 'Choose a conversation from the sidebar to start messaging'
      })
    ]
  })
var SplitComponent = MessagesPage
//#endregion
export { SplitComponent as component }
