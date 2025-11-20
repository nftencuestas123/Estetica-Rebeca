/**
 * Servicio: Base de Conocimiento de ElevenLabs
 * Responsabilidad: Gestionar documentación y conocimiento sobre ElevenLabs
 * 
 * Estructura de datos:
 * - Documentos de ElevenLabs organizados por categoría
 * - Chunks de texto para procesamiento
 * - Metadata (fuente, URL, categoría, etc.)
 */

export interface KnowledgeDocument {
  id: string
  title: string
  category: 'tts' | 'agents' | 'integration' | 'advanced' | 'pricing' | 'api'
  content: string
  source: string
  url: string
  lastUpdated: string
}

export interface KnowledgeChunk {
  id: string
  documentId: string
  title: string
  category: string
  content: string
  source: string
  url: string
  chunkIndex: number
  totalChunks: number
}

/**
 * Base de Conocimiento de ElevenLabs
 * Documentación oficial, guías, ejemplos y mejores prácticas
 */
export const ELEVENLABS_KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: 'tts-models',
    title: 'Modelos de Text-to-Speech',
    category: 'tts',
    content: `
# Modelos de Text-to-Speech en ElevenLabs

## Eleven Flash v2.5
- **Velocidad**: Ultra rápida (~75ms latencia)
- **Calidad**: Alta calidad con baja latencia
- **Idiomas**: 32+ idiomas
- **Uso**: Ideal para aplicaciones en tiempo real, agentes de voz
- **Características**:
  - Síntesis ultra rápida
  - Naturalidad mejorada
  - Soporte multiidioma
  - Perfecto para streaming

## Eleven Turbo v2.5
- **Velocidad**: Muy rápida
- **Calidad**: Excelente calidad
- **Idiomas**: 32+ idiomas
- **Uso**: Aplicaciones conversacionales, agentes
- **Características**:
  - Balance velocidad/calidad
  - Mejor para conversaciones
  - Bajo consumo de recursos

## Eleven Multilingual v2
- **Velocidad**: Moderada
- **Calidad**: Máxima calidad
- **Idiomas**: 32+ idiomas
- **Uso**: Contenido de alta calidad, podcasts
- **Características**:
  - Mejor pronunciación
  - Entonación natural
  - Ideal para contenido profesional

## Recomendaciones por Caso de Uso
- **Agentes de voz en web**: Eleven Flash v2.5
- **Aplicaciones conversacionales**: Eleven Turbo v2.5
- **Contenido de calidad**: Eleven Multilingual v2
- **Streaming en tiempo real**: Eleven Flash v2.5
    `,
    source: 'ElevenLabs Official Documentation',
    url: 'https://elevenlabs.io/docs/models',
    lastUpdated: '2025-11-19',
  },
  {
    id: 'agents-creation',
    title: 'Creación de Agentes de Voz',
    category: 'agents',
    content: `
# Cómo Crear Agentes de Voz en ElevenLabs

## Paso 1: Acceder a la Plataforma
1. Ir a https://elevenlabs.io
2. Crear cuenta o iniciar sesión
3. Navegar a "Agents" en el dashboard

## Paso 2: Crear Nuevo Agente
1. Hacer clic en "Create Agent"
2. Seleccionar modelo (Flash v2.5 recomendado para web)
3. Elegir voz base

## Paso 3: Configurar Personalidad
- Escribir system prompt personalizado
- Definir tono y estilo de respuesta
- Establecer límites y comportamientos

## Paso 4: Integración
- Copiar Agent ID
- Usar JavaScript SDK para web
- Configurar autenticación si es necesario

## Ejemplo de System Prompt
\`\`\`
Eres un asistente de atención al cliente amable y profesional. 
Tu objetivo es ayudar a los clientes con sus preguntas sobre servicios de estética.
Mantén un tono cálido y empático.
Si no sabes algo, ofrece conectar con un especialista.
\`\`\`

## Mejores Prácticas
- Sé específico en el system prompt
- Prueba con diferentes voces
- Optimiza para tu caso de uso
- Monitorea el rendimiento
    `,
    source: 'ElevenLabs Official Documentation',
    url: 'https://elevenlabs.io/docs/conversational-ai/agents',
    lastUpdated: '2025-11-19',
  },
  {
    id: 'js-sdk-integration',
    title: 'Integración del SDK de JavaScript',
    category: 'integration',
    content: `
# Integración del SDK de JavaScript en tu Web

## Instalación
\`\`\`bash
npm install @elevenlabs/conversational-ai
\`\`\`

## Uso Básico en React
\`\`\`jsx
import { useConversation } from '@elevenlabs/conversational-ai'

export default function VoiceAgent() {
  const { status, start, stop } = useConversation({
    agentId: 'tu-agent-id',
    clientId: 'tu-client-id',
  })

  return (
    <div>
      <button onClick={start}>Iniciar Agente</button>
      <button onClick={stop}>Detener</button>
      <p>Estado: {status}</p>
    </div>
  )
}
\`\`\`

## Uso en JavaScript Puro
\`\`\`javascript
import { Conversation } from '@elevenlabs/conversational-ai'

const conversation = new Conversation({
  agentId: 'tu-agent-id',
  clientId: 'tu-client-id',
})

document.getElementById('start-btn').addEventListener('click', () => {
  conversation.start()
})

document.getElementById('stop-btn').addEventListener('click', () => {
  conversation.stop()
})
\`\`\`

## Configuración Avanzada
- Manejo de eventos (onMessage, onError, onStatusChange)
- Autenticación con tokens
- Configuración de micrófono
- Manejo de audio personalizado

## Optimización de Latencia
- Usar Eleven Flash v2.5
- Habilitar streaming
- Minimizar procesamiento en cliente
- Usar CDN para recursos
    `,
    source: 'ElevenLabs JavaScript SDK Documentation',
    url: 'https://elevenlabs.io/docs/conversational-ai/libraries/java-script',
    lastUpdated: '2025-11-19',
  },
  {
    id: 'advanced-configuration',
    title: 'Configuración Avanzada',
    category: 'advanced',
    content: `
# Configuración Avanzada de Agentes

## System Prompts Efectivos
- Sé claro y específico
- Define el rol del asistente
- Establece límites de conversación
- Incluye ejemplos de respuestas

## Manejo de Contexto
- Pasar información del usuario
- Mantener historial de conversación
- Usar variables dinámicas
- Personalizar por usuario

## Streaming de Audio
- Habilitar para baja latencia
- Configurar buffer size
- Manejar reconexiones
- Optimizar ancho de banda

## Manejo de Errores
- Implementar reintentos
- Fallbacks a texto
- Logging de errores
- Monitoreo de calidad

## Seguridad
- Validar tokens
- Proteger Agent ID
- Encriptar datos sensibles
- Cumplir GDPR/CCPA

## Rendimiento
- Monitorear latencia
- Optimizar prompts
- Cachear respuestas
- Usar CDN
    `,
    source: 'ElevenLabs Best Practices',
    url: 'https://elevenlabs.io/docs/product-guides',
    lastUpdated: '2025-11-19',
  },
  {
    id: 'pricing-models',
    title: 'Modelos de Precios',
    category: 'pricing',
    content: `
# Precios y Modelos de Monetización

## Precios de ElevenLabs (2025)
- **Free Plan**: 10,000 caracteres/mes
- **Starter**: $5/mes - 100,000 caracteres
- **Professional**: $99/mes - 1,000,000 caracteres
- **Scale**: Contactar para precios

## Cálculo de Costos
- Costo por carácter procesado
- Costo por minuto de conversación
- Descuentos por volumen
- Precios especiales para agentes

## Estrategias de Monetización para Resellers
1. **Modelo de Margen**: Compra a X, vende a 3X
2. **Modelo de Suscripción**: Planes mensuales
3. **Modelo de Uso**: Cobrar por interacción
4. **Modelo Híbrido**: Combinación de los anteriores

## Ejemplo de Cálculo
- Costo ElevenLabs: $0.10 por 1000 caracteres
- Precio al cliente: $0.30 por 1000 caracteres (margen 200%)
- Ganancia: $0.20 por 1000 caracteres

## Optimización de Costos
- Usar Eleven Flash v2.5 (más barato)
- Cachear respuestas comunes
- Limitar longitud de respuestas
- Monitorear uso por cliente
    `,
    source: 'ElevenLabs Pricing Page',
    url: 'https://elevenlabs.io/pricing',
    lastUpdated: '2025-11-19',
  },
  {
    id: 'api-reference',
    title: 'Referencia de API',
    category: 'api',
    content: `
# Referencia de API de ElevenLabs

## Endpoints Principales

### Text-to-Speech
\`\`\`
POST /v1/text-to-speech/{voice_id}
\`\`\`

### Agents
\`\`\`
POST /v1/agents/create
GET /v1/agents/{agent_id}
PUT /v1/agents/{agent_id}
DELETE /v1/agents/{agent_id}
\`\`\`

### Voices
\`\`\`
GET /v1/voices
GET /v1/voices/{voice_id}
\`\`\`

## Autenticación
- Usar API Key en header: \`xi-api-key: tu-api-key\`
- Obtener en dashboard de ElevenLabs
- Mantener segura (nunca en cliente)

## Rate Limits
- Free: 10 requests/min
- Starter: 100 requests/min
- Professional: 1000 requests/min

## Manejo de Errores
- 400: Bad Request
- 401: Unauthorized
- 429: Rate Limited
- 500: Server Error

## Ejemplos de Requests
\`\`\`bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM" \\
  -H "xi-api-key: tu-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Hola mundo","model_id":"eleven_flash_v2_5"}'
\`\`\`
    `,
    source: 'ElevenLabs API Reference',
    url: 'https://elevenlabs.io/docs/api-reference',
    lastUpdated: '2025-11-19',
  },
]

/**
 * Dividir documentos en chunks para procesamiento
 */
export function chunkDocuments(documents: KnowledgeDocument[], chunkSize: number = 500): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = []
  let chunkId = 0

  documents.forEach((doc) => {
    const words = doc.content.split(/\s+/)
    const docChunks = []

    for (let i = 0; i < words.length; i += chunkSize) {
      const chunkWords = words.slice(i, i + chunkSize)
      const chunkContent = chunkWords.join(' ')

      docChunks.push({
        id: `chunk-${chunkId++}`,
        documentId: doc.id,
        title: doc.title,
        category: doc.category,
        content: chunkContent,
        source: doc.source,
        url: doc.url,
        chunkIndex: docChunks.length,
        totalChunks: Math.ceil(words.length / chunkSize),
      })
    }

    chunks.push(...docChunks)
  })

  return chunks
}

/**
 * Obtener documentos por categoría
 */
export function getDocumentsByCategory(category: string): KnowledgeDocument[] {
  return ELEVENLABS_KNOWLEDGE_BASE.filter((doc) => doc.category === category)
}

/**
 * Buscar documentos por palabra clave (búsqueda simple)
 */
export function searchDocuments(query: string): KnowledgeDocument[] {
  const lowerQuery = query.toLowerCase()
  return ELEVENLABS_KNOWLEDGE_BASE.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Obtener todos los documentos
 */
export function getAllDocuments(): KnowledgeDocument[] {
  return ELEVENLABS_KNOWLEDGE_BASE
}

/**
 * Obtener documento por ID
 */
export function getDocumentById(id: string): KnowledgeDocument | undefined {
  return ELEVENLABS_KNOWLEDGE_BASE.find((doc) => doc.id === id)
}
