'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Star, Award, Clock, MapPin, Phone, Mail } from 'lucide-react'

/**
 * =====================================================
 * ELEGANCE GOLD LANDING PAGE
 * Diseño de lujo con oro y negro, ideal para estética de alta gama
 * =====================================================
 */

export default function EleganceGoldLanding() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background con efecto parallax */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo/Emblema */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-br from-primary-400 via-primary-500 to-yellow-600 p-1 rounded-full">
                  <div className="bg-black rounded-full p-6">
                    <span className="text-5xl font-bold bg-gradient-to-br from-primary-400 to-yellow-500 bg-clip-text text-transparent">
                      RB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-yellow-500 bg-clip-text text-transparent">
                Rebeca Barreto
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 mb-4 font-light tracking-wide">
              ESTÉTICA Y BELLEZA
            </p>
            <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Tu belleza auténtica, elevada. Experiencia de lujo en el corazón de Ciudad del Este.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/reserva"
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary-400/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Reservar Cita
                </span>
              </Link>
              <Link
                href="/servicios"
                className="px-8 py-4 border-2 border-primary-400/50 rounded-xl font-semibold text-lg hover:bg-primary-400/10 hover:border-primary-400 transition-all"
              >
                Ver Servicios
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-primary-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-300 to-yellow-500 bg-clip-text text-transparent">
              Servicios de Excelencia
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Tratamientos personalizados con la más alta tecnología y productos premium
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Star className="w-8 h-8" />, title: 'Tratamientos Faciales', desc: 'Rejuvenecimiento y cuidado de la piel' },
              { icon: <Award className="w-8 h-8" />, title: 'Micropigmentación', desc: 'Cejas y labios con técnica avanzada' },
              { icon: <Clock className="w-8 h-8" />, title: 'Depilación Láser', desc: 'Resultados permanentes y seguros' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative bg-gradient-to-br from-neutral-900 to-black border border-primary-400/20 rounded-2xl p-8 hover:border-primary-400/60 transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-primary-400 mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-white/70">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-black via-neutral-950 to-black border-t border-primary-400/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary-400 to-yellow-500 bg-clip-text text-transparent">
                Rebeca Barreto
              </h3>
              <p className="text-white/70">Tu belleza auténtica, elevada.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contacto</h4>
              <div className="space-y-3 text-white/70">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +595 XXX XXX XXX
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@rebecabarreto.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ciudad del Este, Paraguay
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Horarios</h4>
              <p className="text-white/70">Lunes a Viernes: 9:00 - 19:00</p>
              <p className="text-white/70">Sábados: 9:00 - 14:00</p>
            </div>
          </div>
          <div className="border-t border-primary-400/20 pt-8 text-center text-white/60">
            <p>© 2025 Rebeca Barreto. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

