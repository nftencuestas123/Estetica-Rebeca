/**
 * Componente: Input del chat
 * Responsabilidad: Input y botón de enviar mensaje
 */

import { useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputFormProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  loading: boolean
  isMobile?: boolean
  autoFocus?: boolean
}

export default function ChatInputForm({
  value,
  onChange,
  onSend,
  loading,
  isMobile = false,
  autoFocus = false,
}: ChatInputFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [autoFocus])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className={cn(
      "border-t p-3 sm:p-4 bg-cream-50",
      isMobile ? "" : "rounded-b-lg"
    )}>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribí tu mensaje..."
          className={cn(
            "flex-1 px-4 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base",
            isMobile ? "py-3 text-base" : "py-2"
          )}
          disabled={loading}
        />
        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className={cn(
            "bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors touch-manipulation",
            isMobile ? "px-5 py-3 min-w-[56px]" : "px-4 py-2"
          )}
        >
          {loading ? (
            <Loader2 className={cn(isMobile ? "w-5 h-5" : "w-4 h-4", "animate-spin")} />
          ) : (
            <Send className={cn(isMobile ? "w-5 h-5" : "w-4 h-4")} />
          )}
        </button>
      </div>
    </div>
  )
}

