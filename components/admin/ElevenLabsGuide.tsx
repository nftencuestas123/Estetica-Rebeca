'use client'

import { ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import ExpertAssistantPanel from './ExpertAssistantPanel'

/**
 * Componente: ElevenLabsGuide
 * Responsabilidad: Mostrar guía completa de ElevenLabs dentro del Asistente de Voz
 * Contenido: Documentación exhaustiva pixel por pixel
 * Incluye: Asistente Experto integrado como panel flotante
 */
export default function ElevenLabsGuide() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* INTRODUCCIÓN */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">📚 Guía Completa de ElevenLabs</h2>
        <p className="text-slate-700 mb-2">
          <strong>¿Qué es ElevenLabs?</strong> Una plataforma de IA especializada en síntesis de voz, agentes conversacionales y automatización.
        </p>
        <p className="text-slate-600 text-sm">
          Esta guía documenta TODAS las funcionalidades, configuraciones y estrategias de monetización para implementar ElevenLabs en tu SaaS.
        </p>
      </div>

      {/* SECCIÓN 1: QUÉ ES ELEVENLABS */}
      <div className="border-l-4 border-amber-500 bg-amber-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">1. ¿Qué es ElevenLabs?</h3>
        <div className="space-y-3 text-slate-700">
          <p><strong>Plataforma de IA:</strong> Especializada en voz y conversaciones automatizadas</p>
          <p><strong>Ubicación:</strong> <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline flex items-center gap-1">https://elevenlabs.io <ExternalLink className="w-4 h-4" /></a></p>
          
          <div className="bg-white rounded border border-amber-200 p-3 mt-3">
            <p className="font-semibold text-slate-800 mb-2">✨ Capacidades principales:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>✅ Text-to-Speech (síntesis de voz)</li>
              <li>✅ Voice Agents (secretarias electrónicas)</li>
              <li>✅ Voice Changer (cambiar voces)</li>
              <li>✅ Dubbing (doblaje multiidioma)</li>
              <li>✅ Sound Effects (efectos de sonido)</li>
              <li>✅ Music Generation (generar música con IA)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: PLATAFORMAS */}
      <div className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">2. Dos Plataformas Principales</h3>
        
        <div className="space-y-4">
          {/* CREATIVE PLATFORM */}
          <div className="bg-white rounded border border-blue-200 p-4">
            <h4 className="font-bold text-slate-800 mb-2">🎨 CREATIVE PLATFORM</h4>
            <p className="text-sm text-slate-700 mb-2">Herramientas para crear contenido de audio</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>• <strong>Generar voces</strong> desde texto</p>
              <p>• <strong>Cambiar voces</strong> de audios existentes</p>
              <p>• <strong>Crear música</strong> con IA</p>
              <p>• <strong>Dubbing</strong> de videos a otros idiomas</p>
            </div>
          </div>

          {/* AGENTS PLATFORM */}
          <div className="bg-white rounded border border-amber-200 p-4">
            <h4 className="font-bold text-slate-800 mb-2">🤖 AGENTS PLATFORM ⭐ (Tu enfoque principal)</h4>
            <p className="text-sm text-slate-700 mb-2">Crear y gestionar agentes conversacionales (secretarias de IA)</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>• <strong>Crear agentes</strong> que hablen por teléfono</p>
              <p>• <strong>Agendar citas</strong> automáticamente</p>
              <p>• <strong>Responder preguntas</strong> de clientes</p>
              <p>• <strong>Transferir llamadas</strong> a humanos</p>
              <p>• <strong>Registrar conversaciones</strong> para análisis</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: CREAR UN AGENT */}
      <div className="border-l-4 border-green-500 bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">3. Pasos para Crear tu Secretaria Electrónica</h3>
        
        <div className="space-y-3 text-slate-700">
          <div className="bg-white rounded border border-green-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">📍 Paso 1: Acceder a Agents</p>
            <code className="text-xs bg-slate-100 p-2 rounded block">Sidebar Izquierdo → Build → Agents → "+ Create Agent"</code>
          </div>

          <div className="bg-white rounded border border-green-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">📍 Paso 2: Configuración Básica</p>
            <div className="text-sm space-y-1">
              <p><strong>Agent Name:</strong> "Rebeca - Asistente de Belleza"</p>
              <p><strong>Language:</strong> Spanish (Español)</p>
              <p><strong>First Message:</strong> "Hola, soy el asistente de Rebeca. ¿En qué puedo ayudarte?"</p>
            </div>
          </div>

          <div className="bg-white rounded border border-green-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">📍 Paso 3: System Prompt (MUY IMPORTANTE)</p>
            <p className="text-xs text-slate-600 mb-2">Instrucciones de cómo debe comportarse tu agent:</p>
            <div className="bg-slate-900 text-slate-100 rounded p-2 text-xs font-mono overflow-x-auto mb-2">
              <p>Eres una secretaria profesional de un spa.</p>
              <p>Tu responsabilidad es:</p>
              <p>- Saludar amablemente</p>
              <p>- Responder sobre tratamientos</p>
              <p>- Agendar citas disponibles</p>
              <p>- Tomar datos del cliente</p>
              <p>- Ser profesional y cortés</p>
            </div>
            <button
              onClick={() => copyToClipboard('Eres una secretaria profesional de un spa. Tu responsabilidad es: - Saludar amablemente - Responder sobre tratamientos - Agendar citas disponibles - Tomar datos del cliente - Ser profesional y cortés', 'systemprompt')}
              className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded flex items-center gap-1"
            >
              {copiedSection === 'systemprompt' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedSection === 'systemprompt' ? 'Copiado' : 'Copiar'}
            </button>
          </div>

          <div className="bg-white rounded border border-green-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">📍 Paso 4: Seleccionar Voz</p>
            <p className="text-xs text-slate-600">Voice → Elige una voz con tag "Conversational"</p>
            <p className="text-xs text-slate-600 mt-1">Recomendadas: Emma, Clara (femenina), Mark (masculina)</p>
          </div>

          <div className="bg-white rounded border border-green-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">📍 Paso 5: Configurar Comportamiento</p>
            <div className="text-xs space-y-1">
              <p><strong>Language Model:</strong> Eleven Multilingual v2</p>
              <p><strong>Temperature:</strong> 0.5 (más consistente)</p>
              <p><strong>Max tokens:</strong> 500 (respuestas concisas)</p>
            </div>
          </div>

          <div className="bg-white rounded border border-green-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">✅ Paso 6: Guardar y Obtener Agent ID</p>
            <p className="text-xs text-slate-600">Botón "Create Agent" → 📌 Copia el AGENT ID (lo usarás en tu aplicación)</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: KNOWLEDGE BASE */}
      <div className="border-l-4 border-purple-500 bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">4. Knowledge Base - Base de Conocimientos</h3>
        
        <p className="text-slate-700 text-sm mb-3">
          La información que tu agente usa para responder preguntas. Hay 3 formas de agregar:
        </p>

        <div className="space-y-2 text-sm">
          <div className="bg-white rounded border border-purple-200 p-2">
            <p className="font-semibold text-slate-800">1️⃣ Agregar URLs</p>
            <p className="text-slate-600 text-xs">Knowledge Base → Add URL → Ingresa tu sitio web</p>
            <p className="text-slate-600 text-xs mt-1">El agente leerá tu web y sabrá qué servicios ofreces</p>
          </div>

          <div className="bg-white rounded border border-purple-200 p-2">
            <p className="font-semibold text-slate-800">2️⃣ Agregar Archivos</p>
            <p className="text-slate-600 text-xs">Knowledge Base → Add Files → PDF, DOCX, TXT</p>
            <p className="text-slate-600 text-xs mt-1">Ejemplo: "Precios.pdf", "Horarios.pdf"</p>
          </div>

          <div className="bg-white rounded border border-purple-200 p-2">
            <p className="font-semibold text-slate-800">3️⃣ Crear Texto Directo</p>
            <p className="text-slate-600 text-xs">Knowledge Base → Create Text → Escribe los datos</p>
            <p className="text-slate-600 text-xs mt-1">Ejemplo: Lista de servicios y precios</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 5: PRECIOS Y MONETIZACIÓN */}
      <div className="border-l-4 border-red-500 bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">5. 💰 Precios y Monetización para tu SaaS</h3>

        <div className="space-y-3 text-sm">
          <div className="bg-white rounded border border-red-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">💵 Costo de ElevenLabs (por minuto de llamada)</p>
            <div className="bg-slate-100 p-2 rounded text-xs space-y-1">
              <p><strong>PROFESSIONAL Plan:</strong> $0.30 - $0.50 USD/min</p>
              <p><strong>Ejemplo:</strong> Llamada de 10 min = $3 - $5 de costo</p>
            </div>
          </div>

          <div className="bg-white rounded border border-red-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">🎯 Tu Estrategia: Marcar 300% de Ganancia</p>
            <div className="bg-slate-100 p-2 rounded text-xs space-y-1">
              <p><strong>Costo ElevenLabs:</strong> $0.40/min</p>
              <p><strong>Cobras al cliente:</strong> $1.20/min (300%)</p>
              <p><strong>Tu ganancia:</strong> $0.80/min (67% de margen)</p>
            </div>
          </div>

          <div className="bg-white rounded border border-red-200 p-3">
            <p className="font-semibold text-slate-800 mb-2">📊 Rentabilidad con 10 Clientes</p>
            <div className="bg-slate-100 p-2 rounded text-xs space-y-1">
              <p>Si cada cliente usa 1,000 min/mes:</p>
              <p><strong>Total ingresos:</strong> 10 × 1,000 min × $1.20 = $12,000</p>
              <p><strong>Total costos:</strong> 10 × 1,000 min × $0.40 = $4,000</p>
              <p><strong>Tu ganancia:</strong> $8,000/mes 🎉</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 6: PLANES RECOMENDADOS */}
      <div className="border-l-4 border-indigo-500 bg-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">6. 🎯 Planes Recomendados para tus Clientes</h3>

        <div className="space-y-2 text-sm">
          <div className="bg-white rounded border border-indigo-200 p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-800">STARTER - $49/mes</p>
                <p className="text-slate-600 text-xs mt-1">500 minutos/mes</p>
              </div>
              <p className="text-indigo-600 font-bold text-xs">+20% margen</p>
            </div>
          </div>

          <div className="bg-white rounded border border-indigo-200 p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-800">PROFESSIONAL - $149/mes</p>
                <p className="text-slate-600 text-xs mt-1">2,000 minutos/mes</p>
              </div>
              <p className="text-indigo-600 font-bold text-xs">+35% margen</p>
            </div>
          </div>

          <div className="bg-white rounded border border-indigo-200 p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-800">ENTERPRISE - $499/mes</p>
                <p className="text-slate-600 text-xs mt-1">Minutos ilimitados</p>
              </div>
              <p className="text-indigo-600 font-bold text-xs">+50% margen</p>
            </div>
          </div>

          <div className="bg-white rounded border border-indigo-200 p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-800">PAY-AS-YOU-GO - $1.50/min</p>
                <p className="text-slate-600 text-xs mt-1">Sin compromiso</p>
              </div>
              <p className="text-indigo-600 font-bold text-xs">+67% margen</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 7: OBTENER API KEY */}
      <div className="border-l-4 border-teal-500 bg-teal-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">7. 🔑 Obtener API Key para tu Aplicación</h3>

        <div className="space-y-2 text-sm text-slate-700">
          <p className="bg-white rounded border border-teal-200 p-2">
            <strong>Paso 1:</strong> Ve a Developers → API Keys
          </p>
          <p className="bg-white rounded border border-teal-200 p-2">
            <strong>Paso 2:</strong> Botón "Create an API Key"
          </p>
          <p className="bg-white rounded border border-teal-200 p-2">
            <strong>Paso 3:</strong> Configura permisos (crear agentes, hacer llamadas, etc.)
          </p>
          <p className="bg-white rounded border border-teal-200 p-2">
            <strong>Paso 4:</strong> ⚠️ Guarda en lugar seguro: <code className="bg-slate-100 px-1 rounded text-xs">sk_elevenlabs_xxxxx</code>
          </p>
          <p className="bg-white rounded border border-teal-200 p-2">
            <strong>Paso 5:</strong> Usa en tu app: <code className="bg-slate-100 px-1 rounded text-xs">npm install @elevenlabs/elevenlabs-js</code>
          </p>
        </div>
      </div>

      {/* SECCIÓN 8: INTEGRACIONES */}
      <div className="border-l-4 border-pink-500 bg-pink-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">8. 🔌 Integraciones Disponibles</h3>

        <div className="space-y-2 text-xs">
          <div className="bg-white rounded border border-pink-200 p-2">
            <p className="font-semibold text-slate-800">🔗 HUBSPOT</p>
            <p className="text-slate-600">Integra llamadas de IA con tu CRM automáticamente</p>
          </div>

          <div className="bg-white rounded border border-pink-200 p-2">
            <p className="font-semibold text-slate-800">🔗 ZENDESK</p>
            <p className="text-slate-600">Crea tickets de soporte automáticamente desde llamadas</p>
          </div>

          <div className="bg-white rounded border border-pink-200 p-2">
            <p className="font-semibold text-slate-800">🔗 SERVICENOW</p>
            <p className="text-slate-600">Integra con tu sistema de tickets empresarial</p>
          </div>

          <div className="bg-white rounded border border-pink-200 p-2">
            <p className="font-semibold text-slate-800">🔗 SALESFORCE (Próximamente)</p>
            <p className="text-slate-600">Sincronización CRM empresarial</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN FINAL */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-2">✨ Siguientes Pasos</h3>
        <ol className="space-y-1 text-sm list-decimal list-inside">
          <li>Ir a "Guía y Setup" → "Guía de Configuración" para activar tu agente</li>
          <li>Crear tu Knowledge Base con información de tus servicios</li>
          <li>Obtener API Key en Developers → API Keys</li>
          <li>Integrar en tu aplicación con @elevenlabs/elevenlabs-js</li>
          <li>Configurar sistema de billing para cobrar a clientes</li>
        </ol>
      </div>

      {/* ASISTENTE EXPERTO FLOTANTE */}
      <ExpertAssistantPanel />
    </div>
  )
}

