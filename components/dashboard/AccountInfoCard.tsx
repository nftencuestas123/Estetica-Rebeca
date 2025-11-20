'use client'

import { User, Globe, Sparkles } from 'lucide-react'

interface AccountInfoCardProps {
  email: string
  fullName: string
  phone?: string
}

/**
 * AccountInfoCard Component
 * Responsabilidad única: Mostrar información de la cuenta del usuario
 */
export default function AccountInfoCard({ email, fullName, phone }: AccountInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-300">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">
            Información de tu Cuenta
          </h2>
        </div>
      </div>
      <div className="p-6 bg-white">
        <div className="space-y-4">
          <InfoRow icon={<Globe className="w-5 h-5 text-rose-700 font-bold" />} label="Email:" value={email} />
          <InfoRow icon={<User className="w-5 h-5 text-rose-700 font-bold" />} label="Nombre:" value={fullName} />
          <InfoRow icon={<Sparkles className="w-5 h-5 text-rose-700 font-bold" />} label="Teléfono:" value={phone || 'No especificado'} />
          <InfoRow icon={<Globe className="w-5 h-5 text-rose-700 font-bold" />} label="Ciudad:" value="No especificada" last />
        </div>
      </div>
    </div>
  )
}

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: string
  last?: boolean
}

function InfoRow({ icon, label, value, last }: InfoRowProps) {
  return (
    <div className={`flex justify-between items-center ${!last ? 'pb-4 border-b border-slate-300' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-rose-100 rounded-lg">
          {icon}
        </div>
        <span className="text-slate-700 font-semibold text-base">{label}</span>
      </div>
      <span className="text-slate-900 font-bold text-base">{value}</span>
    </div>
  )
}

