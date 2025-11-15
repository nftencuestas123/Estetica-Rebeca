/**
 * Constantes de agentes del sistema
 * Responsabilidad: Almacenar datos estáticos de configuración
 */

import type { Agent } from '@/types/sofia.types'

export const AGENTS: Agent[] = [
  {
    id: 'sofia',
    name: 'Sofía',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
  {
    id: 'maria',
    name: 'María',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
  {
    id: 'ana',
    name: 'Ana',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
  {
    id: 'laura',
    name: 'Laura',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
  {
    id: 'carmen',
    name: 'Carmen',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=90',
    status: 'available',
    currentConversations: 0,
  },
]

export const TYPING_SPEED = 8 // ms por carácter (ultra rápido)
export const TYPO_PROBABILITY = 0.03 // 3% de probabilidad de error
export const CORRECTION_DELAY = 200 // ms antes de corregir

