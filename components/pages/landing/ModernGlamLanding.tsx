'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Zap, Star, Heart } from 'lucide-react'

/**
 * =====================================================
 * MODERN GLAM LANDING PAGE
 * Diseño moderno con animaciones suaves y colores vibrantes
 * =====================================================
 */

export default function ModernGlamLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* HERO con gradientes vibrantes */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Elementos decorativos animados */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-pink-400/30 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full mb-8 shadow-lg">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Premium Beauty Experience
              </span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Rebeca Barreto
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-700 mb-8 font-light">
              Donde la belleza se encuentra con la innovación
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Experimenta tratamientos de última generación en un ambiente de lujo
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reserva"
                className="group px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Reserva Ahora
                </span>
              </Link>
              <Link
                href="/servicios"
                className="px-8 py-4 bg-white/80 backdrop-blur-md text-gray-800 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Explorar Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              ¿Por qué elegirnos?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Star />, title: 'Excelencia', desc: 'Más de 10 años de experiencia', color: 'from-pink-500 to-purple-500' },
              { icon: <Zap />, title: 'Tecnología', desc: 'Equipos de última generación', color: 'from-purple-500 to-blue-500' },
              { icon: <Heart />, title: 'Cuidado', desc: 'Atención personalizada', color: 'from-blue-500 to-pink-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Rebeca Barreto</h3>
          <p className="mb-8">Tu belleza, nuestra pasión</p>
          <p className="text-white/80">© 2025 Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

