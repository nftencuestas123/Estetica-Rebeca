/**
 * API Route: Voice Assistant Integrations
 * Responsabilidad: Gestión de integraciones en landing pages
 * Métodos: GET (listar), POST (crear), PUT (actualizar), DELETE (eliminar)
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  getVoiceAssistantIntegrations,
  createVoiceAssistantIntegration,
  updateVoiceAssistantIntegration,
  deleteVoiceAssistantIntegration,
} from '@/services/admin/voiceAssistantClients'
import { requireAdmin } from '@/lib/auth-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin()

    const integrations = await getVoiceAssistantIntegrations(user.userId)
    return NextResponse.json({ success: true, data: integrations })
  } catch (error: any) {
    console.error('Error in GET /api/admin/voice-assistant/integrations:', error)
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
    const { clientId, landingPageUrl, method = 'manual', status = 'active' } = body

    if (!clientId || !landingPageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newIntegration = await createVoiceAssistantIntegration(user.userId, {
      client_id: clientId,
      landing_page_url: landingPageUrl,
      status,
      method,
    })

    if (!newIntegration) {
      return NextResponse.json({ error: 'Failed to create integration' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: newIntegration }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/admin/voice-assistant/integrations:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAdmin()

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing integration ID' }, { status: 400 })
    }

    const updated = await updateVoiceAssistantIntegration(id, updates)

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update integration' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('Error in PUT /api/admin/voice-assistant/integrations:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAdmin()

    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing integration ID' }, { status: 400 })
    }

    const deleted = await deleteVoiceAssistantIntegration(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete integration' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Integration deleted' })
  } catch (error: any) {
    console.error('Error in DELETE /api/admin/voice-assistant/integrations:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.includes('Acceso denegado') ? 403 : 500 }
    )
  }
}

