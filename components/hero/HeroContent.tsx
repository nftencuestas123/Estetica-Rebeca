/**
 * Componente de contenido principal del hero
 * Responsabilidad: Renderizar título, descripción y CTAs
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Calendar, MessageCircle } from 'lucide-react'

interface HeroContentProps {
  mousePosition: { x: number; y: number }
}

export function HeroContent({ mousePosition }: HeroContentProps) {
  return (
    <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      {/* Badge superior */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-200/30 via-primary-300/30 to-primary-400/30 border-2 border-primary-200/50 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 backdrop-blur-sm"
      >
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
        <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
          Transformá tu belleza con tecnología premium
        </span>
      </motion.div>

      {/* Título principal */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight px-2 sm:px-4"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      >
        <span className="block bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent drop-shadow-2xl">
          Descubrí tu
        </span>
        <span
          className="block text-white mt-2 sm:mt-4"
          style={{
            textShadow: '0 4px 20px rgba(201,163,71,0.25)',
          }}
        >
          Mejor Versión
        </span>
      </motion.h1>

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      >
        Tratamientos de estética avanzada con{' '}
        <span className="font-semibold text-white">tecnología de última generación</span> y
        el toque humano que te merecés
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/register"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-transparent rounded-full font-bold text-base sm:text-lg shadow-2xl hover:shadow-primary-300/50 transition-all flex items-center gap-2 sm:gap-3 overflow-hidden w-full sm:w-auto justify-center"
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3 text-white">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              Reservar Turno
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/tratamientos"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-cream-100/90 backdrop-blur-sm border-2 border-primary-200 text-white rounded-full font-semibold text-base sm:text-lg hover:bg-cream-200 hover:border-primary-400 transition-all flex items-center gap-2 sm:gap-3 shadow-lg w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            Ver Tratamientos
          </Link>
        </motion.div>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white font-light px-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          <span>+10 años de experiencia</span>
        </div>
        <div className="hidden sm:block w-1 h-1 bg-primary-300 rounded-full" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          <span>+5000 clientes satisfechas</span>
        </div>
        <div className="hidden sm:block w-1 h-1 bg-primary-300 rounded-full" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          <span>Tecnología de vanguardia</span>
        </div>
      </motion.div>
    </div>
  )
}

