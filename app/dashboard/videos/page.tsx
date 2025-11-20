'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Video, Film, Zap, PlayCircle, Sparkles } from 'lucide-react'
import LoadingSpinner from '@/components/dashboard/LoadingSpinner'

/**
 * =====================================================
 * PÁGINA: CREAR VIDEOS IA
 * Responsabilidad: Mostrar información sobre el sistema de videos IA
 * =====================================================
 */

export default function ClientVideosPage() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-rose-200 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-rose-600 flex items-center gap-3">
            <Video className="w-7 h-7" />
            Crear Videos con IA
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Genera videos profesionales con inteligencia artificial
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-6 max-w-6xl mx-auto">
        {/* CARD PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-rose-300 mb-8">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl">
                <Video className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Sistema de Videos IA
                </h2>
                <p className="text-white/90 text-lg">
                  Crea videos profesionales y publícalos automáticamente en tus redes sociales
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* CARACTERÍSTICAS */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <FeatureCard
                icon={<Film className="w-6 h-6 text-white" />}
                title="Generación IA"
                description="Crea videos profesionales usando inteligencia artificial"
                gradientFrom="rose-500"
                gradientTo="pink-500"
                bgFrom="rose-50"
                bgTo="pink-50"
                borderColor="rose-200"
              />

              <FeatureCard
                icon={<Zap className="w-6 h-6 text-white" />}
                title="Publicación Automática"
                description="Publica en múltiples redes sociales automáticamente"
                gradientFrom="blue-500"
                gradientTo="cyan-500"
                bgFrom="blue-50"
                bgTo="cyan-50"
                borderColor="blue-200"
              />

              <FeatureCard
                icon={<PlayCircle className="w-6 h-6 text-white" />}
                title="Copy Optimizado"
                description="Genera textos virales para acompañar tus videos"
                gradientFrom="purple-500"
                gradientTo="pink-500"
                bgFrom="purple-50"
                bgTo="pink-50"
                borderColor="purple-200"
              />
            </div>

            {/* INFORMACIÓN: Sistema No Disponible */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 py-4 px-8 rounded-xl text-center">
              <p className="text-amber-800 font-semibold mb-2">Sistema de Videos IA</p>
              <p className="text-sm text-amber-700">
                Esta funcionalidad se gestiona desde el panel de administración
              </p>
            </div>
          </div>
        </div>

        {/* INFORMACIÓN ADICIONAL */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 mb-2">¿Cómo funciona?</h3>
              <p className="text-slate-600 text-sm mb-4">
                El sistema de Videos IA te permite crear contenido profesional de forma rápida y sencilla. 
                Sube una imagen, describe tu idea, y la IA generará un video completo con copy optimizado 
                para redes sociales.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full flex-shrink-0"></div>
                  Sube una imagen o elige de tu galería
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full flex-shrink-0"></div>
                  Describe tu idea de video
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full flex-shrink-0"></div>
                  La IA genera el video y copy automáticamente
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full flex-shrink-0"></div>
                  Publica en todas tus redes con un solo clic
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  gradientFrom: string
  gradientTo: string
  bgFrom: string
  bgTo: string
  borderColor: string
}

function FeatureCard({
  icon,
  title,
  description,
  gradientFrom,
  gradientTo,
  bgFrom,
  bgTo,
  borderColor,
}: FeatureCardProps) {
  return (
    <div className={`p-6 bg-gradient-to-br from-${bgFrom} to-${bgTo} border-2 border-${borderColor} rounded-xl`}>
      <div className={`p-3 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-lg w-fit mb-4`}>
        {icon}
      </div>
      <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}
