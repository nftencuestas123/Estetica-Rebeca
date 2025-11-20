import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyJWT } from '@/lib/auth-utils'
import { getUserVoiceStats } from '@/services/credits/voice-assistant-service'

/**
 * API Route: Estadísticas de uso del asistente de voz para cliente
 */

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener estadísticas del usuario
    const stats = await getUserVoiceStats(payload.userId)

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error: any) {
    console.error('Error in /api/client/voice-stats:', error)
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}

