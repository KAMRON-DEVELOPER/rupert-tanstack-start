import { useEffect, useRef, useState } from 'react'
import { AlertCircle, MessageSquare } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetChatsQueryOptions } from '@/api/chats/chats'
import { useWebSocket, useWebSocketEvent } from '@/hooks/useWebsocket'
import ChatList from './chats/ChatList'
import ChatDetails from './chats/ChatDetails'
import type { ChatListItemResponse } from '@/types/chats/chat'

const MessagesPage = () => {
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
      <div className="flex h-[calc(100vh-3rem)] flex-col items-center justify-center gap-4 md:h-[calc(100vh-3.5rem)]">
        <AlertCircle className="text-destructive size-12" />
        <div className="text-center">
          <p className="text-lg font-medium">Something went wrong</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Please refresh the page to try again.
          </p>
        </div>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3rem)] md:h-[calc(100vh-3.5rem)]">
      <aside className="flex w-full shrink-0 flex-col border-r md:w-80">
        <Tabs defaultValue="chats" className="flex min-h-0 flex-1 flex-col">
          <div className="shrink-0 px-3 pt-2">
            <TabsList variant="line" className="w-full">
              <TabsTrigger value="chats" className="flex-1">
                Chats
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex-1" disabled>
                Groups
              </TabsTrigger>
            </TabsList>
          </div>
          <ChatList
            selectedChatId={selectedChat?.id ?? null}
            onSelectChat={setSelectedChat}
            onStartChat={handleStartChat}
          />
        </Tabs>
      </aside>

      <main className="hidden min-w-0 flex-1 md:block">
        {selectedChat ? (
          <ChatDetails key={selectedChat.id} chat={selectedChat} send={send} wsStatus={status} />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
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

export default MessagesPage
