'use client'

import { useRouter } from 'next/navigation'
import { CreditCard } from 'lucide-react'

interface CreditsCardProps {
  balance: number
}

/**
 * CreditsCard Component
 * Responsabilidad única: Mostrar saldo de créditos y botón de compra
 */
export default function CreditsCard({ balance }: CreditsCardProps) {
  const router = useRouter()

  return (
    <div className="mb-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl shadow-2xl overflow-hidden border-2 border-rose-600 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white rounded-2xl shadow-lg">
            <CreditCard className="w-10 h-10 text-rose-600" />
          </div>
          <div>
            <p className="text-lg font-bold mb-2 text-white">
              Tus Créditos Disponibles
            </p>
            <p className="text-6xl font-bold text-white drop-shadow-lg">
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push('/dashboard/creditos')}
          className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-3 cursor-pointer border-3 border-white shadow-2xl hover:bg-slate-700 active:scale-95"
        >
          <CreditCard className="w-6 h-6 text-yellow-300" />
          <div className="text-left">
            <p className="text-lg font-bold">Comprar Créditos</p>
            <p className="text-xs text-yellow-300 font-semibold">(Próximamente disponible)</p>
          </div>
        </button>
      </div>
    </div>
  )
}

