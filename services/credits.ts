// services/credits.ts
import { supabase } from '@/lib/supabase'
import { VIDEO_PRICING } from '@/constants/payment-config'

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

export interface CreditTransaction {
  id: string
  user_id: string
  type: 'purchase' | 'deduction' | 'refund'
  amount: number
  description: string
  created_at: string
}

// Obtener balance actual del usuario
export async function getUserBalance(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single()

    if (error) {
      // Si no existe, crear registro inicial
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
    console.error('Error getting user balance:', error)
    return 0
  }
}

// Crear solicitud de compra de créditos
export async function createCreditPurchaseRequest(
  userId: string,
  amount: number,
  paymentMethod: string,
  receiptFile?: File
): Promise<{ success: boolean; requestId?: string; error?: string }> {
  try {
    let receiptUrl = null

    // Subir comprobante si existe
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

    // Crear solicitud
    const { data, error } = await supabase
      .from('credit_purchase_requests')
      .insert({
        user_id: userId,
        amount,
        payment_method: paymentMethod,
        status: 'pending',
        receipt_url: receiptUrl,
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, requestId: data.id }
  } catch (error: any) {
    console.error('Error creating credit purchase request:', error)
    return { success: false, error: error.message }
  }
}

// Obtener solicitudes pendientes (ADMIN)
export async function getPendingCreditRequests(): Promise<CreditPurchaseRequest[]> {
  try {
    const { data, error } = await supabase
      .from('credit_purchase_requests')
      .select(`
        *,
        user:users(email, full_name)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error getting pending requests:', error)
    return []
  }
}

// Obtener historial de solicitudes de un usuario
export async function getUserCreditRequests(userId: string): Promise<CreditPurchaseRequest[]> {
  try {
    const { data, error } = await supabase
      .from('credit_purchase_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error getting user credit requests:', error)
    return []
  }
}

// Aprobar solicitud de créditos (ADMIN)
export async function approveCreditRequest(
  requestId: string,
  adminNotes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Obtener la solicitud
    const { data: request, error: fetchError } = await supabase
      .from('credit_purchase_requests')
      .select('*')
      .eq('id', requestId)
      .single()

    if (fetchError) throw fetchError

    // Actualizar balance del usuario
    const { data: userCredit, error: balanceError } = await supabase
      .from('user_credits')
      .select('balance, total_purchased')
      .eq('user_id', request.user_id)
      .single()

    const newBalance = (userCredit?.balance || 0) + request.amount
    const newTotalPurchased = (userCredit?.total_purchased || 0) + request.amount

    const { error: updateBalanceError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: request.user_id,
        balance: newBalance,
        total_purchased: newTotalPurchased,
      })

    if (updateBalanceError) throw updateBalanceError

    // Actualizar estado de la solicitud
    const { error: updateRequestError } = await supabase
      .from('credit_purchase_requests')
      .update({
        status: 'approved',
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId)

    if (updateRequestError) throw updateRequestError

    // Registrar transacción
    await supabase.from('credit_transactions').insert({
      user_id: request.user_id,
      type: 'purchase',
      amount: request.amount,
      description: `Compra de créditos aprobada: $${request.amount}`,
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error approving credit request:', error)
    return { success: false, error: error.message }
  }
}

// Rechazar solicitud de créditos (ADMIN)
export async function rejectCreditRequest(
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
    return { success: true }
  } catch (error: any) {
    console.error('Error rejecting credit request:', error)
    return { success: false, error: error.message }
  }
}

// Descontar créditos al generar video
export async function deductCredits(
  userId: string,
  amount: number,
  description: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const currentBalance = await getUserBalance(userId)

    if (currentBalance < amount) {
      return { success: false, error: 'Saldo insuficiente' }
    }

    const newBalance = currentBalance - amount

    const { error: updateError } = await supabase
      .from('user_credits')
      .update({ balance: newBalance })
      .eq('user_id', userId)

    if (updateError) throw updateError

    // Registrar transacción
    await supabase.from('credit_transactions').insert({
      user_id: userId,
      type: 'deduction',
      amount: -amount,
      description,
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error deducting credits:', error)
    return { success: false, error: error.message }
  }
}

// Obtener historial de transacciones
export async function getCreditTransactions(userId: string): Promise<CreditTransaction[]> {
  try {
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error getting transactions:', error)
    return []
  }
}

// Calcular costo de video según duración (en minutos)
export function calculateVideoCost(durationMinutes: number): number {
  return VIDEO_PRICING.getDurationCost(durationMinutes)
}

// Verificar si usuario tiene suficientes créditos
export async function hasEnoughCredits(
  userId: string,
  requiredAmount: number
): Promise<boolean> {
  const balance = await getUserBalance(userId)
  return balance >= requiredAmount
}

