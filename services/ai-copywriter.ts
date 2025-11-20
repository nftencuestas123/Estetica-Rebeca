/**
 * Servicio: AI Copywriter (RE-EXPORT)
 * Responsabilidad: Exportar todos los servicios de copywriting
 * Este archivo mantiene compatibilidad con imports existentes
 */

// Platform Prompts
export * from './ai-copywriter/platform-prompts'

// Copy Generator
export * from './ai-copywriter/copy-generator'

// Copy Variations
export * from './ai-copywriter/copy-variations'

// Copy Analyzer
export * from './ai-copywriter/copy-analyzer'

// Funciones legacy (mantener compatibilidad)
import { generateCopy, type GenerateCopyOptions } from './ai-copywriter/copy-generator'
import { generateVariations } from './ai-copywriter/copy-variations'

export async function generateViralCopy(options: any): Promise<string> {
  return generateCopy({
    videoIdea: options.videoDescription || options.videoIdea || '',
    platform: options.platform || 'multi',
    tone: options.tone,
    includeEmojis: options.includeEmojis,
    includeHashtags: options.includeHashtags,
    includeCTA: options.includeCTA,
  })
}

export async function generateCopyVariations(
  videoIdea: string,
  platform: string,
  count: number = 3
): Promise<Array<{ text: string }>> {
  // Primero generar el copy base
  const baseCopy = await generateCopy({
    videoIdea,
    platform: platform as any,
  })
  
  // Luego generar variaciones
  const variations = await generateVariations(baseCopy, count)
  
  // Retornar como array de objetos con text
  return variations.map(text => ({ text }))
}
