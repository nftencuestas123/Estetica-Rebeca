'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'

export default function PremiumHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 40,
          y: (e.clientY / window.innerHeight - 0.5) * 40,
        })
      }
      window.addEventListener('mousemove', handleMouseMove)
      
      // Animación continua del background solo en desktop
      controls.start({
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        transition: { duration: 20, repeat: Infinity, ease: 'linear' }
      })
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', checkMobile)
      }
    }
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [controls, isMobile])

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background animado con gradiente dinámico */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #FF6B9D 0%, #FFD700 50%, #C77DFF 100%)',
            'linear-gradient(225deg, #C77DFF 0%, #FF6B9D 50%, #FFD700 100%)',
            'linear-gradient(315deg, #FFD700 0%, #C77DFF 50%, #FF6B9D 100%)',
            'linear-gradient(135deg, #FF6B9D 0%, #FFD700 50%, #C77DFF 100%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.15 }}
      />

      {/* Partículas animadas más grandes y coloridas - Reducidas en móvil */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 5 : 30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
            }}
            animate={!isMobile ? {
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              rotate: [0, 360],
            } : {}}
            transition={!isMobile ? {
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            } : {}}
          >
            <div className={`w-full h-full rounded-full ${
              i % 3 === 0 ? 'bg-rose-400' : i % 3 === 1 ? 'bg-gold-400' : 'bg-accent-400'
            } ${!isMobile ? 'blur-sm' : ''}`} />
          </motion.div>
        ))}
      </div>

      {/* Formas grandes y dinámicas - Solo en desktop */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
            animate={{
              background: [
                'radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(199,125,255,0.4) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%)',
              ],
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl"
            animate={{
              background: [
                'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(199,125,255,0.4) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
              ],
              x: [0, -80, 60, 0],
              y: [0, 80, -40, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-16 sm:py-24 md:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge premium animado */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/20 md:backdrop-blur-md border-2 border-rose-400/50 rounded-full mb-6 sm:mb-8 shadow-lg text-xs sm:text-sm"
          >
            <motion.div
              className="w-3 h-3 bg-rose-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-rose-600 uppercase tracking-wider">
              Beauty • Innovation • Premium
            </span>
          </motion.div>

          {/* Heading principal con animación de texto */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-neutral-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight"
            style={{
              textShadow: '0 0 30px rgba(255,107,157,0.3)',
            }}
          >
            <motion.span
              className="block"
              animate={!isMobile ? {
                x: [0, mousePosition.x * 0.1],
                y: [0, mousePosition.y * 0.1],
              } : {}}
              transition={!isMobile ? { type: 'spring', stiffness: 50 } : {}}
            >
              ¿Te sentís
            </motion.span>
            <motion.span
              className="block mt-2 relative"
              animate={!isMobile ? {
                x: [0, mousePosition.x * 0.15],
                y: [0, mousePosition.y * 0.15],
              } : {}}
              transition={!isMobile ? { type: 'spring', stiffness: 50 } : {}}
            >
              <span className="font-bold bg-gradient-to-r from-rose-500 via-gold-400 to-accent-400 bg-clip-text text-transparent animate-gradient">
                invisible
              </span>
              {!isMobile && (
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-gold-400 to-accent-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1, type: 'spring' }}
                />
              )}
            </motion.span>
            <motion.span
              className="block mt-2"
              animate={!isMobile ? {
                x: [0, mousePosition.x * 0.1],
                y: [0, mousePosition.y * 0.1],
              } : {}}
              transition={!isMobile ? { type: 'spring', stiffness: 50 } : {}}
            >
              en tu propia piel?
            </motion.span>
          </motion.h1>

          {/* Subtítulo con efecto de brillo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-neutral-800 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            No estás sola. Miles de mujeres como vos recuperaron su{' '}
            <motion.span
              className="font-bold text-rose-600"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255,107,157,0.5)',
                  '0 0 20px rgba(255,107,157,0.8)',
                  '0 0 10px rgba(255,107,157,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              confianza
            </motion.span>{' '}
            y{' '}
            <motion.span
              className="font-bold text-gold-600"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255,215,0,0.5)',
                  '0 0 20px rgba(255,215,0,0.8)',
                  '0 0 10px rgba(255,215,0,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              autoestima
            </motion.span>{' '}
            con nosotros.
            <br />
            <span className="text-lg mt-4 block text-neutral-700 font-medium">
              Tu transformación empieza acá.
            </span>
          </motion.p>

          {/* CTAs premium con efectos hover dramáticos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/tratamientos"
                className="group relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white rounded-full font-semibold text-base sm:text-lg tracking-wide overflow-hidden shadow-2xl w-full sm:w-auto min-h-[48px] flex items-center justify-center"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-400 via-rose-500 to-accent-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Descubrí tu belleza
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contacto"
                className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-white/90 md:backdrop-blur-sm text-rose-600 rounded-full font-semibold text-base sm:text-lg border-2 border-rose-400 hover:border-rose-500 hover:bg-white transition-all shadow-lg w-full sm:w-auto min-h-[48px] flex items-center justify-center"
              >
                Hablá con nosotras
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust indicators con animación */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-12 sm:pt-16 border-t border-rose-200/50 px-4"
          >
            {[
              { number: '2,500+', label: 'Transformaciones completadas', sublabel: 'Mujeres que recuperaron su confianza', color: 'rose' },
              { number: '4.9★', label: 'Calificación promedio', sublabel: 'De clientas verificadas', color: 'gold' },
              { number: '15+', label: 'Años de experiencia', sublabel: 'Especialistas certificados', color: 'accent' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center p-6 rounded-2xl bg-white/30 md:backdrop-blur-sm border border-rose-200/30 hover:border-rose-400/50 transition-all cursor-pointer"
              >
                <motion.div
                  className={`text-5xl font-bold mb-2 bg-gradient-to-r ${
                    stat.color === 'rose' ? 'from-rose-500 to-rose-600' :
                    stat.color === 'gold' ? 'from-gold-400 to-gold-500' :
                    'from-accent-400 to-accent-500'
                  } bg-clip-text text-transparent`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-neutral-800 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-neutral-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator animado */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-rose-400 rounded-full flex justify-center shadow-lg">
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-rose-500 to-gold-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
