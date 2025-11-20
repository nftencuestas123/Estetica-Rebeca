'use client'

import React from 'react'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
  description: string
  variant?: 'rose' | 'blue' | 'amber'
}

const variantStyles = {
  rose: {
    bg: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
    icon: 'bg-gradient-to-r from-rose-500 to-pink-500',
    value: 'text-rose-600',
  },
  blue: {
    bg: 'from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    icon: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    value: 'text-blue-600',
  },
  amber: {
    bg: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    icon: 'bg-gradient-to-r from-amber-500 to-orange-500',
    value: 'text-amber-600',
  },
}

/**
 * Componente: StatCard
 * Responsabilidad: Tarjeta de estadística reutilizable
 */
export default function StatCard({
  icon,
  label,
  value,
  description,
  variant = 'rose',
}: StatCardProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`bg-gradient-to-br ${styles.bg} border-2 ${styles.border} rounded-2xl p-6`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 ${styles.icon} rounded-lg`}>{icon}</div>
        <h3 className="font-bold text-slate-800">{label}</h3>
      </div>
      <p className={`text-3xl font-bold ${styles.value}`}>{value}</p>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </div>
  )
}

