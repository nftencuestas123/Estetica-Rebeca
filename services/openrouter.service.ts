/**
 * Servicio de OpenRouter API
 * Responsabilidad: Comunicación con la API de OpenRouter
 */

import type { SofiaMessage, SofiaResponse } from '@/types/sofia.types'

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export class OpenRouterService {
  /**
   * Valida que la API key esté configurada
   */
  static validateApiKey(): boolean {
    return !!(
      OPENROUTER_API_KEY &&
      OPENROUTER_API_KEY !== '' &&
      OPENROUTER_API_KEY !== 'undefined'
    )
  }

  /**
   * Envía una petición a OpenRouter
   */
  static async sendChatRequest(
    messages: SofiaMessage[],
    model: string = 'openai/gpt-4o',
    temperature: number = 0.7,
    maxTokens: number = 500
  ): Promise<any> {
    if (!this.validateApiKey()) {
      throw new Error('API key no configurada')
    }

    const cleanApiKey = OPENROUTER_API_KEY!.trim()

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cleanApiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Rebeca Barreto Estética',
      },
      body: JSON.stringify({
        model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature,
        max_tokens: maxTokens,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorData

      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { error: { message: errorText } }
      }

      throw {
        status: response.status,
        message: errorData.error?.message || 'Error desconocido',
        details: errorData,
      }
    }

    return response.json()
  }

  /**
   * Extrae la respuesta del formato de OpenRouter
   */
  static extractResponse(data: any): string {
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Formato de respuesta inválido')
    }

    return data.choices[0].message.content || ''
  }

  /**
   * Obtiene estadísticas de uso
   */
  static getUsageStats(data: any): {
    totalTokens?: number
    promptTokens?: number
    completionTokens?: number
  } {
    return {
      totalTokens: data.usage?.total_tokens,
      promptTokens: data.usage?.prompt_tokens,
      completionTokens: data.usage?.completion_tokens,
    }
  }
}

