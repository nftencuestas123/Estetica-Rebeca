'use client'

import { ReactNode } from 'react'

interface FunctionalitiesGridProps {
  children: ReactNode
}

/**
 * Componente: FunctionalitiesGrid
 * Responsabilidad: Layout grid responsivo para funcionalidades
 */
export default function FunctionalitiesGrid({ children }: FunctionalitiesGridProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl">
      {children}
    </div>
  )
}

