/**
 * Componente de fondo animado
 * Responsabilidad: Renderizar fondo con gradiente dinámico
 */

'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          'linear-gradient(135deg, #FFF4DB 0%, #F1D6A1 40%, #C9A347 100%)',
          'linear-gradient(225deg, #FFF8ED 0%, #F1D6A1 50%, #B68633 100%)',
          'linear-gradient(315deg, #FFF1D1 0%, #E4C17D 50%, #A7712A 100%)',
          'linear-gradient(135deg, #FFF4DB 0%, #F1D6A1 40%, #C9A347 100%)',
        ],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      style={{ opacity: 0.15 }}
    />
  )
}

