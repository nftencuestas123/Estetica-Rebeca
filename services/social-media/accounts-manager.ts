/**
 * Servicio: Social Accounts Manager
 * Responsabilidad: Gestión de cuentas sociales en DB
 */

import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export interface SocialAccount {
  platform: string
  username: string
  connected: boolean
  access_token?: string
  account_id?: string
}

export async function getSocialAccounts(userId: string): Promise<SocialAccount[]> {
  try {
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    return data as SocialAccount[]
  } catch (error: any) {
    logger.error('Error fetching social accounts', { error: error?.message })
    return []
  }
}

export async function connectSocialAccount(
  userId: string,
  platform: string,
  accessToken: string,
  accountId: string,
  username: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('social_accounts')
      .upsert({
        user_id: userId,
        platform: platform,
        access_token: accessToken,
        account_id: accountId,
        username: username,
        connected: true,
        updated_at: new Date().toISOString(),
      })

    if (error) throw error
    return true
  } catch (error: any) {
    logger.error('Error connecting social account', { error: error?.message })
    return false
  }
}

export async function disconnectSocialAccount(
  userId: string,
  accountId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('social_accounts')
      .update({ connected: false, access_token: null })
      .eq('user_id', userId)
      .eq('id', accountId)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { 
      success: false, 
      error: error?.message || 'Error al desconectar la cuenta' 
    }
  }
}

