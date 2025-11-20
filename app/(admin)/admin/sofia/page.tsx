'use client'

import { MessageSquare } from 'lucide-react'

export default function SofiaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-rose-500" />
          Sofía IA
        </h1>
        <p className="text-slate-600">Analytics y conversaciones del asistente virtual</p>
      </div>

      {/* Stats - Sin llamadas API, solo datos estáticos para velocidad */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">Conversaciones Hoy</p>
          <p className="text-2xl font-bold text-rose-500">-</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">Total Mensajes</p>
          <p className="text-2xl font-bold text-rose-500">-</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">Tiempo Respuesta</p>
          <p className="text-2xl font-bold text-green-600">-</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">Satisfacción</p>
          <p className="text-2xl font-bold text-green-600">-</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Módulo en Desarrollo</h3>
        <p className="text-slate-600">Esta sección mostrará analytics y conversaciones del asistente virtual. Estará disponible próximamente.</p>
      </div>
    </div>
  )
}
