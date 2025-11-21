'use client'

import { Settings } from 'lucide-react'

export default function ConfiguracionPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8 text-rose-500" />
          Configuración
        </h1>
        <p className="text-slate-600">
          Ajustes generales del sistema
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-12 text-center">
        <Settings className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Módulo en Desarrollo
        </h2>
        <p className="text-slate-600">
          La configuración estará disponible próximamente
        </p>
      </div>
    </div>
  )
}

