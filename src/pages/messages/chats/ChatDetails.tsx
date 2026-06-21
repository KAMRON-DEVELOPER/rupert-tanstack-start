import { useCallback, useLayoutEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ArrowUp, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { getChatMessagesFn } from '@/api/chats/chats.functions'
import type { ChatListItemResponse } from '@/types/chats/chat'
import type { ChatMessageResponse } from '@/types/chats/chat-message'
import type { IncomingEvent } from '@/hooks/useWebsocket/events'
import MessageComposer from './MessageComposer'

const PAGE_SIZE = 20

type ChatDetailsProps = {
  chat: ChatListItemResponse
  send: (payload: IncomingEvent) => boolean
  wsStatus: string
}

const ChatDetails = ({ chat, send, wsStatus }: ChatDetailsProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)
  const prevScrollHeightRef = useRef(0)

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
  const allMessages = pages.flatMap((p) => [...p.data].reverse())
  const hasOlder = messagesQuery.hasNextPage

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
  }, [allMessages.length])

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
    shouldAutoScrollRef.current = atBottom
  }, [])

  const handleLoadOlder = () => {
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

  const initials = getInitials(chat.user.firstName, chat.user.lastName)

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Avatar>
              <AvatarImage src={chat.user.avatarUrl ?? undefined} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {chat.user.isOnline && (
              <span className="border-background absolute right-0 bottom-0 block size-2.5 rounded-full bg-green-500 ring-2" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">{chat.user.name}</p>
            <p className="text-muted-foreground text-xs">
              {chat.user.isOnline ? 'online' : 'offline'}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-3"
      >
        {messagesQuery.isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={cn('flex', i % 2 === 0 ? 'justify-start' : 'justify-end')}>
                <Skeleton className="h-10 w-48 rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        {hasOlder && (
          <div className="mb-3 flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoadOlder}
              disabled={messagesQuery.isFetchingNextPage}
            >
              <ArrowUp className="mr-1 size-3" />
              {messagesQuery.isFetchingNextPage ? 'Loading...' : 'Load older messages'}
            </Button>
          </div>
        )}

        {!messagesQuery.isLoading && allMessages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageSquare className="text-muted-foreground/50 size-10" />
            <p className="text-muted-foreground mt-2 text-sm">No messages yet</p>
          </div>
        )}

        {allMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId !== null && msg.senderId !== chat.user.id}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0">
        <MessageComposer onSend={handleSend} disabled={wsStatus !== 'open'} />
      </div>
    </div>
  )
}

const MessageBubble = ({ message, isOwn }: { message: ChatMessageResponse; isOwn: boolean }) => {
  return (
    <div className={cn('mb-1.5 flex', isOwn ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-3.5 py-2 text-sm',
          isOwn ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'
        )}
      >
        <p className="wrap-break-word whitespace-pre-wrap">{message.message ?? '[attachment]'}</p>
        <p
          className={cn(
            'mt-0.5 text-[10px]',
            isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </div>
  )
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
