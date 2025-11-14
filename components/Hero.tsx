'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-cream-50 via-white to-primary/5 min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Tu Belleza Auténtica, Elevada</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
            Transformá tu belleza
            <br />
            <span className="text-primary">con confianza</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-primary-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Cada transformación es un acto de amor hacia vos misma. 
            Expertos reconocidos, atención boutique y resultados reales.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/tratamientos"
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Ver Tratamientos
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-4 bg-cream-50 text-primary-800 rounded-lg font-semibold hover:bg-cream-50 transition-all border-2 border-primary-200"
            >
              Consultar Disponibilidad
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-primary-600">Clientas satisfechas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5★</div>
              <div className="text-primary-600">Calificación promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-primary-600">Años de experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}






