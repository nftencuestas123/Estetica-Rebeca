/**
 * Componente: Paso 3 - Publicación
 * Responsabilidad: UI para publicar en redes sociales
 */

'use client'

import { Instagram, Facebook, Send, Loader2, CheckCircle } from 'lucide-react'

interface PublishingStepProps {
  socialPublishing: any
  videoUrl: string
  copy: string
  onSuccess: () => void
}

export default function PublishingStep({
  socialPublishing,
  videoUrl,
  copy,
  onSuccess,
}: PublishingStepProps) {
  const { selectedPlatforms, connectedAccounts, publishing, togglePlatform, publishContent } = socialPublishing

  const handlePublish = async () => {
    try {
      await publishContent(videoUrl, copy)
      alert('¡Publicado con éxito!')
      onSuccess()
    } catch (error) {
      alert('Error al publicar')
    }
  }

  const platforms: Array<{ id: string; name: string; icon: any }> = [
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'tiktok', name: 'TikTok', icon: Send },
  ]

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">📤 Selecciona dónde publicar:</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map(platform => {
          const isConnected = connectedAccounts.some((acc: any) => acc.platform === platform.id && acc.connected)
          const isSelected = selectedPlatforms.includes(platform.id)

          return (
            <button
              key={platform.id}
              onClick={() => isConnected && togglePlatform(platform.id)}
              disabled={!isConnected}
              className={`p-6 border-2 rounded-lg ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200'
              } ${!isConnected && 'opacity-50 cursor-not-allowed'}`}
            >
              <platform.icon className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">{platform.name}</p>
              {isConnected ? (
                <p className="text-xs text-green-600">✓ Conectado</p>
              ) : (
                <p className="text-xs text-gray-500">No conectado</p>
              )}
            </button>
          )
        })}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm font-medium mb-2">Vista previa del copy:</p>
        <p className="text-sm whitespace-pre-wrap">{copy}</p>
      </div>

      <button
        onClick={handlePublish}
        disabled={selectedPlatforms.length === 0 || publishing}
        className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {publishing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Publicando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Publicar en {selectedPlatforms.length} plataforma(s)
          </>
        )}
      </button>
    </div>
  )
}

