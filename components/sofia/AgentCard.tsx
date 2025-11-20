/**
 * Componente de tarjeta de agente
 * Responsabilidad: Mostrar información visual de un agente
 */

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Agent } from '@/types/sofia.types'

interface AgentCardProps {
  agent: Agent
  isActive: boolean
  onClick: () => void
}

export function AgentCard({ agent, isActive, onClick }: AgentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer p-4 sm:p-6 rounded-2xl border-2 transition-all ${
        isActive
          ? 'bg-gradient-to-br from-primary-100/90 via-primary-200/80 to-primary-100/90 border-primary-400 shadow-2xl'
          : 'bg-cream-100/80 border-primary-200/60 hover:border-primary-400 hover:shadow-xl'
      }`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-200/20 via-primary-300/20 to-primary-400/20 opacity-0 group-hover:opacity-100"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 lg:border-5 border-transparent shadow-xl sm:shadow-2xl ring-2 sm:ring-3 md:ring-4 ring-primary-200/60 bg-cream-50">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
            className="object-cover"
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-primary-200/20"
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {agent.status === 'available' && (
          <motion.div
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-3 h-3 bg-cream-50 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <h3 className="text-center font-bold text-white text-sm sm:text-base md:text-lg mb-2 mt-3 sm:mt-4">
          {agent.name}
        </h3>
        <p className="text-xs sm:text-sm text-white text-center">
          {agent.status === 'available' ? 'Disponible' : 'En conversación'}
        </p>
      </div>
    </motion.div>
  )
}

