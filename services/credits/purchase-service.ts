/**
 * Servicio: Compra de Créditos
 * Responsabilidad: Gestión de solicitudes de compra
 */

import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export interface CreditPurchaseRequest {
  id: string
  user_id: string
  amount: number
  payment_method: string
  status: 'pending' | 'approved' | 'rejected'
  receipt_url?: string
  admin_notes?: string
  created_at: string
  updated_at: string
  user?: {
    email: string
    full_name?: string
  }
}

export async function createCreditPurchaseRequest(
  userId: string,
  amount: number,
  paymentMethod: string,
  receiptFile?: File
): Promise<{ success: boolean; requestId?: string; error?: string }> {
  try {
    let receiptUrl = null

    if (receiptFile) {
      const fileExt = receiptFile.name.split('.').pop()
      const fileName = `${userId}_${Date.now()}.${fileExt}`
      const filePath = `receipts/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('credit-receipts')
        .upload(filePath, receiptFile)

      if (uploadError) {
        throw uploadError
      }

      const { data: urlData } = supabase.storage
        .from('credit-receipts')
        .getPublicUrl(filePath)

      receiptUrl = urlData.publicUrl
    }

    const { data, error } = await supabase
      .from('credit_purchase_requests')
      .insert({
        user_id: userId,
        amount,
        payment_method: paymentMethod,
        receipt_url: receiptUrl,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    logger.info('Credit purchase request created', { userId, amount, requestId: data.id })

    return {
      success: true,
      requestId: data.id,
    }
  } catch (error) {
    logger.error('Error creating credit purchase request', { error, userId })
    return {
      success: false,
      error: 'Error al crear solicitud de compra',
    }
  }
}

export async function getPurchaseRequests(userId?: string): Promise<CreditPurchaseRequest[]> {
  try {
    let query = supabase
      .from('credit_purchase_requests')
      .select(`
        *,
        user:auth_users(email, full_name)
      `)
      .order('created_at', { ascending: false })

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query

    if (error) throw error
    return data as CreditPurchaseRequest[]
  } catch (error) {
    logger.error('Error fetching purchase requests', { error })
    return []
  }
}

// Alias para compatibilidad
export const getUserCreditRequests = getPurchaseRequests

export async function approvePurchaseRequest(
  requestId: string,
  adminNotes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: request, error: fetchError } = await supabase
      .from('credit_purchase_requests')
      .select('user_id, amount')
      .eq('id', requestId)
      .single()

    if (fetchError) throw fetchError

    const { error: updateError } = await supabase
      .from('credit_purchase_requests')
      .update({
        status: 'approved',
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId)

    if (updateError) throw updateError

    const { error: creditsError } = await supabase.rpc('add_credits', {
      p_user_id: request.user_id,
      p_amount: request.amount,
    })

    if (creditsError) throw creditsError

    logger.info('Purchase request approved', { requestId, userId: request.user_id })
    return { success: true }
  } catch (error: any) {
    logger.error('Error approving purchase request', { error: error?.message, requestId })
    return { 
      success: false, 
      error: error?.message || 'Error al aprobar la solicitud' 
    }
  }
}

// Alias para compatibilidad
export const approveCreditRequest = approvePurchaseRequest

export async function rejectPurchaseRequest(
  requestId: string,
  adminNotes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('credit_purchase_requests')
      .update({
        status: 'rejected',
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId)

    if (error) throw error

    logger.info('Purchase request rejected', { requestId })
    return { success: true }
  } catch (error: any) {
    logger.error('Error rejecting purchase request', { error: error?.message, requestId })
    return { 
      success: false, 
      error: error?.message || 'Error al rechazar la solicitud' 
    }
  }
}

// Alias para compatibilidad
export const rejectCreditRequest = rejectPurchaseRequest

export async function getPendingCreditRequests(): Promise<CreditPurchaseRequest[]> {
  try {
    const { data, error } = await supabase
      .from('credit_purchase_requests')
      .select(`
        *,
        user:auth_users(email, full_name)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as CreditPurchaseRequest[]
  } catch (error) {
    logger.error('Error fetching pending requests', { error })
    return []
  }
}
