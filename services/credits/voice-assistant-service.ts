/**
 * Servicio: Consumo de Créditos para Asistente de Voz
 * 
 * Responsabilidad: 
 * - Registrar uso del asistente de voz
 * - Deducir créditos según consumo
 * - Registrar transacciones
 */

import { getSupabaseClient } from '@/lib/supabase-server'
import { logger } from '@/lib/logger'
import { calculateCreditsToDeduct } from './voice-assistant-pricing'
import { deductCredits } from './video-pricing'
import { recordTransaction } from './transaction-service'

export interface VoiceInteraction {
  id?: string
  user_id: string
  characters_used: number
  minutes_used?: number
  credits_deducted: number
  elevenlabs_cost: number
  client_price: number
  interaction_type: 'conversation' | 'response' | 'full_session'
  created_at?: string
}

/**
 * Registrar una interacción de voz y deducir créditos
 */
export async function recordVoiceInteraction(
  userId: string,
  characters: number,
  minutes?: number
): Promise<{ success: boolean; error?: string; interaction?: VoiceInteraction }> {
  try {
    // Calcular créditos a deducir
    const creditsToDeduct = calculateCreditsToDeduct(characters, minutes)
    
    // Calcular costos
    const { calculateFullCost } = await import('./voice-assistant-pricing')
    const costBreakdown = calculateFullCost(characters, minutes)

    // Verificar balance
    const { getUserBalance } = await import('./balance-service')
    const currentBalance = await getUserBalance(userId)

    if (currentBalance < creditsToDeduct) {
      logger.warn('Insufficient balance for voice interaction', {
        userId,
        required: creditsToDeduct,
        current: currentBalance,
      })
      return {
        success: false,
        error: `Balance insuficiente. Necesitas ${creditsToDeduct.toFixed(2)} créditos. Tu balance actual: ${currentBalance.toFixed(2)}`,
      }
    }

    // Deducir créditos
    const deductionResult = await deductCredits(
      userId,
      creditsToDeduct,
      `Asistente de voz: ${characters} caracteres${minutes ? `, ${minutes} minutos` : ''}`
    )

    if (!deductionResult.success) {
      return {
        success: false,
        error: deductionResult.error || 'Error al deducir créditos',
      }
    }

    // Registrar interacción en base de datos
    const supabase = await getSupabaseClient()
    const { data: interaction, error: insertError } = await supabase
      .from('voice_interactions')
      .insert({
        user_id: userId,
        characters_used: characters,
        minutes_used: minutes,
        credits_deducted: creditsToDeduct,
        elevenlabs_cost: costBreakdown.elevenLabsCost,
        client_price: costBreakdown.clientPrice,
        interaction_type: 'conversation',
      })
      .select()
      .single()

    if (insertError) {
      logger.error('Error recording voice interaction', { error: insertError, userId })
      // No fallar si no se puede registrar, pero loguear
    }

    // Registrar transacción
    await recordTransaction(
      userId,
      'deduction',
      creditsToDeduct,
      `Asistente de voz: ${characters} caracteres`
    )

    logger.info('Voice interaction recorded', {
      userId,
      characters,
      creditsDeducted: creditsToDeduct,
    })

    return {
      success: true,
      interaction: interaction || undefined,
    }
  } catch (error: any) {
    logger.error('Error in recordVoiceInteraction', { error: error.message, userId })
    return {
      success: false,
      error: 'Error al procesar interacción de voz',
    }
  }
}

/**
 * Obtener historial de interacciones de voz de un usuario
 */
export async function getUserVoiceInteractions(
  userId: string,
  limit: number = 50
): Promise<VoiceInteraction[]> {
  try {
    const supabase = await getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_interactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      logger.error('Error fetching voice interactions', { error, userId })
      return []
    }

    return (data || []) as VoiceInteraction[]
  } catch (error: any) {
    logger.error('Error in getUserVoiceInteractions', { error: error.message, userId })
    return []
  }
}

/**
 * Obtener estadísticas de uso de voz de un usuario
 */
export interface VoiceUsageStats {
  totalInteractions: number
  totalCharacters: number
  totalMinutes: number
  totalCreditsSpent: number
  totalElevenLabsCost: number
  totalClientPrice: number
  averageCostPerInteraction: number
}

export async function getUserVoiceStats(userId: string): Promise<VoiceUsageStats> {
  try {
    const supabase = await getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_interactions')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      logger.error('Error fetching voice stats', { error, userId })
      return {
        totalInteractions: 0,
        totalCharacters: 0,
        totalMinutes: 0,
        totalCreditsSpent: 0,
        totalElevenLabsCost: 0,
        totalClientPrice: 0,
        averageCostPerInteraction: 0,
      }
    }

    const interactions = (data || []) as VoiceInteraction[]
    
    const stats = interactions.reduce(
      (acc, interaction) => ({
        totalInteractions: acc.totalInteractions + 1,
        totalCharacters: acc.totalCharacters + interaction.characters_used,
        totalMinutes: acc.totalMinutes + (interaction.minutes_used || 0),
        totalCreditsSpent: acc.totalCreditsSpent + interaction.credits_deducted,
        totalElevenLabsCost: acc.totalElevenLabsCost + interaction.elevenlabs_cost,
        totalClientPrice: acc.totalClientPrice + interaction.client_price,
        averageCostPerInteraction: 0, // Se calcula después
      }),
      {
        totalInteractions: 0,
        totalCharacters: 0,
        totalMinutes: 0,
        totalCreditsSpent: 0,
        totalElevenLabsCost: 0,
        totalClientPrice: 0,
        averageCostPerInteraction: 0,
      }
    )

    stats.averageCostPerInteraction =
      stats.totalInteractions > 0
        ? stats.totalCreditsSpent / stats.totalInteractions
        : 0

    return stats
  } catch (error: any) {
    logger.error('Error in getUserVoiceStats', { error: error.message, userId })
    return {
      totalInteractions: 0,
      totalCharacters: 0,
      totalMinutes: 0,
      totalCreditsSpent: 0,
      totalElevenLabsCost: 0,
      totalClientPrice: 0,
      averageCostPerInteraction: 0,
    }
  }
}

