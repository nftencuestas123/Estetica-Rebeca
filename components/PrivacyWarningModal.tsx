'use client'

import { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

interface PrivacyWarningModalProps {
  onAccept: () => void
  onDecline: () => void
}

/**
 * Componente: PrivacyWarningModal
 * Responsabilidad: Mostrar aviso de privacidad para ElevenLabs
 * - Solo se muestra cuando el usuario interactúa con la IA
 * - No aparece al cargar la página
 */
export default function PrivacyWarningModal({
  onAccept,
  onDecline,
}: PrivacyWarningModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Mostrar modal cuando el usuario haga click en el widget de ElevenLabs
  useEffect(() => {
    const checkUserInteraction = () => {
      // Detectar cuando ElevenLabs widget está siendo usado
      const elevenLabsButton = document.querySelector('[data-testid*="elevenlabs"], [class*="elevenlabs"]')
      if (elevenLabsButton) {
        // Modal ya mostrado o usuario rechazó
        const declined = sessionStorage.getItem('elevenlabs_privacy_declined')
        if (!declined) {
          setIsOpen(true)
        }
      }
    }

    // Esperar un poco antes de verificar
    const timer = setTimeout(checkUserInteraction, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-rose-200">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
          <h3 className="text-xl font-bold text-slate-900">
            Aviso de Privacidad
          </h3>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-slate-700">
            Vas a utilizar un asistente de voz con inteligencia artificial que te ayudará de manera personalizada.
          </p>
          <p className="text-slate-600 text-sm">
            <strong>Por favor ten en cuenta:</strong>
          </p>
          <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
            <li>Esta conversación puede ser grabada para mejorar nuestros servicios</li>
            <li>Tu privacidad es importante para nosotros</li>
            <li>Se consumirán créditos según tu uso del asistente</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setIsOpen(false)
              onAccept()
            }}
            className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            Aceptar
          </button>
          <button
            onClick={() => {
              sessionStorage.setItem('elevenlabs_privacy_declined', 'true')
              setIsOpen(false)
              onDecline()
            }}
            className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-semibold hover:bg-slate-300 transition-all"
          >
            Cancelar
          </button>
        </div>

        <label className="flex items-center gap-2 mt-4 text-sm text-slate-600">
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                sessionStorage.setItem('elevenlabs_privacy_no_show_session', 'true')
              }
            }}
          />
          <span>No mostrar de nuevo en esta sesión</span>
        </label>
      </div>
    </div>
  )
}

