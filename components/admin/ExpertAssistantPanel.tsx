'use client'

import { useState } from 'react'
import { ChevronDown, X, Lightbulb } from 'lucide-react'
import ElevenLabsExpertChat from './ElevenLabsExpertChat'

/**
 * Componente: ExpertAssistantPanel
 * Responsabilidad: Panel flotante/collapsible del asistente experto
 * Uso: Integrar en todas las guías y secciones del admin
 */
export default function ExpertAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* BOTÓN FLOTANTE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-semibold"
        >
          <Lightbulb className="w-5 h-5" />
          <span>Asistente Experto</span>
        </button>
      )}

      {/* PANEL ABIERTO */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden w-96 max-h-[600px] flex flex-col">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              <span className="font-semibold">Asistente Experto ElevenLabs</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CONTENIDO DEL CHAT */}
          <div className="flex-1 overflow-hidden">
            <ElevenLabsExpertChat />
          </div>
        </div>
      )}
    </div>
  )
}
