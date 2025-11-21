'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

/**
 * =====================================================
 * PÁGINA PRINCIPAL (RAÍZ DEL DOMINIO)
 * 
 * LÓGICA:
 * 1. Si el usuario está autenticado → Redirige a dashboard/admin
 * 2. Si NO está autenticado → Redirige a landing page activa
 * 
 * OPTIMIZACIÓN: Sin loading visible - Redirige instantáneamente
 * =====================================================
 */

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  // Redirigir al usuario autenticado
  useEffect(() => {
    if (!loading && user) {
      router.push(user.role === 'admin' ? '/admin' : '/dashboard')
      return
    }
  }, [user, loading, router])

  // Redirigir a landing page activa (sin mostrar loading)
  useEffect(() => {
    if (!loading && !user) {
      // Redirigir directamente a la landing page por defecto
      // Sin esperar a cargar la página activa - instantáneo
      router.push('/nude-elegance')
    }
  }, [loading, user, router])

  // No mostrar nada - solo redirigir silenciosamente
  return null
}

