import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyJWT } from '@/lib/auth-utils'
import { getSupabaseClient } from '@/lib/supabase-server'

/**
 * API Route: Panel Admin - Ver uso del asistente de voz
 * 
 * Muestra quién está usando el asistente y sus créditos
 */

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Verificar que sea admin
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    const supabase = await getSupabaseClient()

    // Obtener todas las interacciones con información de usuarios
    const { data: interactions, error } = await supabase
      .from('voice_interactions')
      .select(`
        *,
        user:auth_users!voice_interactions_user_id_fkey (
          id,
          email,
          full_name
        )
      `)
      .order('created_at', { ascending: false })
      .limit(1000)

    if (error) {
      console.error('Error fetching voice interactions:', error)
      return NextResponse.json(
        { error: 'Error al obtener interacciones' },
        { status: 500 }
      )
    }

    // Agregar información de créditos de cada usuario
    const usersWithStats = await Promise.all(
      (interactions || []).map(async (interaction: any) => {
        const { data: credits } = await supabase
          .from('user_credits')
          .select('balance')
          .eq('user_id', interaction.user_id)
          .single()

        return {
          ...interaction,
          user_balance: credits?.balance || 0,
        }
      })
    )

    // Estadísticas agregadas
    const stats = {
      totalInteractions: interactions?.length || 0,
      totalCreditsSpent: usersWithStats.reduce((sum, i) => sum + i.credits_deducted, 0),
      totalElevenLabsCost: usersWithStats.reduce((sum, i) => sum + i.elevenlabs_cost, 0),
      totalClientPrice: usersWithStats.reduce((sum, i) => sum + i.client_price, 0),
      uniqueUsers: new Set(usersWithStats.map((i: any) => i.user_id)).size,
    }

    return NextResponse.json({
      interactions: usersWithStats,
      stats,
    })
  } catch (error: any) {
    console.error('Error in /api/admin/voice-usage:', error)
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}

