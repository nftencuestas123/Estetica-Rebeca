/**
 * Hook de autenticación
 * Responsabilidad: Gestionar estado de autenticación del usuario
 */

import { useContext } from 'react'
import { AuthContext } from '@/app/providers'

export function useAuth() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}

