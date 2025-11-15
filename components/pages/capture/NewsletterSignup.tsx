'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, Sparkles, Bell } from 'lucide-react'

/**
 * =====================================================
 * NEWSLETTER SIGNUP - Capture Page
 * Página simple para suscripción a newsletter
 * =====================================================
 */

export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-blue-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Bienvenida a la comunidad!</h2>
          <p className="text-gray-600 mb-4">
            Te hemos enviado un email de confirmación a:
          </p>
          <p className="text-lg font-semibold text-blue-600 mb-8">{email}</p>
          <p className="text-sm text-gray-500">
            Recibirás tips de belleza, ofertas exclusivas y novedades 💌
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6"
            >
              <Bell className="w-10 h-10 text-blue-600" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Únete a nuestra Newsletter
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Recibe consejos de belleza exclusivos, ofertas especiales y las últimas tendencias directamente en tu inbox
            </p>
          </div>

          {/* Beneficios */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: <Sparkles />, text: 'Tips de belleza' },
              { icon: <Mail />, text: 'Ofertas exclusivas' },
              { icon: <Bell />, text: 'Novedades' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"
              >
                <div className="text-blue-600 mb-2">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                Ingresa tu email y comienza a recibir contenido exclusivo
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-4 py-5 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-lg text-gray-800"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Suscribirme Gratis
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-500">
              ✅ Gratis · ✅ Sin spam · ✅ Cancela cuando quieras
            </p>
            <p className="text-xs text-gray-400">
              Enviamos 1-2 emails por semana con contenido de valor
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

