import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent
} from 'react'
import { Camera, Mic, Paperclip, Send, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MAX_TEXTAREA_HEIGHT = 160

type MessageComposerProps = {
  onSend: (text: string) => void
  onHeightChange?: (height: number) => void
  onTypingChange?: (isTyping: boolean) => void
  disabled?: boolean
}

const MessageComposer = ({
  onSend,
  onHeightChange,
  onTypingChange,
  disabled
}: MessageComposerProps) => {
  const [text, setText] = useState('')
  const [captureMode, setCaptureMode] = useState<'audio' | 'video'>('audio')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const recordingTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const typingStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typingSentRef = useRef(false)
  const isLongPress = useRef(false)

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0'
    el.style.height = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px'
  }, [])

  const stopTyping = useCallback(() => {
    if (!typingSentRef.current) return
    typingSentRef.current = false
    onTypingChange?.(false)
  }, [onTypingChange])

  const scheduleTypingStop = useCallback(() => {
    if (typingStopTimer.current) clearTimeout(typingStopTimer.current)
    typingStopTimer.current = setTimeout(stopTyping, 1400)
  }, [stopTyping])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nextText = e.target.value
    setText(nextText)
    if (nextText.trim().length > 0 && !disabled) {
      if (!typingSentRef.current) {
        typingSentRef.current = true
        onTypingChange?.(true)
      }
      scheduleTypingStop()
    } else {
      if (typingStopTimer.current) clearTimeout(typingStopTimer.current)
      stopTyping()
    }
    requestAnimationFrame(resizeTextarea)
  }

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    if (typingStopTimer.current) clearTimeout(typingStopTimer.current)
    stopTyping()
    setText('')
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = '0'
        resizeTextarea()
      }
    })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCapturePointerDown = () => {
    if (disabled) return
    isLongPress.current = false
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true
      setIsRecording(true)
      setRecordingSeconds(0)
      recordingTimer.current = setInterval(() => {
        setRecordingSeconds((seconds) => seconds + 1)
      }, 1000)
    }, 500)
  }

  const handleCapturePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current)
      recordingTimer.current = null
    }
    if (!isLongPress.current) {
      setCaptureMode((prev) => (prev === 'audio' ? 'video' : 'audio'))
    }
    setIsRecording(false)
  }

  const handleCapturePointerLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    if (!isLongPress.current) return
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current)
      recordingTimer.current = null
    }
    setIsRecording(false)
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root || !onHeightChange) return

    const observer = new ResizeObserver(([entry]) => {
      if (entry) onHeightChange(entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height)
    })
    observer.observe(root)
    onHeightChange(root.getBoundingClientRect().height)
    return () => observer.disconnect()
  }, [onHeightChange])

  useEffect(() => {
    resizeTextarea()
  }, [resizeTextarea])

  useEffect(() => {
    return () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current)
      if (recordingTimer.current) clearInterval(recordingTimer.current)
      if (typingStopTimer.current) clearTimeout(typingStopTimer.current)
      stopTyping()
    }
  }, [stopTyping])

  const hasText = text.trim().length > 0

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pt-8 pb-3 sm:px-4 sm:pb-4"
    >
      <div
        className="bg-background/75 pointer-events-auto mx-auto flex max-w-4xl items-end gap-2 rounded-[1.85rem] border p-1.5 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        aria-label="Message composer"
      >
        <div className="flex min-w-0 flex-1 items-stretch gap-px">
          <div className="bg-card flex w-12 shrink-0 items-end justify-center rounded-l-[1.45rem]">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mb-2 size-8 rounded-full"
              disabled={disabled}
              aria-label="Attach file"
            >
              <Paperclip className="size-4" />
            </Button>
          </div>

          <div className="bg-card flex min-h-12 min-w-0 flex-1 items-center px-2 py-1.5">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={disabled ? 'Connecting...' : 'Message'}
              rows={1}
              disabled={disabled}
              className="placeholder:text-muted-foreground max-h-40 min-h-9 w-full min-w-0 resize-none overflow-x-hidden overflow-y-auto bg-transparent px-1 py-2 text-sm leading-5 wrap-break-word whitespace-pre-wrap outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="bg-card flex w-12 shrink-0 items-end justify-center rounded-r-[1.45rem]">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mb-2 size-8 rounded-full"
              disabled={disabled}
              aria-label="Emoji, stickers, and GIFs"
            >
              <Smile className="size-4" />
            </Button>
          </div>
        </div>

        <Button
          type="button"
          variant={hasText ? 'default' : isRecording ? 'destructive' : 'default'}
          size="icon"
          className={cn(
            'bg-card text-foreground hover:bg-card/90 relative size-12 shrink-0 rounded-full transition-colors',
            isRecording && 'shadow-destructive/20 shadow-lg'
          )}
          disabled={disabled}
          aria-label={hasText ? 'Send message' : `${captureMode} capture`}
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
          {isRecording && (
            <span className="bg-destructive text-destructive-foreground absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] font-medium tabular-nums">
              {formatRecordingTime(recordingSeconds)}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

function formatRecordingTime(seconds: number) {
  if (seconds < 60) return String(seconds)
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

export default MessageComposer
