'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { chatWithSofia } from '@/lib/openrouter-service'
import type { SofiaMessage } from '@/lib/openrouter-service'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatSofiaProps {
  userId?: string
  initialMessage?: string
  position?: 'floating' | 'embedded'
}

export default function ChatSofia({ userId, initialMessage, position = 'floating' }: ChatSofiaProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState<string | undefined>()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cargar historial de conversación si hay userId
  useEffect(() => {
    if (userId && isOpen) {
      loadConversationHistory()
    }
  }, [userId, isOpen])

  // Scroll automático al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus en input cuando se abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const loadConversationHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('conversaciones_sofia')
        .select('mensaje_usuario, respuesta_sofia, timestamp')
        .eq('usuario_id', userId)
        .order('timestamp', { ascending: true })
        .limit(10)

      if (data && !error) {
        const history: Message[] = []
        data.forEach((conv) => {
          history.push({
            id: `user-${conv.timestamp}`,
            role: 'user',
            content: conv.mensaje_usuario,
            timestamp: new Date(conv.timestamp),
          })
          history.push({
            id: `assistant-${conv.timestamp}`,
            role: 'assistant',
            content: conv.respuesta_sofia,
            timestamp: new Date(conv.timestamp),
          })
        })
        setMessages(history)
      }
    } catch (error) {
      console.error('Error cargando historial:', error)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    // Agregar mensaje del usuario
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newUserMessage])

    // Extraer nombre si no lo tenemos
    if (!nombreUsuario) {
      const nombreMatch = userMessage.match(/me llamo ([A-Za-zÁÉÍÓÚáéíóúÑñ]+)|soy ([A-Za-zÁÉÍÓÚáéíóúÑñ]+)|mi nombre es ([A-Za-zÁÉÍÓÚáéíóúÑñ]+)/i)
      if (nombreMatch) {
        const nombre = nombreMatch[1] || nombreMatch[2] || nombreMatch[3]
        setNombreUsuario(nombre)
      }
    }

    try {
      // Construir historial para OpenRouter
      const historial: SofiaMessage[] = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Obtener respuesta de Sofía
      const response = await chatWithSofia(userMessage, historial, nombreUsuario)

      // Agregar respuesta de Sofía
      const sofiaMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.respuesta,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, sofiaMessage])

      // Guardar en Supabase si hay userId
      if (userId) {
        await supabase.from('conversaciones_sofia').insert({
          usuario_id: userId,
          sesion_id: `session-${Date.now()}`,
          mensaje_usuario: userMessage,
          respuesta_sofia: response.respuesta,
          tipo_interaccion: response.accion_sugerida,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error('Error en chat:', error)
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Disculpame, estoy teniendo problemas técnicos. ¿Podrías intentar de nuevo en un momento?',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (position === 'embedded') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-neutral-600 py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium mb-2">Hola, soy Sofía</p>
              <p className="text-sm">Estoy acá para ayudarte. ¿En qué puedo acompañarte hoy?</p>
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
                  'max-w-[80%] rounded-lg px-4 py-2',
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-neutral-200 text-neutral-800'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
              <div className="bg-neutral-200 rounded-lg px-4 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribí tu mensaje..."
              className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center z-50"
          aria-label="Abrir chat con Sofía"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-neutral-200">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Sofía Barreto</h3>
                <p className="text-xs opacity-90">Estoy acá para ayudarte</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
            {messages.length === 0 && (
              <div className="text-center text-neutral-600 py-8">
                <p className="text-lg font-medium mb-2">Hola, soy Sofía</p>
                <p className="text-sm">Estoy acá para ayudarte. ¿En qué puedo acompañarte hoy?</p>
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
                    'max-w-[80%] rounded-lg px-4 py-2',
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-neutral-800 border border-neutral-200'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                <div className="bg-white border border-neutral-200 rounded-lg px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribí tu mensaje..."
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

