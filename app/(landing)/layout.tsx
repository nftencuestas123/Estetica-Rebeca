'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const [showButton, setShowButton] = useState(false)
  
  // No mostrar el botón en la página de preview
  const isPreviewRoute = pathname.includes('/preview/')

  // Solo mostrar el botón si el usuario está autenticado Y es cliente
  useEffect(() => {
    if (!loading && user && user.role === 'client' && !isPreviewRoute) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [user, loading, isPreviewRoute])

  return (
    <div className="relative">
      {/* Botón flotante para volver - SOLO si está autenticado como cliente */}
      {showButton && (
        <button
          onClick={() => router.push('/dashboard/paginas-inicio')}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/95 hover:bg-white text-slate-700 rounded-lg shadow-lg border border-slate-200 transition-all hover:shadow-xl font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Dashboard
        </button>
      )}
      
      {children}
    </div>
  )
}

