/**
 * Tipos extendidos para el sistema Sofia
 * Responsabilidad: Definir todas las interfaces del dominio Sofia
 */

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  agentName?: string
  isTyping?: boolean
  displayedContent?: string
  hasTypo?: boolean
  typoChar?: string
}

export interface Agent {
  id: string
  name: string
  image: string
  status: 'available' | 'in-conversation' | 'away'
  currentConversations: number
}

export interface SofiaSectionProps {
  userId?: string
}

export interface ChatState {
  messages: Message[]
  input: string
  loading: boolean
  currentAgent: Agent | null
  agents: Agent[]
}

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
