// services/ai-copywriter.ts
import axios from 'axios'

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

interface GenerateCopyOptions {
  videoIdea: string
  platform: 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'linkedin' | 'multi'
  tone?: 'profesional' | 'casual' | 'divertido' | 'elegante' | 'urgente'
  includeEmojis?: boolean
  includeHashtags?: boolean
  includeCTA?: boolean
}

interface GeneratedCopy {
  text: string
  hashtags: string[]
  estimatedEngagement: string
}

// Prompts optimizados por plataforma
const PLATFORM_PROMPTS = {
  instagram: `Genera un copy VIRAL para Instagram con estas características:
- Máximo 2200 caracteres
- Hook poderoso en las primeras 3 palabras
- Uso estratégico de emojis (3-5)
- 5-10 hashtags relevantes al final
- Call-to-action claro
- Formato con saltos de línea para fácil lectura
- Lenguaje visual y descriptivo`,

  facebook: `Genera un copy EFECTIVO para Facebook con estas características:
- Extensión media (200-400 palabras)
- Storytelling que conecte emocionalmente
- Uso moderado de emojis (2-4)
- 3-5 hashtags relevantes
- Call-to-action fuerte al final
- Formato con párrafos cortos
- Tono conversacional y cercano`,

  tiktok: `Genera un copy VIRAL para TikTok con estas características:
- MUY CORTO (máximo 150 caracteres)
- Lenguaje Gen Z y trendy
- Emojis llamativos (4-6)
- Hashtags virales (#FYP, #ParaTi, + específicos)
- Texto que se lea rápido
- Urgencia y FOMO (fear of missing out)`,

  twitter: `Genera un copy IMPACTANTE para Twitter/X con estas características:
- Máximo 280 caracteres
- Hook potente
- 2-3 emojis relevantes
- 2-4 hashtags estratégicos
- CTA conciso
- Estilo directo y contundente`,

  linkedin: `Genera un copy PROFESIONAL para LinkedIn con estas características:
- Extensión profesional (300-600 palabras)
- Formato de artículo corto
- Uso mínimo de emojis (1-2, profesionales)
- 3-5 hashtags de industria
- Insights y valor educativo
- CTA profesional al final
- Tono experto pero accesible`,

  multi: `Genera un copy VERSÁTIL que funcione en múltiples plataformas:
- Extensión media (150-300 palabras)
- Adaptable a Instagram, Facebook y TikTok
- Emojis moderados (3-4)
- Hashtags universales (5-8)
- CTA claro
- Formato limpio y escaneable`,
}

// Generar copy viral con IA
export async function generateViralCopy(options: GenerateCopyOptions): Promise<GeneratedCopy> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY no configurada')
  }

  const {
    videoIdea,
    platform = 'multi',
    tone = 'profesional',
    includeEmojis = true,
    includeHashtags = true,
    includeCTA = true,
  } = options

  const platformPrompt = PLATFORM_PROMPTS[platform]

  const systemPrompt = `Eres un experto en marketing digital y copywriting para redes sociales. 
Tu especialidad es crear copy VIRAL que genera alto engagement (likes, comments, shares).
Conoces perfectamente las mejores prácticas de cada plataforma.
Escribes en español de manera natural, persuasiva y con estilo ${tone}.`

  const userPrompt = `${platformPrompt}

TEMA/IDEA DEL VIDEO:
"${videoIdea}"

CONFIGURACIÓN:
- Tono: ${tone}
- Incluir emojis: ${includeEmojis ? 'SÍ' : 'NO'}
- Incluir hashtags: ${includeHashtags ? 'SÍ' : 'NO'}
- Incluir CTA: ${includeCTA ? 'SÍ' : 'NO'}

INSTRUCCIONES:
1. Genera un copy completo y listo para publicar
2. Hazlo VIRAL: hook potente, emoción, valor
3. ${includeHashtags ? 'Lista los hashtags al final en una línea separada' : 'Sin hashtags'}
4. Formato limpio y profesional

RESPONDE SOLO CON EL COPY, sin explicaciones adicionales.`

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4-turbo', // Usar GPT-4 Turbo para mejor calidad
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8, // Creatividad moderada-alta
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.href : 'https://rebecabarreto.com',
        },
      }
    )

    const generatedText = response.data.choices[0].message.content.trim()

    // Extraer hashtags del texto
    const hashtagRegex = /#[\wáéíóúñü]+/gi
    const hashtags = generatedText.match(hashtagRegex) || []

    // Estimación de engagement basada en características del copy
    const estimatedEngagement = estimateEngagement(generatedText, platform)

    return {
      text: generatedText,
      hashtags,
      estimatedEngagement,
    }
  } catch (error: any) {
    console.error('Error generating viral copy:', error.response?.data || error.message)
    throw new Error('Error al generar copy viral. Verifica tu API Key de OpenRouter.')
  }
}

// Mejorar copy existente
export async function improveCopy(
  originalCopy: string,
  improvements: string[]
): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY no configurada')
  }

  const improvementsList = improvements.join(', ')

  const userPrompt = `Mejora el siguiente copy de redes sociales aplicando estas mejoras: ${improvementsList}

COPY ORIGINAL:
"${originalCopy}"

MEJORAS SOLICITADAS:
${improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

Genera una versión mejorada manteniendo la esencia original pero aplicando las mejoras.
RESPONDE SOLO CON EL COPY MEJORADO, sin explicaciones.`

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto en copywriting y edición de contenido para redes sociales.',
          },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data.choices[0].message.content.trim()
  } catch (error: any) {
    console.error('Error improving copy:', error.response?.data || error.message)
    throw new Error('Error al mejorar el copy.')
  }
}

// Generar múltiples variaciones de copy
export async function generateCopyVariations(
  videoIdea: string,
  platform: GenerateCopyOptions['platform'],
  count: number = 3
): Promise<GeneratedCopy[]> {
  const variations: GeneratedCopy[] = []

  const tones: Array<'profesional' | 'casual' | 'divertido' | 'elegante' | 'urgente'> = [
    'profesional',
    'casual',
    'divertido',
    'elegante',
    'urgente',
  ]

  for (let i = 0; i < count; i++) {
    try {
      const copy = await generateViralCopy({
        videoIdea,
        platform,
        tone: tones[i % tones.length],
        includeEmojis: true,
        includeHashtags: true,
        includeCTA: true,
      })
      variations.push(copy)
    } catch (error) {
      console.error(`Error generating variation ${i + 1}:`, error)
    }
  }

  return variations
}

// Estimar engagement potencial del copy
function estimateEngagement(copyText: string, platform: string): string {
  let score = 0

  // Factores que aumentan engagement
  if (copyText.match(/[!?¿¡]/g)?.length || 0 > 2) score += 10 // Signos de exclamación/interrogación
  if (copyText.match(/[\p{Emoji}]/gu)?.length || 0 > 2) score += 15 // Emojis
  if (copyText.match(/#[\wáéíóúñü]+/gi)?.length || 0 > 3) score += 10 // Hashtags
  if (copyText.toLowerCase().includes('gratis') || copyText.toLowerCase().includes('descuento')) score += 20
  if (copyText.toLowerCase().includes('link') || copyText.toLowerCase().includes('bio')) score += 10
  if (copyText.length > 100 && copyText.length < 300) score += 15 // Longitud óptima

  // Palabras virales
  const viralWords = [
    'exclusivo',
    'limitado',
    'ahora',
    'hoy',
    'nuevo',
    'secreto',
    'increíble',
    'impactante',
    'revolucionario',
  ]
  viralWords.forEach((word) => {
    if (copyText.toLowerCase().includes(word)) score += 5
  })

  // Ajustar por plataforma
  if (platform === 'instagram' || platform === 'tiktok') score += 10

  // Clasificar engagement
  if (score >= 60) return 'ALTO 🔥'
  if (score >= 40) return 'MEDIO-ALTO ⭐'
  if (score >= 20) return 'MEDIO 👍'
  return 'BAJO 📊'
}

// Generar hashtags relevantes basados en tema
export async function generateHashtags(
  topic: string,
  platform: string,
  count: number = 10
): Promise<string[]> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY no configurada')
  }

  const userPrompt = `Genera ${count} hashtags VIRALES y RELEVANTES para ${platform} sobre este tema:

TEMA: "${topic}"

INSTRUCCIONES:
- Hashtags específicos del tema
- Hashtags generales con alto volumen (ej: #FYP, #ParaTi)
- Mix de hashtags populares y de nicho
- En español
- Formato: #hashtag1 #hashtag2 #hashtag3...

RESPONDE SOLO CON LOS HASHTAGS, separados por espacios, sin numeración ni explicaciones.`

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4-turbo',
        messages: [{ role: 'user', content: userPrompt }],
        temperature: 0.9,
        max_tokens: 200,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const hashtagsText = response.data.choices[0].message.content.trim()
    const hashtags = hashtagsText.match(/#[\wáéíóúñü]+/gi) || []

    return hashtags.slice(0, count)
  } catch (error: any) {
    console.error('Error generating hashtags:', error.response?.data || error.message)
    throw new Error('Error al generar hashtags.')
  }
}

// Analizar copy existente y dar sugerencias
export async function analyzeCopy(copyText: string): Promise<{
  score: number
  strengths: string[]
  improvements: string[]
  suggestions: string[]
}> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY no configurada')
  }

  const userPrompt = `Analiza este copy de redes sociales y proporciona feedback detallado:

COPY:
"${copyText}"

Proporciona:
1. PUNTUACIÓN (0-100): Calidad general del copy
2. FORTALEZAS: 3 puntos fuertes del copy
3. MEJORAS: 3 áreas de mejora específicas
4. SUGERENCIAS: 3 recomendaciones concretas

Formato de respuesta:
PUNTUACIÓN: [número]
FORTALEZAS:
- [fortaleza 1]
- [fortaleza 2]
- [fortaleza 3]
MEJORAS:
- [mejora 1]
- [mejora 2]
- [mejora 3]
SUGERENCIAS:
- [sugerencia 1]
- [sugerencia 2]
- [sugerencia 3]`

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto en análisis de copy para redes sociales.',
          },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const analysisText = response.data.choices[0].message.content

    // Parsear respuesta
    const scoreMatch = analysisText.match(/PUNTUACIÓN:\s*(\d+)/)
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 50

    const strengthsSection = analysisText.match(/FORTALEZAS:([\s\S]*?)MEJORAS:/)?.[1] || ''
    const strengths =
      strengthsSection
        .split('\n')
        .filter((line) => line.trim().startsWith('-'))
        .map((line) => line.replace('-', '').trim()) || []

    const improvementsSection = analysisText.match(/MEJORAS:([\s\S]*?)SUGERENCIAS:/)?.[1] || ''
    const improvements =
      improvementsSection
        .split('\n')
        .filter((line) => line.trim().startsWith('-'))
        .map((line) => line.replace('-', '').trim()) || []

    const suggestionsSection = analysisText.match(/SUGERENCIAS:([\s\S]*)$/)?.[1] || ''
    const suggestions =
      suggestionsSection
        .split('\n')
        .filter((line) => line.trim().startsWith('-'))
        .map((line) => line.replace('-', '').trim()) || []

    return {
      score,
      strengths,
      improvements,
      suggestions,
    }
  } catch (error: any) {
    console.error('Error analyzing copy:', error.response?.data || error.message)
    throw new Error('Error al analizar el copy.')
  }
}
