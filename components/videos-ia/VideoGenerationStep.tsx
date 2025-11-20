/**
 * Componente: Paso 1 - Generación de Video
 * Responsabilidad: UI para generar videos
 */

'use client'

import { Upload, Video, Loader2 } from 'lucide-react'
import Image from 'next/image'
import type { VideoGenerationState } from '@/hooks/useVideoGeneration'

interface VideoGenerationStepProps {
  videoGeneration: any
  balance: number
  onSuccess: () => void
}

export default function VideoGenerationStep({
  videoGeneration,
  balance,
  onSuccess,
}: VideoGenerationStepProps) {
  const { state, handleImageUpload, setVideoIdea, setDuration, generateVideoFromImage } = videoGeneration

  const handleGenerate = async () => {
    try {
      await generateVideoFromImage()
      onSuccess()
    } catch (error) {
      alert('Error generando video')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          📸 Subir Imagen
        </label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition">
          {state.imagePreview ? (
            <div className="relative w-64 h-64 mx-auto">
              <Image src={state.imagePreview} alt="Preview" fill className="object-cover rounded-lg" />
            </div>
          ) : (
            <label className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <span className="text-gray-600">Click para subir imagen</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          💡 Idea del Video
        </label>
        <textarea
          value={state.videoIdea}
          onChange={e => setVideoIdea(e.target.value)}
          className="w-full p-4 border rounded-lg"
          rows={4}
          placeholder="Describe tu idea..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          ⏱️ Duración ({state.videoCost} créditos)
        </label>
        <select
          value={state.duration}
          onChange={e => setDuration(Number(e.target.value) as any)}
          className="w-full p-3 border rounded-lg"
        >
          <option value={0.5}>30 segundos</option>
          <option value={1}>1 minuto</option>
          <option value={2}>2 minutos</option>
          <option value={5}>5 minutos</option>
          <option value={10}>10 minutos</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!state.imageFile || !state.videoIdea || state.generatingVideo || balance < state.videoCost}
        className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {state.generatingVideo ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Video className="w-5 h-5" />
            Generar Video
          </>
        )}
      </button>
    </div>
  )
}

