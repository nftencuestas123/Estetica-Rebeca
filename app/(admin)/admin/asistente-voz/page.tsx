'use client'

import { CheckCircle, AlertCircle } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'
import VoiceAssistantLayout from '@/components/admin/VoiceAssistantLayout'

/**
 * Página: AsistenteVozAdminPage
 * Responsabilidad: Página principal del asistente de voz
 * ESTRUCTURA: Header + Sidebar izquierdo + Contenido principal
 */
export default function AsistenteVozAdminPage() {
  // Verificar si está configurado - sin llamadas a API
  const isConfigured: boolean = typeof window !== 'undefined' &&
    !!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID &&
    (process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.length ?? 0) > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <AdminHeader
        title="🎙️ Asistente de Voz"
        description="Panel de Control - Guía de configuración, funcionalidades, estadísticas y ayuda"
      />

      {/* ESTADO ACTUAL - BANNER */}
      <div className="mb-8">
        <div className={`border-l-4 rounded-lg p-6 ${
          isConfigured
            ? 'bg-green-50 border-green-500'
            : 'bg-orange-50 border-orange-500'
        }`}>
          <div className="flex items-center gap-4">
            {isConfigured ? (
              <>
                <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">✅ Asistente Configurado</h3>
                  <p className="text-slate-700">Tu asistente de voz está ACTIVO y disponible en tus landing pages.</p>
                  <p className="text-sm text-slate-600 mt-1">Agent ID: <code className="bg-white px-2 py-1 rounded text-xs font-mono">{process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}</code></p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-8 h-8 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">⚠️ Configuración Requerida</h3>
                  <p className="text-slate-700">Abre la "Guía de Configuración" en el menú lateral izquierdo para activar ElevenLabs.</p>
                  <p className="text-sm text-slate-600 mt-1">Son 6 pasos sencillos que tomarán ~15 minutos.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* LAYOUT PRINCIPAL: SIDEBAR + CONTENIDO */}
      <VoiceAssistantLayout />
    </div>
  )
}
