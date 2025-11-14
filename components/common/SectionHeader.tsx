/**
 * Componente de encabezado de sección
 * Responsabilidad: Renderizar título y descripción de sección
 */

'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 sm:mb-16 ${centered ? 'text-center' : ''}`}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          className={`inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-200/30 via-primary-300/30 to-primary-400/30 border-2 border-primary-200/50 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6`}
          animate={{
            boxShadow: [
              '0 0 20px rgba(201,163,71,0.3)',
              '0 0 40px rgba(201,163,71,0.5)',
              '0 0 20px rgba(201,163,71,0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
        {title}
        {subtitle && (
          <>
            {' '}
            <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent animate-gradient">
              {subtitle}
            </span>
          </>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-base sm:text-lg md:text-xl font-light text-white max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}

