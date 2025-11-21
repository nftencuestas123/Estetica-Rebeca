'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Mic, CreditCard, BarChart3, Clock, TrendingUp, DollarSign, AlertCircle, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import LoadingSpinner from '@/components/dashboard/LoadingSpinner'

/**
 * =====================================================
 * PÁGINA: ASISTENTE DE VOZ
 * Responsabilidad: Mostrar estadísticas y balance del asistente de voz
 * =====================================================
 */

interface VoiceStats {
  totalInteractions: number
  totalCharacters: number
  totalMinutes: number
  totalCreditsSpent: number
  averageCostPerInteraction: number
}

export default function AsistenteVozClientPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<VoiceStats | null>(null)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/client/login')
      return
    }
    if (user && user.role === 'admin') {
      router.push('/admin')
      return
    }
    if (user && user.role === 'client') {
      loadVoiceData()
    }
  }, [user, authLoading, router])

  const loadVoiceData = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const [statsRes, balanceRes] = await Promise.all([
        fetch('/api/client/voice-stats', { signal: controller.signal }),
        fetch('/api/client/credits/balance', { signal: controller.signal }),
      ])

      clearTimeout(timeoutId)

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data.stats)
      }
      if (balanceRes.ok) {
        const data = await balanceRes.json()
        setBalance(data.balance || 0)
      }
    } catch (error) {
      console.error('Error loading voice data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return <LoadingSpinner text="Cargando estadísticas..." />
  }

  if (!user || user.role !== 'client') {
    return null
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Mic className="w-8 h-8 text-rose-500" />
          Asistente de Voz
        </h1>
        <p className="text-slate-600">
          Uso y consumo de tu asistente conversacional
        </p>
      </div>

      {/* INFORMACIÓN DEL ASISTENTE */}
      <InfoSection />

      {/* ALERTA DE BALANCE BAJO */}
      {balance < 10 && <LowBalanceAlert balance={balance} />}

      {/* BALANCE Y ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BalanceCard balance={balance} />
        <InteractionsCard interactions={stats?.totalInteractions || 0} />
      </div>

      {/* ESTADÍSTICAS DETALLADAS */}
      {stats && stats.totalInteractions > 0 && <StatsGrid stats={stats} />}

      {/* INFORMACIÓN DE USO */}
      <UsageInfoSection />
    </div>
  )
}

function InfoSection() {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <MessageSquare className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            ¿Qué es el Asistente de Voz?
          </h3>
          <p className="text-gray-700 mb-3">
            Tu asistente de voz con inteligencia artificial está disponible en tu página web para ayudar a tus visitantes. 
            Puede responder preguntas, dar información sobre tus servicios y guiar a tus clientes 24/7.
          </p>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">💡 Cómo funciona:</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Los visitantes ven un botón flotante en tu sitio web</li>
              <li>• Pueden hablar o escribir sus consultas</li>
              <li>• El asistente responde en tiempo real con voz natural</li>
              <li>• Cada interacción consume créditos de tu balance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function LowBalanceAlert({ balance }: { balance: number }) {
  return (
    <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
      <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-amber-900 mb-1">
          Balance de créditos bajo
        </h3>
        <p className="text-sm text-amber-800 mb-3">
          Tu balance actual es de ${balance.toFixed(2)}. Necesitas créditos para usar el asistente de voz.
        </p>
        <Link
          href="/dashboard/creditos"
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Comprar Créditos
        </Link>
      </div>
    </div>
  )
}

function BalanceCard({ balance }: { balance: number }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-rose-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Balance Actual</p>
            <p className="text-2xl font-bold text-slate-900">
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <Link
        href="/dashboard/creditos"
        className="block w-full text-center bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
      >
        Comprar Más Créditos
      </Link>
    </div>
  )
}

function InteractionsCard({ interactions }: { interactions: number }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-rose-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-slate-600">Total Interacciones</p>
          <p className="text-2xl font-bold text-slate-900">{interactions}</p>
        </div>
      </div>
      <p className="text-sm text-slate-500">
        Conversaciones con tu asistente
      </p>
    </div>
  )
}

function StatsGrid({ stats }: { stats: VoiceStats }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-rose-100 mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-rose-500" />
        Estadísticas de Uso
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatItem icon={<Clock className="w-5 h-5" />} label="Tiempo Total" value={stats.totalMinutes > 0 ? `${Math.round(stats.totalMinutes)} min` : 'N/A'} bgColor="slate" />
        <StatItem icon={<TrendingUp className="w-5 h-5" />} label="Caracteres" value={stats.totalCharacters.toLocaleString()} bgColor="blue" />
        <StatItem icon={<DollarSign className="w-5 h-5" />} label="Créditos Gastados" value={`$${stats.totalCreditsSpent.toFixed(2)}`} bgColor="amber" />
      </div>

      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Costo promedio por interacción</span>
          <span className="text-lg font-bold text-slate-900">
            ${stats.averageCostPerInteraction.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

interface StatItemProps {
  icon: React.ReactNode
  label: string
  value: string
  bgColor: 'slate' | 'blue' | 'amber'
}

function StatItem({ icon, label, value, bgColor }: StatItemProps) {
  const bgMap = {
    slate: 'from-slate-50 to-slate-100',
    blue: 'from-blue-50 to-blue-100',
    amber: 'from-amber-50 to-amber-100',
  }

  const textMap = {
    slate: 'text-slate-600',
    blue: 'text-blue-600',
    amber: 'text-amber-600',
  }

  return (
    <div className={`bg-gradient-to-br ${bgMap[bgColor]} rounded-lg p-4`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-5 h-5 ${textMap[bgColor]}`}>
          {icon}
        </div>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  )
}

function UsageInfoSection() {
  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-rose-200">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Mic className="w-6 h-6 text-rose-500" />
        ¿Cómo funciona?
      </h2>
      <div className="space-y-3 text-slate-700">
        <p>
          El asistente de voz está disponible en todas tus páginas de inicio. Los visitantes pueden hacer clic en el botón flotante para conversar con tu asistente.
        </p>
        <p>
          <strong>Cada interacción consume créditos</strong> según la cantidad de caracteres procesados. El sistema calcula automáticamente el costo y deduce los créditos de tu balance.
        </p>
        <p className="text-sm text-slate-600">
          💡 <strong>Tip:</strong> Mantén un balance suficiente para que tus visitantes puedan usar el asistente sin interrupciones.
        </p>
      </div>
    </div>
  )
}
