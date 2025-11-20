/**
 * Hook: Manejo de mensajes del chat
 * Responsabilidad: Lógica de envío y recepción de mensajes
 */

import { useState } from 'react'
import { chatWithSofia } from '@/lib/openrouter-service'
import type { SofiaMessage } from '@/lib/openrouter-service'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState<string | undefined>()

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const extractUserName = (message: string) => {
    if (!nombreUsuario) {
      const nombreMatch = message.match(
        /me llamo ([A-Za-zÁÉÍÓÚáéíóúÑñ]+)|soy ([A-Za-zÁÉÍÓÚáéíóúÑñ]+)|mi nombre es ([A-Za-zÁÉÍÓÚáéíóúÑñ]+)/i
      )
      if (nombreMatch) {
        const nombre = nombreMatch[1] || nombreMatch[2] || nombreMatch[3]
        setNombreUsuario(nombre)
      }
    }
  }

  const sendMessage = async (userMessage: string): Promise<string> => {
    setLoading(true)

    // Agregar mensaje del usuario
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }
    addMessage(newUserMessage)

    // Extraer nombre si no lo tenemos
    extractUserName(userMessage)

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
      addMessage(sofiaMessage)

      setLoading(false)
      return response.respuesta
    } catch (error) {
      console.error('Error en chat:', error)
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Disculpame, estoy teniendo problemas técnicos. ¿Podrías intentar de nuevo en un momento?',
        timestamp: new Date(),
      }
      addMessage(errorMessage)
      
      setLoading(false)
      throw error
    }
  }

  const setMessagesFromHistory = (history: Message[]) => {
    setMessages(history)
  }

  return {
    messages,
    loading,
    nombreUsuario,
    sendMessage,
    setMessagesFromHistory,
  }
}

