'use client'

import { MessageSquare, TrendingUp, Users, Clock } from 'lucide-react'

export default function SofiaPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary-400" />
          Sofía IA
        </h1>
        <p className="text-white/60">Analytics y conversaciones del asistente virtual</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Conversaciones Hoy</p>
          <p className="text-2xl font-bold text-primary-400">47</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Total Mensajes</p>
          <p className="text-2xl font-bold text-primary-400">328</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Tiempo Respuesta</p>
          <p className="text-2xl font-bold text-green-400">0.8s</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Satisfacción</p>
          <p className="text-2xl font-bold text-green-400">98%</p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversaciones Recientes */}
        <div className="bg-black border border-primary-400/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-400" />
            Conversaciones Recientes
          </h3>
          <div className="space-y-4">
            {[
              { cliente: 'María González', mensaje: '¿Cuál es el precio del botox?', tiempo: 'Hace 5 min' },
              { cliente: 'Ana López', mensaje: 'Quiero agendar una cita', tiempo: 'Hace 15 min' },
              { cliente: 'Laura Martínez', mensaje: '¿Tienen disponibilidad?', tiempo: 'Hace 1 hora' },
            ].map((conv, idx) => (
              <div key={idx} className="border border-primary-400/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-white">{conv.cliente}</p>
                  <span className="text-xs text-white/60">{conv.tiempo}</span>
                </div>
                <p className="text-sm text-white/60">{conv.mensaje}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas */}
        <div className="bg-black border border-primary-400/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            Métricas de Rendimiento
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Tasa de Conversión</span>
                <span className="text-white font-semibold">76%</span>
              </div>
              <div className="h-2 bg-primary-400/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary-400 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Resolución Automática</span>
                <span className="text-white font-semibold">82%</span>
              </div>
              <div className="h-2 bg-primary-400/20 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Engagement</span>
                <span className="text-white font-semibold">91%</span>
              </div>
              <div className="h-2 bg-primary-400/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary-400 rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

