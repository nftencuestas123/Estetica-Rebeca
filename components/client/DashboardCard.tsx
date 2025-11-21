'use client'

import Link from 'next/link'
import React from 'react'

interface DashboardCardProps {
  href?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'info'
  icon: React.ReactNode
  title: string
  description: string
  footer?: React.ReactNode
  children?: React.ReactNode
}

const variantStyles = {
  primary: {
    border: 'border-rose-200 hover:border-rose-400',
    header: 'from-rose-500 to-pink-500',
    footer: 'text-rose-600',
  },
  secondary: {
    border: 'border-blue-200 hover:border-blue-400',
    header: 'from-blue-500 to-cyan-500',
    footer: 'text-blue-600',
  },
  info: {
    border: 'border-purple-200 hover:border-purple-400',
    header: 'from-purple-500 to-pink-500',
    footer: 'text-purple-600',
  },
}

/**
 * Componente: DashboardCard
 * Responsabilidad: Tarjeta reutilizable para el dashboard
 * - Link opcional
 * - Variantes de estilo
 * - Estado deshabilitado
 * - Header con gradiente
 * - Footer personalizable
 */
export default function DashboardCard({
  href,
  disabled = false,
  variant = 'primary',
  icon,
  title,
  description,
  footer,
  children,
}: DashboardCardProps) {
  const styles = variantStyles[variant]
  const cardClass = `group bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${styles.border} transition-all ${
    !disabled && href ? 'hover:shadow-2xl hover:scale-[1.02]' : ''
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  const headerContent = (
    <div className={`bg-gradient-to-r ${styles.header} p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
          {icon}
        </div>
        {children}
      </div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-white/90 text-sm">{description}</p>
    </div>
  )

  const footerContent = footer && <div className="p-6">{footer}</div>

  if (disabled || !href) {
    return (
      <div className={cardClass}>
        {headerContent}
        {footerContent}
      </div>
    )
  }

  return (
    <Link href={href} className={cardClass}>
      {headerContent}
      {footerContent}
    </Link>
  )
}

