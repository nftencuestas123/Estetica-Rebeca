/**
 * Servicio de gestión de mensajes
 * Responsabilidad: Operaciones CRUD y lógica de mensajes
 */

import type { Message } from '@/types/sofia.types'
import { supabase } from '@/lib/supabase'

export class MessageService {
  /**
   * Crea un nuevo mensaje
   */
  static createMessage(
    role: 'user' | 'assistant',
    content: string,
    agentName?: string
  ): Message {
    return {
      id: `${Date.now()}-${Math.random()}`,
      role,
      content,
      timestamp: new Date(),
      agentName,
      isTyping: role === 'assistant',
      displayedContent: role === 'assistant' ? '' : content,
    }
  }

  /**
   * Guarda un mensaje en Supabase
   */
  static async saveMessage(
    userId: string | undefined,
    message: Message
  ): Promise<void> {
    if (!userId) return

    try {
      await supabase.from('conversaciones_sofia').insert({
        user_id: userId,
        role: message.role,
        content: message.content,
        agent_name: message.agentName,
        created_at: message.timestamp.toISOString(),
      })
    } catch (error) {
      console.error('Error guardando mensaje:', error)
    }
  }

  /**
   * Carga el historial de mensajes
   */
  static async loadMessageHistory(userId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('conversaciones_sofia')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(50)

      if (error) throw error

      return (data || []).map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.created_at),
        agentName: msg.agent_name,
        isTyping: false,
        displayedContent: msg.content,
      }))
    } catch (error) {
      console.error('Error cargando historial:', error)
      return []
    }
  }
}

