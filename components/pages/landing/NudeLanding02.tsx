'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Star } from 'lucide-react'

/**
 * =====================================================
 * NUDE LANDING 02 - Grid Asimétrico
 * Diseño con bloques desalineados, ritmo visual único
 * =====================================================
 */

export default function NudeLanding02() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8DCC8' }}>
      {/* HEADER MINIMAL */}
      <header className="p-6 border-b" style={{ borderColor: '#D4A99A' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-light" style={{ color: '#5A4A42' }}>
            RB
          </h1>
          <Link
            href="/reserva"
            className="px-6 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
          >
            Reservar
          </Link>
        </div>
      </header>

      {/* GRID ASIMÉTRICO */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Bloque Grande - Hero */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-12 lg:col-span-7 p-12 rounded-3xl flex flex-col justify-center min-h-[600px]"
              style={{ backgroundColor: '#E8D5D5' }}
            >
              <span 
                className="text-sm uppercase tracking-widest mb-4 font-medium"
                style={{ color: '#C9A961' }}
              >
                Estética Profesional
              </span>
              <h2 
                className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight"
                style={{ color: '#5A4A42' }}
              >
                Rebeca
                <br />
                Barreto
              </h2>
              <p 
                className="text-lg mb-8 max-w-md"
                style={{ color: '#8A7A72' }}
              >
                Más de 10 años transformando la belleza con tratamientos de última generación
              </p>
              <div>
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
                  style={{ backgroundColor: '#B89B8C', color: '#FAF7F5' }}
                >
                  <Star className="w-5 h-5" />
                  Ver Tratamientos
                </Link>
              </div>
            </motion.div>

            {/* Bloques Pequeños Apilados */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-3xl"
                style={{ backgroundColor: '#FAF7F5' }}
              >
                <div 
                  className="text-5xl font-bold mb-4"
                  style={{ color: '#C9A961' }}
                >
                  +10
                </div>
                <p className="text-lg font-medium" style={{ color: '#5A4A42' }}>
                  Años de
                  <br />
                  Experiencia
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-3xl"
                style={{ backgroundColor: '#D4A99A' }}
              >
                <div 
                  className="text-5xl font-bold mb-4"
                  style={{ color: '#FAF7F5' }}
                >
                  500+
                </div>
                <p className="text-lg font-medium" style={{ color: '#FAF7F5' }}>
                  Clientas
                  <br />
                  Satisfechas
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-3xl flex items-center justify-between"
                style={{ backgroundColor: '#C9A961' }}
              >
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: '#FAF7F5' }}>
                    Agenda tu cita
                  </p>
                  <p className="text-xs" style={{ color: '#FAF7F5', opacity: 0.8 }}>
                    Lun - Sáb 9:00 - 19:00
                  </p>
                </div>
                <Calendar className="w-8 h-8" style={{ color: '#FAF7F5' }} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: '#D4A99A' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm" style={{ color: '#8A7A72' }}>
            © 2025 Rebeca Barreto · Ciudad del Este, Paraguay
          </p>
        </div>
      </footer>
    </div>
  )
}

