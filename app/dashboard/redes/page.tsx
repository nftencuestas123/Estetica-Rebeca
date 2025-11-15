'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { ArrowLeft, Share2 } from 'lucide-react'

export default function ClientRedesPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) return null

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FAF7F5' }}>
      <Link href="/dashboard" className="inline-flex items-center gap-2 mb-6 hover:opacity-70">
        <ArrowLeft className="w-5 h-5" /> Volver al Dashboard
      </Link>
      <div className="max-w-4xl mx-auto">
        <div className="p-8 rounded-3xl" style={{ backgroundColor: '#E8D5D5' }}>
          <Share2 className="w-12 h-12 mb-4" style={{ color: '#C9A961' }} />
          <h1 className="text-3xl font-light mb-4" style={{ color: '#5A4A42' }}>
            Gestionar Redes Sociales
          </h1>
          <p style={{ color: '#8A7A72' }}>
            Conecta y gestiona tus cuentas de redes sociales.
          </p>
          <Link href="/admin/configuracion/redes-sociales" className="mt-4 inline-block px-6 py-3 rounded-full" style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}>
            Configurar Redes
          </Link>
        </div>
      </div>
    </div>
  )
}

