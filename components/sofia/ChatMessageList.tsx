/**
 * Componente: Lista de mensajes del chat
 * Responsabilidad: Renderizar la lista de mensajes
 */

import { useEffect, useRef } from 'react'
import { MessageCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Message } from '@/hooks/useChatMessages'

interface ChatMessageListProps {
  messages: Message[]
  loading: boolean
  isMobile?: boolean
}

export default function ChatMessageList({ messages, loading, isMobile = false }: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll automático al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={cn(
      "flex-1 overflow-y-auto p-4 space-y-4 bg-cream-50",
      "overscroll-contain"
    )}>
      {messages.length === 0 && (
        <div className="text-center text-white py-8">
          <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-primary opacity-50" />
          <p className="text-lg sm:text-xl font-medium mb-2">Hola, soy Sofía</p>
          <p className="text-sm sm:text-base px-4">Estoy acá para ayudarte. ¿En qué puedo acompañarte hoy?</p>
        </div>
      )}
      
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'flex',
            message.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              'max-w-[85%] sm:max-w-[80%] rounded-lg px-4 py-3',
              message.role === 'user'
                ? 'bg-primary text-white'
                : 'bg-cream-50 text-white border border-primary-200'
            )}
          >
            <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
            <p className="text-xs mt-1 opacity-70">
              {message.timestamp.toLocaleTimeString('es-PY', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-start">
          <div className="bg-cream-50 border border-primary-200 rounded-lg px-4 py-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

