'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle, X } from 'lucide-react'

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
    alert('🎙️ Llamada en Vivo: Próximamente con asistente de IA VAPI')
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
      {showTooltip && (
        <div className="absolute -top-20 right-0 bg-neutral-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm max-w-[200px]">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-medium">¡Contáctanos ahora!</p>
          <p className="text-xs text-white/70 mt-1">Llamada en vivo o chat</p>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-neutral-900 transform rotate-45"></div>
        </div>
      )}

      {/* Botón de Llamada en Vivo */}
      <button
        onClick={handleLiveCall}
        className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center active:scale-95"
      >
        <Phone className="w-7 h-7 text-white z-10" />
        
        {/* Badge "LIVE" */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
          LIVE
        </div>
      </button>

      {/* Botón de Chat/Mensaje */}
      <button
        onClick={handleChat}
        className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center active:scale-95"
      >
        <MessageCircle className="w-7 h-7 text-white z-10" />
        
        {/* Badge con contador */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-white text-[10px] font-bold">!</span>
        </div>
      </button>

      {/* Indicador visual */}
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
    </div>
  )
}

