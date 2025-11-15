/**
 * Componente principal de Hero Premium
 * Responsabilidad: Orquestar la sección hero con todos sus elementos
 */

'use client'

import { useMouseTracking } from '@/hooks/useMouseTracking'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { AnimatedBackground } from './hero/AnimatedBackground'
import { AnimatedParticles } from './hero/AnimatedParticles'
import { DynamicShapes } from './hero/DynamicShapes'
import { HeroContent } from './hero/HeroContent'

export default function PremiumHero() {
  const isMobile = useDeviceDetect(768)
  const mousePosition = useMouseTracking(!isMobile)

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Background animado */}
      <AnimatedBackground />

      {/* Partículas animadas */}
      <AnimatedParticles count={isMobile ? 5 : 30} enableAnimation={!isMobile} />

      {/* Formas dinámicas - Solo en desktop */}
      {!isMobile && <DynamicShapes mousePosition={mousePosition} />}

      {/* Contenido principal */}
      <HeroContent mousePosition={mousePosition} />
    </section>
  )
}

