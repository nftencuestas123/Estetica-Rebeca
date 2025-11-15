'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Loader2, CreditCard, Video, Share2, User, LogOut } from 'lucide-react'
import Link from 'next/link'

/**
 * =====================================================
 * DASHBOARD DE CLIENTE
 * Panel principal para usuarios clientes
 * =====================================================
 */

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const [credits, setCredits] = useState(0)
  const [stats, setStats] = useState({
    totalVideos: 0,
    socialAccounts: 0,
    pendingRequests: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
        return
      }
      if (profile?.role === 'admin') {
        router.push('/admin')
        return
      }
      loadDashboardData()
    }
  }, [user, profile, authLoading, router])

  const loadDashboardData = async () => {
    try {
      // Cargar créditos
      const { data: creditsData } = await supabase
        .from('user_credits')
        .select('balance')
        .eq('user_id', user?.id)
        .single()

      if (creditsData) {
        setCredits(creditsData.balance)
      }

      // Cargar stats
      const { count: videosCount } = await supabase
        .from('social_posts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id)

      const { count: accountsCount } = await supabase
        .from('social_accounts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id)

      const { count: requestsCount } = await supabase
        .from('credit_purchase_requests')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id)
        .eq('status', 'pending')

      setStats({
        totalVideos: videosCount || 0,
        socialAccounts: accountsCount || 0,
        pendingRequests: requestsCount || 0,
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F5' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#D4A99A' }} />
          <p style={{ color: '#8A7A72' }}>Cargando tu panel...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* HEADER */}
      <header className="border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8D5D5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-light" style={{ color: '#5A4A42' }}>
              Panel de Cliente
            </h1>
            <p className="text-sm" style={{ color: '#8A7A72' }}>
              Bienvenida, {profile?.full_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm hover:opacity-70 transition-opacity" style={{ color: '#5A4A42' }}>
              Volver al Sitio
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#D4A99A', color: '#FAF7F5' }}
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* CRÉDITOS CARD - DESTACADO */}
        <div className="mb-8 p-8 rounded-3xl" style={{ backgroundColor: '#E8D5D5' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: '#8A7A72' }}>
                Tus Créditos Disponibles
              </p>
              <p className="text-5xl font-light mb-4" style={{ color: '#5A4A42' }}>
                ${credits.toFixed(2)}
              </p>
              <Link
                href="/dashboard/creditos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
                style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
              >
                <CreditCard className="w-5 h-5" />
                Comprar Créditos
              </Link>
            </div>
            {stats.pendingRequests > 0 && (
              <div className="px-4 py-2 rounded-full" style={{ backgroundColor: '#FFA500', color: '#FAF7F5' }}>
                {stats.pendingRequests} solicitud(es) pendiente(s)
              </div>
            )}
          </div>
        </div>

        {/* FUNCIONALIDADES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Videos IA */}
          <Link
            href="/dashboard/videos"
            className="p-6 rounded-2xl hover:scale-105 transition-transform"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8D5D5' }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#E8DCC8' }}
            >
              <Video className="w-6 h-6" style={{ color: '#C9A961' }} />
            </div>
            <h3 className="text-xl font-medium mb-2" style={{ color: '#5A4A42' }}>
              Crear Videos IA
            </h3>
            <p className="text-sm mb-4" style={{ color: '#8A7A72' }}>
              Genera videos profesionales con inteligencia artificial
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#C9A961' }}>
              <span>{stats.totalVideos} videos creados</span>
            </div>
          </Link>

          {/* Redes Sociales */}
          <Link
            href="/dashboard/redes"
            className="p-6 rounded-2xl hover:scale-105 transition-transform"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8D5D5' }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#E8DCC8' }}
            >
              <Share2 className="w-6 h-6" style={{ color: '#C9A961' }} />
            </div>
            <h3 className="text-xl font-medium mb-2" style={{ color: '#5A4A42' }}>
              Redes Sociales
            </h3>
            <p className="text-sm mb-4" style={{ color: '#8A7A72' }}>
              Gestiona y conecta tus cuentas sociales
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#C9A961' }}>
              <span>{stats.socialAccounts} cuenta(s) conectada(s)</span>
            </div>
          </Link>

          {/* Perfil */}
          <Link
            href="/dashboard/perfil"
            className="p-6 rounded-2xl hover:scale-105 transition-transform"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8D5D5' }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#E8DCC8' }}
            >
              <User className="w-6 h-6" style={{ color: '#C9A961' }} />
            </div>
            <h3 className="text-xl font-medium mb-2" style={{ color: '#5A4A42' }}>
              Mi Perfil
            </h3>
            <p className="text-sm mb-4" style={{ color: '#8A7A72' }}>
              Actualiza tu información personal
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#C9A961' }}>
              <span>Ver detalles →</span>
            </div>
          </Link>
        </div>

        {/* INFORMACIÓN ADICIONAL */}
        <div className="p-6 rounded-2xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8D5D5' }}>
          <h2 className="text-2xl font-light mb-4" style={{ color: '#5A4A42' }}>
            Información de tu Cuenta
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: '#E8D5D5' }}>
              <span style={{ color: '#8A7A72' }}>Email:</span>
              <span style={{ color: '#5A4A42' }}>{user.email}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: '#E8D5D5' }}>
              <span style={{ color: '#8A7A72' }}>Nombre:</span>
              <span style={{ color: '#5A4A42' }}>{profile?.full_name}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: '#E8D5D5' }}>
              <span style={{ color: '#8A7A72' }}>Teléfono:</span>
              <span style={{ color: '#5A4A42' }}>{profile?.phone || 'No especificado'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: '#8A7A72' }}>Ciudad:</span>
              <span style={{ color: '#5A4A42' }}>{profile?.city}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

