'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Share2, Instagram, Facebook, Twitter, Youtube, Zap, Sparkles } from 'lucide-react'
import LoadingSpinner from '@/components/dashboard/LoadingSpinner'

/**
 * =====================================================
 * PÁGINA: REDES SOCIALES
 * Responsabilidad: Mostrar información sobre gestión de redes sociales
 * =====================================================
 */

export default function ClientRedesPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/client/login')
    }
    if (user && user.role === 'admin') {
      router.push('/admin')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <LoadingSpinner text="Cargando..." />
  }

  const socialNetworks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6 text-white" />,
      description: 'Conecta tu cuenta de Instagram para publicar automáticamente tus videos y contenido.',
      gradientFrom: 'pink-500',
      gradientTo: 'rose-500',
      bgFrom: 'pink-50',
      bgTo: 'rose-50',
      borderColor: 'pink-200',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6 text-white" />,
      description: 'Gestiona tu página de Facebook y publica contenido de forma automática.',
      gradientFrom: 'blue-500',
      gradientTo: 'cyan-500',
      bgFrom: 'blue-50',
      bgTo: 'cyan-50',
      borderColor: 'blue-200',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-6 h-6 text-white" />,
      description: 'Conecta tu cuenta de Twitter para compartir tus videos y contenido.',
      gradientFrom: 'sky-500',
      gradientTo: 'blue-500',
      bgFrom: 'sky-50',
      bgTo: 'blue-50',
      borderColor: 'sky-200',
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-6 h-6 text-white" />,
      description: 'Sube tus videos directamente a tu canal de YouTube.',
      gradientFrom: 'red-500',
      gradientTo: 'rose-500',
      bgFrom: 'red-50',
      bgTo: 'rose-50',
      borderColor: 'red-200',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-blue-200 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-3">
            <Share2 className="w-7 h-7" />
            Redes Sociales
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Conecta y gestiona tus cuentas de redes sociales
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-6 max-w-6xl mx-auto">
        {/* CARD PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-300 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl">
                <Share2 className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Gestionar Redes Sociales
                </h2>
                <p className="text-white/90 text-lg">
                  Conecta tus cuentas y publica contenido automáticamente
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* REDES DISPONIBLES */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {socialNetworks.map((network) => (
                <SocialNetworkCard key={network.name} {...network} />
              ))}
            </div>

            {/* INFORMACIÓN: Sistema No Disponible */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 py-4 px-8 rounded-xl text-center">
              <p className="text-amber-800 font-semibold mb-2">Gestión de Redes Sociales</p>
              <p className="text-sm text-amber-700">
                Esta funcionalidad se gestiona desde el panel de administración
              </p>
            </div>
          </div>
        </div>

        {/* INFORMACIÓN ADICIONAL */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 mb-2">Publicación Automática</h3>
              <p className="text-slate-600 text-sm mb-4">
                Una vez conectadas tus redes sociales, podrás publicar contenido automáticamente 
                desde el sistema de Videos IA. Solo crea tu video y elige en qué redes publicarlo.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Conecta todas tus redes sociales en un solo lugar
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Publica en múltiples plataformas simultáneamente
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Gestiona todo desde tu panel de control
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface SocialNetworkCardProps {
  name: string
  icon: React.ReactNode
  description: string
  gradientFrom: string
  gradientTo: string
  bgFrom: string
  bgTo: string
  borderColor: string
}

function SocialNetworkCard({
  name,
  icon,
  description,
  gradientFrom,
  gradientTo,
  bgFrom,
  bgTo,
  borderColor,
}: SocialNetworkCardProps) {
  return (
    <div className={`p-6 bg-gradient-to-br from-${bgFrom} to-${bgTo} border-2 border-${borderColor} rounded-xl`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-lg`}>
          {icon}
        </div>
        <h3 className="font-bold text-slate-800">{name}</h3>
      </div>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}
