'use client'

import ExpertAssistantPanel from './ExpertAssistantPanel'

/**
 * Componente: StatisticsSection
 * Responsabilidad: Mostrar estadísticas de uso
 * Incluye: Asistente Experto integrado como panel flotante
 */
export default function StatisticsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">📊 Estadísticas y Uso</h3>
        <p className="text-slate-700">Monitorea el rendimiento de tu asistente de voz.</p>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <p className="text-3xl font-bold text-blue-900">--</p>
          <p className="text-sm text-blue-700 mt-2">Conversaciones</p>
          <p className="text-xs text-blue-600 mt-1">Esta semana</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <p className="text-3xl font-bold text-green-900">--</p>
          <p className="text-sm text-green-700 mt-2">Usuarios Únicos</p>
          <p className="text-xs text-green-600 mt-1">Esta semana</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <p className="text-3xl font-bold text-purple-900">--</p>
          <p className="text-sm text-purple-700 mt-2">Tiempo Promedio</p>
          <p className="text-xs text-purple-600 mt-1">Duración conversación</p>
        </div>
      </div>

      {/* GRÁFICO PLACEHOLDER */}
      <div className="bg-slate-100 rounded-lg p-8 border-2 border-dashed border-slate-300 text-center">
        <p className="text-2xl mb-2">📈</p>
        <p className="font-semibold text-slate-800">Gráfico de Conversaciones</p>
        <p className="text-sm text-slate-600 mt-2">Los datos se mostrarán aquí cuando tengas conversaciones activas.</p>
      </div>

      {/* TABLA DE DATOS */}
      <div>
        <h4 className="font-semibold text-slate-900 mb-3">📋 Últimas Conversaciones</h4>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-slate-700 font-semibold">Usuario</th>
                <th className="px-4 py-3 text-left text-slate-700 font-semibold">Fecha</th>
                <th className="px-4 py-3 text-left text-slate-700 font-semibold">Duración</th>
                <th className="px-4 py-3 text-left text-slate-700 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200 hover:bg-slate-50">
                <td colSpan={4} className="px-4 py-6 text-center text-slate-600">
                  <p className="text-sm">Sin datos disponibles aún</p>
                  <p className="text-xs text-slate-500 mt-1">Las conversaciones aparecerán aquí</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* INFORMACIÓN */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
        <p className="font-semibold text-slate-900 mb-2">⏳ Estadísticas Detalladas</p>
        <p className="text-sm text-slate-700">
          Las estadísticas completas se actualizarán en la próxima versión. Por ahora, puedes ver datos en tiempo real en tu dashboard de ElevenLabs.
        </p>
        <a
          href="https://elevenlabs.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
        >
          Ver en ElevenLabs →
        </a>
      </div>

      {/* ASISTENTE EXPERTO FLOTANTE */}
      <ExpertAssistantPanel />
    </div>
  )
}

