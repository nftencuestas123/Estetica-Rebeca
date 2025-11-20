'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Video, Share2, User, Sparkles } from 'lucide-react'
import { getGreeting } from '@/lib/gender-detector'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardCard from '@/components/dashboard/DashboardCard'
import CreditsCard from '@/components/dashboard/CreditsCard'
import AccountInfoCard from '@/components/dashboard/AccountInfoCard'
import QuickStatsGrid from '@/components/dashboard/QuickStatsGrid'
import LoadingSpinner from '@/components/dashboard/LoadingSpinner'

/**
 * =====================================================
 * DASHBOARD DE CLIENTE
 * Panel principal para usuarios clientes
 * Diseño elegante inspirado en Páginas de Inicio
 * =====================================================
 */

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, signOut } = useAuth()
  const [credits, setCredits] = useState(0)
  const [stats, setStats] = useState({
    totalVideos: 0,
    socialAccounts: 0,
    pendingRequests: 0,
  })
  const [loading, setLoading] = useState(true)

  const loadDashboardData = useCallback(async () => {
    try {
      // Ejecutar todas las consultas en paralelo
      const [creditsResult, videosResult, accountsResult, requestsResult] = await Promise.allSettled([
        supabase.from('user_credits').select('balance').eq('user_id', user?.id).single(),
        supabase.from('social_posts').select('*', { count: 'exact', head: true }).eq('user_id', user?.id),
        supabase.from('social_accounts').select('*', { count: 'exact', head: true }).eq('user_id', user?.id),
        supabase.from('credit_purchase_requests').select('*', { count: 'exact', head: true }).eq('user_id', user?.id).eq('status', 'pending')
      ])

      // Procesar créditos
      if (creditsResult.status === 'fulfilled') {
        const { data } = creditsResult.value as any
        if (data?.balance !== undefined) {
          setCredits(data.balance)
        }
      }

      // Procesar stats
      const videosCount = videosResult.status === 'fulfilled' ? (videosResult.value as any)?.count || 0 : 0
      const accountsCount = accountsResult.status === 'fulfilled' ? (accountsResult.value as any)?.count || 0 : 0
      const requestsCount = requestsResult.status === 'fulfilled' ? (requestsResult.value as any)?.count || 0 : 0

      setStats({
        totalVideos: videosCount,
        socialAccounts: accountsCount,
        pendingRequests: requestsCount,
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/client/login')
        return
      }
      // Si es admin, redirigir al panel de administrador (no permitir acceso)
      if (user.role === 'admin') {
        router.push('/admin')
        return
      }
      // Solo cargar datos si es cliente
      if (user.role === 'client') {
        loadDashboardData()
      }
    }
  }, [user, authLoading, router, loadDashboardData])

  if (authLoading || loading) {
    return <LoadingSpinner text="Cargando tu panel..." />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader
        title="Panel de Control"
        description={`${getGreeting(user.fullName)}, ${user.fullName}`}
        icon={<Sparkles className="w-7 h-7 text-rose-500" />}
        notification={
          stats.pendingRequests > 0
            ? { count: stats.pendingRequests, text: 'solicitud(es) pendiente(s)' }
            : undefined
        }
      />

      <main className="p-6">
        <CreditsCard balance={credits} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            href="/dashboard/videos"
            icon={<Video className="w-8 h-8 text-white" />}
            badge={stats.totalVideos}
            title="Crear Videos IA"
            description="Genera videos profesionales con inteligencia artificial"
            footerText={`${stats.totalVideos} videos creados`}
            gradient="rose"
            borderColor="rose"
          />

          <DashboardCard
            href="/dashboard/redes"
            icon={<Share2 className="w-8 h-8 text-white" />}
            badge={stats.socialAccounts}
            title="Redes Sociales"
            description="Gestiona y conecta tus cuentas sociales"
            footerText={`${stats.socialAccounts} cuenta(s) conectada(s)`}
            gradient="blue"
            borderColor="blue"
          />

          <DashboardCard
            href="/dashboard/perfil"
            icon={<User className="w-8 h-8 text-white" />}
            title="Mi Perfil"
            description="Actualiza tu información personal"
            footerText="Ver detalles"
            gradient="purple"
            borderColor="purple"
          />
        </div>

        <AccountInfoCard email={user.email} fullName={user.fullName} phone={user.phone} />

        <QuickStatsGrid
          totalVideos={stats.totalVideos}
          socialAccounts={stats.socialAccounts}
          pendingRequests={stats.pendingRequests}
        />
      </main>
    </div>
  )
}
