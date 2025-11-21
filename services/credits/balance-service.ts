/**
 * Servicio: Balance de Créditos
 * Responsabilidad: Gestión del balance del usuario
 */

import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export async function getUserBalance(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        await supabase.from('user_credits').insert({
          user_id: userId,
          balance: 0,
          total_purchased: 0,
        })
        return 0
      }
      throw error
    }

    return data?.balance || 0
  } catch (error) {
    logger.error('Error getting user balance', { error, userId })
    return 0
  }
}

export async function updateUserBalance(
  userId: string,
  newBalance: number
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_credits')
      .update({ balance: newBalance })
      .eq('user_id', userId)

    if (error) throw error
    return true
  } catch (error) {
    logger.error('Error updating user balance', { error, userId })
    return false
  }
}

