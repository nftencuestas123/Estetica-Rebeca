'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import AdminSidebar from '@/components/AdminSidebar'

export default function AdminLayout({
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
        router.push('/admin/login')
        return
      }
      // Si es cliente, redirigir automáticamente al dashboard
      if (user.role === 'client') {
        router.push('/dashboard')
        return
      }
    }
  }, [user, loading, router])

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario o no es admin, no mostrar
  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 w-full lg:ml-64 transition-all duration-300">
        <div className="w-full p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 max-w-7xl mx-auto lg:mx-0">
          {children}
        </div>
      </main>
    </div>
  )
}

