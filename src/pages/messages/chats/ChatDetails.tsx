import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowUp, Check, CheckCheck, FileText, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getChatMessagesFn } from '@/api/chats/chats.functions'
import type { ChatListItemResponse } from '@/types/chats/chat'
import type { ChatMessageResponse } from '@/types/chats/chat-message'
import type { IncomingEvent } from '@/hooks/useWebsocket/events'
import { useWebSocketEvent } from '@/hooks/useWebsocket'
import MessageComposer from './MessageComposer'

const PAGE_SIZE = 20
const GROUP_WINDOW_MS = 5 * 60 * 1000

type ChatDetailsProps = {
  chat: ChatListItemResponse
  send: (payload: IncomingEvent) => boolean
  wsStatus: string
  onBack?: () => void
}

const ChatDetails = ({ chat, send, wsStatus, onBack }: ChatDetailsProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)
  const prevScrollHeightRef = useRef(0)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [composerHeight, setComposerHeight] = useState(96)
  const [isTyping, setIsTyping] = useState(false)

  const messagesQuery = useInfiniteQuery({
    queryKey: ['chats', chat.id, 'messages'] as const,
    queryFn: ({ pageParam }) =>
      getChatMessagesFn({ data: { chatId: chat.id, offset: pageParam, limit: PAGE_SIZE } }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const nextOffset = lastPageParam + PAGE_SIZE
      return nextOffset < lastPage.total ? nextOffset : undefined
    }
  })

  const pages = messagesQuery.data?.pages ?? []
  const allMessages = useMemo(() => {
    const byId = new Map<string, ChatMessageResponse>()
    pages.forEach((page) => {
      page.data.forEach((message) => byId.set(message.id, message))
    })

    return Array.from(byId.values()).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  }, [pages])
  const hasOlder = messagesQuery.hasNextPage

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120
    shouldAutoScrollRef.current = atBottom
  }, [])

  useWebSocketEvent('typing_start', (event) => {
    if (event.chatId !== chat.id || event.userId !== chat.user.id) return
    setIsTyping(true)
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 4500)
  })

  useWebSocketEvent('typing_stop', (event) => {
    if (event.chatId !== chat.id || event.userId !== chat.user.id) return
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    setIsTyping(false)
  })

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    if (prevScrollHeightRef.current > 0) {
      const delta = el.scrollHeight - prevScrollHeightRef.current
      if (delta > 0) {
        el.scrollTop += delta
      }
      prevScrollHeightRef.current = 0
    } else if (shouldAutoScrollRef.current) {
      messagesEndRef.current?.scrollIntoView()
    }
  }, [allMessages.length, isTyping])

  useLayoutEffect(() => {
    if (shouldAutoScrollRef.current) {
      messagesEndRef.current?.scrollIntoView()
    }
  }, [composerHeight])

  const handleLoadOlder = () => {
    if (!messagesQuery.hasNextPage || messagesQuery.isFetchingNextPage) return
    const el = scrollContainerRef.current
    if (el) {
      prevScrollHeightRef.current = el.scrollHeight
    }
    messagesQuery.fetchNextPage()
  }

  const handleSend = (text: string) => {
    if (wsStatus !== 'open') return

    const didSend = send({
      type: 'send_message',
      message: text,
      chatId: chat.id,
      participantId: null,
      replyId: null,
      attachments: []
    })

    if (didSend) {
      shouldAutoScrollRef.current = true
    }
  }

  const handleTypingChange = useCallback(
    (typing: boolean) => {
      if (wsStatus !== 'open') return
      send({ type: typing ? 'typing_start' : 'typing_stop', chatId: chat.id })
    },
    [chat.id, send, wsStatus]
  )

  const initials = getInitials(chat.user.firstName, chat.user.lastName)

  return (
    <div className="bg-background flex h-full min-w-0 flex-col overflow-hidden">
      <div className="bg-background/95 shrink-0 border-b px-3 py-3 backdrop-blur sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 rounded-full md:hidden"
            onClick={onBack}
            aria-label="Back to chats"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div className="relative shrink-0">
            <Avatar className="size-10">
              <AvatarImage src={chat.user.avatarUrl ?? undefined} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {chat.user.isOnline && (
              <span className="border-background absolute right-0 bottom-0 block size-3 rounded-full border-2 bg-emerald-500" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{chat.user.name}</p>
            <p className="text-muted-foreground truncate text-xs">
              {isTyping ? 'typing...' : chat.user.isOnline ? 'online' : 'offline'}
            </p>
          </div>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <ScrollArea
          className="h-full"
          viewportClassName="overflow-x-hidden"
          viewportRef={scrollContainerRef}
        >
          <div
            className="mx-auto flex min-h-full max-w-5xl flex-col px-3 pt-4 sm:px-5"
            style={{ paddingBottom: composerHeight + 24 }}
          >
            {messagesQuery.isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn('flex', i % 2 === 0 ? 'justify-start' : 'justify-end')}
                  >
                    <Skeleton className="h-10 w-[min(70%,22rem)] rounded-2xl" />
                  </div>
                ))}
              </div>
            )}

            {hasOlder && (
              <div className="mb-4 flex justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={handleLoadOlder}
                  disabled={messagesQuery.isFetchingNextPage}
                >
                  <ArrowUp className="mr-1 size-3" />
                  {messagesQuery.isFetchingNextPage ? 'Loading...' : 'Older messages'}
                </Button>
              </div>
            )}

            {!messagesQuery.isLoading && allMessages.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <MessageSquare className="text-muted-foreground/50 size-10" />
                <p className="text-muted-foreground mt-2 text-sm">No messages yet</p>
              </div>
            )}

            {allMessages.map((msg, index) => {
              const previous = allMessages[index - 1]
              const next = allMessages[index + 1]
              const isOwn = msg.senderId !== null && msg.senderId !== chat.user.id
              const showDate = !previous || !isSameDay(previous.createdAt, msg.createdAt)
              const startsGroup = !previous || !isGrouped(previous, msg)
              const endsGroup = !next || !isGrouped(msg, next)
              const deliveryState =
                isOwn && chat.lastMessage?.id === msg.id
                  ? chat.lastMessage.seenByRecipient
                    ? 'seen'
                    : 'sent'
                  : null

              return (
                <Fragment key={msg.id}>
                  {showDate && <DateSeparator iso={msg.createdAt} />}
                  <MessageBubble
                    message={msg}
                    isOwn={isOwn}
                    startsGroup={startsGroup}
                    endsGroup={endsGroup}
                    deliveryState={deliveryState}
                  />
                </Fragment>
              )
            })}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <MessageComposer
          onSend={handleSend}
          onTypingChange={handleTypingChange}
          onHeightChange={setComposerHeight}
          disabled={wsStatus !== 'open'}
        />
      </div>
    </div>
  )
}

const DateSeparator = ({ iso }: { iso: string }) => (
  <div className="sticky top-3 z-10 my-4 flex justify-center">
    <span className="bg-background/80 text-muted-foreground rounded-full border px-3 py-1 text-[11px] font-medium shadow-sm backdrop-blur">
      {formatDateSeparator(iso)}
    </span>
  </div>
)

const TypingIndicator = () => (
  <div className="mt-3 flex justify-start">
    <div className="bg-background max-w-[min(70%,36rem)] rounded-2xl rounded-bl-md border px-3.5 py-2 shadow-sm">
      <div className="flex items-center gap-1">
        <span className="bg-muted-foreground/50 size-1.5 animate-pulse rounded-full" />
        <span className="bg-muted-foreground/50 size-1.5 animate-pulse rounded-full [animation-delay:120ms]" />
        <span className="bg-muted-foreground/50 size-1.5 animate-pulse rounded-full [animation-delay:240ms]" />
      </div>
    </div>
  </div>
)

const MessageBubble = ({
  message,
  isOwn,
  startsGroup,
  endsGroup,
  deliveryState
}: {
  message: ChatMessageResponse
  isOwn: boolean
  startsGroup: boolean
  endsGroup: boolean
  deliveryState: 'sent' | 'seen' | null
}) => {
  const hasText = Boolean(message.message?.trim())
  const sortedAttachments = [...message.attachments].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  )

  return (
    <div
      className={cn(
        'flex min-w-0',
        isOwn ? 'justify-end' : 'justify-start',
        startsGroup ? 'mt-3' : 'mt-0.5'
      )}
    >
      <div
        className={cn(
          'max-w-[min(82%,36rem)] min-w-0 overflow-hidden rounded-2xl px-3.5 py-2 text-sm shadow-sm sm:max-w-[min(70%,36rem)]',
          isOwn ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground border',
          isOwn && endsGroup && 'rounded-br-md',
          !isOwn && endsGroup && 'rounded-bl-md',
          isOwn && !startsGroup && 'rounded-tr-lg',
          !isOwn && !startsGroup && 'rounded-tl-lg'
        )}
      >
        {message.replyId && (
          <div
            className={cn(
              'mb-2 rounded-lg border-l-2 px-2 py-1 text-xs',
              isOwn
                ? 'border-primary-foreground/50 bg-primary-foreground/10 text-primary-foreground/80'
                : 'border-primary/50 bg-muted text-muted-foreground'
            )}
          >
            Reply
          </div>
        )}

        {sortedAttachments.length > 0 && (
          <div className={cn('space-y-2', hasText && 'mb-2')}>
            {sortedAttachments.map((attachment) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} isOwn={isOwn} />
            ))}
          </div>
        )}

        {hasText ? (
          <p className="min-w-0 [overflow-wrap:anywhere] break-words whitespace-pre-wrap">
            {message.message}
          </p>
        ) : (
          sortedAttachments.length === 0 && (
            <p className="text-muted-foreground italic">Message unavailable</p>
          )
        )}

        <div
          className={cn(
            'mt-1 flex items-center justify-end gap-1 text-[10px] leading-none tabular-nums',
            isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          <span>{formatMessageTime(message.createdAt)}</span>
          {deliveryState === 'sent' && <Check className="size-3" />}
          {deliveryState === 'seen' && <CheckCheck className="size-3" />}
        </div>
      </div>
    </div>
  )
}

const AttachmentPreview = ({
  attachment,
  isOwn
}: {
  attachment: ChatMessageResponse['attachments'][number]
  isOwn: boolean
}) => {
  const isImage = attachment.mimeType.startsWith('image/')
  const label = attachment.originalFilename || attachment.label || 'Attachment'

  if (isImage) {
    return (
      <a href={attachment.url} target="_blank" rel="noreferrer" className="block">
        <img
          src={attachment.url}
          alt={label}
          className="max-h-64 w-full rounded-xl object-cover"
          loading="lazy"
        />
      </a>
    )
  }

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'flex min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-xs',
        isOwn ? 'bg-primary-foreground/10' : 'bg-muted'
      )}
    >
      <FileText className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span className="shrink-0 tabular-nums opacity-70">
        {formatFileSize(attachment.sizeBytes)}
      </span>
    </a>
  )
}

function isGrouped(previous: ChatMessageResponse, current: ChatMessageResponse) {
  return (
    previous.senderId === current.senderId &&
    isSameDay(previous.createdAt, current.createdAt) &&
    Math.abs(new Date(current.createdAt).getTime() - new Date(previous.createdAt).getTime()) <
      GROUP_WINDOW_MS
  )
}

function isSameDay(a: string, b: string) {
  const first = new Date(a)
  const second = new Date(b)
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

function formatDateSeparator(iso: string) {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (isSameDay(date.toISOString(), today.toISOString())) return 'Today'
  if (isSameDay(date.toISOString(), yesterday.toISOString())) return 'Yesterday'

  const sameYear = date.getFullYear() === today.getFullYear()
  return date.toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' })
  })
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getInitials(firstName: string, lastName?: string | null) {
  const first = firstName?.charAt(0) ?? ''
  const last = lastName?.charAt(0) ?? ''
  return (first + last).toUpperCase() || '?'
}

function formatMessageTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default ChatDetails
