'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 09 - One Page Scroll Sections
 * Diseño vertical con secciones full-height
 * =====================================================
 */

export default function NudeLanding09() {
  return (
    <div className="min-h-screen">
      {/* SECCIÓN 1 - HERO */}
      <section 
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: '#FAF7F5' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl"
        >
          <h1 
            className="text-7xl sm:text-8xl font-light mb-8"
            style={{ color: '#E8D5D5' }}
          >
            BELLEZA
          </h1>
          <h2 
            className="text-3xl sm:text-4xl font-light mb-12"
            style={{ color: '#5A4A42' }}
          >
            Rebeca Barreto
          </h2>
          <Link
            href="#servicios"
            className="inline-block px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
          >
            Descubrir
          </Link>
        </motion.div>
      </section>

      {/* SECCIÓN 2 - SERVICIOS */}
      <section 
        id="servicios"
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: '#E8D5D5' }}
      >
        <div className="max-w-5xl w-full">
          <h3 
            className="text-4xl font-light mb-16 text-center"
            style={{ color: '#5A4A42' }}
          >
            Servicios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Tratamientos Faciales', 'Micropigmentación', 'Terapias Corporales'].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: '#FAF7F5' }}
              >
                <h4 className="text-2xl font-medium mb-4" style={{ color: '#5A4A42' }}>
                  {service}
                </h4>
                <p style={{ color: '#8A7A72' }}>
                  Tratamientos personalizados con tecnología avanzada
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3 - CONTACTO */}
      <section 
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: '#E8DCC8' }}
      >
        <div className="text-center max-w-2xl">
          <h3 
            className="text-4xl font-light mb-8"
            style={{ color: '#5A4A42' }}
          >
            Contáctanos
          </h3>
          <p className="text-lg mb-12" style={{ color: '#8A7A72' }}>
            Ciudad del Este, Paraguay
          </p>
          <Link
            href="/reserva"
            className="inline-block px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#B89B8C', color: '#FAF7F5' }}
          >
            Agendar Cita
          </Link>
        </div>
      </section>
    </div>
  )
}

