'use client'

import React from 'react'

interface DashboardHeaderProps {
  icon: React.ReactNode
  title: string
  description?: string
  subtitle?: string
  badge?: React.ReactNode
  notification?: { count: number; text: string }
}

/**
 * Componente: DashboardHeader
 * Responsabilidad: Renderizar header consistente en todas las páginas del dashboard
 */
export default function DashboardHeader({ 
  icon, 
  title, 
  description,
  subtitle,
  badge,
  notification
}: DashboardHeaderProps) {
  const displayText = description || subtitle

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-rose-200/50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              {icon}
              {title}
            </h1>
            {displayText && (
              <p className="text-sm text-slate-600 mt-1">
                {displayText}
              </p>
            )}
          </div>
          {notification && (
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg flex items-center gap-2">
              <span>{notification.count} {notification.text}</span>
            </div>
          )}
          {badge && (
            <div>
              {badge}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
