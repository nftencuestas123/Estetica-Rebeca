/**
 * Componente: Paso 2 - Generación de Copy
 * Responsabilidad: UI para generar textos virales
 */

'use client'

import { Sparkles, Loader2, ArrowRight } from 'lucide-react'

interface CopyGenerationStepProps {
  copyGeneration: any
  videoUrl: string
  videoIdea: string
  onSuccess: () => void
}

export default function CopyGenerationStep({
  copyGeneration,
  videoUrl,
  videoIdea,
  onSuccess,
}: CopyGenerationStepProps) {
  const { state, setCopyPlatform, setSelectedCopyIndex, generateCopy, generateVariations } = copyGeneration

  const handleGenerate = async () => {
    try {
      await generateCopy(videoUrl, videoIdea)
      await generateVariations()
    } catch (error) {
      alert('Error generando copy')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          📱 Plataforma
        </label>
        <select
          value={state.copyPlatform}
          onChange={e => setCopyPlatform(e.target.value as any)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="multi">Multiplataforma</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
        </select>
      </div>

      {!state.generatedCopy && (
        <button
          onClick={handleGenerate}
          disabled={state.generatingCopy}
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {state.generatingCopy ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generar Copy Viral
            </>
          )}
        </button>
      )}

      {state.copyVariations.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">✨ Variaciones Generadas:</h3>
          {state.copyVariations.map((copy: string, index: number) => (
            <div
              key={index}
              onClick={() => setSelectedCopyIndex(index)}
              className={`p-4 border-2 rounded-lg cursor-pointer ${
                state.selectedCopyIndex === index ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <p className="whitespace-pre-wrap">{copy}</p>
            </div>
          ))}

          <button
            onClick={onSuccess}
            className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            Continuar a Publicar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

