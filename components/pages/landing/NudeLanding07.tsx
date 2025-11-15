'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 07 - Minimalista Japonés (Wabi-Sabi)
 * Diseño ultra simple, espacios en blanco, zen
 * =====================================================
 */

export default function NudeLanding07() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* NAV LATERAL FIJO */}
      <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="space-y-8 text-right">
          {['Inicio', 'Servicios', 'Contacto'].map((item, i) => (
            <a
              key={i}
              href={`#${item.toLowerCase()}`}
              className="block text-sm hover:opacity-70 transition-opacity"
              style={{ color: '#8A7A72' }}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO - ULTRA MINIMALISTA */}
      <section id="inicio" className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center max-w-2xl"
        >
          {/* Círculo zen */}
          <motion.div
            initial={{ strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="mb-16"
          >
            <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="#C9A961"
                strokeWidth="1"
                strokeDasharray="1000"
              />
            </svg>
          </motion.div>

          <h1 
            className="text-4xl sm:text-5xl font-light mb-12 tracking-wide"
            style={{ color: '#5A4A42' }}
          >
            Rebeca Barreto
          </h1>

          <p 
            className="text-base mb-16 font-light leading-loose"
            style={{ color: '#8A7A72' }}
          >
            En la simplicidad encontramos la verdadera belleza.
            <br />
            Tratamientos que honran tu esencia natural.
          </p>

          <Link
            href="/reserva"
            className="inline-block text-sm font-medium hover:opacity-70 transition-opacity border-b"
            style={{ color: '#5A4A42', borderColor: '#C9A961' }}
          >
            Reservar consulta
          </Link>
        </motion.div>
      </section>

      {/* SERVICIOS - LISTA SIMPLE */}
      <section id="servicios" className="py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 
            className="text-2xl font-light mb-16 text-center"
            style={{ color: '#5A4A42' }}
          >
            Servicios
          </h2>

          <div className="space-y-8">
            {[
              { name: 'Tratamientos Faciales', desc: 'Cuidado profundo y rejuvenecimiento' },
              { name: 'Micropigmentación', desc: 'Cejas y labios con técnica precisa' },
              { name: 'Masajes Terapéuticos', desc: 'Equilibrio y relajación total' },
              { name: 'Depilación Láser', desc: 'Resultados duraderos y seguros' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b pb-8"
                style={{ borderColor: '#E8D5D5' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium mb-2" style={{ color: '#5A4A42' }}>
                      {service.name}
                    </h3>
                    <p className="text-sm" style={{ color: '#8A7A72' }}>
                      {service.desc}
                    </p>
                  </div>
                  <span className="text-3xl" style={{ color: '#C9A961' }}>
                    •
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO - MINIMAL */}
      <section id="contacto" className="py-32 px-4" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm mb-4" style={{ color: '#8A7A72' }}>
            Ciudad del Este, Paraguay
          </p>
          <p className="text-sm" style={{ color: '#8A7A72' }}>
            © 2025 Rebeca Barreto
          </p>
        </div>
      </section>
    </div>
  )
}

