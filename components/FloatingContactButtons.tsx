'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingContactButtons() {
  const [isMobile, setIsMobile] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Ocultar tooltip después de 5 segundos
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

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
    <div className="fixed bottom-6 right-4 z-[9999] flex flex-col gap-3">
      {/* Tooltip informativo */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute -top-20 right-0 bg-neutral-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm max-w-[200px]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="font-medium">¡Contactanos ahora!</p>
            <p className="text-xs text-white/70 mt-1">Te llamamos gratis o chatea</p>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-neutral-900 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de Llamada en Vivo */}
      <motion.button
        onClick={handleLiveCall}
        className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(34, 197, 94, 0.7)',
            '0 0 0 15px rgba(34, 197, 94, 0)',
            '0 0 0 0 rgba(34, 197, 94, 0)',
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity },
        }}
      >
        {/* Onda expansiva animada */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <Phone className="w-7 h-7 text-white z-10" />
        
        {/* Badge "GRATIS" */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
          GRATIS
        </div>
        
        {/* Texto descriptivo */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 bg-neutral-900 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-medium">
          Te Llamamos Gratis
        </div>
      </motion.button>

      {/* Botón de Chat/Mensaje */}
      <motion.button
        onClick={handleChat}
        className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0.7)',
            '0 0 0 15px rgba(59, 130, 246, 0)',
            '0 0 0 0 rgba(59, 130, 246, 0)',
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, delay: 1 },
        }}
      >
        {/* Onda expansiva animada */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        
        <MessageCircle className="w-7 h-7 text-white z-10" />
        
        {/* Badge con contador (opcional) */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-white text-[10px] font-bold">!</span>
        </motion.div>
        
        {/* Texto descriptivo */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 bg-neutral-900 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-medium">
          Chatea con Nosotros
        </div>
      </motion.button>

      {/* Indicador visual animado */}
      <motion.div
        className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  )
}

