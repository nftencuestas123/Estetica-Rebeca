import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'
import { jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tu-super-secreto-cambiar-en-produccion-12345'
)

// POST - Cambiar contraseña del cliente
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const token = request.cookies.get('auth_token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    // Verificar JWT
    let user: any
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      user = payload
    } catch (err) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Obtener usuario actual
    const supabase = getSupabaseClient()
    const { data: userData, error: userError } = await supabase
      .from('auth_users')
      .select('password_hash')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Verificar contraseña actual
    const isValid = await bcrypt.compare(currentPassword, userData.password_hash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'La contraseña actual es incorrecta' },
        { status: 400 }
      )
    }

    // Hash de la nueva contraseña
    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    // Actualizar contraseña
    const { error: updateError } = await supabase
      .from('auth_users')
      .update({
        password_hash: newPasswordHash,
        password_changed_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating password:', updateError)
      return NextResponse.json(
        { error: 'Error al cambiar la contraseña' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Contraseña cambiada exitosamente',
    })
  } catch (err: any) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}

