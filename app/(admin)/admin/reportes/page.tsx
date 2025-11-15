'use client'

import { BarChart3, TrendingUp, Download } from 'lucide-react'

export default function ReportesPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary-400" />
            Reportes
          </h1>
          <p className="text-white/60">Analytics y métricas del negocio</p>
        </div>
        <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar
        </button>
      </div>

      {/* Coming Soon */}
      <div className="bg-black border border-primary-400/30 rounded-lg p-12 text-center">
        <TrendingUp className="w-16 h-16 text-primary-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Próximamente</h3>
        <p className="text-white/60 max-w-md mx-auto">
          Reportes detallados, gráficas interactivas y analytics avanzados
        </p>
      </div>
    </div>
  )
}

