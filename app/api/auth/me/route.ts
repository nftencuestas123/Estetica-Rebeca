/**
 * API ROUTE: GET /api/auth/me
 * Obtiene información del usuario autenticado actual
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth-utils'
import { getSupabaseClient } from '@/lib/supabase-server'

// Forzar dynamic rendering para evitar ejecución durante build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Obtener usuario del JWT
    const jwtUser = await getCurrentUser()

    if (!jwtUser) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    // Obtener información completa de la base de datos
    const supabase = getSupabaseClient()
    const { data: user, error } = await supabase
      .from('auth_users')
      .select('id, email, role, full_name, phone, is_active, is_verified, last_login_at, created_at')
      .eq('id', jwtUser.userId)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el usuario siga activo
    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Cuenta desactivada' },
        { status: 403 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.full_name,
          phone: user.phone,
          isActive: user.is_active,
          isVerified: user.is_verified,
          lastLoginAt: user.last_login_at,
          createdAt: user.created_at,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Exception in /api/auth/me:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

