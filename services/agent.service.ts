/**
 * Servicio de gestión de agentes
 * Responsabilidad: Lógica de asignación y gestión de agentes
 */

import type { Agent } from '@/types/sofia.types'

export class AgentService {
  /**
   * Asigna un agente disponible basado en carga de trabajo
   */
  static assignAvailableAgent(agents: Agent[]): Agent | null {
    const availableAgents = agents.filter(
      (agent) => agent.status === 'available' || agent.status === 'in-conversation'
    )

    if (availableAgents.length === 0) return null

    // Encontrar el agente con menos conversaciones
    const selectedAgent = availableAgents.reduce((prev, current) =>
      prev.currentConversations < current.currentConversations ? prev : current
    )

    return selectedAgent
  }

  /**
   * Actualiza el estado de un agente
   */
  static updateAgentStatus(
    agents: Agent[],
    agentId: string,
    status: Agent['status'],
    conversationDelta: number = 0
  ): Agent[] {
    return agents.map((agent) =>
      agent.id === agentId
        ? {
            ...agent,
            status,
            currentConversations: Math.max(0, agent.currentConversations + conversationDelta),
          }
        : agent
    )
  }

  /**
   * Libera un agente al finalizar conversación
   */
  static releaseAgent(agents: Agent[], agentId: string): Agent[] {
    return this.updateAgentStatus(agents, agentId, 'available', -1)
  }
}

