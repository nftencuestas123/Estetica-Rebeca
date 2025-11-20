/**
 * Servicio: Copy Generator
 * Responsabilidad: Generación de copy con IA
 */

import axios from 'axios'
import { logger } from '@/lib/logger'
import { PLATFORM_PROMPTS, type Platform } from './platform-prompts'

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export interface GenerateCopyOptions {
  videoIdea: string
  platform: Platform
  tone?: 'profesional' | 'casual' | 'divertido' | 'elegante' | 'urgente'
  includeEmojis?: boolean
  includeHashtags?: boolean
  includeCTA?: boolean
}

export async function generateCopy(options: GenerateCopyOptions): Promise<string> {
  const {
    videoIdea,
    platform,
    tone = 'profesional',
    includeEmojis = true,
    includeHashtags = true,
    includeCTA = true,
  } = options

  const platformPrompt = PLATFORM_PROMPTS[platform]

  const systemPrompt = `Eres un experto copywriter especializado en redes sociales.
Generas textos virales y persuasivos que maximizan el engagement.
Tu especialidad es crear copy que convierte.`

  const userPrompt = `${platformPrompt}

Sobre el video:
${videoIdea}

Tono: ${tone}
${includeEmojis ? 'INCLUYE emojis estratégicamente' : 'NO incluyas emojis'}
${includeHashtags ? 'INCLUYE hashtags relevantes' : 'NO incluyas hashtags'}
${includeCTA ? 'INCLUYE call-to-action poderoso' : 'NO incluyas call-to-action'}

Genera SOLO el copy, sin explicaciones adicionales.`

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.9,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        },
      }
    )

    return response.data.choices[0].message.content.trim()
  } catch (error: any) {
    logger.error('Error generating copy', { error: error?.message })
    throw new Error('Error al generar copy')
  }
}

