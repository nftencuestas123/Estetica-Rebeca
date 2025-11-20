/**
 * Servicio: Pricing de Videos
 * Responsabilidad: Cálculo de costos y deducciones
 */

import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'
import { getUserBalance, updateUserBalance } from './balance-service'
import { recordTransaction } from './transaction-service'

const VIDEO_DURATION_PRICING: Record<number, number> = {
  0.5: 5,   // 30 segundos = 5 créditos
  1: 10,    // 1 minuto = 10 créditos
  2: 18,    // 2 minutos = 18 créditos
  5: 40,    // 5 minutos = 40 créditos
  10: 75,   // 10 minutos = 75 créditos
}

export function calculateVideoCost(durationMinutes: number): number {
  return VIDEO_DURATION_PRICING[durationMinutes] || 10
}

export async function deductCredits(
  userId: string,
  amount: number,
  description?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const currentBalance = await getUserBalance(userId)

    if (currentBalance < amount) {
      return {
        success: false,
        error: 'Balance insuficiente',
      }
    }

    const newBalance = currentBalance - amount
    const updated = await updateUserBalance(userId, newBalance)

    if (!updated) {
      return {
        success: false,
        error: 'Error al actualizar balance',
      }
    }

    await recordTransaction(
      userId,
      'deduction',
      amount,
      description || `Generación de video (${amount} créditos)`
    )

    logger.info('Credits deducted', { userId, amount, newBalance })

    return { success: true }
  } catch (error) {
    logger.error('Error deducting credits', { error, userId })
    return {
      success: false,
      error: 'Error al deducir créditos',
    }
  }
}

export async function refundCredits(
  userId: string,
  amount: number,
  reason: string
): Promise<boolean> {
  try {
    const currentBalance = await getUserBalance(userId)
    const newBalance = currentBalance + amount

    const updated = await updateUserBalance(userId, newBalance)

    if (!updated) {
      return false
    }

    await recordTransaction(
      userId,
      'refund',
      amount,
      `Reembolso: ${reason}`
    )

    logger.info('Credits refunded', { userId, amount, reason })
    return true
  } catch (error) {
    logger.error('Error refunding credits', { error, userId })
    return false
  }
}

