'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface FunctionalityCardProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
  colorFrom: string
  colorTo: string
  borderColor: string
  hoverBorderColor: string
}

/**
 * Componente: FunctionalityCard
 * Responsabilidad: Mostrar una tarjeta de funcionalidad
 * No contiene lógica, solo presentación
 */
export default function FunctionalityCard({
  href,
  icon: Icon,
  title,
  description,
  colorFrom,
  colorTo,
  borderColor,
  hoverBorderColor,
}: FunctionalityCardProps) {
  return (
    <Link
      href={href}
      className={`group bg-white border-2 ${borderColor} rounded-2xl p-4 sm:p-6 lg:p-8 ${hoverBorderColor} hover:shadow-xl transition-all w-full h-full`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 h-full">
        <div className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br ${colorFrom} ${colorTo} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

