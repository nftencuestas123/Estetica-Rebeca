'use client'

import { ExternalLink, AlertCircle, BookOpen, Database, Zap } from 'lucide-react'
import ExpertAssistantPanel from './ExpertAssistantPanel'

/**
 * Componente: AdvancedSettings (VoiceAssistantAdvancedSettings)
 * Responsabilidad: Guía de configuración avanzada basada en Agents Platform 2025
 * Incluye: Knowledge Base, Tools, Integrations, Webhooks
 * Incluye: Asistente Experto integrado como panel flotante
 */
export default function AdvancedSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-6 h-6 text-amber-500" />
        <h3 className="text-2xl font-bold text-slate-900">⚙️ Configuración Avanzada</h3>
      </div>

      {/* SECCIÓN 1: KNOWLEDGE BASE */}
      <div className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <Database className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <h4 className="text-lg font-bold text-slate-900">1. Knowledge Base - Base de Conocimientos</h4>
        </div>

        <p className="text-slate-700 mb-4">
          La información que tu agent usa para responder preguntas de clientes. Hay 3 formas de agregarla:
        </p>

        <div className="space-y-3">
          {/* Opción 1 */}
          <div className="bg-white rounded border border-blue-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">📍 OPCIÓN 1: Agregar URLs</h5>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Ubicación:</strong> Sidebar Izquierdo → Build → Knowledge Base → "+ Add URL"</p>
              <p><strong>¿Para qué?</strong> El agent leerá tu sitio web y sabrá qué servicios ofreces, precios, horarios, etc.</p>
              <p><strong>Ejemplo de URLs útiles:</strong></p>
              <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                <li>https://tudominio.com/servicios</li>
                <li>https://tudominio.com/precios</li>
                <li>https://tudominio.com/horarios</li>
                <li>https://tudominio.com/contacto</li>
              </ul>
            </div>
          </div>

          {/* Opción 2 */}
          <div className="bg-white rounded border border-blue-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">📋 OPCIÓN 2: Agregar Archivos</h5>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Ubicación:</strong> Sidebar Izquierdo → Build → Knowledge Base → "+ Add Files"</p>
              <p><strong>Formatos soportados:</strong> PDF, DOCX, TXT</p>
              <p><strong>Ejemplos de archivos útiles:</strong></p>
              <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                <li>📄 Precios.pdf (lista de servicios y precios)</li>
                <li>📅 Horarios.pdf (horarios de atención)</li>
                <li>📝 FAQ.txt (preguntas frecuentes)</li>
                <li>🎯 Politicas.pdf (políticas de cancelación, etc.)</li>
              </ul>
            </div>
          </div>

          {/* Opción 3 */}
          <div className="bg-white rounded border border-blue-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">✏️ OPCIÓN 3: Crear Texto Directo</h5>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Ubicación:</strong> Sidebar Izquierdo → Build → Knowledge Base → "+ Create Text"</p>
              <p><strong>¿Para qué?</strong> Escribir directamente información que el agent debe conocer</p>
              <p><strong>Ejemplo de contenido:</strong></p>
              <div className="bg-slate-100 p-2 rounded text-xs font-mono mt-2 space-y-1">
                <div>NUESTROS SERVICIOS:</div>
                <div>- Facial: $50 (1 hora)</div>
                <div>- Corporal: $80 (1.5 horas)</div>
                <div>- Maquillaje: $30 (30 min)</div>
                <div className="mt-2">HORARIOS:</div>
                <div>Lunes a Viernes: 9 AM - 6 PM</div>
                <div>Sábados: 10 AM - 5 PM</div>
                <div>Domingos: Cerrado</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-100 border border-blue-300 rounded p-3 mt-3">
          <p className="text-sm text-blue-900"><strong>💡 Consejo:</strong> Combina las 3 formas. Agrega URLs de tu sitio + archivos PDF + texto directo para máxima cobertura de información.</p>
        </div>
      </div>

      {/* SECCIÓN 2: TOOLS */}
      <div className="border-l-4 border-purple-500 bg-purple-50 rounded-lg p-6">
        <h4 className="text-lg font-bold text-slate-900 mb-4">🔧 2. Tools - Herramientas Avanzadas</h4>

        <p className="text-slate-700 mb-4">
          Acciones especiales que tu agent puede ejecutar (enviar datos a tu servidor, integrar con sistemas externos, etc.)
        </p>

        <div className="space-y-3">
          {/* Webhook Tool */}
          <div className="bg-white rounded border border-purple-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">🔗 Webhook Tool</h5>
            <div className="text-sm text-slate-700 space-y-2">
              <p><strong>¿Para qué?</strong> Enviar datos que tu agent recopila a tu servidor</p>
              <p><strong>Ejemplo:</strong> Cuando un cliente agenda una cita, el agent envía el nombre, teléfono y horario a tu base de datos</p>
              <p><strong>Ubicación:</strong> Sidebar → Build → Tools → "+ Add Webhook Tool"</p>
              <div className="bg-slate-100 p-2 rounded text-xs mt-2">
                <p className="font-mono">URL: https://tudominio.com/api/webhook</p>
                <p className="font-mono">Método: POST</p>
                <p className="font-mono">Datos: nombre, teléfono, email, hora_cita</p>
              </div>
            </div>
          </div>

          {/* Client Tool */}
          <div className="bg-white rounded border border-purple-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">💻 Client Tool</h5>
            <div className="text-sm text-slate-700 space-y-2">
              <p><strong>¿Para qué?</strong> El agent accede a sistemas externos (APIs, bases de datos)</p>
              <p><strong>Ejemplo:</strong> El agent consulta tu calendario para decir horarios disponibles</p>
              <p><strong>Ubicación:</strong> Sidebar → Build → Tools → "+ Add Client Tool"</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: INTEGRATIONS */}
      <div className="border-l-4 border-green-500 bg-green-50 rounded-lg p-6">
        <h4 className="text-lg font-bold text-slate-900 mb-4">🔌 3. Integrations - Conectar Sistemas Externos</h4>

        <p className="text-slate-700 mb-4">
          Sincronizar tu agent con CRMs, sistemas de tickets, etc.
        </p>

        <div className="space-y-3">
          {/* HubSpot */}
          <div className="bg-white rounded border border-green-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">📊 HubSpot CRM</h5>
            <div className="text-sm text-slate-700">
              <p><strong>¿Para qué?</strong> Cada llamada se registra automáticamente como contacto en HubSpot</p>
              <p className="text-xs text-slate-600 mt-1">Ubicación: Sidebar → Integrations → "+ Add integration"</p>
            </div>
          </div>

          {/* Zendesk */}
          <div className="bg-white rounded border border-green-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">🎟️ Zendesk Support</h5>
            <div className="text-sm text-slate-700">
              <p><strong>¿Para qué?</strong> Crear tickets de soporte automáticamente desde las llamadas</p>
              <p className="text-xs text-slate-600 mt-1">Ubicación: Sidebar → Integrations → "+ Add integration"</p>
            </div>
          </div>

          {/* ServiceNow */}
          <div className="bg-white rounded border border-green-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">🏢 ServiceNow</h5>
            <div className="text-sm text-slate-700">
              <p><strong>¿Para qué?</strong> Integración empresarial para IT service management</p>
              <p className="text-xs text-slate-600 mt-1">Ubicación: Sidebar → Integrations → "+ Add integration"</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: MONITORING Y ESTADÍSTICAS */}
      <div className="border-l-4 border-red-500 bg-red-50 rounded-lg p-6">
        <h4 className="text-lg font-bold text-slate-900 mb-4">📊 4. Monitoreo - Ver Estadísticas y Llamadas</h4>

        <div className="space-y-3">
          {/* Conversation History */}
          <div className="bg-white rounded border border-red-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">💬 Conversation History</h5>
            <div className="text-sm text-slate-700 space-y-2">
              <p><strong>¿Qué ves?</strong> Registro de TODAS las llamadas que tu agent ha realizado/recibido</p>
              <p><strong>Información disponible:</strong></p>
              <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                <li>📅 Fecha y hora de la llamada</li>
                <li>⏱️ Duración</li>
                <li>📞 Teléfono que llamó</li>
                <li>📝 Transcripción completa</li>
                <li>✅ Éxito o fallo de la llamada</li>
              </ul>
              <p className="text-xs text-slate-600 mt-2"><strong>Ubicación:</strong> Sidebar → Evaluate → Conversations</p>
            </div>
          </div>

          {/* Tests */}
          <div className="bg-white rounded border border-red-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">🧪 Tests</h5>
            <div className="text-sm text-slate-700 space-y-2">
              <p><strong>¿Para qué?</strong> Probar tu agent ANTES de ponerlo en producción</p>
              <p><strong>Cómo crear un test:</strong></p>
              <ol className="list-decimal list-inside ml-2 text-xs space-y-1">
                <li>Sidebar → Evaluate → Tests</li>
                <li>Botón "+ Create a test"</li>
                <li>Escribe un escenario de conversación</li>
                <li>Ejecuta el test y verifica si el agent responde correctamente</li>
              </ol>
              <p className="text-xs text-slate-600 mt-2"><strong>Ejemplo de test:</strong> Usuario dice "Quiero una cita para mañana a las 3 PM" → Agent debe responder "Perfecto, ¿a qué nombre?"</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 5: WEBHOOK SETTINGS */}
      <div className="border-l-4 border-amber-500 bg-amber-50 rounded-lg p-6">
        <h4 className="text-lg font-bold text-slate-900 mb-4">⚡ 5. ElevenLabs Agents Settings</h4>

        <p className="text-slate-700 mb-4">
          Configuración avanzada a nivel de workspace (aplica a TODOS tus agents)
        </p>

        <div className="space-y-3">
          {/* Conversation Initiation Webhook */}
          <div className="bg-white rounded border border-amber-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">🔗 Conversation Initiation Webhook</h5>
            <div className="text-sm text-slate-700 space-y-2">
              <p><strong>¿Para qué?</strong> Se dispara cuando comienza una llamada (Twilio/SIP)</p>
              <p><strong>Ubicación:</strong> Settings → ElevenLabs Agents Settings → "+ Add webhook"</p>
              <p className="text-xs text-slate-600">Útil para: Registrar inicio de llamadas en tu BD</p>
            </div>
          </div>

          {/* Post-Call Webhook */}
          <div className="bg-white rounded border border-amber-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">🔗 Post-Call Webhook</h5>
            <div className="text-sm text-slate-700 space-y-2">
              <p><strong>¿Para qué?</strong> Se dispara cuando termina una llamada</p>
              <p><strong>Ubicación:</strong> Settings → ElevenLabs Agents Settings → "+ Create Webhook"</p>
              <p className="text-xs text-slate-600">Útil para: Procesar resultado, guardar transcripción, facturar</p>
            </div>
          </div>

          {/* Workspace Secrets */}
          <div className="bg-white rounded border border-amber-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">🔐 Workspace Secrets</h5>
            <div className="text-sm text-slate-700 space-y-2">
              <p><strong>¿Para qué?</strong> Almacenar información sensible (API keys, tokens) de forma segura</p>
              <p><strong>Ubicación:</strong> Settings → Workspace Secrets → "+ Add secret"</p>
              <p className="text-xs text-slate-600">Ejemplo: API Key de tu base de datos, tokens de autenticación</p>
            </div>
          </div>
        </div>
      </div>

      {/* NOTA IMPORTANTE - ACCESO A TODAS LAS OPCIONES */}
      <div className="bg-slate-900 text-white rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold mb-2">📍 UBICACIÓN GENERAL</h5>
            <p className="text-sm mb-3">
              Todas estas opciones están en <strong>Agents Platform → Sidebar Izquierdo</strong>
            </p>
            <div className="bg-slate-800 rounded p-2 text-xs font-mono space-y-1">
              <div>📋 BUILD (crear agentes)</div>
              <div className="ml-4">├─ Agents</div>
              <div className="ml-4">├─ Knowledge Base</div>
              <div className="ml-4">└─ Tools</div>
              <div>📊 EVALUATE (ver estadísticas)</div>
              <div className="ml-4">├─ Conversations</div>
              <div className="ml-4">└─ Tests</div>
              <div>🔌 INTEGRATIONS (conectar sistemas)</div>
              <div>⚙️ SETTINGS (configuración avanzada)</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÓN ACCESO DIRECTO */}
      <div className="text-center pt-4">
        <a
          href="https://elevenlabs.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-lg transition"
        >
          👉 Ir a Agents Platform en ElevenLabs
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* ASISTENTE EXPERTO FLOTANTE */}
      <ExpertAssistantPanel />
    </div>
  )
}
