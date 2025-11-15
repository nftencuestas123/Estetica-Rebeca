'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingContactButtons() {
  const [isMobile, setIsMobile] = useState(false)
  const [showCallText, setShowCallText] = useState(true)
  const [showChatText, setShowChatText] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Animación de textos alternados para llamar la atención
  useEffect(() => {
    if (!isMobile) return

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
  }, [isMobile])

  // Solo mostrar en móvil
  if (!isMobile) return null

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
    <div className="fixed bottom-6 right-4 z-[9999] flex flex-col gap-4">
      {/* Texto animado flotante para llamada */}
      <AnimatePresence>
        {showCallText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute -top-16 right-20 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <p className="font-bold text-sm">¡Te Llamamos GRATIS!</p>
            </div>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-green-500 transform rotate-45"></div>
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
            className="absolute -bottom-16 right-20 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <p className="font-bold text-sm">Chatea en Vivo</p>
            </div>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-blue-500 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de Llamada en Vivo - MÁS IMPRESIONANTE */}
      <motion.button
        onClick={handleLiveCall}
        className="relative w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center"
        style={{ boxShadow: '0 0 25px 7px rgba(34, 197, 94, 0.7)' }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Múltiples ondas expansivas - CSS puro para mejor rendimiento */}
        <div className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-50" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}></div>
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" style={{ animationDuration: '3s', animationDelay: '0.6s' }}></div>
        
        <Phone className="w-9 h-9 text-white z-10 drop-shadow-lg" />
        
        {/* Badge "GRATIS" más grande y animado */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
          GRATIS
        </div>
      </motion.button>

      {/* Botón de Chat - MÁS IMPRESIONANTE */}
      <motion.button
        onClick={handleChat}
        className="relative w-20 h-20 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
        style={{ boxShadow: '0 0 25px 7px rgba(59, 130, 246, 0.7)' }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Múltiples ondas expansivas - CSS puro para mejor rendimiento */}
        <div className="absolute inset-0 rounded-full bg-blue-300 animate-ping opacity-50" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '1.3s' }}></div>
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" style={{ animationDuration: '3s', animationDelay: '1.6s' }}></div>
        
        <MessageCircle className="w-9 h-9 text-white z-10 drop-shadow-lg" />
        
        {/* Badge animado con efecto de notificación */}
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </motion.button>
    </div>
  )
}

