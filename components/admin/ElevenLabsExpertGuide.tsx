'use client'

import { AlertCircle, CheckCircle, Code, Lightbulb, Zap, BookOpen, MessageSquare, Settings } from 'lucide-react'

/**
 * Componente: ElevenLabsExpertGuide
 * Responsabilidad: Documentación completa del Asistente Experto en ElevenLabs
 */
export default function ElevenLabsExpertGuide() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              🤖 Asistente Experto en ElevenLabs
            </h2>
            <p className="text-slate-700 mb-4">
              Tu especialista en IA para cualquier pregunta sobre ElevenLabs, agentes de voz y integración en webs.
            </p>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <p className="text-sm text-slate-600">
                <strong>✨ Características:</strong> Respuestas especializadas, ejemplos de código, mejores prácticas, soporte en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: CÓMO ACCEDER */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">1️⃣ Cómo Acceder al Asistente</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm font-semibold text-blue-900 mb-2">Paso 1: Ir a Soporte</p>
            <p className="text-sm text-blue-800">
              En el menú lateral izquierdo, busca el grupo <strong>"❓ Soporte"</strong>
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm font-semibold text-blue-900 mb-2">Paso 2: Expandir el Grupo</p>
            <p className="text-sm text-blue-800">
              Haz clic en <strong>"❓ Soporte"</strong> para expandir y ver las opciones disponibles.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm font-semibold text-blue-900 mb-2">Paso 3: Seleccionar Asistente Experto</p>
            <p className="text-sm text-blue-800">
              Haz clic en <strong>"Asistente Experto ElevenLabs"</strong> para abrir el chat.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm font-semibold text-green-900 mb-2">✅ Listo</p>
            <p className="text-sm text-green-800">
              Ya puedes empezar a hacer preguntas al asistente.
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: TEMAS QUE DOMINA */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold text-slate-900">2️⃣ Temas Que Domina el Asistente</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text-to-Speech */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">🎙️ Text-to-Speech (TTS)</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Modelos disponibles (Flash, Turbo, Multilingual)</li>
              <li>• Configuración de voces</li>
              <li>• Velocidad, estabilidad, claridad</li>
              <li>• Mejores prácticas de síntesis</li>
            </ul>
          </div>

          {/* Conversational AI */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">🤖 Agentes de Voz Conversacionales</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Creación de agentes</li>
              <li>• SDK de JavaScript</li>
              <li>• Captura de audio</li>
              <li>• Latencia en tiempo real</li>
            </ul>
          </div>

          {/* Integración Web */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">🌐 Integración en Webs</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• JavaScript puro, React, Next.js</li>
              <li>• Manejo de sesiones</li>
              <li>• Autenticación de agentes</li>
              <li>• UX para asistentes de voz</li>
            </ul>
          </div>

          {/* Configuración Avanzada */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">⚙️ Configuración Avanzada</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Prompts y personalidad</li>
              <li>• 32+ idiomas soportados</li>
              <li>• Streaming de audio</li>
              <li>• Manejo de errores</li>
            </ul>
          </div>

          {/* Precios */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
            <h4 className="font-semibold text-pink-900 mb-2">💰 Precios y Monetización</h4>
            <ul className="text-sm text-pink-800 space-y-1">
              <li>• Modelos de precios</li>
              <li>• Cálculo de costos</li>
              <li>• Estrategias de resellers</li>
              <li>• Planes y límites</li>
            </ul>
          </div>

          {/* Documentación */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-2">📚 Documentación Oficial</h4>
            <ul className="text-sm text-indigo-800 space-y-1">
              <li>• Referencias a docs oficiales</li>
              <li>• Ejemplos de código</li>
              <li>• Mejores prácticas</li>
              <li>• Solución de problemas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: EJEMPLOS DE PREGUNTAS */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-slate-600" />
          <h3 className="text-xl font-bold text-slate-900">3️⃣ Ejemplos de Preguntas</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <p className="text-sm font-semibold text-slate-900">
              "¿Cómo creo un agente de voz en ElevenLabs desde cero?"
            </p>
            <p className="text-xs text-slate-600 mt-1">Guía paso a paso para crear tu primer agente</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <p className="text-sm font-semibold text-slate-900">
              "¿Cuál es la latencia mínima que puedo lograr en una aplicación web?"
            </p>
            <p className="text-xs text-slate-600 mt-1">Optimización de rendimiento y latencia</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <p className="text-sm font-semibold text-slate-900">
              "¿Cómo integro el SDK de JavaScript de ElevenLabs en mi sitio web?"
            </p>
            <p className="text-xs text-slate-600 mt-1">Implementación práctica con ejemplos de código</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <p className="text-sm font-semibold text-slate-900">
              "¿Cuál es el modelo más rápido para aplicaciones en tiempo real?"
            </p>
            <p className="text-xs text-slate-600 mt-1">Comparativa de modelos y recomendaciones</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <p className="text-sm font-semibold text-slate-900">
              "¿Cómo configuro un agente para atender a clientes en mi landing page?"
            </p>
            <p className="text-xs text-slate-600 mt-1">Caso de uso: asistente de atención al cliente</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <p className="text-sm font-semibold text-slate-900">
              "¿Cuáles son los precios de ElevenLabs y cómo calculo costos?"
            </p>
            <p className="text-xs text-slate-600 mt-1">Información de precios y estrategias de monetización</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <p className="text-sm font-semibold text-slate-900">
              "¿Cómo manejo la autenticación de usuarios en un agente de voz?"
            </p>
            <p className="text-xs text-slate-600 mt-1">Seguridad y contexto de usuario</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <p className="text-sm font-semibold text-slate-900">
              "¿Qué idiomas soporta ElevenLabs y cómo los configuro?"
            </p>
            <p className="text-xs text-slate-600 mt-1">Soporte multiidioma y configuración</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: CÓMO USAR EL CHAT */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-slate-600" />
          <h3 className="text-xl font-bold text-slate-900">4️⃣ Cómo Usar el Chat</h3>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">1</div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Escribe tu pregunta</h4>
              <p className="text-sm text-slate-600">
                En el campo de texto, escribe cualquier pregunta sobre ElevenLabs. Sé específico para mejores respuestas.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">2</div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Envía el mensaje</h4>
              <p className="text-sm text-slate-600">
                Presiona <strong>Enter</strong> o haz clic en el botón de envío. Para nueva línea, usa <strong>Shift+Enter</strong>.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">3</div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Espera la respuesta</h4>
              <p className="text-sm text-slate-600">
                El asistente procesará tu pregunta (verás un indicador de carga) y te dará una respuesta especializada.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">4</div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Continúa la conversación</h4>
              <p className="text-sm text-slate-600">
                Puedes hacer preguntas de seguimiento. El asistente recordará el contexto de la conversación anterior.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 5: CARACTERÍSTICAS ESPECIALES */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold text-slate-900">5️⃣ Características Especiales</h3>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Ejemplos de Código</p>
              <p className="text-sm text-slate-600">El asistente proporciona ejemplos prácticos de código cuando es relevante.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Referencias Oficiales</p>
              <p className="text-sm text-slate-600">Cita la documentación oficial de ElevenLabs cuando es posible.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Mejores Prácticas</p>
              <p className="text-sm text-slate-600">Incluye recomendaciones y mejores prácticas de la industria.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Contexto Conversacional</p>
              <p className="text-sm text-slate-600">El asistente recuerda el contexto de preguntas anteriores en la conversación.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Respuestas Estructuradas</p>
              <p className="text-sm text-slate-600">Usa viñetas, títulos y secciones para facilitar la lectura.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 6: TIPS Y TRUCOS */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-slate-900">6️⃣ Tips y Trucos</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="font-semibold text-slate-900 mb-1">💡 Sé específico</p>
            <p className="text-sm text-slate-600">
              En lugar de "¿Cómo uso ElevenLabs?", pregunta "¿Cómo integro el SDK de JavaScript en una app React?"
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="font-semibold text-slate-900 mb-1">🔄 Haz preguntas de seguimiento</p>
            <p className="text-sm text-slate-600">
              El asistente mantiene el contexto. Puedes profundizar: "¿Y cómo manejo errores de conexión?"
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="font-semibold text-slate-900 mb-1">📋 Pide ejemplos</p>
            <p className="text-sm text-slate-600">
              Solicita ejemplos de código: "Dame un ejemplo de cómo crear un agente con prompts personalizados"
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="font-semibold text-slate-900 mb-1">🎯 Menciona tu caso de uso</p>
            <p className="text-sm text-slate-600">
              Cuéntale tu situación: "Necesito un asistente de voz para una landing page de estética"
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="font-semibold text-slate-900 mb-1">⚡ Pregunta sobre optimización</p>
            <p className="text-sm text-slate-600">
              Consulta sobre rendimiento: "¿Cómo minimizo la latencia en mi aplicación?"
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 7: LIMITACIONES Y NOTAS */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">⚠️ Notas Importantes</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>• Información actualizada:</strong> El asistente se basa en documentación de ElevenLabs. Si hay cambios recientes en la API, puede haber diferencias.
              </li>
              <li>
                <strong>• Casos específicos:</strong> Para problemas muy específicos o bugs, consulta directamente el soporte oficial de ElevenLabs.
              </li>
              <li>
                <strong>• API Keys:</strong> Nunca compartas tus API keys en el chat. El asistente no las almacena, pero es buena práctica de seguridad.
              </li>
              <li>
                <strong>• Contexto limitado:</strong> El asistente mantiene contexto en la conversación actual. Para nuevas sesiones, comienza desde cero.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold mb-2">¿Listo para empezar?</h3>
        <p className="text-slate-300 mb-6">
          Dirígete a la sección "Asistente Experto ElevenLabs" en el grupo "❓ Soporte" y comienza a hacer preguntas.
        </p>
        <div className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold">
          ✨ Abre el Chat Experto
        </div>
      </div>
    </div>
  )
}
