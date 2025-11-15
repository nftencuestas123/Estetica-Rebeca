'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

/**
 * =====================================================
 * NUDE LANDING 15 - Sidebar Navigation
 * Diseño con menú lateral fijo
 * =====================================================
 */

export default function NudeLanding15() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FAF7F5' }}>
      {/* SIDEBAR */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 p-8 z-50 transition-transform ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ backgroundColor: '#E8D5D5' }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4"
          style={{ color: '#5A4A42' }}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-12">
          <h1 className="text-2xl font-light mb-2" style={{ color: '#5A4A42' }}>
            Rebeca
            <br />
            Barreto
          </h1>
          <div className="w-12 h-px" style={{ backgroundColor: '#C9A961' }} />
        </div>

        <nav className="space-y-6">
          {['Inicio', 'Servicios', 'Nosotros', 'Contacto'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-lg hover:opacity-70 transition-opacity"
              style={{ color: '#5A4A42' }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-8 left-8">
          <Link
            href="/reserva"
            className="inline-block px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
          >
            Reservar
          </Link>
        </div>
      </aside>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-full"
        style={{ backgroundColor: '#E8D5D5' }}
      >
        <Menu className="w-6 h-6" style={{ color: '#5A4A42' }} />
      </button>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-h-screen">
        {/* HERO */}
        <section id="inicio" className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h2 
              className="text-5xl sm:text-6xl font-light mb-6"
              style={{ color: '#5A4A42' }}
            >
              Tu Belleza,
              <br />
              Nuestra Inspiración
            </h2>
            <p className="text-lg mb-8" style={{ color: '#8A7A72' }}>
              Tratamientos personalizados que realzan tu belleza natural con tecnología de punta.
            </p>
          </motion.div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="min-h-screen flex items-center justify-center px-8" style={{ backgroundColor: '#E8DCC8' }}>
          <div className="max-w-4xl w-full">
            <h3 className="text-4xl font-light mb-12" style={{ color: '#5A4A42' }}>
              Servicios
            </h3>
            <div className="space-y-6">
              {['Tratamientos Faciales', 'Micropigmentación', 'Terapias Corporales'].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 rounded-2xl"
                  style={{ backgroundColor: '#FAF7F5' }}
                >
                  <h4 className="text-2xl font-medium" style={{ color: '#5A4A42' }}>
                    {service}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

