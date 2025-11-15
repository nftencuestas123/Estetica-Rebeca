'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react'

/**
 * =====================================================
 * MINIMAL CHIC LANDING PAGE
 * Diseño minimalista y limpio con enfoque en la simplicidad
 * =====================================================
 */

export default function MinimalChicLanding() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* HERO SECTION - Minimalista */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-light mb-6 tracking-tight">
              Rebeca<br />Barreto
            </h1>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl sm:text-2xl text-black/70 mb-12 font-light">
              Belleza en su forma más pura
            </p>
            <Link
              href="/reserva"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-black/90 transition-all group"
            >
              Agendar cita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS - Grid minimalista */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Servicios</h2>
            <div className="w-16 h-px bg-black mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Sparkles />, title: 'Faciales', desc: 'Tratamientos personalizados' },
              { icon: <Heart />, title: 'Corporal', desc: 'Cuidado integral' },
              { icon: <Star />, title: 'Estética', desc: 'Resultados visibles' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-black/20 rounded-full group-hover:bg-black group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-light mb-2">{service.title}</h3>
                <p className="text-black/60">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-black/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-black/60">© 2025 Rebeca Barreto. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

