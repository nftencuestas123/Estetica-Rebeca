/**
 * Hook personalizado para gestión de chat
 * Responsabilidad: Estado y lógica de interacción del chat
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Message, Agent, ChatState } from '@/types/sofia.types'
import { AGENTS } from '@/constants/agents.constants'
import { AgentService } from '@/services/agent.service'
import { MessageService } from '@/services/message.service'
import { TypingService } from '@/services/typing.service'
import { SofiaChatService } from '@/services/sofia-chat.service'

export function useChat(userId?: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  const [agents, setAgents] = useState<Agent[]>(AGENTS)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Asignar agente al iniciar
  const assignAgent = useCallback(() => {
    const agent = AgentService.assignAvailableAgent(agents)
    if (agent) {
      setCurrentAgent(agent)
      setAgents((prev) =>
        AgentService.updateAgentStatus(prev, agent.id, 'in-conversation', 1)
      )
    }
  }, [agents])

  // Cargar historial
  useEffect(() => {
    if (userId) {
      MessageService.loadMessageHistory(userId).then(setMessages)
    }
  }, [userId])

  // Asignar agente inicial
  useEffect(() => {
    if (messages.length === 0 && !currentAgent) {
      assignAgent()
    }
  }, [messages.length, currentAgent, assignAgent])

  // Auto-scroll
  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      setTimeout(() => {
        const container = messagesContainerRef.current
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
          })
        }
      }, 100)
    }
  }, [messages])

  // Enviar mensaje
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || loading || !currentAgent) return

      const userMessage = MessageService.createMessage('user', content)
      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setLoading(true)

      // Guardar mensaje del usuario
      await MessageService.saveMessage(userId, userMessage)

      try {
        // Obtener respuesta de Sofia
        const sofiaResponse = await SofiaChatService.processChat(
          content,
          messages.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
          currentAgent.name,
          userId
        )

        const response = sofiaResponse.respuesta

        // Crear mensaje de respuesta
        const assistantMessage = MessageService.createMessage(
          'assistant',
          response,
          currentAgent.name
        )

        setMessages((prev) => [...prev, assistantMessage])

        // Simular escritura
        TypingService.typeText(
          response,
          (displayedText, hasTypo, typoChar) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessage.id
                  ? {
                      ...msg,
                      displayedContent: displayedText,
                      hasTypo,
                      typoChar,
                    }
                  : msg
              )
            )
          },
          () => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessage.id
                  ? { ...msg, isTyping: false }
                  : msg
              )
            )
            setLoading(false)
          }
        )

        // Guardar respuesta
        await MessageService.saveMessage(userId, assistantMessage)
      } catch (error) {
        console.error('Error en chat:', error)
        setLoading(false)
      }
    },
    [loading, currentAgent, messages, userId]
  )

  return {
    messages,
    input,
    setInput,
    loading,
    currentAgent,
    agents,
    messagesEndRef,
    messagesContainerRef,
    inputRef,
    sendMessage,
  }
}

