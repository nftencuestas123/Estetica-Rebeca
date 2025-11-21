import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'
import { verifyJWT } from '@/lib/auth-utils'
import { cookies } from 'next/headers'

// Forzar dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * GET: Obtener página activa (público - sin autenticación requerida)
 * 
 * IMPORTANTE: Esta API devuelve la página activa configurada por el CLIENTE (dueño del negocio),
 * NO la página del visitante autenticado. La página activa es global para todos los visitantes.
 * 
 * Lógica:
 * 1. Buscar la página activa del cliente (usuario con role='client')
 * 2. Si no hay cliente configurado o no hay página activa, usar 'nude-elegance' por defecto
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    let activePage = 'nude-elegance' // Página por defecto

    // Buscar el cliente (dueño del negocio) y su página activa
    // Asumimos que hay un cliente principal configurado
    // Si hay múltiples clientes, tomamos el primero con página activa
    const { data: clientData, error: clientError } = await supabase
      .from('auth_users')
      .select('id')
      .eq('role', 'client')
      .limit(1)
      .single()

    if (!clientError && clientData) {
      // Obtener la página activa del cliente
      const { data: landingData, error: landingError } = await supabase
        .from('user_landing_pages')
        .select('active_page_id')
        .eq('user_id', clientData.id)
        .single()

      if (!landingError && landingData?.active_page_id) {
        activePage = landingData.active_page_id
      }
    }

    return NextResponse.json({
      activePage,
    })
  } catch (error) {
    console.error('Error in GET /api/public/active-landing:', error)
    // En caso de error, devolver página por defecto
    return NextResponse.json(
      { activePage: 'nude-elegance' },
      { status: 200 }
    )
  }
}

