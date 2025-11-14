/**
 * Wrapper de compatibilidad para openrouter-service
 * Responsabilidad: Mantener compatibilidad con código existente
 */

import { SofiaChatService } from '@/services/sofia-chat.service'
import type { SofiaMessage, SofiaResponse } from '@/types/sofia.types'

export type { SofiaMessage, SofiaResponse }

/**
 * Función de compatibilidad con la API anterior
 * @deprecated Usar SofiaChatService.processChat directamente
 */
export async function chatWithSofia(
  historial: SofiaMessage[] | string,
  mensajeUsuario?: string,
  nombreUsuario?: string,
  nombreAgente: string = 'Sofía'
): Promise<string> {
  // Compatibilidad con firma antigua (historial, mensaje)
  let history: SofiaMessage[]
  let message: string

  if (typeof historial === 'string') {
    message = historial
    history = []
  } else {
    history = historial
    message = mensajeUsuario || ''
  }

  const response = await SofiaChatService.processChat(
    message,
    history,
    nombreAgente,
    nombreUsuario
  )

  return response.respuesta
}

