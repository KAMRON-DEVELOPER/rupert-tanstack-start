import { useCallback, useRef, useState } from 'react'
import { Camera, Mic, Paperclip, Send, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MAX_TEXTAREA_HEIGHT = 160

type MessageComposerProps = {
  onSend: (text: string) => void
  disabled?: boolean
}

const MessageComposer = ({ onSend, disabled }: MessageComposerProps) => {
  const [text, setText] = useState('')
  const [captureMode, setCaptureMode] = useState<'audio' | 'video'>('audio')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isLongPress = useRef(false)

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0'
    el.style.height = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px'
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    requestAnimationFrame(resizeTextarea)
  }

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
    if (!isLongPress.current) {
      setCaptureMode((prev) => (prev === 'audio' ? 'video' : 'audio'))
    }
  }

  const handleCapturePointerLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const hasText = text.trim().length > 0

  return (
    <div className="flex items-end gap-2 px-4 py-3">
      <div className="bg-muted flex min-h-[2.75rem] flex-1 items-center gap-1 rounded-full px-1.5 py-1.5">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="shrink-0 rounded-full"
          disabled={disabled}
        >
          <Paperclip className="size-4" />
        </Button>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Message"
          rows={1}
          disabled={disabled}
          className="placeholder:text-muted-foreground field-sizing-content max-h-40 min-h-0 flex-1 resize-none bg-transparent px-1 py-1 text-sm outline-none"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="shrink-0 rounded-full"
          disabled={disabled}
        >
          <Smile className="size-4" />
        </Button>
      </div>

      <Button
        type="button"
        variant={hasText ? 'default' : 'secondary'}
        size="icon"
        className="shrink-0 rounded-full"
        disabled={disabled}
        onClick={hasText ? handleSend : undefined}
        onPointerDown={!hasText ? handleCapturePointerDown : undefined}
        onPointerUp={!hasText ? handleCapturePointerUp : undefined}
        onPointerLeave={!hasText ? handleCapturePointerLeave : undefined}
      >
        {hasText ? (
          <Send className="size-4" />
        ) : captureMode === 'audio' ? (
          <Mic className="size-4" />
        ) : (
          <Camera className="size-4" />
        )}
      </Button>
    </div>
  )
}

export default MessageComposer
