'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Heart, Star, Award } from 'lucide-react'

/**
 * =====================================================
 * NUDE LANDING 08 - Cards Flotantes
 * Diseño con cards elevadas, sombras suaves, sensación aérea
 * =====================================================
 */

export default function NudeLanding08() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#E8DCC8' }}>
      {/* HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-12 p-6 rounded-3xl shadow-xl"
        style={{ backgroundColor: '#FAF7F5' }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-light" style={{ color: '#5A4A42' }}>
            Rebeca Barreto
          </h1>
          <Link
            href="/reserva"
            className="px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
          >
            Reservar
          </Link>
        </div>
      </motion.div>

      {/* HERO CARD GRANDE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto mb-12 p-12 sm:p-16 rounded-3xl shadow-2xl text-center"
        style={{ backgroundColor: '#FAF7F5' }}
      >
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm"
          style={{ backgroundColor: '#E8D5D5', color: '#5A4A42' }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Centro de Estética Premium</span>
        </div>

        <h2 
          className="text-5xl sm:text-6xl font-light mb-6"
          style={{ color: '#5A4A42' }}
        >
          Eleva Tu Belleza
          <br />
          <span style={{ color: '#C9A961' }}>Naturalmente</span>
        </h2>

        <p 
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: '#8A7A72' }}
        >
          Tratamientos personalizados que resaltan tu belleza única. 
          Tecnología avanzada con un toque humano.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/servicios"
            className="px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#B89B8C', color: '#FAF7F5' }}
          >
            Ver Servicios
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full font-medium border-2 hover:scale-105 transition-transform"
            style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
          >
            Contactar
          </Link>
        </div>
      </motion.div>

      {/* CARDS DE SERVICIOS FLOTANTES */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Sparkles />, title: 'Faciales', color: '#E8D5D5' },
          { icon: <Heart />, title: 'Corporal', color: '#FAF7F5' },
          { icon: <Star />, title: 'Cejas', color: '#FAF7F5' },
          { icon: <Award />, title: 'Labios', color: '#E8D5D5' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            whileHover={{ y: -10, scale: 1.05 }}
            className="p-8 rounded-3xl shadow-xl text-center cursor-pointer"
            style={{ backgroundColor: item.color }}
          >
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#C9A961' }}
            >
              <span style={{ color: '#FAF7F5' }}>{item.icon}</span>
            </div>
            <h3 className="text-xl font-medium" style={{ color: '#5A4A42' }}>
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* FOOTER CARD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="max-w-4xl mx-auto mt-12 p-8 rounded-3xl shadow-xl text-center"
        style={{ backgroundColor: '#FAF7F5' }}
      >
        <p className="text-sm" style={{ color: '#8A7A72' }}>
          © 2025 Rebeca Barreto · Ciudad del Este, Paraguay
        </p>
      </motion.div>
    </div>
  )
}

