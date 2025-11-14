'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { chatWithSofia } from '@/lib/openrouter-service'
import type { SofiaMessage } from '@/lib/openrouter-service'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  agentName?: string
  isTyping?: boolean // Para rastrear si el mensaje está siendo escrito
  displayedContent?: string // Contenido que se muestra mientras se escribe
  hasTypo?: boolean // Para rastrear si hay un error de typing que necesita corrección
  typoChar?: string // Carácter incorrecto que se escribió
}

interface Agent {
  id: string
  name: string
  image: string
  status: 'available' | 'in-conversation' | 'away'
  currentConversations: number
}

interface SofiaSectionProps {
  userId?: string
}

const AGENTS: Agent[] = [
  {
    id: 'sofia',
    name: 'Sofía',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
  {
    id: 'maria',
    name: 'María',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
  {
    id: 'ana',
    name: 'Ana',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
  {
    id: 'laura',
    name: 'Laura',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
  {
    id: 'carmen',
    name: 'Carmen',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
]

export default function SofiaSection({ userId }: SofiaSectionProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  const [agents, setAgents] = useState<Agent[]>(AGENTS)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Asignar agente al iniciar conversación
  useEffect(() => {
    if (messages.length === 0 && !currentAgent) {
      assignAgent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scroll automático al final - Siempre mostrar los mensajes nuevos arriba
  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      // Pequeño delay para que el mensaje se renderice
      setTimeout(() => {
        const container = messagesContainerRef.current
        if (container) {
          // Siempre hacer scroll al final para mostrar los mensajes nuevos
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
          })
        }
      }, 50)
    }
  }, [messages])

  // Scroll adicional mientras se está escribiendo (typing effect)
  useEffect(() => {
    const typingMessages = messages.filter((msg) => msg.isTyping && msg.role === 'assistant')
    if (typingMessages.length > 0 && messagesContainerRef.current) {
      // Hacer scroll suave mientras se escribe
      const container = messagesContainerRef.current
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        })
      }, 50)
    }
  }, [messages])

  // Focus en input
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [])

  // Simular cambios de estado de agentes (muy dinámico)
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => {
          if (agent.id === currentAgent?.id) return agent
          // Simular cambios de estado aleatorios
          const random = Math.random()
          if (random > 0.7) {
            return {
              ...agent,
              status: random > 0.85 ? 'in-conversation' : 'available',
              currentConversations: random > 0.85 ? Math.floor(Math.random() * 3) + 1 : 0,
            }
          }
          return agent
        })
      )
    }, 3000) // Cambios cada 3 segundos

    return () => clearInterval(interval)
  }, [currentAgent])

  // Efecto de typing - Escribir letra por letra con errores ocasionales y pausas
  useEffect(() => {
    const typingMessages = messages.filter((msg) => msg.isTyping && msg.role === 'assistant')
    
    if (typingMessages.length === 0) return

    const timeouts: NodeJS.Timeout[] = []

    typingMessages.forEach((msg) => {
      const fullText = msg.content
      const currentDisplayed = msg.displayedContent || ''
      const hasTypo = msg.hasTypo || false
      const typoChar = msg.typoChar
      
      // Si hay un error de typing, corregirlo primero
      if (hasTypo && typoChar) {
        // Borrar el carácter incorrecto
        const timeout1 = setTimeout(() => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msg.id
                ? {
                    ...m,
                    displayedContent: currentDisplayed.slice(0, -1), // Borrar último carácter
                    hasTypo: false,
                    typoChar: undefined,
                  }
                : m
            )
          )
          // Scroll mientras se corrige
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
              top: messagesContainerRef.current.scrollHeight,
              behavior: 'smooth',
            })
          }
        }, 100 + Math.random() * 100) // Pausa antes de borrar
        
        timeouts.push(timeout1)
        
        // Escribir el carácter correcto después de borrar
        const timeout2 = setTimeout(() => {
          // La posición correcta es la longitud del texto sin el typo
          const correctPosition = currentDisplayed.length - 1
          const correctChar = fullText[correctPosition]
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msg.id
                ? {
                    ...m,
                    displayedContent: currentDisplayed.slice(0, -1) + correctChar,
                  }
                : m
            )
          )
          // Scroll mientras se escribe
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
              top: messagesContainerRef.current.scrollHeight,
              behavior: 'smooth',
            })
          }
        }, 200 + Math.random() * 150) // Pausa antes de escribir correcto
        
        timeouts.push(timeout2)
        return
      }
      
      if (currentDisplayed.length < fullText.length) {
        const progress = currentDisplayed.length / fullText.length
        const nextChar = fullText[currentDisplayed.length]
        
        // Velocidad base variable (40-80ms por carácter)
        let typingSpeed = 40 + Math.random() * 40
        
        // Ajustar velocidad según progreso
        if (progress < 0.1) typingSpeed *= 1.8 // Más lento al inicio (pensando)
        else if (progress > 0.9) typingSpeed *= 1.5 // Más lento al final
        else typingSpeed *= 0.7 // Más rápido en el medio
        
        // Pausas aleatorias ocasionales (como si estuviera pensando)
        // 5% de probabilidad de pausa larga (300-800ms)
        if (Math.random() < 0.05 && progress > 0.2 && progress < 0.8) {
          typingSpeed += 300 + Math.random() * 500
        }
        
        // 15% de probabilidad de pausa corta (100-300ms)
        if (Math.random() < 0.15) {
          typingSpeed += 100 + Math.random() * 200
        }
        
        // 8% de probabilidad de escribir un error (solo en letras, no en espacios o puntuación)
        const shouldMakeTypo = 
          Math.random() < 0.08 && 
          /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nextChar) && 
          currentDisplayed.length > 0 &&
          progress > 0.1 &&
          progress < 0.9
        
        if (shouldMakeTypo) {
          // Escribir un carácter incorrecto similar
          const wrongCharsMap: Record<string, string> = {
            'a': 's', 'e': 'r', 'i': 'o', 'o': 'p', 'u': 'y',
            's': 'a', 'r': 't', 'p': 'o', 'y': 'u',
            'n': 'm', 'm': 'n', 't': 'r',
            'd': 'f', 'f': 'd', 'g': 'h', 'h': 'g',
          }
          const wrongChar = wrongCharsMap[nextChar.toLowerCase()] || 
                           String.fromCharCode(nextChar.charCodeAt(0) + 1) || 'x'
          const finalWrongChar = nextChar === nextChar.toUpperCase() 
            ? wrongChar.toUpperCase() 
            : wrongChar
          
          const timeout = setTimeout(() => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === msg.id
                  ? {
                      ...m,
                      displayedContent: currentDisplayed + finalWrongChar,
                      hasTypo: true,
                      typoChar: finalWrongChar,
                    }
                  : m
              )
            )
            // Scroll mientras se escribe (incluso el error)
            if (messagesContainerRef.current) {
              messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth',
              })
            }
          }, typingSpeed)
          
          timeouts.push(timeout)
        } else {
          // Escribir el carácter correcto normalmente
          const timeout = setTimeout(() => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === msg.id
                  ? {
                      ...m,
                      displayedContent: currentDisplayed + nextChar,
                    }
                  : m
              )
            )
            // Scroll mientras se escribe
            if (messagesContainerRef.current) {
              messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth',
              })
            }
          }, typingSpeed)
          
          timeouts.push(timeout)
        }
      } else {
        // Terminó de escribir
        const timeout = setTimeout(() => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msg.id
                ? {
                    ...m,
                    isTyping: false,
                    displayedContent: fullText,
                    hasTypo: false,
                    typoChar: undefined,
                  }
                : m
            )
          )
        }, 100)
        
        timeouts.push(timeout)
      }
    })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [messages])

  const assignAgent = () => {
    // Encontrar agente disponible
    const availableAgents = agents.filter((a) => a.status === 'available')
    const agent = availableAgents.length > 0
      ? availableAgents[Math.floor(Math.random() * availableAgents.length)]
      : agents[Math.floor(Math.random() * agents.length)]

    setCurrentAgent(agent)
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agent.id
          ? { ...a, status: 'in-conversation', currentConversations: a.currentConversations + 1 }
          : a
      )
    )

    // Mensaje de bienvenida con el nombre del agente
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `¡Hola! Soy ${agent.name}, estoy acá para ayudarte. ¿En qué puedo acompañarte hoy?`,
        timestamp: new Date(),
        agentName: agent.name,
      },
    ])
  }

  const loadConversationHistory = async () => {
    if (!userId || !currentAgent) return
    try {
      const { data, error } = await supabase
        .from('conversaciones_sofia')
        .select('mensaje_usuario, respuesta_sofia, timestamp, agente_asignado')
        .eq('usuario_id', userId)
        .eq('agente_asignado', currentAgent.name)
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
            agentName: conv.agente_asignado || currentAgent.name,
          })
        })
        setMessages(history)
      }
    } catch (error) {
      console.error('Error cargando historial:', error)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading || !currentAgent) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    // Completar inmediatamente cualquier mensaje anterior que esté siendo escrito
    // y construir el historial con los mensajes completados
    const completedMessages = messages.map((m) =>
      m.isTyping && m.role === 'assistant'
        ? {
            ...m,
            isTyping: false,
            displayedContent: m.content, // Completar el contenido
            hasTypo: false,
            typoChar: undefined,
          }
        : m
    )

    // Actualizar el estado con los mensajes completados
    setMessages(completedMessages)

    // Agregar mensaje del usuario
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }
    
    const messagesWithUser = [...completedMessages, newUserMessage]
    setMessages(messagesWithUser)

    try {
      // Construir historial para OpenRouter con el nombre del agente
      // Usar el contenido completo de los mensajes completados
      const historial: SofiaMessage[] = completedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content, // Siempre usar el contenido completo
      }))

      // Llamar a la API route del servidor (más seguro para API keys)
      const apiResponse = await fetch('/api/sofia/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mensaje: userMessage,
          usuario_id: userId,
          historial: historial,
          nombreAgente: currentAgent.name,
        }),
      })

      if (!apiResponse.ok) {
        throw new Error(`API error: ${apiResponse.status}`)
      }

      const response = await apiResponse.json()

      // Agregar respuesta de la agente con efecto de typing
      const fullContent = response.respuesta || response.error || 'Lo siento, no pude procesar tu mensaje.'
      const agentMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fullContent,
        timestamp: new Date(),
        agentName: currentAgent.name,
        isTyping: true, // Marcar como "escribiendo"
        displayedContent: '', // Empezar con contenido vacío
      }
      setMessages((prev) => [...prev, agentMessage])
    } catch (error) {
      console.error('Error en chat:', error)
      // El error ya viene manejado desde chatWithSofia con un mensaje amigable
      // Solo agregamos el mensaje de error si no se recibió respuesta
      const errorContent = `Hola! Soy ${currentAgent.name}. Disculpame, parece que hubo un problema técnico. ¿Podrías intentar de nuevo en un momento? Estoy acá para ayudarte siempre.`
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
        agentName: currentAgent.name,
        isTyping: true, // Marcar como "escribiendo"
        displayedContent: '', // Empezar con contenido vacío
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
      // Focus en el input después de enviar
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading && currentAgent) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0">
        {/* Background decorativo - Simplificado en móvil */}
        <div className="hidden md:block">
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-rose-400/20 via-gold-400/20 to-accent-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent-400/20 to-rose-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-rose-400/30 to-gold-400/30 border-2 border-rose-400/40 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6"
            animate={{
              boxShadow: [
                '0 0 30px rgba(255,107,157,0.4)',
                '0 0 50px rgba(255,107,157,0.7)',
                '0 0 30px rgba(255,107,157,0.4)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-rose-600 to-gold-600 bg-clip-text text-transparent">
              Atención al Cliente en Vivo
            </span>
          </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-100 mb-4 sm:mb-6 px-4">
            Nuestro{' '}
            <span className="bg-gradient-to-r from-rose-500 via-gold-400 to-accent-400 bg-clip-text text-transparent animate-gradient">
              Equipo
            </span>
          </h2>
              <p className="text-base sm:text-lg md:text-xl font-light text-primary-200 max-w-2xl mx-auto px-4">
            Cinco especialistas disponibles para ayudarte con cualquier consulta sobre tratamientos, citas y más.
          </p>
        </motion.div>

        {/* Equipo de 5 Agentes - MUY DINÁMICO Y GRANDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 px-4">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.08, y: -10 }}
                className={`relative p-6 rounded-3xl md:backdrop-blur-md border-3 transition-all cursor-pointer overflow-hidden ${
                  currentAgent?.id === agent.id
                    ? 'bg-gradient-to-br from-rose-100/90 via-gold-100/80 to-rose-100/90 border-rose-400 shadow-2xl'
                    : 'bg-cream-100/80 border-rose-200/60 hover:border-rose-400 hover:shadow-xl'
                }`}
                onClick={() => {
                  if (agent.status === 'available') {
                    setCurrentAgent(agent)
                    assignAgent()
                  }
                }}
              >
                {/* Fondo decorativo animado */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-rose-400/10 via-gold-400/10 to-accent-400/10 opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Imagen del agente - MUY GRANDE */}
                <div className="relative mx-auto mb-4">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {/* Anillo decorativo exterior */}
                    <motion.div
                      className="absolute -inset-4 rounded-full border-3 border-rose-300/50"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.5, 0.8, 0.5],
                        rotate: [0, 360],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    {/* Imagen principal - MUY GRANDE */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 lg:border-5 border-white shadow-xl sm:shadow-2xl ring-2 sm:ring-3 md:ring-4 ring-rose-200/60 bg-cream-50">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        width={128}
                        height={128}
                        className="object-cover"
                        style={{ width: 'auto', height: 'auto' }}
                        priority
                      />
                      {/* Overlay de brillo */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>

                    {/* Estado en vivo - Más grande y visible */}
                    <motion.div
                      className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-lg sm:shadow-xl flex items-center justify-center ${
                        agent.status === 'available'
                          ? 'bg-gradient-to-br from-green-400 to-green-500'
                          : agent.status === 'in-conversation'
                          ? 'bg-gradient-to-br from-amber-400 to-amber-500'
                          : 'bg-gray-400'
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(34, 197, 94, 0.7)',
                          '0 0 0 8px rgba(34, 197, 94, 0)',
                          '0 0 0 0 rgba(34, 197, 94, 0.7)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-3 h-3 bg-cream-50 rounded-full"
                        animate={{
                          opacity: [1, 0.4, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Partículas decorativas */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gold-400 rounded-full"
                        style={{
                          top: `${20 + i * 20}%`,
                          left: `${80 + i * 5}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.4, 0.9, 0.4],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Nombre - Más grande */}
                <h3 className="text-center font-bold text-primary-100 text-sm sm:text-base md:text-lg mb-2">{agent.name}</h3>

                {/* Estado dinámico - Mejorado */}
                <div className="text-center">
                  {agent.status === 'available' && (
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs text-green-700 font-semibold">Disponible</span>
                    </motion.div>
                  )}
                  {agent.status === 'in-conversation' && (
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-amber-500 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs text-amber-700 font-semibold">
                        {agent.currentConversations} conversación{agent.currentConversations > 1 ? 'es' : ''}
                      </span>
                    </motion.div>
                  )}
                  {agent.status === 'away' && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="text-xs text-gray-600 font-semibold">Ausente</span>
                    </div>
                  )}
                </div>

                {/* Indicador de selección - Más visible */}
                {currentAgent?.id === agent.id && (
                  <>
                    <motion.div
                      className="absolute top-3 right-3 w-4 h-4 bg-rose-500 rounded-full shadow-lg"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 border-3 border-rose-400 rounded-3xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Fondo dinámico de oficina - MÁS VISIBLE */}
          <motion.div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90"
                alt="Oficina"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover opacity-60"
              />
              {/* Overlay para mejor visibilidad */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-rose-50/40" />
            </div>
          </motion.div>

          {/* Chat Interface Rectangular con imagen en esquina */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-cream-100/95 md:backdrop-blur-md rounded-3xl shadow-2xl border-2 border-rose-200/50 overflow-visible"
          >
            {/* Imagen de perfil elegante en esquina izquierda - MUY VISIBLE */}
            {currentAgent && (
              <motion.div
                className="absolute -left-8 top-6 z-50"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 lg:border-5 border-white shadow-xl sm:shadow-2xl ring-2 sm:ring-3 md:ring-4 ring-rose-400/80 bg-cream-50">
                    <Image
                      src={currentAgent.image}
                      alt={currentAgent.name}
                      width={128}
                      height={128}
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Badge en línea elegante */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(34, 197, 94, 0.7)',
                        '0 0 0 8px rgba(34, 197, 94, 0)',
                        '0 0 0 0 rgba(34, 197, 94, 0.7)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-2.5 h-2.5 bg-cream-50 rounded-full"
                      animate={{
                        opacity: [1, 0.4, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                  {/* Efecto de brillo sutil */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </motion.div>
            )}

            {/* Header del chat */}
            <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 p-5 pl-40">
              <div className="flex items-center justify-between">
                <div>
                  {currentAgent ? (
                    <>
                      <h3 className="text-white font-bold text-lg mb-1">{currentAgent.name}</h3>
                      <p className="text-white/80 text-sm font-light">Agente de Atención al Cliente</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-white font-bold text-lg mb-1">Selecciona un Agente</h3>
                      <p className="text-white/80 text-sm font-light">Elige una especialista disponible</p>
                    </>
                  )}
                </div>

                {/* Estado disponible dinámico */}
                {currentAgent && (
                  <motion.div
                    className="flex items-center gap-2 bg-cream-100/20 md:backdrop-blur-sm rounded-full px-4 py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-2.5 h-2.5 bg-green-400 rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [1, 0.6, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-white text-sm font-medium">En línea</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Messages area - Rectangular - Más pequeño */}
            <div 
              ref={messagesContainerRef}
              className="h-[300px] sm:h-[350px] md:h-[400px] overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-cream-50 to-white space-y-3 sm:space-y-4 custom-scrollbar"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-400/20 to-gold-400/20 flex items-center justify-center"
                  >
                    <span className="text-4xl">👋</span>
                  </motion.div>
                  <p className="text-base sm:text-lg font-medium text-primary-100 mb-2">
                    {currentAgent ? `¡Hola! Soy ${currentAgent.name}` : 'Selecciona un agente'}
                  </p>
                  <p className="text-sm sm:text-base text-primary-300 font-light px-4">
                    {currentAgent
                      ? 'Estoy acá para ayudarte. ¿En qué puedo acompañarte hoy?'
                      : 'Elige una especialista disponible arriba para comenzar'}
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
                >
                  {message.role === 'assistant' && currentAgent && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1 border-2 border-rose-200">
                      <Image
                        src={currentAgent.image}
                        alt={currentAgent.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 ${
                      message.role === 'user'
                        ? 'bg-black border-2 border-primary-400 text-primary-400'
                        : 'bg-cream-50 border-2 border-rose-200 text-primary-200 shadow-md'
                    }`}
                  >
                    {message.role === 'assistant' && message.agentName && (
                      <p className="text-xs font-semibold text-primary-300 mb-1">{message.agentName}</p>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.isTyping && message.displayedContent !== undefined
                        ? message.displayedContent
                        : message.content}
                      {message.isTyping && (
                        <motion.span
                          className="inline-block w-0.5 h-4 bg-rose-500 ml-1 align-middle"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </p>
                    {!message.isTyping && (
                      <p
                        className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-primary-500/70' : 'text-primary-200'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString('es-PY', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-gold-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">T</span>
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && currentAgent && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1 border-2 border-rose-200">
                    <Image
                      src={currentAgent.image}
                      alt={currentAgent.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-cream-50 border-2 border-rose-200 rounded-2xl px-5 py-3 shadow-md">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-primary-200" />
                      <span className="text-xs text-primary-200">{currentAgent.name} está escribiendo...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 sm:p-6 bg-cream-50 border-t-2 border-rose-100">
              <div className="flex gap-2 sm:gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  onKeyPress={(e) => {
                    // Permitir Enter para enviar
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      if (!loading && currentAgent && input.trim()) {
                        handleSend()
                      }
                    }
                  }}
                  placeholder={currentAgent ? `Escribí tu mensaje para ${currentAgent.name}...` : 'Selecciona un agente primero...'}
                  className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-primary-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-base sm:text-lg text-primary-200 placeholder-primary-400 min-h-[48px]"
                  disabled={loading || !currentAgent}
                  autoComplete="off"
                />
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    if (!loading && currentAgent && input.trim()) {
                      handleSend()
                    }
                  }}
                  type="button"
                  disabled={loading || !input.trim() || !currentAgent}
                  whileHover={{ scale: loading || !input.trim() || !currentAgent ? 1 : 1.05 }}
                  whileTap={{ scale: loading || !input.trim() || !currentAgent ? 1 : 0.95 }}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl sm:rounded-2xl font-semibold hover:from-rose-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg transition-all touch-manipulation min-h-[48px] min-w-[48px]"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span className="hidden sm:inline">Enviar</span>
                    </>
                  )}
                </motion.button>
              </div>
              <p className="text-xs sm:text-sm text-primary-200 mt-2 sm:mt-3 text-center font-light px-2">
                {currentAgent
                  ? `${currentAgent.name} está disponible ahora para ayudarte`
                  : 'Selecciona una especialista disponible arriba'}
              </p>
            </div>
          </motion.div>

          {/* Información de disponibilidad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-4 bg-cream-100/50 backdrop-blur-sm rounded-2xl p-4 border border-rose-200/50"
          >
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-sm text-primary-200 font-light">
              <span className="font-semibold text-primary-300">
                {agents.filter((a) => a.status === 'available').length} agentes
              </span>{' '}
              disponibles ahora • Tiempo de respuesta:{' '}
              <span className="font-semibold text-primary-300">menos de 2 minutos</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}






