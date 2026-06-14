import { useEffect, useRef, useState } from 'react'
import { AlertCircle, MessageSquare } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useGetChatsQueryOptions } from '@/api/chats/chats'
import { useWebSocket, useWebSocketEvent } from '@/hooks/useWebsocket'
import ChatList from './ChatList'
import ChatDetails from './ChatDetails'
import type { ChatListItemResponse } from '@/types/chats/chat'

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState<ChatListItemResponse | null>(null)
  const { status, send, authFailed } = useWebSocket()

  const chatsQuery = useQuery(useGetChatsQueryOptions())
  const chats = chatsQuery.data?.data ?? []

  const pendingRef = useRef<{
    participantId: string
    chatId: string | null
  } | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // When we only got IDs from chat_created, wait for the chat to appear in cache
  useEffect(() => {
    const pending = pendingRef.current
    if (!pending || !pending.chatId) return

    const match = chats.find((c) => c.id === pending.chatId)
    if (match) {
      pendingRef.current = null
      setSelectedChat(match)
    }
  }, [chats])

  const handleStartChat = (participantId: string) => {
    pendingRef.current = { participantId, chatId: null }
    send({ type: 'create_chat', participantId })
  }

  if (authFailed) {
    return (
      <main className="col-span-4 flex flex-col items-center justify-center gap-4 py-16">
        <AlertCircle className="text-destructive size-12" />
        <div className="text-center">
          <p className="text-lg font-medium">Something went wrong</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Please refresh the page to try again.
          </p>
        </div>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </main>
    )
  }

  return (
    <main className="col-span-4 grid h-[calc(100vh-6rem)] md:grid-cols-[320px_1fr]">
      <aside className="overflow-hidden border-r">
        <ChatList
          selectedChatId={selectedChat?.id ?? null}
          onSelectChat={setSelectedChat}
          onStartChat={handleStartChat}
        />
      </aside>

      <section className="overflow-hidden">
        {selectedChat ? (
          <ChatDetails key={selectedChat.id} chat={selectedChat} send={send} wsStatus={status} />
        ) : (
          <EmptyState />
        )}
      </section>
    </main>
  )
}

const EmptyState = () => (
  <div className="flex h-full flex-col items-center justify-center text-center">
    <MessageSquare className="text-muted-foreground/40 size-16" />
    <p className="text-muted-foreground mt-4 text-lg font-medium">Select a chat</p>
    <p className="text-muted-foreground/70 mt-1 text-sm">
      Choose a conversation from the sidebar to start messaging
    </p>
  </div>
)

export default ChatsPage
