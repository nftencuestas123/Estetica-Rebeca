/**
 * API ROUTE: GET/POST /api/auth/logout
 * Logout del usuario - Cierra sesión completamente
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Función para cerrar sesión
async function handleLogout() {
  try {
    const cookieStore = await cookies()
    
    // Eliminar cookie de auth (nombre correcto)
    cookieStore.delete('auth-token')
    
    return true
  } catch (error) {
    console.error('Error deleting cookie:', error)
    return false
  }
}

// GET: Cerrar sesión y redirigir
export async function GET(request: NextRequest) {
  await handleLogout()
  
  // Redirigir al login sin forzar ninguna página
  return NextResponse.redirect(new URL('/admin/login', request.url))
}

// POST: Cerrar sesión (para llamadas desde JS)
export async function POST(request: NextRequest) {
  const success = await handleLogout()
  
  if (success) {
    return NextResponse.json(
      {
        success: true,
        message: 'Sesión cerrada correctamente',
      },
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    )
  }
}
