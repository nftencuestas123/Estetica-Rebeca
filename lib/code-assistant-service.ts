
import { logger } from './logger'

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `Eres un Ingeniero de Software Senior experto en Next.js, TypeScript y React.
Tu misión es explicar el código de este proyecto a un usuario que quiere entender "pixel por pixel" cómo funciona su aplicación.

CONTEXTO:
Estás integrado en una herramienta llamada "Explorador de Código". El usuario está viendo sus propios archivos.

REGLAS:
1. Explica de forma clara, concisa y didáctica.
2. Usa analogías simples (ej: "esto es como el motor del coche").
3. Si te preguntan por un archivo específico, explica su propósito, importancia y qué pasaría si no existiera.
4. Sé amable y paciente.
5. Responde siempre en Español.
6. Si te piden código, dalo optimizado y moderno.

MODELO MENTAL:
Imagina que le explicas el proyecto a un nuevo desarrollador junior que acaba de unirse al equipo, o al dueño del producto que quiere entender la tecnología.`

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant'
    content: string
}

export async function chatWithCodeAssistant(
    userMessage: string,
    history: ChatMessage[] = []
): Promise<string> {
    if (!OPENROUTER_API_KEY) {
        return "Error: No se encontró la API Key de OpenRouter. Por favor configura NEXT_PUBLIC_OPENROUTER_API_KEY en tu archivo .env.local"
    }

    const messages: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: userMessage }
    ]

    try {
        const response = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
                'X-Title': 'Code Explorer Assistant',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-lite-preview-02-05:free', // Modelo gratuito y rápido
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
            }),
        })

        if (!response.ok) {
            const error = await response.text()
            logger.error('Error OpenRouter Code Assistant', { error })
            return "Lo siento, hubo un error al conectar con mi cerebro digital. Por favor intenta de nuevo."
        }

        const data = await response.json()
        return data.choices[0]?.message?.content || "No pude generar una respuesta."

    } catch (error) {
        logger.error('Error en chatWithCodeAssistant', { error })
        return "Ocurrió un error inesperado. Por favor revisa tu conexión."
    }
}
