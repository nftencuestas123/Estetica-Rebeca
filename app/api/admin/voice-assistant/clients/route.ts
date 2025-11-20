/**
 * API Route: Voice Assistant Clients
 * Responsabilidad: CRUD de clientes de Voice Assistant
 * Métodos: GET (listar), POST (crear)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getVoiceAssistantClients, createVoiceAssistantClient } from '@/services/admin/voiceAssistantClients'
import { getCurrentUser, requireAdmin } from '@/lib/auth-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin()

    const clients = await getVoiceAssistantClients(user.userId)
    return NextResponse.json({ success: true, data: clients })
  } catch (error: any) {
    console.error('Error in GET /api/admin/voice-assistant/clients:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin()

    const body = await request.json()
    const { name, email, phone, credits = 0, status = 'active' } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newClient = await createVoiceAssistantClient(user.userId, {
      name,
      email,
      phone,
      credits,
      status,
      total_spent: 0,
    })

    if (!newClient) {
      return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: newClient }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/admin/voice-assistant/clients:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

