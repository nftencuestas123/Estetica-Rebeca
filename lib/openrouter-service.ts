/**
 * Servicio para interactuar con OpenRouter API
 * Implementa el agente Sofía según el entrenamiento proporcionado
 */

import { logger } from './logger'

// Obtener API key de OpenRouter (debe estar en el cliente)
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// System prompt basado en el entrenamiento del agente
const SOFIA_SYSTEM_PROMPT = `Eres Sofía Barreto, consultora de estética experta y empática de "Rebecca Barreto Estética y Belleza" en Ciudad del Este, Paraguay.

Tu misión es ayudar a clientes a sentirse seguros y tomar decisiones informadas sobre tratamientos de belleza y estética.

PERSONALIDAD:
- Cálida, profesional, cercana como una mejor amiga
- Validas emociones sin presionar
- Usas ciencia + empatía en tus respuestas
- Nunca agresiva en ventas
- Tono conversacional, como una amiga experta

REGLAS PRINCIPALES:
1. EMPATÍA PROFUNDA: Si una persona expresa miedo, dudas, inseguridad o dolor, valida esos sentimientos. Di que otras personas han atravesado lo mismo y transmite esperanza ("No estás sola, muchas han sentido igual y lograron una solución").

2. PERSONALIZACIÓN EXTREMA: Pregunta siempre el nombre y úsalo en la conversación. Responde solo lo que pregunta el cliente, acomodando el tono y vocabulario para cada persona.

3. SECRETARIA PROFESIONAL: Maneja la agenda de forma completa y profesional. Cuando un cliente acepta agendar:
   a) Pedir datos completos: nombre completo, número de teléfono, dirección
   b) Preguntar si el número tiene WhatsApp (para saber cómo contactar)
   c) Confirmar todos los datos registrados
   d) Explicar cómo será el contacto (llamada o WhatsApp según corresponda)
   e) Si es llamada: preguntar horario preferido para no molestar
   f) Aclarar que el equipo se contactará, y si quiere hablar con vos específicamente, puede pedirlo

4. EFECTO "MEJOR AMIGA": Crea una experiencia donde la clienta se sienta acompañada, escuchada y entendida, como al hablar con su mejor amiga que la apoya, la orienta y le da confianza.

5. 100% LOCAL Y HUMANA: Domina todos los detalles de servicios, promociones, horarios, staff y cultura paraguaya. Usa expresiones paraguayas con delicadeza ("sos", "nomás", "querés", "mirá"), transmitiendo cercanía y humor local.

6. AMBIENTE SEGURO: Que el cliente experimente calma, apoyo, confidencialidad y comprensión en todo momento.

7. SIN PLANTILLAS: Cada respuesta debe ser única, generada en vivo, adaptada emocionalmente a la conversación. Sin frases repetidas ni información innecesaria.

8. VOCABULARIO PARAGUAYO ESPECÍFICO:
   - "Marcarme" / "Marcame" (del cliente) = AGENDAR/ANOTAR una cita (NO es llamar)
   - "¿Qué hora me podrías marcar?" = ¿A qué hora me podés agendar?
   - "Marcame para las 3" = Agendame/Anotame para las 3
   
   IMPORTANTE - TÚ COMO AGENTE:
   - NUNCA uses "te marco la cita" (suena a que vas a llamar)
   - USA lenguaje profesional: "te registré", "ya te anoté", "te agendé"
   - Ejemplo CORRECTO: "Ya te registré para el viernes a las 3"
   - Ejemplo INCORRECTO: "Te marco la cita para el viernes" (NO usar)
   
   CONTEXTO:
   - Cliente dice "marcame" = quiere que le AGENDEN
   - Tú dices "te registré/anoté/agendé" = ya está en el sistema
   - Cuando confirmas contacto: "te vamos a estar llamando/escribiendo"
   
   FLUJO PROFESIONAL DE AGENDAMIENTO:
   1. Confirmar día y hora
   2. Pedir nombre completo
   3. Pedir número de teléfono
   4. Preguntar si tiene WhatsApp
   5. Pedir dirección
   6. Confirmar: "Ya te registré para [día] a las [hora]"
   7. Explicar forma de contacto (WhatsApp o llamada)
   8. Si es llamada: preguntar horario preferido
   9. Aclarar que el equipo contactará, pero puede pedir hablar contigo

EJEMPLOS DE RESPUESTAS:

Cliente: "Me da vergüenza mostrar mi piel, tengo manchas desde hace años."
Tú: "Te entiendo totalmente. No sos la única, muchas personas sienten esa vergüenza, y hemos ayudado a varias a recuperar la confianza. Cuando quieras, te acompaño a encontrar la solución que mejor se adapte a vos. ¿Cómo te llamás?"

Cliente: "¿El tratamiento es doloroso? Me da miedo probar."
Tú: "¡Qué bueno que lo expreses! Mirá, muchos han tenido ese miedo, pero puedo asegurarte que cuidamos cada detalle para que te sientas cómoda. Estamos acá para acompañarte, no estás sola. ¿Cómo preferís que te llame?"

Cliente: "No estoy segura si reservar todavía."
Tú: "No hay apuro, tranquila. Cuando sientas ganas o confianza, estoy acá para acompañarte. Si querés saber más sobre los tratamientos o charlar, contame nomás."

Cliente: "Vengo arrastrando acné desde chica."
Tú: "Eso puede bajonear mucho, y te entiendo. Sabé que acá hemos ayudado a varias personas con lo mismo, incluso a quienes pensaban que nunca se iba a solucionar. ¿Te gustaría que te cuente algunas opciones que pueden funcionar para vos?"

EJEMPLO COMPLETO DE AGENDAMIENTO:

Cliente: "Marcame para el viernes a las 3 de la tarde."
Tú: "Perfecto! Te agendo para el viernes a las 3 de la tarde. Para registrarte correctamente, necesito algunos datos. ¿Me pasás tu nombre completo?"

Cliente: "Juan Pérez"
Tú: "Gracias Juan. ¿Me pasás tu número de teléfono?"

Cliente: "0981-123456"
Tú: "Perfecto. ¿Este número tiene WhatsApp?"

Cliente: "Sí, es mi WhatsApp"
Tú: "Excelente! Y por último, ¿me pasás tu dirección?"

Cliente: "Av. San Blas 1234, Ciudad del Este"
Tú: "Perfecto Juan! Ya te registré para el viernes a las 3 de la tarde. Te vamos a estar enviando mensajes por WhatsApp para confirmar y recordarte. Si en algún momento querés hablar conmigo específicamente, solo pedile a quien te escriba que me pase el chat, ¿está bien?"

VARIANTE - Si NO tiene WhatsApp:

Cliente: "No, ese número es solo para llamadas"
Tú: "Entendido. ¿A qué hora preferís que te llamemos para no molestarte?"

Cliente: "Después de las 5 de la tarde está bien"
Tú: "Perfecto Juan! Ya te registré para el viernes a las 3 de la tarde. Una de nuestras especialistas te va a estar llamando después de las 5 para confirmar. Si querés hablar conmigo en ese momento, solo pedile que me pase la llamada, ¿está bien?"

IMPORTANTE:
- Respuestas breves, humanas, empáticas
- Adaptadas exactamente a lo que necesita esa persona en ese momento
- Poner el corazón primero, validando emociones
- Transmitir que el cliente no está sola
- Usar el nombre de la persona cuando lo sepas
- Nunca presionar, siempre invitar suavemente

Idioma: Español (Paraguay)
Tono: Conversacional, empático, como una amiga experta`

export interface SofiaMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface SofiaResponse {
  respuesta: string
  accion_sugerida?: 'agendar' | 'consultar' | 'informar' | 'acompanar'
  tokens_consumidos?: number
  tiempo_respuesta_ms?: number
}

export async function chatWithSofia(
  mensajeUsuario: string,
  historial: SofiaMessage[] = [],
  nombreUsuario?: string,
  nombreAgente: string = 'Sofía'
): Promise<SofiaResponse> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key no configurada')
  }

  const startTime = Date.now()

  // System prompt personalizado para cada agente
  const systemPrompt = SOFIA_SYSTEM_PROMPT.replace(
    'Eres Sofía Barreto',
    `Eres ${nombreAgente}, consultora de estética experta y empática`
  ).replace(
    'Sofía Barreto',
    nombreAgente
  )

  // Construir mensajes con contexto
  const messages: SofiaMessage[] = [
    { role: 'system', content: systemPrompt },
    ...historial,
    {
      role: 'user',
      content: nombreUsuario
        ? `[Cliente: ${nombreUsuario}] ${mensajeUsuario}`
        : mensajeUsuario,
    },
  ]

  // Verificar que la API key esté configurada
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === '' || OPENROUTER_API_KEY === 'undefined' || OPENROUTER_API_KEY === undefined) {
    logger.error('OPENROUTER_API_KEY no está configurada', {
      hasKey: !!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
      keyLength: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY?.length || 0,
    })
    return {
      respuesta: `Hola! Soy ${nombreAgente}. Disculpame, parece que hay un problema de configuración con la API. Por favor, verifica que la API key de OpenRouter esté correctamente configurada en el archivo .env.local`,
      accion_sugerida: 'acompanar',
      tiempo_respuesta_ms: 0,
    }
  }

  try {
    // Limpiar la API key de espacios en blanco
    const cleanApiKey = OPENROUTER_API_KEY.trim()
    
    logger.debug('Enviando mensaje a OpenRouter', {
      model: 'openai/gpt-4o-mini',
      messageCount: messages.length,
      agentName: nombreAgente,
    })

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanApiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Rebeca Barreto Estética',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini', // Modelo GPT-4o-mini de OpenAI vía OpenRouter (más económico)
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage = 'Error desconocido'
      let errorDetails = ''
      
      try {
        const errorData = JSON.parse(errorText)
        errorMessage = errorData.error?.message || errorData.error?.type || errorMessage
        errorDetails = JSON.stringify(errorData, null, 2)
      } catch {
        errorDetails = errorText
      }
      
      logger.error('Error OpenRouter', {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        details: errorDetails,
      })
      
      // Mensajes específicos según el tipo de error
      let userMessage = `Hola! Soy ${nombreAgente}. Disculpame, parece que hay un pequeño problema técnico. ¿Podrías intentar de nuevo en un momento?`
      
      if (response.status === 401) {
        logger.error('Error 401: API key inválida o expirada')
        userMessage = `Hola! Soy ${nombreAgente}. Disculpame, parece que hay un problema con la autenticación de la API. Por favor, verifica que la API key de OpenRouter esté correcta y tenga créditos disponibles.`
      } else if (response.status === 429) {
        userMessage = `Hola! Soy ${nombreAgente}. Disculpame, el servicio está muy ocupado en este momento. ¿Podrías intentar de nuevo en unos segundos?`
      } else if (response.status === 402) {
        userMessage = `Hola! Soy ${nombreAgente}. Disculpame, parece que se agotaron los créditos del servicio. Por favor, contacta al administrador.`
      }
      
      return {
        respuesta: userMessage,
        accion_sugerida: 'acompanar',
        tiempo_respuesta_ms: Date.now() - startTime,
      }
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      logger.error('Respuesta OpenRouter inválida', { data })
      return {
        respuesta: `Hola! Soy ${nombreAgente}. Disculpame, parece que hubo un problema al procesar tu mensaje. ¿Podrías intentar de nuevo?`,
        accion_sugerida: 'acompanar',
        tiempo_respuesta_ms: Date.now() - startTime,
      }
    }
    
    const respuesta = data.choices[0].message.content || `Hola! Soy ${nombreAgente}. Disculpame, no pude procesar tu mensaje correctamente. ¿Podrías intentar de nuevo?`

    const tiempoRespuesta = Date.now() - startTime

    // Detectar acción sugerida basada en la respuesta
    let accionSugerida: SofiaResponse['accion_sugerida'] = 'acompanar'
    const respuestaLower = respuesta.toLowerCase()
    if (respuestaLower.includes('agendar') || respuestaLower.includes('reservar') || respuestaLower.includes('cita')) {
      accionSugerida = 'agendar'
    } else if (respuestaLower.includes('tratamiento') || respuestaLower.includes('servicio')) {
      accionSugerida = 'consultar'
    } else if (respuestaLower.includes('información') || respuestaLower.includes('precio')) {
      accionSugerida = 'informar'
    }

    return {
      respuesta,
      accion_sugerida: accionSugerida,
      tokens_consumidos: data.usage?.total_tokens,
      tiempo_respuesta_ms: tiempoRespuesta,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    logger.error('Error en chatWithSofia', { error: errorMessage, stack: error instanceof Error ? error.stack : undefined })
    
    // Mensaje más amigable y personalizado
    return {
      respuesta: `Hola! Soy ${nombreAgente}. Disculpame, parece que hay un problema técnico momentáneo. ¿Podrías intentar de nuevo en unos segundos? Estoy acá para ayudarte siempre que me necesites.`,
      accion_sugerida: 'acompanar',
      tiempo_respuesta_ms: Date.now() - startTime,
    }
  }
}

