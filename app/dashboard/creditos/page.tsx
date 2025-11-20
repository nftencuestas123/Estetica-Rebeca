'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { CreditCard, ArrowLeft, Zap } from 'lucide-react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import LoadingSpinner from '@/components/dashboard/LoadingSpinner'

/**
 * =====================================================
 * PÁGINA: COMPRAR CRÉDITOS
 * Responsabilidad: Mostrar paquetes de créditos disponibles
 * =====================================================
 */

const CREDIT_PACKAGES = [
  { id: 1, credits: 100, price: '$19.99', popular: false, description: 'Perfecto para empezar' },
  { id: 2, credits: 500, price: '$79.99', popular: true, description: 'Mejor relación precio-crédito' },
  { id: 3, credits: 1000, price: '$129.99', popular: false, description: 'Para uso intensivo' },
]

const FAQ_ITEMS = [
  {
    question: '¿Cuándo expiran los créditos?',
    answer: 'Los créditos no expiran. Puedes usarlos en cualquier momento.',
  },
  {
    question: '¿Puedo obtener un reembolso?',
    answer: 'Contacta con nuestro equipo de soporte para consultar política de reembolsos.',
  },
  {
    question: '¿Hay descuentos para compras en volumen?',
    answer: 'Sí, consulta nuestras ofertas especiales o contacta directamente.',
  },
]

export default function ComprarCreditosPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/client/login')
        return
      }
      if (user.role === 'admin') {
        router.push('/admin')
        return
      }
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return <LoadingSpinner text="Cargando..." />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader
        title="Comprar Créditos"
        description="Adquiere créditos para usar nuestras herramientas"
        icon={<CreditCard className="w-7 h-7 text-rose-500" />}
      />

      <main className="p-6">
        {/* BOTÓN VOLVER */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver atrás
        </button>

        {/* INFORMACIÓN */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-500 rounded-xl flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-2">¿Cómo funcionan los créditos?</h2>
              <p className="text-slate-700">
                Cada acción en nuestras herramientas (crear videos, generar posts, etc.) consume créditos. 
                Compra paquetes según tu necesidad y úsalos cuando quieras.
              </p>
            </div>
          </div>
        </div>

        {/* PAQUETES DE CRÉDITOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {CREDIT_PACKAGES.map((pkg) => (
            <CreditPackageCard key={pkg.id} {...pkg} />
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Preguntas frecuentes</h3>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

interface CreditPackageCardProps {
  credits: number
  price: string
  popular: boolean
  description: string
}

function CreditPackageCard({ credits, price, popular, description }: CreditPackageCardProps) {
  return (
    <div
      className={`rounded-2xl p-8 transition-all transform hover:scale-105 ${
        popular
          ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-2xl border-2 border-rose-600'
          : 'bg-white border-2 border-slate-200 text-slate-900'
      }`}
    >
      {popular && (
        <div className="mb-4 inline-block bg-white text-rose-600 px-4 py-1 rounded-full text-sm font-bold">
          ⭐ POPULAR
        </div>
      )}

      <div className="mb-4">
        <p className={`text-sm font-semibold mb-2 ${popular ? 'text-rose-100' : 'text-slate-600'}`}>
          {description}
        </p>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold">{credits}</span>
          <span className={`text-lg font-semibold mb-2 ${popular ? 'text-rose-100' : 'text-slate-600'}`}>
            créditos
          </span>
        </div>
      </div>

      <div className={`mb-6 py-4 border-t-2 ${popular ? 'border-white/30' : 'border-slate-200'}`}>
        <p className="text-3xl font-bold">{price}</p>
      </div>

      <button
        disabled
        className={`w-full py-3 rounded-xl font-bold transition-all cursor-not-allowed flex items-center justify-center gap-2 ${
          popular
            ? 'bg-white text-rose-600 hover:bg-slate-100'
            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        }`}
      >
        <CreditCard className="w-5 h-5" />
        Próximamente
      </button>
    </div>
  )
}

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div>
      <p className="font-semibold text-slate-900 mb-2">{question}</p>
      <p className="text-slate-700">{answer}</p>
    </div>
  )
}
