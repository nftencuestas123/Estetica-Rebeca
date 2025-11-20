'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader, AlertCircle, Lightbulb, MessageCircle, ExternalLink, BookOpen } from 'lucide-react'

interface Source {
  title: string
  url: string
  source: string
  similarity: number
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: Source[]
}

/**
 * Componente: ElevenLabsExpertChat
 * Responsabilidad: Chat interactivo con asistente experto en ElevenLabs
 */
export default function ElevenLabsExpertChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 ¡Hola! Soy tu asistente experto en ElevenLabs. Puedo ayudarte con:\n\n• Configuración de agentes de voz\n• Integración del SDK de JavaScript en tu web\n• Optimización de latencia y calidad\n• Preguntas sobre precios y monetización\n• Mejores prácticas para crear asistentes conversacionales\n\n¿Qué necesitas saber sobre ElevenLabs?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    // Agregar mensaje del usuario
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      // Preparar historial para el API (sin timestamps)
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Llamar al endpoint
      const response = await fetch('/api/admin/elevenlabs-expert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al obtener respuesta')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Error desconocido')
      }

      // Agregar respuesta del asistente con fuentes
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
        sources: data.sources || [],
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el asistente')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-400px)] bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200 overflow-hidden">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-white flex items-center gap-3">
        <Lightbulb className="w-6 h-6" />
        <div>
          <h3 className="font-bold text-lg">Asistente Experto ElevenLabs</h3>
          <p className="text-xs text-amber-100">Especialista en agentes de voz para webs</p>
        </div>
      </div>

      {/* ÁREA DE MENSAJES */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Comienza a hacer preguntas...</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="space-y-2">
              <div
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-black rounded-bl-none border border-slate-300'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words text-black">{msg.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      msg.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Mostrar fuentes si existen */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md xl:max-w-lg bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <p className="text-xs font-semibold text-amber-900">Fuentes Consultadas:</p>
                    </div>
                    <div className="space-y-1">
                      {msg.sources.map((source, sourceIdx) => (
                        <a
                          key={sourceIdx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-amber-800 hover:text-amber-900 transition-colors group"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5 group-hover:text-amber-600" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate group-hover:underline">{source.title}</p>
                            <p className="text-amber-700 text-xs">
                              {source.source} • Similitud: {source.similarity}%
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* INDICADOR DE CARGA */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-black px-4 py-3 rounded-lg border border-slate-300 rounded-bl-none flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-sm text-black">Pensando...</span>
            </div>
          </div>
        )}

        {/* MOSTRAR ERROR */}
        {error && (
          <div className="flex justify-start">
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-200 rounded-bl-none flex items-start gap-2 max-w-xs lg:max-w-md xl:max-w-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT DE MENSAJE */}
      <div className="border-t border-slate-200 bg-white p-4">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pregunta sobre ElevenLabs, agentes de voz, integración en web..."
            disabled={loading}
            rows={3}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none disabled:bg-slate-50 disabled:text-slate-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 h-fit"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          💡 Presiona Enter para enviar, Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  )
}
