/**
 * Componente de mensaje de chat
 * Responsabilidad: Renderizar un mensaje individual
 */

'use client'

import { motion } from 'framer-motion'
import type { Message } from '@/types/sofia.types'

interface ChatMessageProps {
  message: Message
  index: number
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-md ${
          isUser
            ? 'bg-black border-2 border-primary-400 text-primary-400'
            : 'bg-cream-50 border-2 border-primary-200 text-white shadow-md'
        }`}
      >
        {!isUser && message.agentName && (
          <p className="text-xs font-semibold text-white mb-1">{message.agentName}</p>
        )}
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            message.role === 'user' ? 'text-primary-400 font-medium' : 'text-white'
          }`}
        >
          {message.isTyping ? message.displayedContent : message.content}
          {message.isTyping && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1"
            >
              ▊
            </motion.span>
          )}
        </p>
        <p
          className={`text-xs mt-2 ${
            message.role === 'user' ? 'text-primary-500/70' : 'text-white'
          }`}
        >
          {message.timestamp.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  )
}

