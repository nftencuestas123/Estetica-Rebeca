import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyJWT } from '@/lib/auth-utils'
import { recordVoiceInteraction } from '@/services/credits/voice-assistant-service'

/**
 * API Route: Registrar interacción de voz y deducir créditos
 * 
 * Según PRD: Cada uso del asistente consume créditos
 */

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
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

    // Obtener datos de la interacción
    const body = await request.json()
    const { characters, minutes } = body

    if (!characters || typeof characters !== 'number' || characters <= 0) {
      return NextResponse.json(
        { error: 'Número de caracteres requerido' },
        { status: 400 }
      )
    }

    // Registrar interacción y deducir créditos
    const result = await recordVoiceInteraction(
      payload.userId,
      characters,
      minutes
    )

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Error al procesar interacción' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      interaction: result.interaction,
      message: 'Interacción registrada y créditos deducidos correctamente',
    })
  } catch (error: any) {
    console.error('Error in /api/voice/interaction:', error)
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}

