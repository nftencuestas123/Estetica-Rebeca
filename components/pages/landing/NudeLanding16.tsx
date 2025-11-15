'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 16 - Full Screen Sections
 * Cada sección ocupa toda la pantalla
 * =====================================================
 */

export default function NudeLanding16() {
  return (
    <div className="min-h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* SECCIÓN 1 */}
      <section 
        className="h-screen snap-start flex items-center justify-center px-4"
        style={{ backgroundColor: '#FAF7F5' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl"
        >
          <h1 
            className="text-8xl sm:text-9xl font-light mb-8"
            style={{ color: '#E8D5D5' }}
          >
            01
          </h1>
          <h2 
            className="text-4xl sm:text-5xl font-light mb-6"
            style={{ color: '#5A4A42' }}
          >
            Rebeca Barreto
          </h2>
          <p className="text-lg" style={{ color: '#8A7A72' }}>
            Centro de Estética
          </p>
        </motion.div>
      </section>

      {/* SECCIÓN 2 */}
      <section 
        className="h-screen snap-start flex items-center justify-center px-4"
        style={{ backgroundColor: '#E8D5D5' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 
            className="text-8xl sm:text-9xl font-light mb-8"
            style={{ color: '#FAF7F5' }}
          >
            02
          </h2>
          <h3 
            className="text-4xl font-light mb-6"
            style={{ color: '#5A4A42' }}
          >
            Tratamientos Personalizados
          </h3>
          <p className="text-lg" style={{ color: '#8A7A72' }}>
            Cada tratamiento es diseñado específicamente para tus necesidades únicas
          </p>
        </motion.div>
      </section>

      {/* SECCIÓN 3 */}
      <section 
        className="h-screen snap-start flex items-center justify-center px-4"
        style={{ backgroundColor: '#E8DCC8' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 
            className="text-8xl sm:text-9xl font-light mb-8"
            style={{ color: '#C9A961' }}
          >
            03
          </h2>
          <h3 
            className="text-4xl font-light mb-6"
            style={{ color: '#5A4A42' }}
          >
            Tecnología de Vanguardia
          </h3>
          <p className="text-lg" style={{ color: '#8A7A72' }}>
            Equipos de última generación para resultados excepcionales
          </p>
        </motion.div>
      </section>

      {/* SECCIÓN 4 - CTA */}
      <section 
        className="h-screen snap-start flex items-center justify-center px-4"
        style={{ backgroundColor: '#D4A99A' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 
            className="text-5xl font-light mb-12"
            style={{ color: '#FAF7F5' }}
          >
            Comienza Tu Transformación
          </h2>
          <Link
            href="/reserva"
            className="inline-block px-12 py-5 rounded-full text-lg font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#FAF7F5', color: '#5A4A42' }}
          >
            Reservar Cita
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

