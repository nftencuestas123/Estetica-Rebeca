'use client'

import ExpertAssistantPanel from './ExpertAssistantPanel'

/**
 * Componente: HelpSection
 * Responsabilidad: FAQ y soporte
 * Incluye: Asistente Experto integrado como panel flotante
 */
export default function HelpSection() {
  const faqs = [
    {
      q: '¿El asistente funciona en todas mis landing pages?',
      a: 'Sí. Una vez configurado correctamente, el widget se carga automáticamente en TODAS tus landing pages (ej: /nude-elegance).',
      category: 'General',
    },
    {
      q: '¿Qué idiomas soporta actualmente?',
      a: 'Actualmente soporta ESPAÑOL completamente. Próximamente: Inglés, Portugués y otros idiomas.',
      category: 'Idiomas',
    },
    {
      q: '¿Cómo cambio el nombre o primer mensaje del asistente?',
      a: 'Ve a ElevenLabs → Tu Agent → Edita los detalles. Los cambios se aplican automáticamente en 1-2 minutos.',
      category: 'Configuración',
    },
    {
      q: '¿Es seguro compartir el Agent ID?',
      a: 'Sí, el Agent ID es PÚBLICO. Pero la API Key es PRIVADA (como una contraseña). NUNCA la compartas.',
      category: 'Seguridad',
    },
    {
      q: '¿Qué hago si el asistente no aparece en mi landing page?',
      a: '1) Verifica Agent ID correcto\n2) Verifica API Key correcta\n3) Reinicia la app (npm run dev)\n4) El Agent está ACTIVO en ElevenLabs',
      category: 'Problemas',
    },
    {
      q: '¿Mi API Key está comprometida, qué hago?',
      a: 'Ve a ElevenLabs → Regenera una nueva API Key → Actualiza en Railway/env.local → Reinicia la app.',
      category: 'Seguridad',
    },
    {
      q: '¿Puedo usar múltiples agentes?',
      a: 'Próximamente: sí. Por ahora, solo soporta 1 agente configurado.',
      category: 'General',
    },
    {
      q: '¿Los datos de las conversaciones son privados?',
      a: 'Sí. Las conversaciones se almacenan de forma segura en ElevenLabs con encriptación.',
      category: 'Privacidad',
    },
  ]

  const categories = ['General', 'Idiomas', 'Configuración', 'Seguridad', 'Problemas', 'Privacidad']

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">❓ Ayuda y Preguntas Frecuentes</h3>
        <p className="text-slate-700">Encuentra respuestas rápidas a las preguntas más comunes.</p>
      </div>

      {/* FAQ */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group border border-slate-200 rounded-lg overflow-hidden hover:border-rose-300 transition"
          >
            <summary className="px-4 py-4 bg-slate-50 cursor-pointer hover:bg-slate-100 flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-sm font-semibold text-slate-700 flex-1">{faq.q}</span>
                <span className="text-xs font-semibold px-2 py-1 bg-white border border-slate-300 rounded text-slate-600 whitespace-nowrap">
                  {faq.category}
                </span>
              </div>
              <span className="ml-2 text-slate-600 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="px-4 py-4 bg-white border-t border-slate-200">
              <p className="text-slate-700 text-sm whitespace-pre-wrap">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>

      {/* CONTACTO */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-500 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-3">🚀 ¿Necesitas más ayuda?</h4>
        <p className="text-sm text-slate-700 mb-4">
          Si tu pregunta no está aquí, puedes:
        </p>
        <div className="space-y-2">
          <a
            href="https://elevenlabs.io/help"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-rose-300 text-rose-600 rounded-lg font-semibold text-sm hover:bg-rose-50 transition"
          >
            📚 Centro de Ayuda de ElevenLabs
          </a>
          <a
            href="https://elevenlabs.io/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-rose-300 text-rose-600 rounded-lg font-semibold text-sm hover:bg-rose-50 transition"
          >
            💬 Contactar Soporte de ElevenLabs
          </a>
        </div>
      </div>

      {/* TIPS */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="font-semibold text-slate-900 mb-2">💡 Tips Útiles</p>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>✅ Verifica que tu Agent esté ACTIVO en ElevenLabs</li>
          <li>✅ Reinicia la app después de cambiar variables de entorno</li>
          <li>✅ Los cambios en ElevenLabs se aplican en 1-2 minutos</li>
          <li>✅ Prueba el asistente en desarrollo antes de subir a producción</li>
          <li>✅ Guarda tu API Key en un lugar seguro (contraseña)</li>
        </ul>
      </div>

      {/* ASISTENTE EXPERTO FLOTANTE */}
      <ExpertAssistantPanel />
    </div>
  )
}

