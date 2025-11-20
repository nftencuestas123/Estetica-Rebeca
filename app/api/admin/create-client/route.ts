/**
 * API ROUTE: POST /api/admin/create-client
 * Solo admins pueden crear clientes
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'
import { 
  requireAdmin, 
  hashPassword, 
  sanitizeEmail, 
  sanitizeName, 
  isValidEmail,
  generateVerificationToken 
} from '@/lib/auth-utils'

// Forzar dynamic rendering para evitar ejecución durante build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Verificar que el usuario sea admin
    const admin = await requireAdmin()

    const body = await request.json()
    const { email, password, fullName, phone } = body

    // =====================================================
    // VALIDACIONES
    // =====================================================

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, contraseña y nombre completo son requeridos' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // =====================================================
    // VERIFICAR SI USUARIO YA EXISTE
    // =====================================================

    const sanitizedEmail = sanitizeEmail(email)

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
    // CREAR CLIENTE
    // =====================================================

    const passwordHash = await hashPassword(password)
    const sanitizedFullName = sanitizeName(fullName)

    const { data: newClient, error: insertError } = await supabase
      .from('auth_users')
      .insert({
        email: sanitizedEmail,
        password_hash: passwordHash,
        role: 'client',
        full_name: sanitizedFullName,
        phone: phone || null,
        is_active: true,
        is_verified: true, // Clientes creados por admin se verifican automáticamente
      })
      .select()
      .single()

    if (insertError || !newClient) {
      console.error('Error creating client:', insertError)
      return NextResponse.json(
        { error: 'Error al crear cliente' },
        { status: 500 }
      )
    }

    // =====================================================
    // LOG DE AUDITORÍA
    // =====================================================

    // Usar el mismo cliente de supabase para el log
    await supabase.rpc('log_auth_activity', {
      p_user_id: newClient.id,
      p_action: 'register',
      p_email: sanitizedEmail,
      p_success: true,
      p_metadata: { created_by_admin: admin.userId },
    })

    // =====================================================
    // RESPUESTA EXITOSA
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message: 'Cliente creado exitosamente',
        client: {
          id: newClient.id,
          email: newClient.email,
          role: newClient.role,
          fullName: newClient.full_name,
          phone: newClient.phone,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Exception in create-client:', error)
    
    if (error.message === 'No autenticado' || error.message.includes('Solo administradores')) {
      return NextResponse.json(
        { error: 'Acceso denegado - Solo administradores' },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

