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
  const [showTooltip, setShowTooltip] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Bloquear scroll del body cuando el chat está abierto en móvil
  useEffect(() => {
    if (isOpen && isMobile) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Mostrar tooltip al abrir
      setShowTooltip(true)
      const timer = setTimeout(() => setShowTooltip(false), 4000)

      return () => {
        clearTimeout(timer)
        // Restaurar scroll cuando se cierra
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }, [isOpen, isMobile])

  // Cargar historial de conversación si hay userId
  useEffect(() => {
    if (userId && isOpen) {
      loadConversationHistory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="text-center text-primary-300 py-8">
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
                    : 'bg-cream-200 text-primary-200'
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
              <div className="bg-cream-200 rounded-lg px-4 py-2">
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
              className="flex-1 px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 transition-all flex items-center justify-center z-50 touch-manipulation"
          aria-label="Abrir chat con Sofía"
        >
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>
      )}

      {/* Chat window - Fullscreen en móvil, ventana en desktop */}
      {isOpen && (
        <div className={cn(
          "fixed flex flex-col z-[9999] bg-cream-50 shadow-2xl",
          isMobile 
            ? "inset-0 h-screen w-screen" // Fullscreen en móvil
            : "bottom-6 right-6 w-96 h-[600px] rounded-lg border border-primary-200" // Ventana en desktop
        )}>
          {/* Header con tooltip mejorado */}
          <div className="bg-primary text-white p-4 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cream-100/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Sofía Barreto</h3>
                <p className="text-xs opacity-90">Estoy acá para ayudarte</p>
              </div>
            </div>
            
            {/* Botón de cerrar con tooltip mejorado */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => !isMobile && setShowTooltip(true)}
                onMouseLeave={() => !isMobile && setShowTooltip(false)}
                className={cn(
                  "hover:bg-cream-100/20 rounded-full p-2 transition-colors touch-manipulation",
                  "flex items-center justify-center",
                  isMobile ? "min-w-[44px] min-h-[44px]" : "min-w-[32px] min-h-[32px]"
                )}
                aria-label="Cerrar chat"
              >
                <X className={cn(isMobile ? "w-6 h-6" : "w-5 h-5")} />
              </button>
              
              {/* Tooltip con animación */}
              {showTooltip && (
                <div className={cn(
                  "absolute top-full right-0 mt-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-[10000]",
                  "animate-in fade-in slide-in-from-top-2 duration-200",
                  isMobile ? "w-64 text-center" : ""
                )}>
                  {isMobile ? (
                    <>
                      <span className="font-semibold block mb-1">💡 Para salir del modo chat</span>
                      <span className="block">Hacé clic en esta ✕ para volver a navegar</span>
                    </>
                  ) : (
                    "Cerrar chat"
                  )}
                  {/* Flecha del tooltip */}
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-neutral-900 transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>

          {/* Messages - Con altura adecuada para móvil */}
          <div className={cn(
            "flex-1 overflow-y-auto p-4 space-y-4 bg-cream-50",
            "overscroll-contain" // Previene scroll fuera del contenedor
          )}>
            {messages.length === 0 && (
              <div className="text-center text-primary-300 py-8">
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
                      : 'bg-cream-50 text-primary-200 border border-primary-200'
                  )}
                >
                  <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
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

          {/* Input - Optimizado para móvil */}
          <div className={cn(
            "border-t p-3 sm:p-4 bg-cream-50",
            isMobile ? "" : "rounded-b-lg"
          )}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribí tu mensaje..."
                className={cn(
                  "flex-1 px-4 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base",
                  isMobile ? "py-3 text-base" : "py-2" // Input más grande en móvil
                )}
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className={cn(
                  "bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors touch-manipulation",
                  isMobile ? "px-5 py-3 min-w-[56px]" : "px-4 py-2" // Botón más grande en móvil
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
        </div>
      )}
    </>
  )
}








