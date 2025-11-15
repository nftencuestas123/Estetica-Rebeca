'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingContactButtons() {
  const [showCallText, setShowCallText] = useState(true)
  const [showChatText, setShowChatText] = useState(false)

  // Animación de textos alternados para llamar la atención
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCallText(prev => {
        if (!prev) {
          setShowChatText(false)
          return true
        } else {
          setTimeout(() => setShowChatText(true), 2000)
          return false
        }
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleLiveCall = () => {
    // Aquí se integrará VAPI para llamada en vivo
    console.log('Iniciando llamada en vivo con VAPI...')
    alert('📞 ¡Te llamamos gratis! Servicio próximamente con asistente de IA')
  }

  const handleChat = () => {
    // Abrir el chat de Sofía (scroll a la sección)
    const sofiaSection = document.querySelector('#sofia-section')
    if (sofiaSection) {
      sofiaSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col gap-3 md:gap-4">
      {/* Texto animado flotante para llamada */}
      <AnimatePresence>
        {showCallText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute -top-14 md:-top-16 right-16 md:right-24 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <p className="font-bold text-xs md:text-sm whitespace-nowrap">¡Te Llamamos GRATIS!</p>
            </div>
            <div className="absolute -bottom-2 right-3 md:right-4 w-3 h-3 md:w-4 md:h-4 bg-green-500 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texto animado flotante para chat */}
      <AnimatePresence>
        {showChatText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute -bottom-14 md:-bottom-16 right-16 md:right-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <p className="font-bold text-xs md:text-sm whitespace-nowrap">Chatea en Vivo</p>
            </div>
            <div className="absolute -bottom-2 right-3 md:right-4 w-3 h-3 md:w-4 md:h-4 bg-blue-500 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de Llamada en Vivo - MÁS IMPRESIONANTE */}
      <motion.button
        onClick={handleLiveCall}
        className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center"
        style={{ boxShadow: '0 0 25px 7px rgba(34, 197, 94, 0.7)' }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Múltiples ondas expansivas - CSS puro para mejor rendimiento */}
        <div className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-50" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}></div>
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" style={{ animationDuration: '3s', animationDelay: '0.6s' }}></div>
        
        <Phone className="w-7 h-7 md:w-9 md:h-9 text-white z-10 drop-shadow-lg" />
        
        {/* Badge "GRATIS" más grande y animado */}
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full shadow-lg animate-pulse">
          GRATIS
        </div>
      </motion.button>

      {/* Botón de Chat - MÁS IMPRESIONANTE */}
      <motion.button
        onClick={handleChat}
        className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
        style={{ boxShadow: '0 0 25px 7px rgba(59, 130, 246, 0.7)' }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Múltiples ondas expansivas - CSS puro para mejor rendimiento */}
        <div className="absolute inset-0 rounded-full bg-blue-300 animate-ping opacity-50" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '1.3s' }}></div>
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" style={{ animationDuration: '3s', animationDelay: '1.6s' }}></div>
        
        <MessageCircle className="w-7 h-7 md:w-9 md:h-9 text-white z-10 drop-shadow-lg" />
        
        {/* Badge animado con efecto de notificación */}
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-7 md:h-7 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-white text-[10px] md:text-xs font-bold">!</span>
        </div>
      </motion.button>
    </div>
  )
}

