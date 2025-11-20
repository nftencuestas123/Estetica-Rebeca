/**
 * API ROUTE: POST /api/auth/login
 * Login único para admins y clientes
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'
import {
  verifyPassword,
  createJWT,
  setAuthCookie,
  sanitizeEmail,
} from '@/lib/auth-utils'
import { logger } from '@/lib/logger'

// Forzar dynamic rendering para evitar ejecución durante build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // =====================================================
    // VALIDACIONES
    // =====================================================

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    const sanitizedEmail = sanitizeEmail(email)

    // =====================================================
    // BUSCAR USUARIO
    // =====================================================

    const supabase = getSupabaseClient()
    const { data: user, error: userError } = await supabase
      .from('auth_users')
      .select('*')
      .eq('email', sanitizedEmail)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    // =====================================================
    // VERIFICAR CONTRASEÑA
    // =====================================================

    const isPasswordValid = await verifyPassword(password, user.password_hash)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    // =====================================================
    // VERIFICAR CUENTA ACTIVA
    // =====================================================

    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Tu cuenta ha sido desactivada. Contacta al administrador.' },
        { status: 403 }
      )
    }

    // =====================================================
    // CREAR TOKEN JWT
    // =====================================================

    const token = await createJWT({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
      phone: user.phone,
      isActive: user.is_active,
      isVerified: user.is_verified,
    })

    // Guardar en cookie
    await setAuthCookie(token)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.full_name,
          phone: user.phone,
        },
        token, // Se envía también en el body (opcional)
      },
      { status: 200 }
    )
  } catch (error: any) {
    logger.error('Exception in login', { error: error.message, stack: error.stack })
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

