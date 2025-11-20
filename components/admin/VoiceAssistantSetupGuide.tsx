'use client'

import { AlertCircle, CheckCircle, ExternalLink, Copy, Lightbulb } from 'lucide-react'
import { useState } from 'react'
import ExpertAssistantPanel from './ExpertAssistantPanel'

/**
 * Componente: VoiceAssistantSetupGuide
 * Responsabilidad: Guía detallada ACTUALIZADA 2025 basada en Agents Platform
 * Con explicaciones claras (QUÉ, PARA QUÉ, DÓNDE, CÓMO)
 * Incluye: Asistente Experto integrado como panel flotante
 */
export default function VoiceAssistantSetupGuide() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(stepNumber)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* PASO 1 - Crear Cuenta */}
      <div className="border-l-4 border-rose-500 bg-rose-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            1
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              📧 Crea una Cuenta en ElevenLabs
            </h3>

            <div className="space-y-3 text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">¿QUÉ?</p>
                <p>Una cuenta en ElevenLabs para acceder a Agents Platform y crear tu secretaria electrónica.</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿PARA QUÉ?</p>
                <p>Sin cuenta en ElevenLabs, no puedes crear ni gestionar agentes conversacionales.</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿DÓNDE?</p>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href="https://elevenlabs.io/sign-up"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-rose-600 transition"
                  >
                    👉 Ir a ElevenLabs Sign Up
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-white rounded border border-rose-200 p-3 mt-3">
                <p className="text-sm font-semibold text-slate-800 mb-2">✅ Pasos en ElevenLabs:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside text-slate-700">
                  <li>Haz click en "Sign Up"</li>
                  <li>Ingresa tu email y contraseña</li>
                  <li>Verifica tu email (revisa bandeja de entrada)</li>
                  <li>✅ Tu cuenta está LISTA</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PASO 2 - Acceder a Agents Platform */}
      <div className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            2
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              🤖 Accede a Agents Platform
            </h3>

            <div className="space-y-3 text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">¿QUÉ?</p>
                <p>Agents Platform es donde crearás y gestionarás tu secretaria electrónica (agente conversacional).</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿PARA QUÉ?</p>
                <p>Aquí configuras agentes que pueden atender llamadas, agendar citas y responder preguntas de clientes 24/7.</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿DÓNDE Y CÓMO?</p>
                <div className="mt-2 bg-white rounded border border-blue-200 p-3">
                  <ol className="text-sm space-y-2 list-decimal list-inside text-slate-700">
                    <li>
                      <span className="font-semibold">Entra a ElevenLabs</span> (elevenlabs.io)
                    </li>
                    <li>
                      <span className="font-semibold">Esquina superior izquierda</span> → Haz click en el dropdown "Creative Platform"
                    </li>
                    <li>
                      <span className="font-semibold">Selecciona "Agents Platform"</span> → "Build and manage your AI agents"
                    </li>
                    <li>
                      <span className="font-semibold">¡Listo!</span> → Ya estás en Conversational AI
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PASO 3 - Crear Agent */}
      <div className="border-l-4 border-purple-500 bg-purple-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            3
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              ⚙️ Crea tu Primer Agent
            </h3>

            <div className="space-y-3 text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">¿QUÉ?</p>
                <p>Un "Agent" es tu secretaria electrónica - un asistente de IA que responde llamadas y gestiona citas.</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿CÓMO CREAR?</p>
                <div className="mt-2 bg-white rounded border border-purple-200 p-3 space-y-2">
                  <p className="text-sm"><strong>Ubicación:</strong> Sidebar Izquierdo → Build → Agents</p>
                  <p className="text-sm"><strong>Botón:</strong> "+ Create Agent" (esquina superior derecha)</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-slate-800">CONFIGURACIÓN BÁSICA:</p>
                <div className="mt-2 bg-white rounded border border-purple-200 p-3 space-y-2 text-sm">
                  <div>
                    <p><strong>Agent Name:</strong></p>
                    <input type="text" placeholder="Ej: Rebeca - Asistente de Belleza" className="w-full border rounded px-2 py-1 text-xs" disabled />
                  </div>
                  <div>
                    <p><strong>Language:</strong> Spanish (Español)</p>
                  </div>
                  <div>
                    <p><strong>First Message:</strong></p>
                    <p className="text-xs text-slate-600 italic">"Hola, soy el asistente de Rebeca. ¿En qué puedo ayudarte hoy?"</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold text-slate-800">SYSTEM PROMPT (IMPORTANTE):</p>
                <div className="mt-2 bg-slate-900 text-slate-100 rounded p-3 text-xs font-mono space-y-1">
                  <p>Eres una secretaria profesional de un spa de belleza.</p>
                  <p>Tus responsabilidades:</p>
                  <p>- Saludar amablemente a los clientes</p>
                  <p>- Responder preguntas sobre tratamientos</p>
                  <p>- Agendar citas disponibles</p>
                  <p>- Tomar datos: nombre, teléfono, email</p>
                  <p>- Ser profesional y cortés</p>
                </div>
                <button
                  onClick={() => copyToClipboard('Eres una secretaria profesional de un spa de belleza. Tus responsabilidades: - Saludar amablemente - Responder sobre tratamientos - Agendar citas - Tomar datos de cliente - Ser profesional', 3)}
                  className="mt-2 text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-2 py-1 rounded flex items-center gap-1"
                >
                  {copiedStep === 3 ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedStep === 3 ? 'Copiado' : 'Copiar texto'}
                </button>
              </div>

              <div>
                <p className="font-semibold text-slate-800">SELECCIONAR VOZ:</p>
                <p className="text-sm text-slate-600 mt-1">Voice → Elige una voz con categoría "Conversational"</p>
                <p className="text-xs text-slate-600 mt-1">Recomendadas: Emma, Clara (femeninas), Mark (masculino)</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">CONFIGURACIÓN DE MODELO:</p>
                <div className="text-sm text-slate-600 space-y-1 mt-1">
                  <p>• <strong>Language Model:</strong> Eleven Multilingual v2</p>
                  <p>• <strong>Temperature:</strong> 0.5 (respuestas consistentes)</p>
                  <p>• <strong>Max tokens:</strong> 500 (respuestas cortas y concisas)</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-2 text-sm">
                <p className="font-semibold text-green-900 mb-1">✅ Cuando termines de configurar:</p>
                <p className="text-green-800">Botón "Create Agent" → Se creará tu agent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PASO 4 - Obtener Agent ID */}
      <div className="border-l-4 border-green-500 bg-green-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            4
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              🆔 Copia tu Agent ID
            </h3>

            <div className="space-y-3 text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">¿QUÉ?</p>
                <p>El Agent ID es un código único que identifica tu agent. Lo necesitarás para integrar en tu aplicación.</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿DÓNDE ENCONTRARLO?</p>
                <div className="mt-2 bg-white rounded border border-green-200 p-3">
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Después de crear el agent, aparecerá en la pantalla</li>
                    <li>Sidebar izquierdo → Build → Agents</li>
                    <li>Haz click en tu agent recién creado</li>
                    <li>En la esquina superior o en los detalles aparecerá: "Agent ID"</li>
                    <li>📌 <strong>COPIA este ID en un lugar seguro</strong></li>
                  </ol>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="text-sm font-semibold text-amber-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> PRO TIP
                </p>
                <p className="text-xs text-amber-800 mt-1">Guarda el Agent ID en un documento seguro. Lo usarás en tu aplicación.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PASO 5 - Obtener API Key */}
      <div className="border-l-4 border-amber-500 bg-amber-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            5
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              🔑 Obtén tu API Key
            </h3>

            <div className="space-y-3 text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">¿QUÉ?</p>
                <p>La API Key es como una contraseña que permite que tu aplicación se comunique de forma segura con ElevenLabs.</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿CÓMO OBTENERLA?</p>
                <div className="mt-2 bg-white rounded border border-amber-200 p-3">
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>
                      <span className="font-semibold">Ubícación:</span> Sidebar Izquierdo → Developers
                    </li>
                    <li>
                      <span className="font-semibold">Pestaña:</span> "API Keys"
                    </li>
                    <li>
                      <span className="font-semibold">Botón:</span> "Create an API Key"
                    </li>
                    <li>
                      <span className="font-semibold">Configura permisos:</span> Selecciona qué puede hacer (crear agents, hacer llamadas, etc.)
                    </li>
                    <li>
                      <span className="font-semibold">Guarda:</span> ⚠️ COPIA en lugar seguro: <code className="bg-slate-100 px-1 rounded text-xs">sk_elevenlabs_xxxxx</code>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-sm font-semibold text-red-900 mb-1">⚠️ IMPORTANTE</p>
                <p className="text-xs text-red-800">NO COMPARTAS tu API Key con nadie. Es como tu contraseña. Si la expones, cualquiera puede usar tus créditos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PASO 6 - Configurar en .env */}
      <div className="border-l-4 border-indigo-500 bg-indigo-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            6
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              ⚙️ Configura Variables en .env.local (DESARROLLO)
            </h3>

            <div className="space-y-3 text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">¿QUÉ?</p>
                <p>Guardas el Agent ID y API Key en un archivo especial para que tu app pueda usarlos.</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿DÓNDE?</p>
                <p className="text-sm text-slate-600">En tu carpeta de proyecto raíz: <code className="bg-slate-100 px-1 rounded">.env.local</code></p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿CÓMO?</p>
                <div className="mt-2 bg-slate-900 text-slate-100 rounded p-3 font-mono text-xs space-y-1 relative">
                  <div>NEXT_PUBLIC_ELEVENLABS_AGENT_ID=aqui_tu_agent_id</div>
                  <div>NEXT_PUBLIC_ELEVENLABS_API_KEY=aqui_tu_api_key</div>
                  <button
                    onClick={() => copyToClipboard('NEXT_PUBLIC_ELEVENLABS_AGENT_ID=aqui_tu_agent_id\nNEXT_PUBLIC_ELEVENLABS_API_KEY=aqui_tu_api_key', 6)}
                    className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 p-2 rounded"
                  >
                    {copiedStep === 6 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                  </button>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  <strong>Reemplaza:</strong>
                  <br />• <code className="bg-slate-100 px-1">aqui_tu_agent_id</code> por tu Agent ID del Paso 4
                  <br />• <code className="bg-slate-100 px-1">aqui_tu_api_key</code> por tu API Key del Paso 5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PASO 7 - Variables en Railway (PRODUCCIÓN) */}
      <div className="border-l-4 border-teal-500 bg-teal-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            7
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              🚀 Configura Variables en Railway (PRODUCCIÓN)
            </h3>

            <div className="space-y-3 text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">¿QUÉ?</p>
                <p>Configurar las mismas variables en Railway (donde tu app está EN VIVO en internet).</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿CÓMO?</p>
                <div className="mt-2 bg-white rounded border border-teal-200 p-3">
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Ve a <a href="https://railway.app" target="_blank" className="text-teal-600 hover:underline">railway.app</a></li>
                    <li>Abre tu proyecto "Estetica-Rebeca"</li>
                    <li>Selecciona el servicio/app (donde está tu código)</li>
                    <li>Haz click en pestaña <strong>"Variables"</strong></li>
                    <li>Botón <strong>"Add Variable"</strong> → Crear PRIMERA variable</li>
                    <li className="ml-4">
                      <strong>Nombre:</strong> <code className="bg-slate-100 px-1 text-xs">NEXT_PUBLIC_ELEVENLABS_AGENT_ID</code>
                      <br />
                      <strong>Valor:</strong> Tu Agent ID
                    </li>
                    <li>Botón <strong>"Add Variable"</strong> → Crear SEGUNDA variable</li>
                    <li className="ml-4">
                      <strong>Nombre:</strong> <code className="bg-slate-100 px-1 text-xs">NEXT_PUBLIC_ELEVENLABS_API_KEY</code>
                      <br />
                      <strong>Valor:</strong> Tu API Key
                    </li>
                    <li>Botón <strong>"Deploy"</strong> → Railway despliega con las nuevas variables</li>
                    <li>⏱️ Espera 2-3 minutos para que se actualice</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PASO 8 - Reiniciar App */}
      <div className="border-l-4 border-cyan-500 bg-cyan-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            8
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              🔄 Reinicia tu Aplicación
            </h3>

            <div className="space-y-3 text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">¿QUÉ?</p>
                <p>Detén y reinicia tu app para que lea las nuevas variables de configuración.</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">¿CÓMO? (En tu computadora)</p>
                <div className="mt-2 bg-slate-900 text-slate-100 rounded p-3 font-mono text-xs space-y-1">
                  <div># En tu terminal (donde corre npm run dev):</div>
                  <div className="mt-2">1. Presiona: Ctrl + C</div>
                  <div>2. Ejecuta: npm run dev</div>
                  <div>3. Espera a ver: "Ready in X.Xs"</div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm font-semibold text-green-900 mb-1">✅ Variables Cargadas</p>
                <p className="text-xs text-green-800">Cuando reinicies, tu app leerá el Agent ID y API Key correctamente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VERIFICACIÓN FINAL */}
      <div className="border-l-4 border-emerald-500 bg-emerald-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            ✅
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              ✨ ¡Verificación Final!
            </h3>

            <div className="space-y-2 text-slate-700">
              <div className="bg-white rounded border border-emerald-200 p-3">
                <p className="font-semibold text-emerald-900 mb-2">✅ Si ves esto, ¡TODO está configurado correctamente!</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>El agent aparece en Agents Platform</li>
                  <li>Las variables están en .env.local y Railway</li>
                  <li>Tu app se reinició exitosamente</li>
                  <li>Tu secretaria electrónica está LISTA para recibir clientes</li>
                </ul>
              </div>

              <div className="bg-white rounded border border-red-200 p-3">
                <p className="font-semibold text-red-900 mb-2">❌ Si algo NO funciona, verifica:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>¿Copiaste correctamente el Agent ID?</li>
                  <li>¿Copiaste correctamente la API Key?</li>
                  <li>¿Reiniciaste la app después de cambiar .env.local?</li>
                  <li>¿El nombre de las variables es exactamente: NEXT_PUBLIC_ELEVENLABS_AGENT_ID y NEXT_PUBLIC_ELEVENLABS_API_KEY?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ASISTENTE EXPERTO FLOTANTE */}
      <ExpertAssistantPanel />
    </div>
  )
}
