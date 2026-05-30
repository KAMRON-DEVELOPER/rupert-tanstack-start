import { useState, useDeferredValue } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MessageCircle, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetChatsQueryOptions } from '@/services/chats/chats'
import { useSearchUsersQueryOptions } from '@/services/users/users'
import type { ChatListItemResponse, ChatListUserResponse } from '@/types/chats.schema'

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
    <div className="flex h-full flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
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
              <div className="space-y-1 p-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg p-2">
                    <Skeleton className="size-10 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-1.5">
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

            <div className="space-y-0.5 px-1.5">
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
      </div>
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
      <div className="space-y-1 p-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg p-2">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex-1">
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
    <div className="space-y-0.5 px-1.5">
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
    <div className="hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-2 transition-colors">
      <Avatar>
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
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
        isSelected ? 'bg-accent' : 'hover:bg-muted'
      )}
    >
      <div className="relative shrink-0">
        <Avatar>
          <AvatarImage src={chat.user.avatarUrl ?? undefined} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {chat.isOnline && (
          <span className="border-background absolute right-0 bottom-0 block size-2.5 rounded-full bg-green-500 ring-2" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span
            className={cn('truncate text-sm font-medium', chat.unreadCount > 0 && 'font-semibold')}
          >
            {chat.user.name}
          </span>
          {chat.lastMessage && (
            <span className="text-muted-foreground ml-2 shrink-0 text-xs">
              {formatTime(chat.lastMessage.createdAt)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground truncate text-xs">
            {chat.lastMessage?.message ?? 'No messages'}
          </p>
          {chat.unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground ml-2 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
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
