/**
 * =====================================================
 * MIDDLEWARE DE AUTENTICACIÓN
 * Protege rutas según rol (admin vs client)
 * =====================================================
 */

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Excluir /admin-login para evitar loops
  if (req.nextUrl.pathname === '/admin-login') {
    // Si ya está autenticado, verificar rol y redirigir
    if (session) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    }
    // Si no está autenticado, permitir acceso a login
    return res
  }

  // Rutas protegidas para ADMIN (excepto admin-login)
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin-login', req.url))
    }

    // Verificar que sea admin
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (error || profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin-login', req.url))
    }
  }

  // Login de cliente
  if (req.nextUrl.pathname === '/login') {
    if (session) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile?.role === 'client') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }
    return res
  }

  // Rutas protegidas para CLIENTES
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/admin-login',
    '/login',
  ],
}
