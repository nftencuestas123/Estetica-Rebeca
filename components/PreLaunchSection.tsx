'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Sparkles, Users, Zap, Bell } from 'lucide-react'
import Image from 'next/image'

export default function PreLaunchSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      // Aquí puedes agregar lógica para guardar el email en Supabase
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="relative py-20 sm:py-28 md:py-36 bg-transparent overflow-hidden">
      {/* Background animado espectacular - Reducido en móvil */}
      <div className="absolute inset-0">
        {!isMobile && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        
        {/* Partículas flotantes - Reducidas en móvil */}
        {[...Array(isMobile ? 5 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cream-100/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={!isMobile ? {
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            } : {}}
            transition={!isMobile ? {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            } : {}}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          {/* Badge de pre-lanzamiento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-cream-100/20 ${!isMobile ? 'backdrop-blur-md' : ''} border-2 border-white/40 rounded-full mb-6 sm:mb-8`}
          >
            <motion.div
              className="w-2 h-2 bg-cream-50 rounded-full"
              animate={!isMobile ? {
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              } : {}}
              transition={!isMobile ? { duration: 2, repeat: Infinity } : {}}
            />
            <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
              Próximamente
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            La Revolución de la{' '}
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              Estética
            </span>
            <br />
            Llega a Paraguay
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
          >
            Próximamente: La aplicación móvil más avanzada de estética y belleza en Ciudad del Este.
            <br className="hidden sm:block" />
            Tecnología de vanguardia, red social propia independiente y experiencia única que revolucionará el mundo de la estética en Paraguay.
          </motion.p>
        </div>

        {/* Logos de las apps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-12 sm:mb-16"
        >
          {/* Logo iOS */}
          <motion.div
              whileHover={!isMobile ? { scale: 1.1, y: -10 } : {}}
              className={`relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-cream-100/60 ${!isMobile ? 'backdrop-blur-md' : ''} rounded-3xl p-4 sm:p-6 border-2 border-primary-200/60 shadow-2xl`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Placeholder para logo iOS - Reemplazar con imagen real */}
              <div className="w-full h-full bg-gradient-to-br from-primary-100/80 to-primary-200/50 rounded-2xl flex items-center justify-center">
                <Smartphone className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white" />
              </div>
              {/* Descomentar cuando tengas el logo real:
              <Image
                src="/images/app-ios-logo.png"
                alt="Rebeca Barreto App iOS"
                fill
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                className="object-contain"
              />
              */}
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-cream-50/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary-200/60">
              <span className="text-xs sm:text-sm font-bold text-white">iOS</span>
            </div>
          </motion.div>

          {/* Logo Android */}
          <motion.div
              whileHover={!isMobile ? { scale: 1.1, y: -10 } : {}}
              className={`relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-cream-100/60 ${!isMobile ? 'backdrop-blur-md' : ''} rounded-3xl p-4 sm:p-6 border-2 border-primary-200/60 shadow-2xl`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Placeholder para logo Android - Reemplazar con imagen real */}
              <div className="w-full h-full bg-gradient-to-br from-primary-100/80 to-primary-200/50 rounded-2xl flex items-center justify-center">
                <Smartphone className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white" />
              </div>
              {/* Descomentar cuando tengas el logo real:
              <Image
                src="/images/app-android-logo.png"
                alt="Rebeca Barreto App Android"
                fill
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                className="object-contain"
              />
              */}
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-cream-50/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary-200/60">
              <span className="text-xs sm:text-sm font-bold text-white">Android</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Características revolucionarias */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {[
            {
              icon: Sparkles,
              title: 'Tecnología Avanzada',
              description: 'IA, AR y herramientas de última generación',
            },
            {
              icon: Users,
              title: 'Red Social Propia',
              description: 'Comunidad exclusiva independiente de Facebook y WhatsApp',
            },
            {
              icon: Zap,
              title: 'Experiencia Única',
              description: 'Diseño premium y funcionalidades revolucionarias',
            },
            {
              icon: Bell,
              title: 'Notificaciones',
              description: 'Mantente al día con todas las novedades',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
              className={`bg-cream-100/70 ${!isMobile ? 'backdrop-blur-md' : ''} rounded-2xl p-4 sm:p-6 border border-primary-200/60 text-center`}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-primary-100/80 rounded-full flex items-center justify-center">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-white">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Formulario de notificación */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className={`bg-cream-100/70 ${!isMobile ? 'backdrop-blur-md' : ''} rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-primary-200/60 shadow-2xl`}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 sm:mb-6">
              Sé la primera en enterarte
            </h3>
            <p className="text-sm sm:text-base text-white text-center mb-6 sm:mb-8">
              Dejá tu email y te notificaremos cuando la app esté disponible
            </p>
            
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-4"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-cream-50/90 border border-primary-200/60 rounded-full">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ✓
                  </motion.div>
                  <span className="text-white font-semibold">¡Gracias! Te notificaremos pronto</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className={`flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-cream-50 ${!isMobile ? 'backdrop-blur-sm' : ''} border-2 border-primary-200/70 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-base sm:text-lg text-white placeholder-primary-400 min-h-[48px]`}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all min-h-[48px] flex items-center justify-center gap-2"
                >
                  <Bell className="w-5 h-5" />
                  <span>Notificarme</span>
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Texto adicional */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm sm:text-base text-white mt-8 sm:mt-12 px-4"
        >
          Una experiencia revolucionaria que transformará la forma en que te conectás con la estética y la belleza.
          <br className="hidden sm:block" />
          <span className="font-semibold text-white"> Próximamente en App Store y Google Play</span>
        </motion.p>
      </div>
    </section>
  )
}






