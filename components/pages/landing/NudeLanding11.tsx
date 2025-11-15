'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 11 - Bauhaus Inspired
 * Diseño geométrico, formas básicas, funcional
 * =====================================================
 */

export default function NudeLanding11() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* HERO BAUHAUS */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Formas geométricas Bauhaus */}
        <div 
          className="absolute top-20 right-20 w-64 h-64"
          style={{ backgroundColor: '#E8D5D5' }}
        />
        <div 
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full"
          style={{ backgroundColor: '#C9A961', opacity: 0.6 }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[150px]"
          style={{ borderBottomColor: '#E8DCC8', opacity: 0.5 }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl text-center"
        >
          <h1 
            className="text-6xl sm:text-8xl font-bold mb-4 uppercase"
            style={{ color: '#5A4A42' }}
          >
            REBECA
          </h1>
          <h2 
            className="text-4xl sm:text-6xl font-light mb-12"
            style={{ color: '#C9A961' }}
          >
            BARRETO
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/servicios"
              className="w-48 h-48 rounded-full flex items-center justify-center text-center p-6 hover:scale-105 transition-transform"
              style={{ backgroundColor: '#E8D5D5' }}
            >
              <div>
                <p className="text-lg font-bold" style={{ color: '#5A4A42' }}>
                  SERVICIOS
                </p>
              </div>
            </Link>
            <Link
              href="/reserva"
              className="w-48 h-48 flex items-center justify-center text-center p-6 hover:scale-105 transition-transform"
              style={{ backgroundColor: '#C9A961' }}
            >
              <div>
                <p className="text-lg font-bold" style={{ color: '#FAF7F5' }}>
                  RESERVAR
                </p>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* GRID FUNCIONAL */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'FACIALES', color: '#E8D5D5' },
            { label: 'CEJAS', color: '#D4A99A' },
            { label: 'LABIOS', color: '#B89B8C' },
            { label: 'CORPORAL', color: '#C9A961' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square flex items-center justify-center text-center p-6"
              style={{ backgroundColor: item.color }}
            >
              <p className="text-lg font-bold" style={{ color: i === 3 ? '#FAF7F5' : '#5A4A42' }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center">
        <p className="text-xs uppercase tracking-widest font-bold" style={{ color: '#8A7A72' }}>
          © 2025 REBECA BARRETO
        </p>
      </footer>
    </div>
  )
}

