import { useState, useDeferredValue } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MessageCircle, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetChatsQueryOptions } from '@/api/chats/chats'
import { useSearchUsersQueryOptions } from '@/api/users/users'
import type { ChatListItemResponse } from '@/types/chats/chat'
import { ChatListUserResponse } from '@/types/chats/chat-participant'

const PAGE_SIZE = 20

type ChatListProps = {
  selectedChatId: string | null
  onSelectChat: (chat: ChatListItemResponse) => void
  onStartChat: (participantId: string) => void
}

const ChatList = ({ selectedChatId, onSelectChat, onStartChat }: ChatListProps) => {
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(0)
  const debouncedSearch = useDeferredValue(search)

  const isSearching = debouncedSearch.trim().length > 0

  const chatsQuery = useQuery(useGetChatsQueryOptions({ offset, limit: PAGE_SIZE }))
  const chats = chatsQuery.data?.data ?? []
  const total = chatsQuery.data?.total ?? 0

  const userSearchQuery = useQuery(
    useSearchUsersQueryOptions({
      q: debouncedSearch.trim(),
      offset: 0,
      limit: PAGE_SIZE
    })
  )

  const searchResults = userSearchQuery.data?.data ?? []
  const canLoadMore = offset + PAGE_SIZE < total

  const handleLoadMore = () => {
    setOffset((prev) => prev + PAGE_SIZE)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 px-3 py-3">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-muted/60 h-11 rounded-xl border-transparent pr-3 pl-10 shadow-none"
          />
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1" viewportClassName="overflow-x-hidden">
        {isSearching ? (
          <UserSearchResults
            results={searchResults}
            isLoading={userSearchQuery.isLoading}
            onStartChat={(participantId) => {
              onStartChat(participantId)
              setSearch('')
            }}
          />
        ) : (
          <>
            {chatsQuery.isLoading && (
              <div className="space-y-1 px-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex h-16 items-center gap-3 rounded-xl px-3">
                    <Skeleton className="size-11 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-40" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!chatsQuery.isLoading && chats.length === 0 && (
              <p className="text-muted-foreground px-4 py-8 text-center text-sm">No chats yet</p>
            )}

            <div className="space-y-1 px-3">
              {chats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isSelected={chat.id === selectedChatId}
                  onSelect={() => onSelectChat(chat)}
                />
              ))}
            </div>

            {canLoadMore && (
              <div className="p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={handleLoadMore}
                  disabled={chatsQuery.isFetching}
                >
                  {chatsQuery.isFetching ? 'Loading...' : 'Load more'}
                </Button>
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  )
}

const UserSearchResults = ({
  results,
  isLoading,
  onStartChat
}: {
  results: ChatListUserResponse[]
  isLoading: boolean
  onStartChat: (participantId: string) => void
}) => {
  if (isLoading) {
    return (
      <div className="space-y-1 px-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex h-16 items-center gap-3 rounded-xl px-3">
            <Skeleton className="size-11 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return <p className="text-muted-foreground px-4 py-8 text-center text-sm">No users found</p>
  }

  return (
    <div className="space-y-1 px-3">
      {results.map((user) => (
        <UserSearchItem key={user.id} user={user} onStartChat={() => onStartChat(user.id)} />
      ))}
    </div>
  )
}

const UserSearchItem = ({
  user,
  onStartChat
}: {
  user: ChatListUserResponse
  onStartChat: () => void
}) => {
  const initials = getInitials(user.firstName, user.lastName)

  return (
    <div className="hover:bg-muted/80 flex h-16 min-w-0 items-center gap-3 rounded-xl px-3 transition-colors">
      <Avatar className="size-11 shrink-0">
        <AvatarImage src={user.avatarUrl ?? undefined} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <span className="min-w-0 flex-1 truncate text-sm font-medium">{user.name}</span>

      <Button variant="ghost" size="icon" className="size-8 shrink-0" onClick={onStartChat}>
        <MessageCircle className="size-4" />
      </Button>
    </div>
  )
}

const ChatListItem = ({
  chat,
  isSelected,
  onSelect
}: {
  chat: ChatListItemResponse
  isSelected: boolean
  onSelect: () => void
}) => {
  const initials = getInitials(chat.user.firstName, chat.user.lastName)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex h-16 w-full min-w-0 items-center gap-3 rounded-xl px-3 text-left transition-colors',
        isSelected ? 'bg-accent' : 'hover:bg-muted/80'
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="size-11">
          <AvatarImage src={chat.user.avatarUrl ?? undefined} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {chat.user.isOnline && (
          <span className="border-background absolute right-0 bottom-0 block size-3 rounded-full border-2 bg-emerald-500" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-sm font-medium',
              chat.unreadCount > 0 && 'font-semibold'
            )}
          >
            {chat.user.name}
          </span>
          {chat.lastMessage && (
            <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
              {formatTime(chat.lastMessage.createdAt)}
            </span>
          )}
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2">
          <p className="text-muted-foreground min-w-0 flex-1 truncate text-xs">
            {getPreview(chat)}
          </p>
          {chat.unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-medium tabular-nums">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function getPreview(chat: ChatListItemResponse) {
  const message = chat.lastMessage
  if (!message) return 'No messages'
  if (message.message) return message.message
  const count = message.attachments.length
  if (count === 0) return 'Attachment'
  return count === 1 ? message.attachments[0]?.label || 'Attachment' : `${count} attachments`
}

function getInitials(firstName: string, lastName?: string | null) {
  const first = firstName?.charAt(0) ?? ''
  const last = lastName?.charAt(0) ?? ''
  return (first + last).toUpperCase() || '?'
}

function formatTime(iso: string) {
  const date = new Date(iso)
  const now = new Date()
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const isThisYear = date.getFullYear() === now.getFullYear()
  if (isThisYear) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })
}

export default ChatList
