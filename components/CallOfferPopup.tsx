'use client'

import { useState, useEffect } from 'react'
import { Phone, X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CallOfferPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [scrollTime, setScrollTime] = useState(0)

  // TEMPORALMENTE DESACTIVADO - Solo retornar null
  // Activar cuando se pruebe que el resto funciona
  if (true) return null

  useEffect(() => {
    let timer: NodeJS.Timeout
    let scrollCount = 0
    
    const handleScroll = () => {
      scrollCount++
      
      clearTimeout(timer)
      timer = setTimeout(() => {
        setScrollTime(prev => {
          const newTime = prev + 1
          if (newTime >= 15 && !showPopup) {
            setShowPopup(true)
          }
          return newTime
        })
      }, 1000)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [showPopup])

  const handleAccept = () => {
    // Aquí se integrará VAPI para la llamada en vivo
    console.log('Usuario aceptó la llamada - Iniciar VAPI')
    alert('📞 ¡Perfecto! Un asistente te llamará en unos segundos. Mantén tu teléfono cerca.')
    setShowPopup(false)
    
    // TODO: Integrar VAPI aquí
    // vapiClient.start()
  }

  const handleDecline = () => {
    setShowPopup(false)
    setScrollTime(0)
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={handleDecline}
          />

          {/* Popup desde arriba */}
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md"
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header con degradado */}
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-4 relative overflow-hidden">
                {/* Efectos de brillo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-200, 400] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      Llamada Gratis
                      <Sparkles className="w-4 h-4" />
                    </h3>
                    <p className="text-green-100 text-xs">Sin costo para ti</p>
                  </div>
                  <button
                    onClick={handleDecline}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Cuerpo del popup */}
              <div className="p-6">
                {/* Avatar del asistente */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      👤
                    </div>
                    {/* Indicador online */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Asistente de Rebeca Barreto</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      👋 ¡Hola! Veo que estás interesado en nuestros servicios. 
                      <span className="font-semibold text-green-600"> ¿Te gustaría que te llamemos ahora mismo?</span>
                    </p>
                  </div>
                </div>

                {/* Mensaje principal */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-green-700">No tienes que hacer nada.</strong> Un asistente especializado te llamará 
                    directamente en segundos. <span className="font-semibold">Sin costo, sin compromiso.</span>
                  </p>
                </div>

                {/* Beneficios */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Llamada 100% gratuita</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Atención personalizada inmediata</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Sin salir de la página</span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAccept}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      <span>Sí, llamarme ahora</span>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleDecline}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ahora no
                  </motion.button>
                </div>

                {/* Footer note */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Tu privacidad es importante. Solo usaremos tu número para esta llamada.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

