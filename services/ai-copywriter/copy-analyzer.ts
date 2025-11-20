/**
 * Servicio: Copy Analyzer
 * Responsabilidad: Analizar calidad y potencial viral de copy
 */

export interface CopyAnalysis {
  score: number // 0-100
  strengths: string[]
  improvements: string[]
  viralPotential: 'low' | 'medium' | 'high'
  estimatedEngagement: string
}

export function analyzeCopy(copy: string, platform: string): CopyAnalysis {
  const strengths: string[] = []
  const improvements: string[] = []
  let score = 50

  // Análisis de longitud
  const length = copy.length
  const hasOptimalLength = 
    (platform === 'tiktok' && length < 150) ||
    (platform === 'twitter' && length < 280) ||
    (platform === 'instagram' && length > 100 && length < 2200) ||
    (platform === 'facebook' && length > 200 && length < 800)

  if (hasOptimalLength) {
    strengths.push('Longitud óptima para la plataforma')
    score += 10
  } else {
    improvements.push('Ajustar longitud al ideal de la plataforma')
    score -= 5
  }

  // Análisis de emojis
  const emojiCount = (copy.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length
  if (emojiCount >= 3 && emojiCount <= 6) {
    strengths.push('Uso equilibrado de emojis')
    score += 10
  } else if (emojiCount === 0) {
    improvements.push('Agregar emojis para mayor engagement')
    score -= 5
  }

  // Análisis de hashtags
  const hashtagCount = (copy.match(/#\w+/g) || []).length
  if (hashtagCount >= 3 && hashtagCount <= 10) {
    strengths.push('Cantidad adecuada de hashtags')
    score += 10
  } else if (hashtagCount === 0) {
    improvements.push('Incluir hashtags relevantes')
    score -= 5
  }

  // Análisis de CTA
  const hasCTA = /(\?|!|👉|🔥|✨|compra|reserva|agenda|descubre|visita|aprende)/i.test(copy)
  if (hasCTA) {
    strengths.push('Incluye call-to-action')
    score += 15
  } else {
    improvements.push('Agregar call-to-action claro')
    score -= 10
  }

  // Análisis de hook
  const firstLine = copy.split('\n')[0]
  if (firstLine && firstLine.length < 50) {
    strengths.push('Hook conciso y directo')
    score += 10
  }

  // Análisis de formato
  const hasLineBreaks = copy.includes('\n')
  if (hasLineBreaks) {
    strengths.push('Buen formato con espaciado')
    score += 5
  }

  // Determinar potencial viral
  let viralPotential: 'low' | 'medium' | 'high' = 'low'
  if (score >= 80) viralPotential = 'high'
  else if (score >= 60) viralPotential = 'medium'

  // Estimar engagement
  let estimatedEngagement = '1-2%'
  if (score >= 80) estimatedEngagement = '5-10%'
  else if (score >= 60) estimatedEngagement = '3-5%'

  return {
    score: Math.min(100, Math.max(0, score)),
    strengths,
    improvements,
    viralPotential,
    estimatedEngagement,
  }
}

