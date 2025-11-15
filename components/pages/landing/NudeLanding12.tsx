'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 12 - Gradient Soft
 * Diseño con gradientes suaves, transiciones delicadas
 * =====================================================
 */

export default function NudeLanding12() {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, #FAF7F5 0%, #E8D5D5 50%, #E8DCC8 100%)`,
      }}
    >
      {/* HERO CON GRADIENTE */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl"
        >
          <div 
            className="inline-block px-8 py-3 rounded-full mb-8 text-sm font-medium backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.2), rgba(232, 213, 213, 0.3))',
              color: '#5A4A42',
            }}
          >
            Centro de Estética Premium
          </div>

          <h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-light mb-6 leading-tight"
            style={{ color: '#5A4A42' }}
          >
            Rebeca Barreto
          </h1>

          <p 
            className="text-xl sm:text-2xl mb-12 font-light"
            style={{ color: '#8A7A72' }}
          >
            Donde la belleza fluye naturalmente
          </p>

          <Link
            href="/reserva"
            className="inline-block px-10 py-4 rounded-full font-medium backdrop-blur-sm hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #C9A961, #B89B8C)',
              color: '#FAF7F5',
            }}
          >
            Comenzar Tu Viaje
          </Link>
        </motion.div>
      </section>

      {/* SERVICIOS CON GRADIENT CARDS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Tratamientos Faciales', gradient: 'linear-gradient(135deg, #E8D5D5, #FAF7F5)' },
            { title: 'Micropigmentación', gradient: 'linear-gradient(135deg, #D4A99A, #E8DCC8)' },
            { title: 'Terapias Corporales', gradient: 'linear-gradient(135deg, #C9A961, #D4A99A)' },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-3xl text-center backdrop-blur-sm"
              style={{ background: service.gradient }}
            >
              <h3 className="text-2xl font-medium mb-4" style={{ color: '#5A4A42' }}>
                {service.title}
              </h3>
              <p style={{ color: '#8A7A72' }}>
                Tratamientos personalizados con resultados excepcionales
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center backdrop-blur-sm">
        <p style={{ color: '#8A7A72' }}>
          © 2025 Rebeca Barreto · Ciudad del Este, Paraguay
        </p>
      </footer>
    </div>
  )
}

