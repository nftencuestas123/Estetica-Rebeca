'use client'

import React from 'react'

interface InfoSectionProps {
  icon: React.ReactNode
  title: string
  description: string
  items?: string[]
  variant?: 'default' | 'warning' | 'info'
}

const variantStyles = {
  default: {
    border: 'border-slate-200',
    header: 'from-slate-600 to-slate-700',
    icon: 'text-white',
  },
  warning: {
    border: 'border-amber-200',
    header: 'from-amber-600 to-orange-600',
    icon: 'text-white',
  },
  info: {
    border: 'border-blue-200',
    header: 'from-blue-600 to-cyan-600',
    icon: 'text-white',
  },
}

/**
 * Componente: InfoSection
 * Responsabilidad: Sección de información reutilizable
 * - Header con gradiente
 * - Título
 * - Descripción
 * - Lista de items (opcional)
 * - Variantes de estilo
 */
export default function InfoSection({
  icon,
  title,
  description,
  items,
  variant = 'default',
}: InfoSectionProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${styles.border}`}>
      <div className={`bg-gradient-to-r ${styles.header} p-6 text-white`}>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">{icon}</div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div>
            <p className="text-slate-600 text-sm mb-4">{description}</p>
            {items && items.length > 0 && (
              <ul className="space-y-2 text-sm text-slate-600">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

