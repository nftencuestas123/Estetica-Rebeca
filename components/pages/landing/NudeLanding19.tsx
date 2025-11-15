'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 19 - Art Deco Minimal
 * Diseño inspirado en Art Deco, elegancia geométrica
 * =====================================================
 */

export default function NudeLanding19() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* HERO ART DECO */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Elementos decorativos Art Deco */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 opacity-30" style={{ backgroundColor: '#C9A961' }} />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-32 opacity-30" style={{ backgroundColor: '#C9A961' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl relative"
        >
          {/* Ornamento superior */}
          <div className="mb-8 flex justify-center">
            <svg width="120" height="60" viewBox="0 0 120 60">
              <path
                d="M60,5 L70,25 L80,15 L90,35 L100,25 L110,45 M60,5 L50,25 L40,15 L30,35 L20,25 L10,45"
                stroke="#C9A961"
                fill="none"
                strokeWidth="1"
              />
            </svg>
          </div>

          <h1 
            className="text-6xl sm:text-7xl font-light tracking-widest mb-4"
            style={{ color: '#5A4A42' }}
          >
            REBECA
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px" style={{ backgroundColor: '#C9A961' }} />
            <span 
              className="text-sm tracking-[0.3em] font-light"
              style={{ color: '#C9A961' }}
            >
              ◆
            </span>
            <div className="w-16 h-px" style={{ backgroundColor: '#C9A961' }} />
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-light tracking-widest mb-12"
            style={{ color: '#8A7A72' }}
          >
            BARRETO
          </h2>

          {/* Ornamento inferior */}
          <div className="mb-12 flex justify-center">
            <svg width="80" height="40" viewBox="0 0 80 40">
              <path
                d="M10,5 L20,25 L30,15 L40,35 M50,35 L60,15 L70,25 L80,5"
                stroke="#C9A961"
                fill="none"
                strokeWidth="1"
              />
            </svg>
          </div>

          <p 
            className="text-lg mb-12 font-light tracking-wider"
            style={{ color: '#8A7A72' }}
          >
            ESTÉTICA · ELEGANCIA · EXCELENCIA
          </p>

          <Link
            href="/reserva"
            className="inline-block px-10 py-4 border-2 font-medium tracking-wider hover:scale-105 transition-transform"
            style={{ borderColor: '#C9A961', color: '#5A4A42' }}
          >
            AGENDAR CONSULTA
          </Link>
        </motion.div>
      </section>

      {/* SERVICIOS ART DECO */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E8D5D5' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px" style={{ backgroundColor: '#C9A961' }} />
              <h3 
                className="text-3xl font-light tracking-widest"
                style={{ color: '#5A4A42' }}
              >
                SERVICIOS
              </h3>
              <div className="w-12 h-px" style={{ backgroundColor: '#C9A961' }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['FACIALES', 'CEJAS', 'CORPORAL'].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center p-8"
                style={{ backgroundColor: '#FAF7F5' }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 border-2 transform rotate-45 flex items-center justify-center" style={{ borderColor: '#C9A961' }}>
                    <span className="transform -rotate-45 text-xl" style={{ color: '#C9A961' }}>◆</span>
                  </div>
                </div>
                <h4 
                  className="text-xl font-light tracking-widest"
                  style={{ color: '#5A4A42' }}
                >
                  {service}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-px" style={{ backgroundColor: '#C9A961' }} />
          <span style={{ color: '#C9A961' }}>◆</span>
          <div className="w-8 h-px" style={{ backgroundColor: '#C9A961' }} />
        </div>
        <p className="text-xs tracking-widest" style={{ color: '#8A7A72' }}>
          © MMXXV REBECA BARRETO
        </p>
      </footer>
    </div>
  )
}

