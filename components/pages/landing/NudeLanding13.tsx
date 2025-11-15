'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * =====================================================
 * NUDE LANDING 13 - Geometric Shapes
 * Diseño con formas geométricas minimalistas
 * =====================================================
 */

export default function NudeLanding13() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8DCC8' }}>
      {/* HERO GEOMÉTRICO */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Triángulos decorativos */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div 
            className="absolute top-10 right-10 w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[200px]"
            style={{ borderBottomColor: '#E8D5D5' }}
          />
          <div 
            className="absolute bottom-10 left-10 w-0 h-0 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent border-t-[180px]"
            style={{ borderTopColor: '#D4A99A' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          {/* Hexágono como logo */}
          <div className="flex justify-center mb-12">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                  fill="#C9A961"
                />
                <text
                  x="50"
                  y="58"
                  textAnchor="middle"
                  fill="#FAF7F5"
                  fontSize="24"
                  fontWeight="300"
                >
                  RB
                </text>
              </svg>
            </div>
          </div>

          <h1 
            className="text-5xl sm:text-6xl font-light mb-6"
            style={{ color: '#5A4A42' }}
          >
            Rebeca Barreto
          </h1>

          <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#C9A961' }} />

          <p 
            className="text-lg mb-12"
            style={{ color: '#8A7A72' }}
          >
            Formas perfectas. Resultados excepcionales.
          </p>

          <Link
            href="/reserva"
            className="inline-block px-10 py-4 font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#5A4A42', color: '#FAF7F5' }}
          >
            Agendar Consulta
          </Link>
        </motion.div>
      </section>

      {/* SERVICIOS GEOMÉTRICOS */}
      <section className="py-20 px-4" style={{ backgroundColor: '#FAF7F5' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { shape: 'circle', title: 'Faciales' },
            { shape: 'square', title: 'Cejas' },
            { shape: 'triangle', title: 'Corporal' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              {item.shape === 'circle' && (
                <div 
                  className="w-32 h-32 rounded-full mx-auto mb-6"
                  style={{ backgroundColor: '#E8D5D5' }}
                />
              )}
              {item.shape === 'square' && (
                <div 
                  className="w-32 h-32 mx-auto mb-6"
                  style={{ backgroundColor: '#D4A99A' }}
                />
              )}
              {item.shape === 'triangle' && (
                <div className="mx-auto mb-6 flex justify-center">
                  <div 
                    className="w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-b-[110px]"
                    style={{ borderBottomColor: '#C9A961' }}
                  />
                </div>
              )}
              <h3 className="text-2xl font-medium" style={{ color: '#5A4A42' }}>
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

