/**
 * Servicio: Precios y Cálculos para Asistente de Voz (ElevenLabs)
 * 
 * Responsabilidad: Calcular costos y márgenes según PRD
 * 
 * FÓRMULA: Precio de venta = Costo × 3 (200% de margen)
 * Ejemplo: Si compras por $1 → vendes por $3
 */

import { logger } from '@/lib/logger'

// Costo base de ElevenLabs (en USD por caracter/minuto)
// Estos valores deben configurarse según el plan de ElevenLabs
const ELEVENLABS_BASE_COST_PER_CHARACTER = 0.0001 // $0.0001 por carácter (ejemplo)
const ELEVENLABS_BASE_COST_PER_MINUTE = 0.18 // $0.18 por minuto (ejemplo)

// MARGEN: 200% adicional = Precio de venta = Costo × 3
const MARKUP_MULTIPLIER = 3

/**
 * Calcula el costo real de ElevenLabs para una interacción
 */
export function calculateElevenLabsCost(
  characters: number,
  minutes?: number
): number {
  // Calcular costo basado en caracteres o minutos
  let cost = 0
  
  if (minutes) {
    cost = minutes * ELEVENLABS_BASE_COST_PER_MINUTE
  } else {
    cost = characters * ELEVENLABS_BASE_COST_PER_CHARACTER
  }
  
  return cost
}

/**
 * Calcula el precio de venta al cliente (con margen del 200%)
 * Fórmula: Precio = Costo × 3
 */
export function calculateClientPrice(cost: number): number {
  return cost * MARKUP_MULTIPLIER
}

/**
 * Calcula cuántos créditos debe consumir el cliente
 * Basado en el precio de venta (ya con margen aplicado)
 */
export function calculateCreditsToDeduct(
  characters: number,
  minutes?: number
): number {
  const cost = calculateElevenLabsCost(characters, minutes)
  const clientPrice = calculateClientPrice(cost)
  
  // Convertir precio a créditos (1 crédito = $1 USD)
  return Math.ceil(clientPrice * 100) / 100 // Redondear a 2 decimales
}

/**
 * Obtiene el margen de ganancia
 */
export function getProfitMargin(cost: number): number {
  const clientPrice = calculateClientPrice(cost)
  return clientPrice - cost
}

/**
 * Obtiene el porcentaje de margen
 */
export function getMarginPercentage(): number {
  return (MARKUP_MULTIPLIER - 1) * 100 // 200%
}

/**
 * Ejemplo de uso:
 * 
 * Costo ElevenLabs: $0.10
 * Precio al cliente: $0.30 (costo × 3)
 * Créditos a deducir: 0.30 créditos
 * Ganancia: $0.20 (200% de margen)
 */
export interface VoiceInteractionCost {
  elevenLabsCost: number
  clientPrice: number
  creditsToDeduct: number
  profitMargin: number
  marginPercentage: number
}

export function calculateFullCost(
  characters: number,
  minutes?: number
): VoiceInteractionCost {
  const elevenLabsCost = calculateElevenLabsCost(characters, minutes)
  const clientPrice = calculateClientPrice(elevenLabsCost)
  const creditsToDeduct = calculateCreditsToDeduct(characters, minutes)
  const profitMargin = getProfitMargin(elevenLabsCost)
  const marginPercentage = getMarginPercentage()

  return {
    elevenLabsCost,
    clientPrice,
    creditsToDeduct,
    profitMargin,
    marginPercentage,
  }
}

