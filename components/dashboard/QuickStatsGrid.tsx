'use client'

import { BarChart3, Share2, TrendingUp } from 'lucide-react'

interface QuickStatsGridProps {
  totalVideos: number
  socialAccounts: number
  pendingRequests: number
}

/**
 * QuickStatsGrid Component
 * Responsabilidad única: Mostrar estadísticas rápidas del usuario
 */
export default function QuickStatsGrid({ totalVideos, socialAccounts, pendingRequests }: QuickStatsGridProps) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={<BarChart3 className="w-5 h-5 text-white" />}
        title="Videos Totales"
        value={totalVideos}
        subtitle="Videos creados"
        gradientFrom="rose-500"
        gradientTo="pink-500"
        bgFrom="rose-50"
        bgTo="pink-50"
        borderColor="rose-200"
        textColor="rose-600"
      />

      <StatCard
        icon={<Share2 className="w-5 h-5 text-white" />}
        title="Redes Conectadas"
        value={socialAccounts}
        subtitle="Cuentas activas"
        gradientFrom="blue-500"
        gradientTo="cyan-500"
        bgFrom="blue-50"
        bgTo="cyan-50"
        borderColor="blue-200"
        textColor="blue-600"
      />

      <StatCard
        icon={<TrendingUp className="w-5 h-5 text-white" />}
        title="Solicitudes"
        value={pendingRequests}
        subtitle="Pendientes"
        gradientFrom="amber-500"
        gradientTo="orange-500"
        bgFrom="amber-50"
        bgTo="orange-50"
        borderColor="amber-200"
        textColor="amber-600"
      />
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: number
  subtitle: string
  gradientFrom: string
  gradientTo: string
  bgFrom: string
  bgTo: string
  borderColor: string
  textColor: string
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  gradientFrom,
  gradientTo,
  bgFrom,
  bgTo,
  borderColor,
  textColor,
}: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br from-${bgFrom} to-${bgTo} border-2 border-${borderColor} rounded-2xl p-6`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-lg`}>
          {icon}
        </div>
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      <p className={`text-3xl font-bold text-${textColor}`}>{value}</p>
      <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
    </div>
  )
}

