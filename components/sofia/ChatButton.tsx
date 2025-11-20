/**
 * Componente: Botón flotante del chat
 * Responsabilidad: Mostrar el botón para abrir el chat
 */

import { MessageCircle } from 'lucide-react'

interface ChatButtonProps {
  onClick: () => void
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 transition-all flex items-center justify-center z-50 touch-manipulation"
      aria-label="Abrir chat con Sofía"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
    </button>
  )
}

