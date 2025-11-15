'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 17 - Brutalist Clean
 * Diseño brutalista minimalista, bordes fuertes, tipografía bold
 * =====================================================
 */

export default function NudeLanding17() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* HEADER BRUTALIST */}
      <header className="p-6 border-b-4" style={{ borderColor: '#5A4A42' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black" style={{ color: '#5A4A42' }}>
            RB
          </h1>
          <Link
            href="/reserva"
            className="px-6 py-3 border-4 font-black text-sm uppercase hover:scale-105 transition-transform"
            style={{ borderColor: '#5A4A42', color: '#5A4A42' }}
          >
            RESERVAR
          </Link>
        </div>
      </header>

      {/* HERO BRUTALIST */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-12 p-8 border-4" style={{ borderColor: '#E8D5D5' }}>
              <span 
                className="text-xs uppercase tracking-widest font-black mb-4 block"
                style={{ color: '#C9A961' }}
              >
                CENTRO DE ESTÉTICA
              </span>
              <h2 
                className="text-6xl sm:text-8xl font-black leading-none mb-6"
                style={{ color: '#5A4A42' }}
              >
                REBECA
                <br />
                BARRETO
              </h2>
              <p className="text-lg font-medium max-w-2xl" style={{ color: '#8A7A72' }}>
                TRATAMIENTOS PROFESIONALES · RESULTADOS GARANTIZADOS · TECNOLOGÍA AVANZADA
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS GRID */}
      <section className="py-20 px-6" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-black mb-12" style={{ color: '#5A4A42' }}>
            SERVICIOS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: '001', title: 'FACIALES', color: '#E8D5D5' },
              { num: '002', title: 'MICROPIGMENTACIÓN', color: '#D4A99A' },
              { num: '003', title: 'CORPORAL', color: '#C9A961' },
              { num: '004', title: 'DEPILACIÓN', color: '#B89B8C' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border-4"
                style={{ borderColor: '#5A4A42', backgroundColor: service.color }}
              >
                <span className="text-sm font-black mb-2 block" style={{ color: '#5A4A42' }}>
                  [{service.num}]
                </span>
                <h4 className="text-2xl font-black" style={{ color: '#5A4A42' }}>
                  {service.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t-4" style={{ borderColor: '#5A4A42' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#8A7A72' }}>
            © 2025 REBECA BARRETO · CIUDAD DEL ESTE · PARAGUAY
          </p>
        </div>
      </footer>
    </div>
  )
}

