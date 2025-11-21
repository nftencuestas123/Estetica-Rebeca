'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

/**
 * =====================================================
 * PÁGINA PRINCIPAL (RAÍZ DEL DOMINIO)
 * 
 * LÓGICA:
 * 1. Si el usuario está autenticado → Redirige a dashboard/admin
 * 2. Si NO está autenticado → Muestra la landing page activa
 * =====================================================
 */

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [activePage, setActivePage] = useState<string | null>(null)
  const [pageLoading, setPageLoading] = useState(true)

  // Cargar página activa (sin autenticación requerida)
  useEffect(() => {
    const loadActivePage = async () => {
      try {
        // Intentar obtener la página activa del usuario autenticado
        // Si no hay usuario, usar la página por defecto
        const response = await fetch('/api/public/active-landing')
        if (response.ok) {
          const data = await response.json()
          setActivePage(data.activePage || 'nude-elegance')
        } else {
          // Si falla, usar página por defecto
          setActivePage('nude-elegance')
        }
      } catch (error) {
        console.error('Error loading active page:', error)
        // En caso de error, usar página por defecto
        setActivePage('nude-elegance')
      } finally {
        setPageLoading(false)
      }
    }

    loadActivePage()
  }, [])

  // Si el usuario está autenticado, redirigir
  useEffect(() => {
    if (!loading && user) {
      router.push(user.role === 'admin' ? '/admin' : '/dashboard')
    }
  }, [user, loading, router])

  // Si está cargando o hay usuario, mostrar loading
  if (loading || user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-slate-700 rounded w-32 mx-auto"></div>
            <div className="h-4 bg-slate-700 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  // Si no hay usuario y ya cargamos la página activa, redirigir a la landing
  if (!pageLoading && activePage) {
    router.push(`/${activePage}`)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-slate-700 rounded w-32 mx-auto"></div>
            <div className="h-4 bg-slate-700 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  // Loading mientras se carga la página activa
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-slate-700 rounded w-32 mx-auto"></div>
          <div className="h-4 bg-slate-700 rounded w-24 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}

