/**
 * Servicio: Copy Variations
 * Responsabilidad: Generar variaciones de copy
 */

import axios from 'axios'
import { logger } from '@/lib/logger'

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function generateVariations(
  originalCopy: string,
  numVariations: number = 3
): Promise<string[]> {
  const systemPrompt = `Eres un experto copywriter.
Generas variaciones creativas de textos manteniendo el mensaje core pero cambiando:
- Estructura
- Emojis
- Hooks
- CTAs

Cada variación debe ser DIFERENTE pero igual de efectiva.`

  const userPrompt = `Genera ${numVariations} variaciones DIFERENTES de este copy:

${originalCopy}

Genera SOLO las variaciones separadas por "---", sin numeración ni explicaciones.`

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 1.0,
        max_tokens: 2000,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        },
      }
    )

    const content = response.data.choices[0].message.content.trim()
    const variations = content.split('---').map((v: string) => v.trim()).filter(Boolean)

    return variations
  } catch (error: any) {
    logger.error('Error generating variations', { error: error?.message })
    throw new Error('Error al generar variaciones')
  }
}

