'use client'

import ExpertAssistantPanel from './ExpertAssistantPanel'

/**
 * Componente: FeaturesSection
 * Responsabilidad: Mostrar funcionalidades disponibles
 * Incluye: Asistente Experto integrado como panel flotante
 */
export default function FeaturesSection() {
  const features = [
    {
      name: 'Conversación por Voz',
      status: 'activo',
      description: 'Los clientes pueden hablar sin escribir. El asistente entiende y responde.',
      icon: '🎤',
    },
    {
      name: 'Reconocimiento de Voz (ASR)',
      status: 'activo',
      description: 'Convierte el audio hablado en texto con alta precisión en español.',
      icon: '👂',
    },
    {
      name: 'Respuestas Inteligentes',
      status: 'activo',
      description: 'El asistente entiende contexto y responde según el training del agente.',
      icon: '🧠',
    },
    {
      name: 'Widget Embebido',
      status: 'activo',
      description: 'Se carga automáticamente en tus landing pages sin código adicional.',
      icon: '📱',
    },
    {
      name: 'Disponibilidad 24/7',
      status: 'activo',
      description: 'Tu asistente funciona todos los días, todas las horas sin interrupciones.',
      icon: '⏰',
    },
    {
      name: 'Soporte Multiidioma',
      status: 'proximo',
      description: 'Próximamente: Inglés, Portugués y otros idiomas.',
      icon: '🌍',
    },
    {
      name: 'Analytics Detallados',
      status: 'proximo',
      description: 'Ver estadísticas de conversaciones, satisfacción y más.',
      icon: '📊',
    },
    {
      name: 'Integración con Sistemas',
      status: 'proximo',
      description: 'Conectar con CRM, email, Whatsapp y otros sistemas.',
      icon: '🔗',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">✨ Funcionalidades Disponibles</h3>
        <p className="text-slate-700">Estas son las características que tu asistente de voz puede hacer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-l-4 transition-all ${
              feature.status === 'activo'
                ? 'bg-green-50 border-green-500 hover:shadow-md'
                : 'bg-amber-50 border-amber-500 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-2xl">{feature.icon}</div>
              <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                feature.status === 'activo'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-amber-200 text-amber-800'
              }`}>
                {feature.status === 'activo' ? '✅ Activo' : '⏳ Próximo'}
              </span>
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">{feature.name}</p>
            <p className="text-slate-700 text-xs leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* PRÓXIMAS CARACTERÍSTICAS */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="font-semibold text-slate-900 mb-2">🔮 Roadmap (Lo que viene)</p>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>✨ Q1 2025: Soporte para inglés y portugués</li>
          <li>✨ Q1 2025: Analytics detallados en dashboard</li>
          <li>✨ Q2 2025: Integración con WhatsApp Business</li>
          <li>✨ Q2 2025: Entrenamiento personalizado de agentes</li>
        </ul>
      </div>

      {/* ASISTENTE EXPERTO FLOTANTE */}
      <ExpertAssistantPanel />
    </div>
  )
}

