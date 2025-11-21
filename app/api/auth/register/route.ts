/**
 * API ROUTE: POST /api/auth/register
 * Registro de cliente
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'
import {
  sanitizeEmail,
  hashPassword,
} from '@/lib/auth-utils'

// Forzar dynamic rendering para evitar ejecución durante build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, confirmPassword, fullName, phone } = body

    // =====================================================
    // VALIDACIONES
    // =====================================================

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, contraseña y nombre son requeridos' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Las contraseñas no coinciden' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      )
    }

    const sanitizedEmail = sanitizeEmail(email)

    // =====================================================
    // VERIFICAR QUE EL EMAIL NO EXISTA
    // =====================================================

    const supabase = getSupabaseClient()
    const { data: existingUser } = await supabase
      .from('auth_users')
      .select('id')
      .eq('email', sanitizedEmail)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      )
    }

    // =====================================================
    // HASHEAR CONTRASEÑA
    // =====================================================

    const passwordHash = await hashPassword(password)

    // =====================================================
    // CREAR USUARIO (SIN VERIFICACIÓN DE EMAIL)
    // =====================================================

    const { data: user, error: userError } = await supabase
      .from('auth_users')
      .insert({
        email: sanitizedEmail,
        password_hash: passwordHash,
        full_name: fullName,
        phone,
        role: 'client',
        is_verified: true, // SIN VERIFICACIÓN - Usuario activo inmediatamente
      })
      .select()
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Error al crear el usuario' },
        { status: 500 }
      )
    }

    // =====================================================
    // RESPUESTA EXITOSA (SIN LOGIN AUTOMÁTICO)
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message: 'Cuenta creada exitosamente. Ya puedes iniciar sesión.',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Exception in /api/auth/register:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

