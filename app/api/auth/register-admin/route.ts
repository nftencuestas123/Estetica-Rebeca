/**
 * API ROUTE: POST /api/auth/register-admin
 * Registro de administrador (después de pasar la puerta de seguridad)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'
import { hashPassword, sanitizeEmail } from '@/lib/auth-utils'
import { logger } from '@/lib/logger'
import crypto from 'crypto'

// Forzar dynamic rendering para evitar ejecución durante build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, confirmPassword, fullName, phone } = body

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

    // Verificar que el email no exista
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

    const passwordHash = await hashPassword(password)

    // Crear usuario admin
    const { data: user, error: userError } = await supabase
      .from('auth_users')
      .insert({
        email: sanitizedEmail,
        password_hash: passwordHash,
        full_name: fullName,
        phone,
        role: 'admin',
        is_verified: false,
      })
      .select()
      .single()

    if (userError || !user) {
      logger.error('Error creating admin user', { error: userError?.message })
      return NextResponse.json(
        { error: userError?.message || 'Error al crear el usuario' },
        { status: 500 }
      )
    }

    // Generar token de verificación
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await supabase.from('auth_email_verification').insert({
      user_id: user.id,
      token: verificationToken,
      email: sanitizedEmail,
      expires_at: expiresAt.toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Administrador registrado. Por favor verifica tu email.',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: 'admin',
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    logger.error('Exception in /api/auth/register-admin', { error: error.message, stack: error.stack })
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
