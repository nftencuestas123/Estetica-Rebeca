'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

/**
 * =====================================================
 * NUDE LANDING 06 - Layout Diagonal
 * Diseño con elementos en ángulo, dinámico pero minimalista
 * =====================================================
 */

export default function NudeLanding06() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#FAF7F5' }}>
      {/* BANDA DIAGONAL DECORATIVA */}
      <div 
        className="absolute top-0 right-0 w-full h-full origin-top-right"
        style={{
          background: `linear-gradient(135deg, transparent 40%, #E8D5D5 40%, #E8D5D5 60%, transparent 60%)`,
          opacity: 0.4,
        }}
      />

      {/* HEADER */}
      <header className="relative z-10 p-8">
        <h1 className="text-3xl font-light" style={{ color: '#5A4A42' }}>
          Rebeca Barreto
        </h1>
      </header>

      {/* MAIN CONTENT CON LAYOUT DIAGONAL */}
      <section className="relative z-10 min-h-[80vh] flex items-center px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LADO IZQUIERDO - Contenido */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm mb-6 font-medium"
                style={{ backgroundColor: '#E8DCC8', color: '#5A4A42' }}
              >
                Centro de Estética Premium
              </span>

              <h2 
                className="text-5xl sm:text-6xl font-light mb-6 leading-tight"
                style={{ color: '#5A4A42' }}
              >
                Tu Belleza,
                <br />
                Nuestra
                <br />
                <span style={{ color: '#C9A961' }}>Pasión</span>
              </h2>

              <p 
                className="text-lg mb-8 max-w-lg leading-relaxed"
                style={{ color: '#8A7A72' }}
              >
                Tratamientos de vanguardia en un ambiente de calma y sofisticación. 
                Cada detalle pensado para tu bienestar.
              </p>

              <Link
                href="/reserva"
                className="inline-block px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform"
                style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
              >
                Agendar Consulta
              </Link>
            </motion.div>

            {/* LADO DERECHO - Cards con ángulo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div 
                className="p-8 rounded-3xl transform hover:rotate-1 transition-transform"
                style={{ backgroundColor: '#E8D5D5' }}
              >
                <h3 className="text-2xl font-medium mb-3" style={{ color: '#5A4A42' }}>
                  Tratamientos Faciales
                </h3>
                <p style={{ color: '#8A7A72' }}>
                  Tecnología de última generación para rejuvenecer tu piel
                </p>
              </div>

              <div 
                className="p-8 rounded-3xl transform hover:-rotate-1 transition-transform"
                style={{ backgroundColor: '#D4A99A' }}
              >
                <h3 className="text-2xl font-medium mb-3" style={{ color: '#FAF7F5' }}>
                  Micropigmentación
                </h3>
                <p style={{ color: '#FAF7F5', opacity: 0.9 }}>
                  Realza tu belleza natural con técnicas avanzadas
                </p>
              </div>

              <div 
                className="p-8 rounded-3xl transform hover:rotate-1 transition-transform"
                style={{ backgroundColor: '#E8DCC8' }}
              >
                <h3 className="text-2xl font-medium mb-3" style={{ color: '#5A4A42' }}>
                  Terapias Corporales
                </h3>
                <p style={{ color: '#8A7A72' }}>
                  Relaja cuerpo y mente con masajes especializados
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACTO MINIMAL */}
      <section className="relative z-10 py-16 px-8" style={{ backgroundColor: '#E8D5D5' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" style={{ color: '#C9A961' }} />
            <span style={{ color: '#5A4A42' }}>+595 XXX XXX XXX</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" style={{ color: '#C9A961' }} />
            <span style={{ color: '#5A4A42' }}>info@rebecabarreto.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" style={{ color: '#C9A961' }} />
            <span style={{ color: '#5A4A42' }}>Ciudad del Este</span>
          </div>
        </div>
      </section>
    </div>
  )
}

