'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import { useAuth } from '@/hooks/useAuth' // DESACTIVADO - Sin autenticación temporal
import { supabase } from '@/lib/supabase'
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  // AUTENTICACIÓN DESACTIVADA TEMPORALMENTE - Acceso directo sin login
  // const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    citasHoy: 0,
    ingresosMes: 0,
    crecimiento: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // BYPASS DE AUTENTICACIÓN - Cargar stats directamente
    // if (!authLoading && !user) {
    //   router.push('/login')
    //   return
    // }
    // if (user) {
      loadStats()
    // }
  }, [router])

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

  // BYPASS: Mostrar loading solo mientras carga stats, NO por autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  // BYPASS: No verificar usuario - Acceso libre
  // if (!user) {
  //   return null
  // }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-white/60">
          Resumen general del negocio
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-black border border-primary-400/30 rounded-xl shadow-lg p-6 hover:border-primary-400/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 mb-2">Total Usuarios</p>
              <p className="text-3xl font-bold text-primary-400">
                {stats.totalUsuarios}
              </p>
            </div>
            <div className="w-14 h-14 bg-primary-400/10 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-primary-400" />
            </div>
          </div>
        </div>

        <div className="bg-black border border-primary-400/30 rounded-xl shadow-lg p-6 hover:border-primary-400/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 mb-2">Citas Hoy</p>
              <p className="text-3xl font-bold text-primary-400">
                {stats.citasHoy}
              </p>
            </div>
            <div className="w-14 h-14 bg-primary-400/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-primary-400" />
            </div>
          </div>
        </div>

        <div className="bg-black border border-primary-400/30 rounded-xl shadow-lg p-6 hover:border-primary-400/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 mb-2">Ingresos del Mes</p>
              <p className="text-2xl font-bold text-primary-400">
                ${stats.ingresosMes}
              </p>
              <p className="text-xs text-white/40 mt-1">USD</p>
            </div>
            <div className="w-14 h-14 bg-primary-400/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-primary-400" />
            </div>
          </div>
        </div>

        <div className="bg-black border border-primary-400/30 rounded-xl shadow-lg p-6 hover:border-primary-400/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 mb-2">Crecimiento</p>
              <p className="text-3xl font-bold text-green-400">
                +{stats.crecimiento}%
              </p>
            </div>
            <div className="w-14 h-14 bg-green-400/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/clientes"
            className="bg-black border border-primary-400/30 rounded-xl p-6 hover:border-primary-400/50 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-primary-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">CRM - Clientes</h3>
            <p className="text-sm text-white/60">
              Gestionar base de datos de clientes
            </p>
          </Link>

          <Link
            href="/admin/citas"
            className="bg-black border border-primary-400/30 rounded-xl p-6 hover:border-primary-400/50 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-primary-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Gestión de Citas</h3>
            <p className="text-sm text-white/60">
              Ver y gestionar todas las citas
            </p>
          </Link>

          <Link
            href="/admin/tratamientos"
            className="bg-black border border-primary-400/30 rounded-xl p-6 hover:border-primary-400/50 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-primary-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💆</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Tratamientos</h3>
            <p className="text-sm text-white/60">
              Gestionar catálogo de tratamientos
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}







