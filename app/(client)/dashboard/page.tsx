'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers'
import Navbar from '@/components/Navbar'
import ChatSofia from '@/components/ChatSofia'
import { supabase, type User, type Cita } from '@/lib/supabase'
import { Calendar, Clock, Star, Gift, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatDateTime } from '@/lib/utils'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [proximasCitas, setProximasCitas] = useState<Cita[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      loadUserData()
    }
  }, [user, authLoading, router])

  const loadUserData = async () => {
    try {
      // Cargar perfil de usuario
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (profile && !profileError) {
        setUserProfile(profile)
      }

      // Cargar próximas citas
      const { data: citas, error: citasError } = await supabase
        .from('citas')
        .select('*')
        .eq('usuario_id', user?.id)
        .in('estado', ['pendiente', 'confirmada'])
        .order('fecha_hora', { ascending: true })
        .limit(5)

      if (citas && !citasError) {
        setProximasCitas(citas)
      }
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Hola, {userProfile?.nombre || 'Bienvenida'} 👋
          </h1>
          <p className="text-neutral-600">
            Acá está tu panel personal
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Puntos de Lealtad</p>
                <p className="text-2xl font-bold text-primary">
                  {userProfile?.puntos_lealtad || 0}
                </p>
              </div>
              <Gift className="w-8 h-8 text-primary opacity-50" />
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Tier: {userProfile?.tier || 'Bronze'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Próximas Citas</p>
                <p className="text-2xl font-bold text-accent">
                  {proximasCitas.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-accent opacity-50" />
            </div>
            <Link href="/dashboard/citas" className="text-xs text-primary hover:underline mt-2 block">
              Ver todas →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Membresía</p>
                <p className="text-lg font-bold text-neutral-900">
                  {userProfile?.membresia_tipo || 'Sin membresía'}
                </p>
              </div>
              <Star className="w-8 h-8 text-primary opacity-50" />
            </div>
            {!userProfile?.membresia_tipo && (
              <Link href="/dashboard/membresia" className="text-xs text-primary hover:underline mt-2 block">
                Ver planes →
              </Link>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Mi Perfil</p>
                <p className="text-sm font-medium text-neutral-900">
                  {userProfile?.email || user.email}
                </p>
              </div>
              <UserIcon className="w-8 h-8 text-neutral-400 opacity-50" />
            </div>
            <Link href="/dashboard/perfil" className="text-xs text-primary hover:underline mt-2 block">
              Editar →
            </Link>
          </div>
        </div>

        {/* Próximas Citas */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">
              Próximas Citas
            </h2>
          </div>
          <div className="p-6">
            {proximasCitas.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 mb-4">No tenés citas programadas</p>
                <Link
                  href="/tratamientos"
                  className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Agendar Cita
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {proximasCitas.map((cita) => (
                  <div
                    key={cita.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {formatDateTime(cita.fecha_hora)}
                        </p>
                        <p className="text-sm text-neutral-600">
                          Estado: {cita.estado}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/citas/${cita.id}`}
                      className="text-primary hover:underline text-sm"
                    >
                      Ver detalles →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/citas"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all"
          >
            <Calendar className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-neutral-900 mb-2">Mis Citas</h3>
            <p className="text-sm text-neutral-600">
              Ver y gestionar todas tus citas
            </p>
          </Link>

          <Link
            href="/dashboard/chat"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-primary text-xl">💬</span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Chat con Sofía</h3>
            <p className="text-sm text-neutral-600">
              Conversá con nuestra asistente virtual
            </p>
          </Link>

          <Link
            href="/dashboard/puntos"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all"
          >
            <Gift className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-neutral-900 mb-2">Puntos de Lealtad</h3>
            <p className="text-sm text-neutral-600">
              Canjeá tus puntos por recompensas
            </p>
          </Link>
        </div>
      </div>

      <ChatSofia userId={user.id} />
    </div>
  )
}

