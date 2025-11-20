'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Video, Link as LinkIcon, MessageSquare, Mic } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'
import FunctionalitiesGrid from '@/components/admin/FunctionalitiesGrid'
import FunctionalityCard from '@/components/admin/FunctionalityCard'
import { ADMIN_FUNCTIONALITIES } from '@/services/admin/functionalities'

/**
 * Página: AdminPage (Dashboard)
 * Responsabilidad: Orquestar componentes y mostrar el dashboard
 */
export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/admin/login')
        return
      }
      if (user.role === 'client') {
        router.push('/dashboard')
        return
      }
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-rose-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  // Mapeo de iconos dinámicos
  const iconMap: Record<string, any> = {
    Video,
    LinkIcon,
    MessageSquare,
    Mic,
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader
        title="Dashboard"
        description="Panel de administración - Acceso a funcionalidades"
      />

      <FunctionalitiesGrid>
        {ADMIN_FUNCTIONALITIES.map((functionality) => (
          <FunctionalityCard
            key={functionality.id}
            href={functionality.href}
            icon={iconMap[functionality.icon]}
            title={functionality.title}
            description={functionality.description}
            colorFrom={functionality.colorFrom}
            colorTo={functionality.colorTo}
            borderColor={functionality.borderColor}
            hoverBorderColor={functionality.hoverBorderColor}
          />
        ))}
      </FunctionalitiesGrid>
    </div>
  )
}
