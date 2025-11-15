'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Flower2, Sparkles, Heart } from 'lucide-react'

/**
 * =====================================================
 * SOFT BEAUTY LANDING PAGE
 * Diseño suave con colores pasteles y estética delicada
 * =====================================================
 */

export default function SoftBeautyLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Elementos florales decorativos */}
        <div className="absolute top-10 left-10 text-rose-200 opacity-20">
          <Flower2 className="w-32 h-32" />
        </div>
        <div className="absolute bottom-10 right-10 text-purple-200 opacity-20">
          <Flower2 className="w-40 h-40" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Logo delicado */}
            <div className="mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring' }}
              >
                <Flower2 className="w-12 h-12 text-rose-400" />
              </motion.div>
            </div>

            <h1 className="text-5xl sm:text-7xl font-light mb-6 text-rose-900">
              Rebeca Barreto
            </h1>
            <p className="text-xl sm:text-2xl text-rose-700/80 mb-4 font-light italic">
              Estética y Belleza
            </p>
            <p className="text-lg text-rose-600/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Un espacio de calma y transformación, donde cada detalle está pensado para ti
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reserva"
                className="px-8 py-4 bg-rose-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-rose-500 transition-all"
              >
                Agendar mi cita
              </Link>
              <Link
                href="/servicios"
                className="px-8 py-4 bg-white text-rose-700 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Conocer servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS CON CARDS SUAVES */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light text-rose-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-rose-700/70">Tratamientos diseñados con amor</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Sparkles />, title: 'Tratamientos Faciales', desc: 'Rejuvenece tu piel naturalmente' },
              { icon: <Heart />, title: 'Cuidado Corporal', desc: 'Relaja cuerpo y mente' },
              { icon: <Flower2 />, title: 'Belleza Integral', desc: 'Realza tu belleza natural' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full flex items-center justify-center text-rose-500 mb-6 mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-light text-rose-900 mb-3 text-center">{service.title}</h3>
                <p className="text-rose-700/70 text-center">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-rose-100/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
            <Flower2 className="w-12 h-12 text-rose-400 mx-auto" />
          </div>
          <h3 className="text-2xl font-light text-rose-900 mb-2">Rebeca Barreto</h3>
          <p className="text-rose-700/70 mb-8">Ciudad del Este, Paraguay</p>
          <p className="text-rose-600/60">© 2025 Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

