/**
 * Componente de input de chat
 * Responsabilidad: Capturar y enviar mensajes del usuario
 */

'use client'

import { Send, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  loading: boolean
  placeholder?: string
  inputRef?: React.RefObject<HTMLInputElement>
}

export function ChatInput({
  value,
  onChange,
  onSend,
  loading,
  placeholder = 'Escribí tu mensaje...',
  inputRef,
}: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loading && value.trim()) {
      onSend()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={loading}
        className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-primary-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base sm:text-lg text-white placeholder-primary-300 min-h-[48px]"
      />
      <motion.button
        type="submit"
        disabled={loading || !value.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-transparent rounded-xl sm:rounded-2xl font-semibold hover:from-primary-500 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg transition-all touch-manipulation min-h-[48px] min-w-[48px]"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          <Send className="w-5 h-5 text-white" />
        )}
      </motion.button>
    </form>
  )
}

