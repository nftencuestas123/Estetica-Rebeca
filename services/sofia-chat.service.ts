/**
 * Servicio de chat Sofia
 * Responsabilidad: Lógica de negocio del chat con Sofia
 */

import type { SofiaMessage, SofiaResponse } from '@/types/sofia.types'
import { OpenRouterService } from './openrouter.service'
import { logger } from '@/lib/logger'
import { SOFIA_SYSTEM_PROMPT } from '@/constants/sofia.constants'

export class SofiaChatService {
  /**
   * Detecta la acción sugerida basada en la respuesta
   */
  static detectSuggestedAction(
    response: string
  ): 'agendar' | 'consultar' | 'informar' | 'acompanar' {
    const responseLower = response.toLowerCase()

    if (
      responseLower.includes('agendar') ||
      responseLower.includes('reservar') ||
      responseLower.includes('cita')
    ) {
      return 'agendar'
    }

    if (responseLower.includes('tratamiento') || responseLower.includes('servicio')) {
      return 'consultar'
    }

    if (responseLower.includes('información') || responseLower.includes('precio')) {
      return 'informar'
    }

    return 'acompanar'
  }

  /**
   * Construye el system prompt personalizado
   */
  static buildSystemPrompt(agentName: string): string {
    return SOFIA_SYSTEM_PROMPT.replace(/Sofía Barreto/g, agentName).replace(
      'Eres Sofía',
      `Eres ${agentName}`
    )
  }

  /**
   * Construye los mensajes para la API
   */
  static buildMessages(
    userMessage: string,
    history: SofiaMessage[],
    agentName: string,
    userName?: string
  ): SofiaMessage[] {
    const systemPrompt = this.buildSystemPrompt(agentName)

    return [
      { role: 'system', content: systemPrompt },
      ...history,
      {
        role: 'user',
        content: userName ? `[Cliente: ${userName}] ${userMessage}` : userMessage,
      },
    ]
  }

  /**
   * Genera mensaje de error amigable
   */
  static generateErrorMessage(
    agentName: string,
    errorStatus?: number
  ): string {
    if (errorStatus === 401) {
      return `Hola! Soy ${agentName}. Disculpame, parece que hay un problema con la autenticación de la API. Por favor, verifica que la API key de OpenRouter esté correcta y tenga créditos disponibles.`
    }

    if (errorStatus === 429) {
      return `Hola! Soy ${agentName}. Disculpame, el servicio está muy ocupado en este momento. ¿Podrías intentar de nuevo en unos segundos?`
    }

    if (errorStatus === 402) {
      return `Hola! Soy ${agentName}. Disculpame, parece que se agotaron los créditos del servicio. Por favor, contacta al administrador.`
    }

    return `Hola! Soy ${agentName}. Disculpame, parece que hay un problema técnico momentáneo. ¿Podrías intentar de nuevo en unos segundos? Estoy acá para ayudarte siempre que me necesites.`
  }

  /**
   * Procesa un mensaje de chat
   */
  static async processChat(
    userMessage: string,
    history: SofiaMessage[] = [],
    agentName: string = 'Sofía',
    userName?: string
  ): Promise<SofiaResponse> {
    const startTime = Date.now()

    // Validar API key
    if (!OpenRouterService.validateApiKey()) {
      return {
        respuesta: `Hola! Soy ${agentName}. Disculpame, parece que hay un problema de configuración con la API. Por favor, verifica que la API key de OpenRouter esté correctamente configurada en el archivo .env.local`,
        accion_sugerida: 'acompanar',
        tiempo_respuesta_ms: 0,
      }
    }

    try {
      // Construir mensajes
      const messages = this.buildMessages(userMessage, history, agentName, userName)

      // Enviar petición
      const data = await OpenRouterService.sendChatRequest(messages)

      // Extraer respuesta
      const respuesta = OpenRouterService.extractResponse(data)

      // Detectar acción
      const accionSugerida = this.detectSuggestedAction(respuesta)

      // Obtener estadísticas
      const stats = OpenRouterService.getUsageStats(data)

      return {
        respuesta,
        accion_sugerida: accionSugerida,
        tokens_consumidos: stats.totalTokens,
        tiempo_respuesta_ms: Date.now() - startTime,
      }
    } catch (error: any) {
      logger.error('Error en SofiaChatService', { error: error.message, status: error.status })

      return {
        respuesta: this.generateErrorMessage(agentName, error.status),
        accion_sugerida: 'acompanar',
        tiempo_respuesta_ms: Date.now() - startTime,
      }
    }
  }
}

