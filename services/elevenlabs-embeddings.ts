/**
 * Servicio: Embeddings y Búsqueda Semántica
 * Responsabilidad: Generar embeddings y buscar documentos relevantes
 * 
 * Usa OpenRouter para generar embeddings
 * Implementa búsqueda por similitud de coseno
 */

import { OpenRouterService } from './openrouter.service'
import { KnowledgeChunk } from './elevenlabs-knowledge-base'

export interface EmbeddingResult {
  text: string
  embedding: number[]
  model: string
}

export interface SearchResult {
  chunk: KnowledgeChunk
  similarity: number
  relevance: 'high' | 'medium' | 'low'
}

/**
 * Generar embedding para un texto usando OpenRouter
 * Nota: En producción, usar modelo específico de embeddings
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // Simulación de embedding (en producción, usar OpenAI Embeddings API)
    // Por ahora, retornamos un embedding simulado basado en hash
    const embedding = generateSimpleEmbedding(text)
    return embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw error
  }
}

/**
 * Generar embedding simple basado en características del texto
 * En producción, usar OpenAI Embeddings API o similar
 */
function generateSimpleEmbedding(text: string): number[] {
  // Crear un vector de 384 dimensiones basado en características del texto
  const embedding = new Array(384).fill(0)

  // Características básicas
  const words = text.toLowerCase().split(/\s+/)
  const chars = text.length
  const sentences = text.split(/[.!?]+/).length

  // Llenar embedding con características
  words.forEach((word, idx) => {
    const hash = hashString(word)
    embedding[idx % 384] += (hash % 1) - 0.5
  })

  // Normalizar
  const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
  return embedding.map((val) => (norm > 0 ? val / norm : 0))
}

/**
 * Hash simple para string
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Calcular similitud de coseno entre dos vectores
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length')
  }

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }

  normA = Math.sqrt(normA)
  normB = Math.sqrt(normB)

  if (normA === 0 || normB === 0) {
    return 0
  }

  return dotProduct / (normA * normB)
}

/**
 * Buscar chunks relevantes basado en similitud semántica
 */
export async function searchRelevantChunks(
  query: string,
  chunks: KnowledgeChunk[],
  topK: number = 5
): Promise<SearchResult[]> {
  try {
    // Generar embedding de la query
    const queryEmbedding = await generateEmbedding(query)

    // Calcular similitud con cada chunk
    const results: SearchResult[] = []

    for (const chunk of chunks) {
      const chunkEmbedding = await generateEmbedding(chunk.content)
      const similarity = cosineSimilarity(queryEmbedding, chunkEmbedding)

      // Determinar relevancia
      let relevance: 'high' | 'medium' | 'low' = 'low'
      if (similarity > 0.7) relevance = 'high'
      else if (similarity > 0.4) relevance = 'medium'

      results.push({
        chunk,
        similarity,
        relevance,
      })
    }

    // Ordenar por similitud descendente y retornar top K
    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK)
  } catch (error) {
    console.error('Error searching relevant chunks:', error)
    throw error
  }
}

/**
 * Buscar chunks relevantes por categoría
 */
export async function searchChunksByCategory(
  query: string,
  chunks: KnowledgeChunk[],
  category: string,
  topK: number = 3
): Promise<SearchResult[]> {
  // Filtrar por categoría
  const categoryChunks = chunks.filter((chunk) => chunk.category === category)

  // Buscar en esa categoría
  return searchRelevantChunks(query, categoryChunks, topK)
}

/**
 * Buscar chunks con múltiples criterios
 */
export async function searchChunksAdvanced(
  query: string,
  chunks: KnowledgeChunk[],
  options: {
    categories?: string[]
    topK?: number
    minSimilarity?: number
  } = {}
): Promise<SearchResult[]> {
  const { categories, topK = 5, minSimilarity = 0.3 } = options

  // Filtrar por categorías si se especifican
  let filteredChunks = chunks
  if (categories && categories.length > 0) {
    filteredChunks = chunks.filter((chunk) => categories.includes(chunk.category))
  }

  // Buscar
  const results = await searchRelevantChunks(query, filteredChunks, topK * 2)

  // Filtrar por similitud mínima
  return results.filter((result) => result.similarity >= minSimilarity).slice(0, topK)
}

/**
 * Generar contexto para el LLM basado en chunks relevantes
 */
export function generateContextFromChunks(results: SearchResult[]): string {
  if (results.length === 0) {
    return ''
  }

  let context = '## Documentación Relevante de ElevenLabs\n\n'

  results.forEach((result, idx) => {
    const { chunk, similarity } = result
    const relevanceEmoji = similarity > 0.7 ? '⭐' : similarity > 0.4 ? '✓' : '•'

    context += `${relevanceEmoji} **${chunk.title}** (${chunk.category})\n`
    context += `Fuente: [${chunk.source}](${chunk.url})\n`
    context += `Similitud: ${(similarity * 100).toFixed(0)}%\n\n`
    context += `${chunk.content}\n\n`
    context += '---\n\n'
  })

  return context
}

/**
 * Generar citas de fuentes para las respuestas
 */
export function generateSourceCitations(results: SearchResult[]): string {
  if (results.length === 0) {
    return ''
  }

  const sources = new Map<string, string>()

  results.forEach((result) => {
    const { chunk } = result
    if (!sources.has(chunk.url)) {
      sources.set(chunk.url, chunk.source)
    }
  })

  let citations = '\n\n### 📚 Fuentes Consultadas:\n'

  let idx = 1
  sources.forEach((source, url) => {
    citations += `${idx}. [${source}](${url})\n`
    idx++
  })

  return citations
}

/**
 * Crear prompt aumentado con contexto RAG
 */
export function createRAGPrompt(
  userQuery: string,
  contextChunks: SearchResult[],
  systemPrompt: string
): string {
  const context = generateContextFromChunks(contextChunks)

  return `${systemPrompt}

## Contexto Relevante (Base de Conocimiento de ElevenLabs):
${context}

## Pregunta del Usuario:
${userQuery}

## Instrucciones:
- Usa el contexto anterior para responder de manera precisa
- Cita las fuentes cuando sea relevante
- Si la información no está en el contexto, indícalo claramente
- Proporciona ejemplos prácticos cuando sea posible`
}
