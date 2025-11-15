'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, User, Mail, Phone, Check, Sparkles } from 'lucide-react'

/**
 * =====================================================
 * PROMO CAPTURE FORM - Capture Page
 * Página para capturar leads con oferta especial
 * =====================================================
 */

export default function PromoCaptureForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Lead con promo capturado:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-green-600" />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">¡Tu descuento está confirmado!</h2>
          <p className="text-lg text-gray-600 mb-4">
            Recibirás un email con tu cupón de 30% de descuento
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold text-2xl mb-8">
            <Gift className="w-6 h-6" />
            PROMO30
          </div>
          <p className="text-gray-600">
            Válido por 7 días. ¡No lo dejes pasar!
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Badge de oferta */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full font-black text-sm uppercase">
            <Sparkles className="w-5 h-5" />
            Oferta por tiempo limitado
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header con oferta */}
          <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white px-8 py-12 text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block mb-4"
            >
              <Gift className="w-16 h-16" />
            </motion.div>
            <h1 className="text-5xl sm:text-6xl font-black mb-4">
              30% OFF
            </h1>
            <p className="text-2xl font-bold mb-2">
              En tu primer tratamiento
            </p>
            <p className="text-lg opacity-90">
              Completa el formulario y recibe tu cupón instantáneamente
            </p>
          </div>

          {/* Formulario */}
          <div className="px-8 py-12">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  ¿Cómo te llamas?
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-gray-800 text-lg"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tu email para enviarte el cupón
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-gray-800 text-lg"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Teléfono (WhatsApp)
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-gray-800 text-lg"
                    placeholder="+595 XXX XXX XXX"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white rounded-xl font-black text-xl shadow-xl hover:shadow-2xl transition-all uppercase flex items-center justify-center gap-2"
              >
                <Gift className="w-6 h-6" />
                Obtener mi 30% OFF
              </motion.button>
            </form>

            {/* Footer info */}
            <div className="mt-8 text-center space-y-2">
              <p className="text-sm text-gray-500">
                ✅ Sin compromiso · ✅ Cupón válido 7 días · ✅ Aplicable a todos los servicios
              </p>
              <p className="text-xs text-gray-400">
                *Oferta válida solo para nuevos clientes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

