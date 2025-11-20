import { NextRequest, NextResponse } from 'next/server'
import { chatWithSofia } from '@/lib/openrouter-service'
import { getSupabaseClient } from '@/lib/supabase-server'
import type { SofiaMessage } from '@/lib/openrouter-service'

// Forzar dynamic rendering para evitar ejecución durante build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mensaje, usuario_id, historial = [], nombreAgente = 'Sofía' } = body

    if (!mensaje || typeof mensaje !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    // Convertir historial al formato correcto
    const historialMessages: SofiaMessage[] = historial.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Obtener nombre del usuario si existe
    let nombreUsuario: string | undefined
    if (usuario_id) {
      const supabase = getSupabaseClient()
      const { data: user } = await supabase
        .from('users')
        .select('nombre')
        .eq('id', usuario_id)
        .single()
      nombreUsuario = user?.nombre
    }

    // Obtener respuesta de la agente (pasando el nombre del agente)
    const response = await chatWithSofia(mensaje, historialMessages, nombreUsuario, nombreAgente)

    // Guardar conversación en Supabase si hay usuario_id
    if (usuario_id) {
      const supabase = getSupabaseClient()
      await supabase.from('conversaciones_sofia').insert({
        usuario_id,
        sesion_id: `session-${Date.now()}`,
        mensaje_usuario: mensaje,
        respuesta_sofia: response.respuesta,
        tipo_interaccion: response.accion_sugerida,
        agente_asignado: nombreAgente,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      respuesta: response.respuesta,
      accion_sugerida: response.accion_sugerida,
      tokens_consumidos: response.tokens_consumidos,
      tiempo_respuesta_ms: response.tiempo_respuesta_ms,
    })
  } catch (error: any) {
    console.error('Error en API chat:', error)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje', detalles: error.message },
      { status: 500 }
    )
  }
}

