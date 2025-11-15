/**
 * Componente de formas dinámicas
 * Responsabilidad: Renderizar formas decorativas animadas
 */

'use client'

import { motion } from 'framer-motion'

interface DynamicShapesProps {
  mousePosition: { x: number; y: number }
}

export function DynamicShapes({ mousePosition }: DynamicShapesProps) {
  return (
    <>
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-primary-200/30 via-primary-300/30 to-primary-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-tl from-primary-200/25 via-primary-300/25 to-primary-400/25 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-200/20 via-primary-300/20 to-primary-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.4, 0.15],
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x * 0.2}px), calc(-50% + ${mousePosition.y * 0.2}px))`,
        }}
      />
    </>
  )
}

