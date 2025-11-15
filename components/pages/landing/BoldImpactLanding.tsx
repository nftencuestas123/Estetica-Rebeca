'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Star, Trophy, ArrowRight } from 'lucide-react'

/**
 * =====================================================
 * BOLD IMPACT LANDING PAGE
 * Diseño de alto impacto visual con colores fuertes
 * =====================================================
 */

export default function BoldImpactLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO IMPACTANTE */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background con gradientes fuertes */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-purple-600/20 to-blue-600/20" />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge de impacto */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 rounded-full mb-8"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Zap className="w-5 h-5" />
              <span className="font-bold uppercase text-sm tracking-wider">Elite Beauty Center</span>
            </motion.div>

            <h1 className="text-7xl sm:text-9xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                REBECA
              </span>
              <br />
              <span className="text-white">BARRETO</span>
            </h1>
            
            <p className="text-2xl sm:text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text">
              TRANSFORMA TU BELLEZA
            </p>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto font-medium">
              El centro de estética más avanzado de Ciudad del Este. Tecnología de punta, resultados extraordinarios.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/reserva"
                  className="group px-10 py-5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-xl font-black text-xl uppercase tracking-wider shadow-2xl hover:shadow-red-500/50 transition-all flex items-center gap-3"
                >
                  RESERVA YA
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              <Link
                href="/servicios"
                className="px-10 py-5 border-4 border-white rounded-xl font-black text-xl uppercase tracking-wider hover:bg-white hover:text-black transition-all"
              >
                VER SERVICIOS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CARACTERÍSTICAS EN GRID FUERTE */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl font-black mb-4 uppercase">
              <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                Por qué somos #1
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Trophy />, title: 'TOP EN PARAGUAY', desc: 'Líderes en estética avanzada', gradient: 'from-red-500 to-orange-500' },
              { icon: <Zap />, title: 'TECNOLOGÍA 2025', desc: 'Equipos de última generación', gradient: 'from-purple-500 to-pink-500' },
              { icon: <Star />, title: '+10 AÑOS', desc: 'Experiencia comprobada', gradient: 'from-blue-500 to-cyan-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-gradient-to-br from-neutral-900 to-black border-2 border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all hover:scale-105"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-3 uppercase">{item.title}</h3>
                <p className="text-white/70 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-black mb-4 uppercase">Rebeca Barreto</h3>
          <p className="text-xl font-bold mb-8">ELITE BEAUTY CENTER</p>
          <p className="text-white/90">© 2025 Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

