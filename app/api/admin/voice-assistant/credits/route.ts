/**
 * API Route: Voice Assistant Credits
 * Responsabilidad: Agregar/restar créditos a clientes
 * Métodos: POST (agregar créditos)
 */

import { NextRequest, NextResponse } from 'next/server'
import { addCreditsToClient, subtractCreditsFromClient } from '@/services/admin/voiceAssistantClients'
import { requireAdmin } from '@/lib/auth-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin()

    const body = await request.json()
    const { clientId, amount, operation, reason } = body

    if (!clientId || !amount || !operation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (operation !== 'add' && operation !== 'subtract') {
      return NextResponse.json({ error: 'Invalid operation' }, { status: 400 })
    }

    let success = false

    if (operation === 'add') {
      success = await addCreditsToClient(clientId, amount, user.userId, reason)
    } else {
      success = await subtractCreditsFromClient(clientId, amount, reason)
    }

    if (!success) {
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `${operation === 'add' ? 'Credits added' : 'Credits subtracted'}`,
    })
  } catch (error: any) {
    console.error('Error in POST /api/admin/voice-assistant/credits:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

