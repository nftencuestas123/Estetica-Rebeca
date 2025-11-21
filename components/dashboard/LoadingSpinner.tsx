'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Componente: LoadingSpinner
 * Responsabilidad: Mostrar spinner de carga consistente en todo el dashboard
 */
export default function LoadingSpinner({ 
  text = 'Cargando tu panel...',
  size = 'md'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-pink-50/30 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin mx-auto mb-4 text-rose-500`} />
        <p className="text-slate-600 font-medium">{text}</p>
      </div>
    </div>
  )
}


