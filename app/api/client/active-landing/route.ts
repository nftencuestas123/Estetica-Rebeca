import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyJWT } from '@/lib/auth-utils'
import { getSupabaseClient } from '@/lib/supabase-server'

// Forzar dynamic rendering para evitar ejecución durante build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET: Obtener página activa del cliente
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

    // Obtener configuración de página activa del usuario
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('user_landing_pages')
      .select('active_page_id')
      .eq('user_id', payload.userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching active landing:', error)
    }

    return NextResponse.json({
      activePage: data?.active_page_id || 'nude-elegance',
    })
  } catch (error) {
    console.error('Error in GET /api/client/active-landing:', error)
    return NextResponse.json(
      { activePage: 'nude-elegance' },
      { status: 200 }
    )
  }
}

// POST: Activar una página para el cliente
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

    // Obtener pageId del body
    const body = await request.json()
    const { pageId } = body

    if (!pageId) {
      return NextResponse.json({ error: 'pageId requerido' }, { status: 400 })
    }

    // Actualizar o insertar página activa del usuario
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('user_landing_pages')
      .upsert({
        user_id: payload.userId,
        active_page_id: pageId,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      })

    if (error) {
      console.error('Error updating active landing:', error)
      return NextResponse.json(
        { error: 'Error al actualizar página' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      activePage: pageId,
    })
  } catch (error) {
    console.error('Error in POST /api/client/active-landing:', error)
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}

