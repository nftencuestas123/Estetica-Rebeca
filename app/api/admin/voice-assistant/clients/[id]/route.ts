/**
 * API Route: Voice Assistant Client Detail
 * Responsabilidad: Operaciones específicas de un cliente (GET, UPDATE, DELETE)
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  getVoiceAssistantClient,
  updateVoiceAssistantClient,
  deleteVoiceAssistantClient,
  getClientCreditsHistory,
  getClientUsageStats,
  getClientIntegrations,
} from '@/services/admin/voiceAssistantClients'
import { requireAdmin } from '@/lib/auth-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin()
    const clientId = params.id

    const client = await getVoiceAssistantClient(clientId)
    if (!client) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Obtener datos relacionados
    const creditsHistory = await getClientCreditsHistory(clientId)
    const stats = await getClientUsageStats(clientId)
    const integrations = await getClientIntegrations(clientId)

    return NextResponse.json({
      success: true,
      data: {
        client,
        creditsHistory,
        stats,
        integrations,
      },
    })
  } catch (error: any) {
    console.error('Error in GET /api/admin/voice-assistant/clients/[id]:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin()
    const clientId = params.id

    const client = await getVoiceAssistantClient(clientId)
    if (!client) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const body = await request.json()
    const updated = await updateVoiceAssistantClient(clientId, body)

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('Error in PUT /api/admin/voice-assistant/clients/[id]:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin()
    const clientId = params.id

    const client = await getVoiceAssistantClient(clientId)
    if (!client) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const deleted = await deleteVoiceAssistantClient(clientId)

    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Client deleted' })
  } catch (error: any) {
    console.error('Error in DELETE /api/admin/voice-assistant/clients/[id]:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

