/**
 * Servicio: Voice Assistant Clients
 * Responsabilidad: Operaciones CRUD para clientes de Voice Assistant
 * SRP: Solo gestión de datos de clientes
 */

import { getSupabaseClient } from '@/lib/supabase-server'

export interface VoiceAssistantClient {
  id: string
  name: string
  email: string
  phone?: string
  credits: number
  status: 'active' | 'inactive' | 'trial'
  created_at: string
  updated_at?: string
  total_spent: number
  admin_id?: string
}

export interface VoiceAssistantIntegration {
  id: string
  client_id: string
  landing_page_url: string
  status: 'active' | 'inactive'
  method: 'automatic' | 'manual'
  integration_date: string
  created_at: string
}

export interface CreditLog {
  id: string
  client_id: string
  amount: number
  operation: 'add' | 'subtract' | 'purchase' | 'refund'
  reason?: string
  created_at: string
}

export interface VoiceUsage {
  id: string
  client_id: string
  integration_id?: string
  call_id?: string
  duration_seconds: number
  cost_credits: number
  status: 'completed' | 'failed' | 'cancelled'
  created_at: string
}

// ==================== CLIENTES ====================

/**
 * Obtiene todos los clientes del admin autenticado
 */
export async function getVoiceAssistantClients(adminId: string): Promise<VoiceAssistantClient[]> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_clients')
      .select('*')
      .eq('admin_id', adminId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as VoiceAssistantClient[]) || []
  } catch (error) {
    console.error('Error fetching Voice Assistant clients:', error)
    return []
  }
}

/**
 * Obtiene un cliente específico
 */
export async function getVoiceAssistantClient(clientId: string): Promise<VoiceAssistantClient | null> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_clients')
      .select('*')
      .eq('id', clientId)
      .single()

    if (error) throw error
    return data as VoiceAssistantClient
  } catch (error) {
    console.error('Error fetching Voice Assistant client:', error)
    return null
  }
}

/**
 * Crea un nuevo cliente
 */
export async function createVoiceAssistantClient(
  adminId: string,
  client: Omit<VoiceAssistantClient, 'id' | 'created_at' | 'updated_at' | 'admin_id'>
): Promise<VoiceAssistantClient | null> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_clients')
      .insert([{ ...client, admin_id: adminId }])
      .select()
      .single()

    if (error) throw error
    return data as VoiceAssistantClient
  } catch (error) {
    console.error('Error creating Voice Assistant client:', error)
    return null
  }
}

/**
 * Actualiza un cliente
 */
export async function updateVoiceAssistantClient(
  clientId: string,
  updates: Partial<VoiceAssistantClient>
): Promise<VoiceAssistantClient | null> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_clients')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', clientId)
      .select()
      .single()

    if (error) throw error
    return data as VoiceAssistantClient
  } catch (error) {
    console.error('Error updating Voice Assistant client:', error)
    return null
  }
}

/**
 * Elimina un cliente
 */
export async function deleteVoiceAssistantClient(clientId: string): Promise<boolean> {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('voice_assistant_clients')
      .delete()
      .eq('id', clientId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting Voice Assistant client:', error)
    return false
  }
}

// ==================== CRÉDITOS ====================

/**
 * Obtiene el saldo de créditos de un cliente
 */
export async function getClientCredits(clientId: string): Promise<number> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_clients')
      .select('credits')
      .eq('id', clientId)
      .single()

    if (error) throw error
    return (data?.credits as number) || 0
  } catch (error) {
    console.error('Error fetching client credits:', error)
    return 0
  }
}

/**
 * Agrega créditos a un cliente
 */
export async function addCreditsToClient(
  clientId: string,
  amount: number,
  adminId: string,
  reason?: string
): Promise<boolean> {
  try {
    // Obtener créditos actuales
    const client = await getVoiceAssistantClient(clientId)
    if (!client) throw new Error('Client not found')

    const newCredits = client.credits + amount
    const supabase = getSupabaseClient()

    // Actualizar créditos
    const { error: updateError } = await supabase
      .from('voice_assistant_clients')
      .update({ credits: newCredits, updated_at: new Date().toISOString() })
      .eq('id', clientId)

    if (updateError) throw updateError

    // Registrar en log
    const { error: logError } = await supabase
      .from('voice_assistant_credits_log')
      .insert([
        {
          client_id: clientId,
          amount,
          operation: 'add',
          reason,
          admin_id: adminId,
        },
      ])

    if (logError) throw logError
    return true
  } catch (error) {
    console.error('Error adding credits to client:', error)
    return false
  }
}

/**
 * Resta créditos de un cliente (uso del servicio)
 */
export async function subtractCreditsFromClient(
  clientId: string,
  amount: number,
  reason?: string
): Promise<boolean> {
  try {
    // Obtener créditos actuales
    const client = await getVoiceAssistantClient(clientId)
    if (!client) throw new Error('Client not found')

    const newCredits = Math.max(0, client.credits - amount)
    const supabase = getSupabaseClient()

    // Actualizar créditos
    const { error: updateError } = await supabase
      .from('voice_assistant_clients')
      .update({ credits: newCredits, updated_at: new Date().toISOString() })
      .eq('id', clientId)

    if (updateError) throw updateError

    // Registrar en log
    const { error: logError } = await supabase
      .from('voice_assistant_credits_log')
      .insert([
        {
          client_id: clientId,
          amount,
          operation: 'subtract',
          reason,
        },
      ])

    if (logError) throw logError
    return true
  } catch (error) {
    console.error('Error subtracting credits from client:', error)
    return false
  }
}

/**
 * Obtiene el historial de créditos de un cliente
 */
export async function getClientCreditsHistory(clientId: string): Promise<CreditLog[]> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_credits_log')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as CreditLog[]) || []
  } catch (error) {
    console.error('Error fetching client credits history:', error)
    return []
  }
}

// ==================== INTEGRACIONES ====================

/**
 * Obtiene todas las integraciones de un admin
 */
export async function getVoiceAssistantIntegrations(adminId: string): Promise<VoiceAssistantIntegration[]> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_integrations')
      .select('*')
      .eq('admin_id', adminId)
      .order('integration_date', { ascending: false })

    if (error) throw error
    return (data as VoiceAssistantIntegration[]) || []
  } catch (error) {
    console.error('Error fetching Voice Assistant integrations:', error)
    return []
  }
}

/**
 * Obtiene integraciones de un cliente específico
 */
export async function getClientIntegrations(clientId: string): Promise<VoiceAssistantIntegration[]> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_integrations')
      .select('*')
      .eq('client_id', clientId)
      .order('integration_date', { ascending: false })

    if (error) throw error
    return (data as VoiceAssistantIntegration[]) || []
  } catch (error) {
    console.error('Error fetching client integrations:', error)
    return []
  }
}

/**
 * Crea una nueva integración
 */
export async function createVoiceAssistantIntegration(
  adminId: string,
  integration: Omit<VoiceAssistantIntegration, 'id' | 'created_at' | 'integration_date'>
): Promise<VoiceAssistantIntegration | null> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_integrations')
      .insert([{
        ...integration,
        admin_id: adminId,
        integration_date: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) throw error
    return data as VoiceAssistantIntegration
  } catch (error) {
    console.error('Error creating Voice Assistant integration:', error)
    return null
  }
}

/**
 * Actualiza una integración
 */
export async function updateVoiceAssistantIntegration(
  integrationId: string,
  updates: Partial<VoiceAssistantIntegration>
): Promise<VoiceAssistantIntegration | null> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_integrations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', integrationId)
      .select()
      .single()

    if (error) throw error
    return data as VoiceAssistantIntegration
  } catch (error) {
    console.error('Error updating Voice Assistant integration:', error)
    return null
  }
}

/**
 * Elimina una integración
 */
export async function deleteVoiceAssistantIntegration(integrationId: string): Promise<boolean> {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('voice_assistant_integrations')
      .delete()
      .eq('id', integrationId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting Voice Assistant integration:', error)
    return false
  }
}

// ==================== USO ====================

/**
 * Obtiene el uso de un cliente en los últimos N días
 */
export async function getClientUsage(clientId: string, days: number = 30): Promise<VoiceUsage[]> {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('voice_assistant_usage')
      .select('*')
      .eq('client_id', clientId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as VoiceUsage[]) || []
  } catch (error) {
    console.error('Error fetching client usage:', error)
    return []
  }
}

/**
 * Obtiene estadísticas de uso de un cliente
 */
export async function getClientUsageStats(clientId: string, days: number = 30) {
  try {
    const usage = await getClientUsage(clientId, days)

    const totalCalls = usage.length
    const totalMinutes = Math.round(usage.reduce((acc, u) => acc + u.duration_seconds, 0) / 60)
    const totalCost = usage.reduce((acc, u) => acc + u.cost_credits, 0)
    const failedCalls = usage.filter((u) => u.status === 'failed').length

    return {
      totalCalls,
      totalMinutes,
      totalCost,
      failedCalls,
      successRate: totalCalls > 0 ? Math.round(((totalCalls - failedCalls) / totalCalls) * 100) : 0,
    }
  } catch (error) {
    console.error('Error calculating client usage stats:', error)
    return { totalCalls: 0, totalMinutes: 0, totalCost: 0, failedCalls: 0, successRate: 0 }
  }
}

/**
 * Registra un uso de Voice Assistant
 */
export async function recordVoiceAssistantUsage(
  usage: Omit<VoiceUsage, 'id' | 'created_at'>
): Promise<VoiceUsage | null> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from('voice_assistant_usage').insert([usage]).select().single()

    if (error) throw error

    // Restar créditos del cliente
    await subtractCreditsFromClient(usage.client_id, usage.cost_credits, `Llamada: ${usage.call_id || 'N/A'}`)

    return data as VoiceUsage
  } catch (error) {
    console.error('Error recording Voice Assistant usage:', error)
    return null
  }
}
