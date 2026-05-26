import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useChatWebSocket } from '@/hooks/useChatWebSocket'
import { useGetChatMessagesQueryOptions, useGetChatsQueryOptions } from '@/services/chats/chats'

const ChatsPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [participantId, setParticipantId] = useState('')
  const [message, setMessage] = useState('')
  const { status, lastError, lastEvent, send } = useChatWebSocket()
  const chatsQuery = useQuery(useGetChatsQueryOptions())
  const messagesQuery = useQuery({
    ...useGetChatMessagesQueryOptions({
      chatId: selectedChatId ?? '',
      offset: 0,
      limit: 20
    }),
    enabled: Boolean(selectedChatId)
  })

  const chats = chatsQuery.data?.data ?? []
  const messages = messagesQuery.data?.data ?? []

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChatId) ?? null,
    [chats, selectedChatId]
  )

  useEffect(() => {
    if (!selectedChatId || status !== 'open') return
    send({ type: 'join_chat', chatId: selectedChatId })

    return () => {
      send({ type: 'leave_chat', chatId: selectedChatId })
    }
  }, [selectedChatId, send, status])

  const sendMessage = () => {
    const trimmedMessage = message.trim()
    const trimmedParticipantId = participantId.trim()
    if (!trimmedMessage) return

    const didSend = send({
      type: 'send_message',
      message: trimmedMessage,
      chatId: selectedChatId,
      participantId: selectedChatId ? null : trimmedParticipantId,
      replyId: null,
      attachments: []
    })

    if (didSend) setMessage('')
  }

  const createChat = () => {
    const trimmedParticipantId = participantId.trim()
    if (!trimmedParticipantId) return
    send({ type: 'create_chat', participantId: trimmedParticipantId })
  }

  return (
    <main className="col-span-3 grid gap-4 py-8 md:grid-cols-[280px_1fr]">
      <section className="space-y-3">
        <div>
          <p className="text-sm font-medium">Socket: {status}</p>
          {lastError && <p className="text-destructive text-sm">{lastError}</p>}
          {lastEvent && (
            <p className="text-muted-foreground text-xs">Last event: {lastEvent.type}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            value={participantId}
            onChange={(event) => setParticipantId(event.target.value)}
            placeholder="Participant UUID"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={createChat}
            disabled={status !== 'open'}
          >
            Create chat
          </Button>
        </div>

        <div className="space-y-2">
          {chatsQuery.isLoading && <p className="text-sm">Loading chats...</p>}
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => setSelectedChatId(chat.id)}
              className="border-border hover:bg-muted block w-full rounded-md border p-3 text-left"
            >
              <p className="text-sm font-medium">{chat.user.name}</p>
              <p className="text-muted-foreground truncate text-xs">
                {chat.lastMessage?.message ?? 'No messages'}
              </p>
              {chat.unreadCount > 0 && <p className="text-xs">Unread: {chat.unreadCount}</p>}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <p className="font-medium">{activeChat ? activeChat.user.name : 'Select a chat'}</p>
          {selectedChatId && <p className="text-muted-foreground text-xs">{selectedChatId}</p>}
        </div>

        <div className="border-border min-h-64 space-y-2 rounded-md border p-3">
          {messagesQuery.isFetching && (
            <p className="text-muted-foreground text-sm">Loading messages...</p>
          )}
          {messages.map((item) => (
            <div key={item.id} className="text-sm">
              <p>{item.message ?? '[attachment]'}</p>
              <p className="text-muted-foreground text-xs">{item.createdAt}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Message"
          />
          <Button
            type="button"
            onClick={sendMessage}
            disabled={status !== 'open' || (!selectedChatId && !participantId.trim())}
          >
            Send
          </Button>
        </div>
      </section>
    </main>
  )
}

export default ChatsPage
