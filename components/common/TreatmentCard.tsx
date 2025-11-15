/**
 * Componente de tarjeta de tratamiento
 * Responsabilidad: Renderizar información de un tratamiento
 */

'use client'

import { motion } from 'framer-motion'
import { Clock, DollarSign, Check } from 'lucide-react'
import type { Treatment } from '@/types/treatment.types'

interface TreatmentCardProps {
  treatment: Treatment
  index?: number
  onSelect?: (treatment: Treatment) => void
}

export function TreatmentCard({ treatment, index = 0, onSelect }: TreatmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-cream-100/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-200/50 hover:border-primary-400 transition-all shadow-lg hover:shadow-2xl cursor-pointer"
      onClick={() => onSelect?.(treatment)}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2">{treatment.name}</h3>
        <p className="text-sm text-white leading-relaxed">{treatment.description}</p>
      </div>

      {/* Info */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-4 h-4" />
          <span>{treatment.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-primary-400 font-semibold">
          <DollarSign className="w-4 h-4" />
          <span>{treatment.price}</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2">
        {treatment.benefits.map((benefit, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-white">
            <Check className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
      >
        Reservar Ahora
      </motion.button>
    </motion.div>
  )
}

