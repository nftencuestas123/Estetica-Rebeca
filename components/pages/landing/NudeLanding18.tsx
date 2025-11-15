'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 18 - Organic Waves
 * Diseño con formas onduladas, flow natural
 * =====================================================
 */

export default function NudeLanding18() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#FAF7F5' }}>
      {/* WAVES DECORATIVAS */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-30">
        <svg 
          viewBox="0 0 1200 400" 
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 Q300,100 600,200 T1200,200 L1200,0 L0,0 Z"
            fill="#E8D5D5"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-30">
        <svg 
          viewBox="0 0 1200 400" 
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 Q300,300 600,200 T1200,200 L1200,400 L0,400 Z"
            fill="#E8DCC8"
          />
        </svg>
      </div>

      {/* HERO CONTENT */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <div 
            className="inline-block mb-8 p-6 rounded-full"
            style={{ backgroundColor: '#E8D5D5' }}
          >
            <span className="text-4xl" style={{ color: '#C9A961' }}>✧</span>
          </div>

          <h1 
            className="text-5xl sm:text-7xl font-light mb-6"
            style={{ color: '#5A4A42' }}
          >
            Rebeca Barreto
          </h1>

          <div className="relative mb-8">
            <svg width="200" height="2" className="mx-auto">
              <path
                d="M0,1 Q50,0 100,1 T200,1"
                stroke="#C9A961"
                fill="none"
                strokeWidth="2"
              />
            </svg>
          </div>

          <p 
            className="text-xl mb-12 font-light"
            style={{ color: '#8A7A72' }}
          >
            Donde tu belleza fluye con naturalidad
          </p>

          <Link
            href="/reserva"
            className="inline-block px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#D4A99A', color: '#FAF7F5' }}
          >
            Comenzar
          </Link>
        </motion.div>
      </section>

      {/* SERVICIOS CON WAVES */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light mb-12 text-center" style={{ color: '#5A4A42' }}>
            Nuestros Servicios
          </h2>

          <div className="space-y-8">
            {['Tratamientos Faciales', 'Micropigmentación', 'Terapias Corporales'].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl"
                style={{ backgroundColor: i % 2 === 0 ? '#E8D5D5' : '#E8DCC8' }}
              >
                <h3 className="text-2xl font-medium" style={{ color: '#5A4A42' }}>
                  {service}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 text-center">
        <p style={{ color: '#8A7A72' }}>
          © 2025 Rebeca Barreto
        </p>
      </footer>
    </div>
  )
}

