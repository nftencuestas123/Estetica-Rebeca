/**
 * Componente: Header del chat
 * Responsabilidad: Mostrar header con botón de cerrar y tooltip
 */

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatHeaderProps {
  onClose: () => void
  isMobile: boolean
  showTooltipInitial?: boolean
}

export default function ChatHeader({ onClose, isMobile, showTooltipInitial = false }: ChatHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(showTooltipInitial)

  return (
    <div className="bg-primary text-white p-4 flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-cream-100/20 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-base sm:text-lg">Sofía Barreto</h3>
          <p className="text-xs opacity-90">Estoy acá para ayudarte</p>
        </div>
      </div>
      
      <div className="relative">
        <button
          onClick={onClose}
          onMouseEnter={() => !isMobile && setShowTooltip(true)}
          onMouseLeave={() => !isMobile && setShowTooltip(false)}
          className={cn(
            "hover:bg-cream-100/20 rounded-full p-2 transition-colors touch-manipulation",
            "flex items-center justify-center",
            isMobile ? "min-w-[44px] min-h-[44px]" : "min-w-[32px] min-h-[32px]"
          )}
          aria-label="Cerrar chat"
        >
          <X className={cn(isMobile ? "w-6 h-6" : "w-5 h-5")} />
        </button>
        
        {showTooltip && (
          <div className={cn(
            "absolute top-full right-0 mt-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-[10000]",
            "animate-in fade-in slide-in-from-top-2 duration-200",
            isMobile ? "w-64 text-center" : ""
          )}>
            {isMobile ? (
              <>
                <span className="font-semibold block mb-1">💡 Para salir del modo chat</span>
                <span className="block">Hacé clic en esta ✕ para volver a navegar</span>
              </>
            ) : (
              "Cerrar chat"
            )}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-neutral-900 transform rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  )
}

