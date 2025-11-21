'use client'

import React from 'react'

interface DashboardHeaderProps {
  title: string
  description: string
  icon: React.ReactNode
  notification?: {
    count: number
    text: string
  }
}

/**
 * Componente: DashboardHeader
 * Responsabilidad: Renderizar header elegante del dashboard
 * - Título con gradiente
 * - Descripción
 * - Icono
 * - Notificación opcional (badge)
 */
export default function DashboardHeader({
  title,
  description,
  icon,
  notification,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-rose-200/50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              {icon}
              {title}
            </h1>
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          </div>
          {notification && notification.count > 0 && (
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg flex items-center gap-2">
              <span className="text-lg">⚡</span>
              {notification.count} {notification.text}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

