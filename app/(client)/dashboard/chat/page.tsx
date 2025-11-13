'use client'

import { useAuth } from '@/app/providers'
import Navbar from '@/components/Navbar'
import ChatSofia from '@/components/ChatSofia'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ChatPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Chat con Sofía
          </h1>
          <p className="text-neutral-600">
            Conversá con nuestra asistente virtual, siempre acá para ayudarte
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg h-[600px] overflow-hidden">
          <ChatSofia userId={user.id} position="embedded" />
        </div>
      </div>
    </div>
  )
}

