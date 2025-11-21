/**
 * Hook: Persistencia del chat en Supabase
 * Responsabilidad: Guardar y cargar historial de conversaciones
 */

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Message } from './useChatMessages'

interface UseChatPersistenceProps {
  userId?: string
  isOpen: boolean
  onHistoryLoaded: (messages: Message[]) => void
}

export function useChatPersistence({
  userId,
  isOpen,
  onHistoryLoaded,
}: UseChatPersistenceProps) {
  
  // Cargar historial cuando se abre el chat
  useEffect(() => {
    if (userId && isOpen) {
      loadConversationHistory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isOpen])

  const loadConversationHistory = async () => {
    if (!userId) return

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
        onHistoryLoaded(history)
      }
    } catch (error) {
      console.error('Error cargando historial:', error)
    }
  }

  const saveMessage = async (
    userMessage: string,
    sofiaResponse: string,
    actionType?: string
  ) => {
    if (!userId) return

    try {
      await supabase.from('conversaciones_sofia').insert({
        usuario_id: userId,
        sesion_id: `session-${Date.now()}`,
        mensaje_usuario: userMessage,
        respuesta_sofia: sofiaResponse,
        tipo_interaccion: actionType,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error guardando mensaje:', error)
    }
  }

  return {
    saveMessage,
  }
}

