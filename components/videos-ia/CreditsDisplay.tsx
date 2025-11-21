/**
 * Componente: Display de Créditos
 * Responsabilidad: Mostrar balance de créditos
 */

import { DollarSign } from 'lucide-react'

interface CreditsDisplayProps {
  balance: number
}

export default function CreditsDisplay({ balance }: CreditsDisplayProps) {
  return (
    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
      <DollarSign className="w-5 h-5 text-primary" />
      <span className="font-semibold text-primary">{balance} créditos</span>
    </div>
  )
}

