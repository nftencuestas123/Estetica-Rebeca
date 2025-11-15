'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 04 - Tipografía Grande Dominante
 * Diseño centrado en texto gigante, minimalista extremo
 * =====================================================
 */

export default function NudeLanding04() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* NAV MINIMAL TOP */}
      <nav className="fixed top-0 left-0 right-0 p-6 z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(250, 247, 245, 0.9)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#C9A961' }}>
            RB
          </span>
          <Link
            href="/reserva"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: '#5A4A42' }}
          >
            Reservar →
          </Link>
        </div>
      </nav>

      {/* HERO - TIPOGRAFÍA GIGANTE */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-6xl mx-auto"
        >
          <h1 
            className="text-[10vw] sm:text-[12vw] lg:text-[14vw] font-light leading-none mb-8"
            style={{ color: '#E8D5D5' }}
          >
            REBECA
          </h1>
          <h2 
            className="text-[8vw] sm:text-[10vw] lg:text-[12vw] font-light leading-none mb-12"
            style={{ color: '#D4A99A' }}
          >
            BARRETO
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p 
              className="text-lg sm:text-xl mb-12 font-light tracking-wider uppercase"
              style={{ color: '#8A7A72' }}
            >
              Estética · Belleza · Bienestar
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/servicios"
                className="px-12 py-5 rounded-full text-sm uppercase tracking-widest font-medium hover:scale-105 transition-transform"
                style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
              >
                Servicios
              </Link>
              <Link
                href="/contacto"
                className="px-12 py-5 rounded-full text-sm uppercase tracking-widest font-medium border-2 hover:scale-105 transition-transform"
                style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
              >
                Contacto
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECCIÓN SIMPLE CON STATS */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { number: '10+', label: 'Años' },
              { number: '500+', label: 'Clientas' },
              { number: '15+', label: 'Tratamientos' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div 
                  className="text-6xl sm:text-7xl font-light mb-4"
                  style={{ color: '#C9A961' }}
                >
                  {stat.number}
                </div>
                <p 
                  className="text-sm uppercase tracking-widest font-medium"
                  style={{ color: '#8A7A72' }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER ULTRA MINIMAL */}
      <footer className="py-12 text-center">
        <p className="text-xs uppercase tracking-widest" style={{ color: '#8A7A72' }}>
          © 2025 · Ciudad del Este, Paraguay
        </p>
      </footer>
    </div>
  )
}

