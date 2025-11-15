'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 14 - Swiss Minimal
 * Diseño estilo suizo: grid preciso, tipografía clara
 * =====================================================
 */

export default function NudeLanding14() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* HEADER SWISS */}
      <header className="p-6 border-b-2" style={{ borderColor: '#5A4A42' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-2xl" style={{ color: '#5A4A42' }}>
            RB
          </div>
          <nav className="flex gap-8">
            <a href="#servicios" className="text-sm hover:opacity-70" style={{ color: '#5A4A42' }}>
              Servicios
            </a>
            <a href="#contacto" className="text-sm hover:opacity-70" style={{ color: '#5A4A42' }}>
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SWISS GRID */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Columna de título */}
            <div className="col-span-12 lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-7xl sm:text-8xl lg:text-9xl font-bold leading-none mb-6"
                style={{ color: '#5A4A42' }}
              >
                REBECA
                <br />
                BARRETO
              </motion.h1>
            </div>

            {/* Columna de info */}
            <div className="col-span-12 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div 
                  className="p-6"
                  style={{ backgroundColor: '#E8D5D5' }}
                >
                  <p className="text-sm font-medium mb-2" style={{ color: '#5A4A42' }}>
                    EST. 2010
                  </p>
                  <p className="text-xs" style={{ color: '#8A7A72' }}>
                    Más de 10 años de excelencia en estética
                  </p>
                </div>

                <div 
                  className="p-6"
                  style={{ backgroundColor: '#C9A961' }}
                >
                  <p className="text-sm font-medium mb-2" style={{ color: '#FAF7F5' }}>
                    CIUDAD DEL ESTE
                  </p>
                  <p className="text-xs" style={{ color: '#FAF7F5', opacity: 0.9 }}>
                    Paraguay
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS GRID PRECISO */}
      <section id="servicios" className="py-20 px-6" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12" style={{ color: '#5A4A42' }}>
            SERVICIOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: '#5A4A42' }}>
            {[
              { num: '01', title: 'Tratamientos Faciales' },
              { num: '02', title: 'Micropigmentación' },
              { num: '03', title: 'Terapias Corporales' },
              { num: '04', title: 'Depilación Láser' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8"
                style={{ backgroundColor: '#FAF7F5' }}
              >
                <span className="text-4xl font-bold mb-4 block" style={{ color: '#C9A961' }}>
                  {service.num}
                </span>
                <h3 className="text-xl font-bold" style={{ color: '#5A4A42' }}>
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8" style={{ color: '#5A4A42' }}>
            RESERVA TU CITA
          </h2>
          <Link
            href="/reserva"
            className="inline-block px-12 py-6 text-lg font-bold hover:scale-105 transition-transform"
            style={{ backgroundColor: '#5A4A42', color: '#FAF7F5' }}
          >
            AGENDAR AHORA
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-6 border-t-2" style={{ borderColor: '#5A4A42' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium" style={{ color: '#8A7A72' }}>
            © 2025 REBECA BARRETO. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </footer>
    </div>
  )
}

