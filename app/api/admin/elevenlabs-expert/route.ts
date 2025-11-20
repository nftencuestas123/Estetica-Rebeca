/**
 * Endpoint: Asistente Experto en ElevenLabs (con RAG)
 * Ruta: POST /api/admin/elevenlabs-expert
 * 
 * Responsabilidad:
 * - Recibir preguntas sobre ElevenLabs
 * - Buscar documentos relevantes (RAG)
 * - Usar OpenRouter + GPT-4o como experto
 * - Retornar respuestas con citas a fuentes
 */

import { NextRequest, NextResponse } from 'next/server'
import { OpenRouterService } from '@/services/openrouter.service'
import type { SofiaMessage } from '@/types/sofia.types'
import {
  chunkDocuments,
  getAllDocuments,
} from '@/services/elevenlabs-knowledge-base'
import {
  searchRelevantChunks,
  generateContextFromChunks,
  generateSourceCitations,
  createRAGPrompt,
} from '@/services/elevenlabs-embeddings'

// System prompt especializado en ElevenLabs
const ELEVENLABS_EXPERT_SYSTEM_PROMPT = `Eres un experto supremo en ElevenLabs con experiencia avanzada en:

1. **Text-to-Speech (TTS)**
   - Modelos disponibles (Eleven Flash v2.5, Eleven Turbo v2.5, Eleven Multilingual v2)
   - Configuración de voces, velocidad, estabilidad, claridad
   - Mejores prácticas para síntesis de voz natural

2. **Conversational AI & Voice Agents**
   - Creación y configuración de agentes de voz
   - SDK de JavaScript para integración en webs
   - Manejo de micrófono, captura de audio, reproducción
   - Latencia y optimización en tiempo real

3. **Integración en Sitios Web**
   - Implementación con JavaScript puro, React, Next.js
   - Manejo de sesiones y contexto de usuario
   - Autenticación y autorización de agentes
   - Mejores prácticas de UX para asistentes de voz

4. **Configuración Avanzada**
   - Prompts y personalidad del agente
   - Manejo de idiomas (32+ idiomas soportados)
   - Streaming de audio en tiempo real
   - Manejo de errores y fallbacks

5. **Precios y Monetización**
   - Modelos de precios de ElevenLabs
   - Cálculo de costos por caracter/minuto
   - Estrategias de monetización para resellers

**Instrucciones de respuesta:**
- Sé muy específico y práctico. Proporciona ejemplos de código cuando sea relevante.
- Cita siempre la documentación oficial de ElevenLabs cuando sea posible.
- Si no estás seguro de algo, avisa que puede haber cambios en la API.
- Enfócate en soluciones para crear agentes de voz en sitios web como landing pages, portales de atención al cliente, etc.
- Usa un tono profesional pero accesible.
- Estructura tus respuestas con viñetas, código y explicaciones claras.`

interface RequestBody {
  message: string
  history?: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
  }>
}

interface ResponseBody {
  success: boolean
  answer?: string
  error?: string
  sources?: Array<{
    title: string
    url: string
    source: string
    similarity: number
  }>
  usage?: {
    totalTokens?: number
    promptTokens?: number
    completionTokens?: number
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ResponseBody>> {
  try {
    // Validar que la API key esté configurada
    if (!OpenRouterService.validateApiKey()) {
      return NextResponse.json(
        {
          success: false,
          error: 'API key de OpenRouter no configurada. Verifica NEXT_PUBLIC_OPENROUTER_API_KEY.',
        },
        { status: 500 }
      )
    }

    // Parsear el body
    const body: RequestBody = await request.json()
    const { message, history = [] } = body

    // Validar mensaje
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'El mensaje no puede estar vacío.',
        },
        { status: 400 }
      )
    }

    // ============================================================
    // FASE 2: RAG (Retrieval-Augmented Generation)
    // ============================================================

    // 1. Obtener base de conocimiento
    const documents = getAllDocuments()
    const chunks = chunkDocuments(documents, 300)

    // 2. Buscar chunks relevantes
    const relevantChunks = await searchRelevantChunks(message, chunks, 5)

    // 3. Generar contexto aumentado
    const ragPrompt = createRAGPrompt(message, relevantChunks, ELEVENLABS_EXPERT_SYSTEM_PROMPT)

    // 4. Construir historial de mensajes para OpenRouter
    const messages: SofiaMessage[] = [
      {
        role: 'system',
        content: ragPrompt,
      },
      // Agregar historial previo si existe
      ...(history.map((msg) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      })) as SofiaMessage[]),
      // Agregar mensaje actual (sin el contexto RAG, ya está en system)
      {
        role: 'user',
        content: message,
      },
    ]

    // 5. Llamar a OpenRouter con GPT-4o
    const response = await OpenRouterService.sendChatRequest(
      messages,
      'openai/gpt-4o',
      0.7,
      1500
    )

    // 6. Extraer respuesta
    let answer = OpenRouterService.extractResponse(response)

    // 7. Agregar citas de fuentes
    const citations = generateSourceCitations(relevantChunks)
    answer = answer + citations

    // 8. Preparar información de fuentes para el cliente
    const sources = relevantChunks.map((result) => ({
      title: result.chunk.title,
      url: result.chunk.url,
      source: result.chunk.source,
      similarity: parseFloat((result.similarity * 100).toFixed(1)),
    }))

    const usage = OpenRouterService.getUsageStats(response)

    return NextResponse.json(
      {
        success: true,
        answer,
        sources,
        usage,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error en elevenlabs-expert endpoint:', error)

    // Manejo de errores específicos
    if (error.status === 401) {
      return NextResponse.json(
        {
          success: false,
          error: 'API key inválida o expirada.',
        },
        { status: 401 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        {
          success: false,
          error: 'Límite de rate limit alcanzado. Intenta más tarde.',
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al procesar la solicitud.',
      },
      { status: 500 }
    )
  }
}
