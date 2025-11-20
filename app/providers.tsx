'use client'

/**
 * PROVIDERS - NUEVO SISTEMA DE AUTENTICACIÓN
 * Ya no usa Supabase Auth, usa autenticación propia con JWT
 */

import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

