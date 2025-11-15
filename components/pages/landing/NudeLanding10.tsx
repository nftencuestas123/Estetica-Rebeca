'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 10 - Magazine Style
 * Diseño editorial con grid de revista
 * =====================================================
 */

export default function NudeLanding10() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* HEADER MAGAZINE */}
      <header className="border-b py-6 px-4" style={{ borderColor: '#E8D5D5' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light" style={{ color: '#5A4A42' }}>
              REBECA BARRETO
            </h1>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#8A7A72' }}>
              Estética · Belleza · Bienestar
            </p>
          </div>
          <Link
            href="/reserva"
            className="px-6 py-3 border-2 rounded text-sm font-medium hover:scale-105 transition-transform"
            style={{ borderColor: '#C9A961', color: '#5A4A42' }}
          >
            RESERVAR
          </Link>
        </div>
      </header>

      {/* GRID EDITORIAL */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Feature Story - Grande */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-12 rounded-2xl"
            style={{ backgroundColor: '#E8D5D5' }}
          >
            <span 
              className="text-xs uppercase tracking-widest mb-4 block"
              style={{ color: '#C9A961' }}
            >
              Featured Story
            </span>
            <h2 
              className="text-5xl font-light mb-6 max-w-3xl"
              style={{ color: '#5A4A42' }}
            >
              La Nueva Era de la Estética: Tratamientos Que Transforman
            </h2>
            <p 
              className="text-lg max-w-2xl mb-8"
              style={{ color: '#8A7A72' }}
            >
              Descubre cómo la tecnología de vanguardia se combina con el cuidado personalizado 
              para ofrecerte resultados excepcionales.
            </p>
            <Link
              href="/servicios"
              className="inline-block text-sm font-medium border-b pb-1"
              style={{ color: '#5A4A42', borderColor: '#C9A961' }}
            >
              Leer más →
            </Link>
          </motion.div>

          {/* Grid de Artículos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Tratamientos Faciales', subtitle: 'Rejuvenecimiento Natural' },
              { title: 'Micropigmentación', subtitle: 'Arte y Precisión' },
              { title: 'Terapias Corporales', subtitle: 'Equilibrio Total' },
            ].map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border-t pt-6"
                style={{ borderColor: '#E8D5D5' }}
              >
                <span 
                  className="text-xs uppercase tracking-widest block mb-3"
                  style={{ color: '#C9A961' }}
                >
                  {article.subtitle}
                </span>
                <h3 className="text-2xl font-medium mb-4" style={{ color: '#5A4A42' }}>
                  {article.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: '#8A7A72' }}>
                  Tratamientos especializados que realzan tu belleza natural con resultados duraderos.
                </p>
                <Link
                  href="#"
                  className="text-xs font-medium uppercase tracking-wider hover:opacity-70 transition-opacity"
                  style={{ color: '#5A4A42' }}
                >
                  Ver detalles →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER MAGAZINE */}
      <footer className="border-t py-8 px-4" style={{ borderColor: '#E8D5D5' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest" style={{ color: '#8A7A72' }}>
            © 2025 Rebeca Barreto · Ciudad del Este, Paraguay
          </p>
        </div>
      </footer>
    </div>
  )
}

