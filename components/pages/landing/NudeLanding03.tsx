'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * =====================================================
 * NUDE LANDING 03 - Split Screen Vertical
 * Diseño 50/50 con imagen conceptual a la izquierda
 * =====================================================
 */

export default function NudeLanding03() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LADO IZQUIERDO - Visual */}
      <div 
        className="lg:w-1/2 min-h-screen flex items-center justify-center p-12 relative overflow-hidden"
        style={{ backgroundColor: '#E8D5D5' }}
      >
        {/* Formas decorativas minimalistas */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-40"
          style={{ backgroundColor: '#FAF7F5' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-30"
          style={{ backgroundColor: '#C9A961' }}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <div 
            className="w-48 h-48 rounded-full mx-auto mb-8 flex items-center justify-center text-7xl"
            style={{ backgroundColor: '#FAF7F5' }}
          >
            <span style={{ color: '#C9A961' }}>✦</span>
          </div>
          <p 
            className="text-lg font-light tracking-widest uppercase"
            style={{ color: '#8A7A72' }}
          >
            Belleza · Cuidado · Bienestar
          </p>
        </motion.div>
      </div>

      {/* LADO DERECHO - Contenido */}
      <div 
        className="lg:w-1/2 min-h-screen flex items-center justify-center p-12"
        style={{ backgroundColor: '#FAF7F5' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg"
        >
          <span 
            className="inline-block px-4 py-1 rounded-full text-xs uppercase tracking-wider mb-6 font-medium"
            style={{ backgroundColor: '#E8DCC8', color: '#5A4A42' }}
          >
            Centro de Estética
          </span>

          <h1 
            className="text-5xl sm:text-6xl font-light mb-6 leading-tight"
            style={{ color: '#5A4A42' }}
          >
            Rebeca
            <br />
            Barreto
          </h1>

          <div className="w-20 h-px mb-8" style={{ backgroundColor: '#D4A99A' }} />

          <p 
            className="text-xl mb-8 leading-relaxed font-light"
            style={{ color: '#8A7A72' }}
          >
            Tratamientos personalizados que realzan tu belleza natural. 
            Tecnología de punta y el cuidado que mereces.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#C9A961' }}
              />
              <p style={{ color: '#8A7A72' }}>Tratamientos faciales avanzados</p>
            </div>
            <div className="flex items-center gap-3">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#C9A961' }}
              />
              <p style={{ color: '#8A7A72' }}>Micropigmentación profesional</p>
            </div>
            <div className="flex items-center gap-3">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#C9A961' }}
              />
              <p style={{ color: '#8A7A72' }}>Terapias corporales</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/reserva"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
              style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
            >
              Agendar Cita
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium border-2 hover:scale-105 transition-transform"
              style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
            >
              Conocer Más
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

