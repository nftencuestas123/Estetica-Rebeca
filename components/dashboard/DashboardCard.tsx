'use client'

import React from 'react'
import Link from 'next/link'

interface DashboardCardProps {
  href?: string
  icon: React.ReactNode
  title: string
  description: string
  badge?: React.ReactNode | number
  borderColor?: string
  gradient?: string
  gradientFrom?: string
  gradientTo?: string
  actionText?: string
  footerText?: string
  disabled?: boolean
}

/**
 * Componente: DashboardCard
 * Responsabilidad: Renderizar tarjeta reutilizable para el dashboard
 * Soporta: Link, badge, gradientes personalizados
 */
export default function DashboardCard({
  href,
  icon,
  title,
  description,
  badge,
  borderColor = 'border-rose-200',
  gradient,
  gradientFrom = 'from-rose-500',
  gradientTo = 'to-pink-500',
  actionText = 'Ver detalles',
  footerText,
  disabled = false,
}: DashboardCardProps) {
  // Si se especifica gradient simplificado, mapear a colores
  const getGradientClasses = () => {
    const gradientMap: Record<string, { from: string; to: string }> = {
      'rose': { from: 'from-rose-500', to: 'to-pink-500' },
      'blue': { from: 'from-blue-500', to: 'to-cyan-500' },
      'purple': { from: 'from-purple-500', to: 'to-pink-500' },
    }
    if (gradient && gradientMap[gradient]) {
      return gradientMap[gradient]
    }
    return { from: gradientFrom, to: gradientTo }
  }

  const { from, to } = getGradientClasses()
  const cardContent = (
    <>
      <div className={`bg-gradient-to-r ${from} ${to} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
            {icon}
          </div>
          {badge && (
            <div className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full border border-white/40">
              {badge}
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-white/90 text-sm">
          {description}
        </p>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-rose-600 font-semibold group-hover:gap-3 transition-all">
          <span className="text-sm">{footerText || actionText}</span>
        </div>
      </div>
    </>
  )

  if (disabled) {
    return (
      <div className={`group bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${borderColor} opacity-60 cursor-not-allowed`}>
        {cardContent}
      </div>
    )
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`group bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${borderColor} hover:border-rose-400 transition-all hover:shadow-2xl hover:scale-[1.02]`}
      >
        {cardContent}
      </Link>
    )
  }

  return (
    <div className={`group bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${borderColor}`}>
      {cardContent}
    </div>
  )
}
