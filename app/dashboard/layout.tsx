'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import ClientSidebar from '@/components/ClientSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading } = useAuth()

  // Validar acceso
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/client/login')
        return
      }
      // Si es admin, redirigir automáticamente al admin panel
      if (user.role === 'admin') {
        router.push('/admin')
        return
      }
    }
  }, [user, loading, router])

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario o no es cliente, no mostrar
  if (!user || user.role !== 'client') {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ClientSidebar />
      
      {/* Main Content */}
      <div className="lg:ml-64 transition-all duration-300">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}

