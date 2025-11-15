'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FloatingContactButtons() {
  const handleChat = () => {
    // Abrir el chat de Sofía (scroll a la sección)
    const sofiaSection = document.querySelector('#sofia-section')
    if (sofiaSection) {
      sofiaSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {/* Botón de Chat - Rebotando como PELOTA ⚽ */}
      <motion.button
        onClick={handleChat}
        className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl"
        animate={{
          y: [0, -15, 0], // Rebote vertical como pelota
          scale: [1, 0.95, 1], // Compresión al "tocar el suelo"
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
      >
        {/* Brillo interno */}
        <div className="absolute inset-2 rounded-full bg-white/20 blur-sm"></div>
        
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white z-10 drop-shadow-lg" />
        
        {/* Badge con número de mensajes */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-white text-[10px] md:text-xs font-bold">1</span>
        </motion.div>
      </motion.button>

      {/* Sombra dinámica debajo del botón (simula pelota) */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/20 rounded-full blur-sm"
        animate={{
          scale: [1, 0.7, 1], // La sombra se reduce cuando la pelota sube
          opacity: [0.3, 0.15, 0.3],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      />
    </div>
  )
}

