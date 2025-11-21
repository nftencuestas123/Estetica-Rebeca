'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

interface ElevenLabsWidgetProps {
  agentId?: string
  apiKey?: string
}

/**
 * Widget de ElevenLabs Conversational AI
 * 
 * Responsabilidad: Renderizar el widget de ElevenLabs
 * - NO muestra aviso de privacidad al cargar
 * - Solo carga el widget, sin interferer con el flujo del usuario
 * - El aviso aparece cuando el usuario interactúa con ElevenLabs
 */
export default function ElevenLabsWidget({ 
  agentId,
  apiKey 
}: ElevenLabsWidgetProps) {
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  // El widget se carga directamente sin modal de privacidad
  useEffect(() => {
    // Marcar que se puede cargar el widget
    const canLoadWidget = true
    if (canLoadWidget) {
      // Widget listo para cargar
    }
  }, [])

  const handleScriptLoad = () => {
    setWidgetLoaded(true)
  }

  return (
    <>
      {/* Script de ElevenLabs - Se carga directamente */}
      <Script
        id="elevenlabs-widget"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // =====================================================
              // SNIPPET OFICIAL DE ELEVENLABS CONVERSATIONAL AI
              // =====================================================
              // INSTRUCCIONES:
              // 1. Ve a ElevenLabs Dashboard → Conversational AI
              // 2. Crea o selecciona tu agente
              // 3. Configura: Idioma español, voz clonada/seleccionada
              // 4. Copia el snippet oficial que ElevenLabs proporciona
              // 5. Reemplaza el código de abajo con el snippet oficial
              // =====================================================
              
              // PLACEHOLDER: Reemplazar con snippet oficial de ElevenLabs
              // El snippet oficial se verá algo así:
              // <script src="https://elevenlabs.io/conversational-ai/widget.js" 
              //         data-agent-id="TU_AGENT_ID"
              //         data-language="es"
              //         data-position="bottom-right"
              //         async></script>
              
              // Por ahora, cargar el widget con configuración básica
              if (typeof window !== 'undefined' && !window.elevenLabsWidgetLoaded) {
                const script = document.createElement('script');
                script.src = 'https://elevenlabs.io/conversational-ai/widget.js';
                script.setAttribute('data-agent-id', '${agentId || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || ''}');
                script.setAttribute('data-language', 'es');
                script.setAttribute('data-position', 'bottom-right');
                script.setAttribute('data-theme', 'light');
                script.setAttribute('data-greeting', 'Hola, soy tu asistente virtual. ¿Necesitas ayuda, guía o tienes dudas? Habla o escribe tu consulta.');
                script.async = true;
                script.onload = function() {
                  window.elevenLabsWidgetLoaded = true;
                };
                document.body.appendChild(script);
              }
            })();
          `,
        }}
      />
    </>
  )
}
