/**
 * Componente de partículas animadas
 * Responsabilidad: Renderizar partículas flotantes decorativas
 */

'use client'

import { motion } from 'framer-motion'

interface AnimatedParticlesProps {
  count: number
  enableAnimation: boolean
}

export function AnimatedParticles({ count, enableAnimation }: AnimatedParticlesProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
          }}
          animate={
            enableAnimation
              ? {
                  y: [0, -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                  rotate: [0, 360],
                }
              : {}
          }
          transition={
            enableAnimation
              ? {
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }
              : {}
          }
        >
          <div
            className={`w-full h-full rounded-full ${
              i % 3 === 0
                ? 'bg-primary-300'
                : i % 3 === 1
                ? 'bg-primary-400'
                : 'bg-primary-500'
            } ${enableAnimation ? 'blur-sm' : ''}`}
          />
        </motion.div>
      ))}
    </div>
  )
}

