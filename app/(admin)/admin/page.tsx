'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    citasHoy: 0,
    ingresosMes: 0,
    crecimiento: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      loadStats()
    }
  }, [user, authLoading, router])

  const loadStats = async () => {
    try {
      // Total usuarios
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      // Citas de hoy
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const { count: citasCount } = await supabase
        .from('citas')
        .select('*', { count: 'exact', head: true })
        .gte('fecha_hora', today.toISOString())
        .lt('fecha_hora', new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString())

      setStats({
        totalUsuarios: userCount || 0,
        citasHoy: citasCount || 0,
        ingresosMes: 0, // TODO: Calcular de pagos
        crecimiento: 0, // TODO: Calcular crecimiento
      })
    } catch (error) {
      console.error('Error cargando stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-sm sm:text-base text-white">
            Gestión completa del negocio
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-cream-50 rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-white mb-1">Total Usuarios</p>
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  {stats.totalUsuarios}
                </p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="bg-cream-50 rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-white mb-1">Citas Hoy</p>
                <p className="text-xl sm:text-2xl font-bold text-accent">
                  {stats.citasHoy}
                </p>
              </div>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-accent opacity-50" />
            </div>
          </div>

          <div className="bg-cream-50 rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-white mb-1">Ingresos del Mes</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  ${stats.ingresosMes} USD
                </p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="bg-cream-50 rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-white mb-1">Crecimiento</p>
                <p className="text-xl sm:text-2xl font-bold text-accent">
                  +{stats.crecimiento}%
                </p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-accent opacity-50" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Link
            href="/admin/clientes"
            className="bg-cream-50 rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-all min-h-[44px]"
          >
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
            <h3 className="font-semibold text-sm sm:text-base text-white mb-2">CRM - Clientes</h3>
            <p className="text-xs sm:text-sm text-white">
              Gestionar base de datos de clientes
            </p>
          </Link>

          <Link
            href="/admin/citas"
            className="bg-cream-50 rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-all min-h-[44px]"
          >
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
            <h3 className="font-semibold text-sm sm:text-base text-white mb-2">Gestión de Citas</h3>
            <p className="text-xs sm:text-sm text-white">
              Ver y gestionar todas las citas
            </p>
          </Link>

          <Link
            href="/admin/tratamientos"
            className="bg-cream-50 rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-all min-h-[44px]"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-primary text-lg sm:text-xl">💆</span>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-white mb-2">Tratamientos</h3>
            <p className="text-xs sm:text-sm text-white">
              Gestionar catálogo de tratamientos
            </p>
          </Link>

          <Link
            href="/admin/sofia"
            className="bg-cream-50 rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-all min-h-[44px]"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-primary text-lg sm:text-xl">🤖</span>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-white mb-2">Sofía IA</h3>
            <p className="text-xs sm:text-sm text-white">
              Ver conversaciones y analytics
            </p>
          </Link>

          <Link
            href="/admin/productos"
            className="bg-cream-50 rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-all min-h-[44px]"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-primary text-lg sm:text-xl">🛍️</span>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-white mb-2">Productos</h3>
            <p className="text-xs sm:text-sm text-white">
              Gestionar inventario y productos
            </p>
          </Link>

          <Link
            href="/admin/reportes"
            className="bg-cream-50 rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-all min-h-[44px]"
          >
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
            <h3 className="font-semibold text-sm sm:text-base text-white mb-2">Reportes</h3>
            <p className="text-xs sm:text-sm text-white">
              Analytics y métricas del negocio
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}







