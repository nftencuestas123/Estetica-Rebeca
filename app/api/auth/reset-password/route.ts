/**
 * API ROUTE: POST /api/auth/reset-password
 * Restablece la contraseña
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { hashPassword } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password, confirmPassword } = body

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token y contraseña requeridos' },
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

    // Buscar token
    const { data: resetData } = await supabase
      .from('password_reset_tokens')
      .select('*')
      .eq('token', token)
      .single()

    if (!resetData) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      )
    }

    // Verificar expiración
    if (new Date(resetData.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Token expirado' },
        { status: 401 }
      )
    }

    // Hashear nueva contraseña
    const newPasswordHash = await hashPassword(password)

    // Actualizar contraseña
    await supabase
      .from('auth_users')
      .update({ password_hash: newPasswordHash })
      .eq('id', resetData.user_id)

    // Eliminar token usado
    await supabase
      .from('password_reset_tokens')
      .delete()
      .eq('token', token)

    // Log
    await supabase.rpc('log_auth_activity', {
      p_user_id: resetData.user_id,
      p_action: 'reset_password',
      p_email: resetData.email,
      p_success: true,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Contraseña restablecida exitosamente',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Exception in /api/auth/reset-password:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
