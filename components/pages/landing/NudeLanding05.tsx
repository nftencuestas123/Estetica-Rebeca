'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 05 - Círculos Orgánicos
 * Diseño con formas circulares superpuestas, flow suave
 * =====================================================
 */

export default function NudeLanding05() {
  return (
    <div className="min-h-screen overflow-hidden" style={{ backgroundColor: '#FAF7F5' }}>
      {/* HERO CON CÍRCULOS ORGÁNICOS */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Círculos decorativos grandes */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ backgroundColor: '#E8D5D5' }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ backgroundColor: '#E8DCC8' }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ backgroundColor: '#D4A99A' }}
        />

        {/* Contenido central */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <div 
            className="inline-block w-32 h-32 rounded-full mb-8 flex items-center justify-center"
            style={{ backgroundColor: '#C9A961' }}
          >
            <span className="text-4xl font-light" style={{ color: '#FAF7F5' }}>
              RB
            </span>
          </div>

          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6"
            style={{ color: '#5A4A42' }}
          >
            Rebeca Barreto
          </h1>

          <p 
            className="text-xl mb-10 font-light"
            style={{ color: '#8A7A72' }}
          >
            Donde la belleza se encuentra con el arte
          </p>

          <Link
            href="/reserva"
            className="inline-block px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#B89B8C', color: '#FAF7F5' }}
          >
            Comenzar Tu Transformación
          </Link>
        </motion.div>
      </section>

      {/* SERVICIOS CON CÍRCULOS PEQUEÑOS */}
      <section className="py-20 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '✦', label: 'Faciales' },
              { icon: '◆', label: 'Corporal' },
              { icon: '✧', label: 'Cejas' },
              { icon: '◈', label: 'Labios' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div 
                  className="w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center text-3xl"
                  style={{ backgroundColor: i % 2 === 0 ? '#E8D5D5' : '#E8DCC8' }}
                >
                  <span style={{ color: '#C9A961' }}>{item.icon}</span>
                </div>
                <p className="font-medium" style={{ color: '#5A4A42' }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center">
        <p className="text-sm" style={{ color: '#8A7A72' }}>
          © 2025 Rebeca Barreto
        </p>
      </footer>
    </div>
  )
}

