'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Phone } from 'lucide-react'

/**
 * =====================================================
 * NUDE LANDING 01 - Hero Centrado Minimalista
 * Paleta: Nude rosado #E8D5D5, Beige #E8DCC8, Dorado #C9A961
 * =====================================================
 */

export default function NudeLanding01() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      {/* HERO CENTRADO */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Elementos decorativos suaves */}
        <div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: '#E8D5D5' }}
        />
        <div 
          className="absolute bottom-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: '#C9A961' }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge minimalista */}
            <div 
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 text-sm font-medium"
              style={{ backgroundColor: '#E8D5D5', color: '#5A4A42' }}
            >
              <Sparkles className="w-4 h-4" />
              Estética & Belleza Natural
            </div>

            <h1 
              className="text-6xl sm:text-7xl lg:text-8xl font-light mb-6 tracking-tight"
              style={{ color: '#5A4A42' }}
            >
              Rebeca
              <br />
              <span className="font-normal">Barreto</span>
            </h1>

            <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: '#C9A961' }} />

            <p 
              className="text-xl sm:text-2xl mb-12 font-light leading-relaxed"
              style={{ color: '#8A7A72' }}
            >
              Tu belleza auténtica, realzada con delicadeza
            </p>

            {/* CTAs minimalistas */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reserva"
                className="group px-8 py-4 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
              >
                Agendar Cita
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contacto"
                className="px-8 py-4 rounded-full font-medium transition-all hover:scale-105 border-2 flex items-center justify-center gap-2"
                style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
              >
                <Phone className="w-5 h-5" />
                Contactar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS GRID SIMPLE */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl sm:text-5xl font-light mb-4"
              style={{ color: '#5A4A42' }}
            >
              Nuestros Servicios
            </h2>
            <div className="w-12 h-px mx-auto" style={{ backgroundColor: '#C9A961' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Tratamientos Faciales', desc: 'Cuidado especializado para tu rostro' },
              { title: 'Micropigmentación', desc: 'Realza tu belleza natural' },
              { title: 'Masajes Corporales', desc: 'Relaja cuerpo y mente' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl text-center hover:shadow-lg transition-all"
                style={{ backgroundColor: i % 2 === 0 ? '#E8D5D5' : '#E8DCC8' }}
              >
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: '#FAF7F5' }}
                >
                  ✦
                </div>
                <h3 
                  className="text-xl font-medium mb-3"
                  style={{ color: '#5A4A42' }}
                >
                  {service.title}
                </h3>
                <p style={{ color: '#8A7A72' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER MINIMALISTA */}
      <footer className="py-12 px-4 border-t" style={{ borderColor: '#E8D5D5' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: '#8A7A72' }}>
            © 2025 Rebeca Barreto. Ciudad del Este, Paraguay.
          </p>
        </div>
      </footer>
    </div>
  )
}

