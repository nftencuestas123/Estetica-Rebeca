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

  // Rutas protegidas para ADMIN
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      // No autenticado → redirigir a admin login
      return NextResponse.redirect(new URL('/admin-login', req.url))
    }

    // Verificar que sea admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      // No es admin → redirigir a dashboard de cliente
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Rutas protegidas para CLIENTES
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      // No autenticado → redirigir a client login
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Verificar que sea cliente (o admin también puede ver)
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Redirigir admin-login y login si ya está autenticado
  if (req.nextUrl.pathname === '/admin-login' || req.nextUrl.pathname === '/login') {
    if (session) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url))
      } else {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
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
