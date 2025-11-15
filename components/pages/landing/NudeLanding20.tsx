'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 20 - Future Minimal
 * Diseño futurista pero minimalista, limpio y avanzado
 * =====================================================
 */

export default function NudeLanding20() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#FAF7F5' }}>
      {/* GRID SUBTLE */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#E8D5D5 1px, transparent 1px), linear-gradient(90deg, #E8D5D5 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* HERO FUTURISTA */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl"
        >
          {/* Logo futurista */}
          <div className="mb-12 flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 relative"
            >
              <div 
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: '#C9A961', borderTopColor: 'transparent' }}
              />
              <div 
                className="absolute inset-4 rounded-full border-2"
                style={{ borderColor: '#E8D5D5', borderRightColor: 'transparent' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-light" style={{ color: '#5A4A42' }}>
                  RB
                </span>
              </div>
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl font-light mb-6 tracking-tight"
            style={{ color: '#5A4A42' }}
          >
            Rebeca Barreto
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-px mx-auto mb-8 max-w-md"
            style={{ backgroundColor: '#C9A961' }}
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg mb-12 font-light"
            style={{ color: '#8A7A72' }}
          >
            El futuro de la estética, hoy
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/reserva"
              className="group relative px-10 py-4 overflow-hidden font-medium hover:scale-105 transition-transform"
              style={{ backgroundColor: '#5A4A42', color: '#FAF7F5' }}
            >
              <span className="relative z-10">Iniciar Sesión</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: '#C9A961' }}
              />
            </Link>
            <Link
              href="/servicios"
              className="px-10 py-4 border-2 font-medium hover:scale-105 transition-transform"
              style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
            >
              Explorar
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICIOS FUTURISTAS */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ backgroundColor: '#E8D5D5' }}>
            {[
              { num: '01', title: 'FACIALES', color: '#FAF7F5' },
              { num: '02', title: 'CEJAS', color: '#E8DCC8' },
              { num: '03', title: 'LABIOS', color: '#E8D5D5' },
              { num: '04', title: 'CORPORAL', color: '#D4A99A' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 text-center"
                style={{ backgroundColor: service.color }}
              >
                <span 
                  className="text-xs font-light tracking-widest mb-4 block"
                  style={{ color: '#C9A961' }}
                >
                  {service.num}
                </span>
                <h3 className="text-lg font-light tracking-wider" style={{ color: '#5A4A42' }}>
                  {service.title}
                </h3>
                <div 
                  className="w-8 h-px mx-auto mt-4"
                  style={{ backgroundColor: '#C9A961' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 text-center border-t" style={{ borderColor: '#E8D5D5' }}>
        <p className="text-xs font-light tracking-widest" style={{ color: '#8A7A72' }}>
          © 2025 REBECA BARRETO · CDE · PY
        </p>
      </footer>
    </div>
  )
}

