/**
 * API ROUTE: POST /api/auth/forgot-password
 * Solicita reset de contraseña
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sanitizeEmail } from '@/lib/auth-utils'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email requerido' },
        { status: 400 }
      )
    }

    const sanitizedEmail = sanitizeEmail(email)

    // Buscar usuario
    const { data: user } = await supabase
      .from('auth_users')
      .select('*')
      .eq('email', sanitizedEmail)
      .single()

    if (!user) {
      // No revelar si el email existe
      return NextResponse.json(
        {
          success: true,
          message: 'Si la cuenta existe, recibirás un email',
        },
        { status: 200 }
      )
    }

    // Generar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    await supabase.from('password_reset_tokens').insert({
      user_id: user.id,
      token: resetToken,
      email: sanitizedEmail,
      expires_at: expiresAt.toISOString(),
    })

    // Log
    await supabase.rpc('log_auth_activity', {
      p_user_id: user.id,
      p_action: 'forgot_password',
      p_email: sanitizedEmail,
      p_success: true,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Si la cuenta existe, recibirás un email',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Exception in /api/auth/forgot-password:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
