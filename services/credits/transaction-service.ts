/**
 * Servicio: Transacciones de Créditos
 * Responsabilidad: Registro y consulta de transacciones
 */

import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export interface CreditTransaction {
  id: string
  user_id: string
  type: 'purchase' | 'deduction' | 'refund'
  amount: number
  description: string
  created_at: string
}

export async function recordTransaction(
  userId: string,
  type: 'purchase' | 'deduction' | 'refund',
  amount: number,
  description: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type,
        amount,
        description,
      })

    if (error) throw error

    logger.info('Credit transaction recorded', { userId, type, amount })
    return true
  } catch (error) {
    logger.error('Error recording transaction', { error, userId })
    return false
  }
}

export async function getUserTransactions(userId: string): Promise<CreditTransaction[]> {
  try {
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as CreditTransaction[]
  } catch (error) {
    logger.error('Error fetching transactions', { error, userId })
    return []
  }
}

