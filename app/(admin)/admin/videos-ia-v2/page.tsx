// ESTE ARCHIVO ES LA VERSIÓN COMPLETA E INTEGRADA
// TODO: Reemplazar app/(admin)/admin/videos-ia/page.tsx con este archivo
// Por ahora está como videos-ia-v2 para no romper nada

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Video, Upload, Sparkles, Check, Loader2, DollarSign, Instagram, Facebook, Send } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getUserBalance, calculateVideoCost, deductCredits } from '@/services/credits'
import { generateVideo, getVideoStatus } from '@/services/topview'
import { generateViralCopy, generateCopyVariations } from '@/services/ai-copywriter'
import { publishToMultiplePlatforms, getSocialAccounts } from '@/services/social-media'

export default function VideosIACompletePage() {
  const { user } = useAuth()
  
  // Estados generales
  const [step, setStep] = useState<1 | 2 | 3>(1) // 1=Video, 2=Copy, 3=Publicar
  const [balance, setBalance] = useState(0)
  
  // PASO 1: Video
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoIdea, setVideoIdea] = useState('')
  const [duration, setDuration] = useState<0.5 | 1 | 2 | 5 | 10>(1) // minutos
  const [generatingVideo, setGeneratingVideo] = useState(false)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [videoCost, setVideoCost] = useState(0)
  
  // PASO 2: Copy
  const [copyPlatform, setCopyPlatform] = useState<'multi' | 'instagram' | 'facebook' | 'tiktok'>('multi')
  const [generatedCopy, setGeneratedCopy] = useState('')
  const [copyVariations, setCopyVariations] = useState<string[]>([])
  const [generatingCopy, setGeneratingCopy] = useState(false)
  const [selectedCopyIndex, setSelectedCopyIndex] = useState(0)
  
  // PASO 3: Publicar
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [connectedAccounts, setConnectedAccounts] = useState<any[]>([])
  const [publishing, setPublishing] = useState(false)
  const [publishResults, setPublishResults] = useState<any[]>([])

  const loadUserData = useCallback(async () => {
    if (!user) return
    const currentBalance = await getUserBalance(user.id)
    setBalance(currentBalance)
    
    const accounts = await getSocialAccounts(user.id)
    setConnectedAccounts(accounts)
  }, [user])

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user, loadUserData])

  useEffect(() => {
    // Calcular costo del video cuando cambia la duración
    const cost = calculateVideoCost(duration)
    setVideoCost(cost)
  }, [duration])

  // ========================================
  // PASO 1: GENERAR VIDEO
  // ========================================
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleGenerateVideo = async () => {
    if (!user || !imageFile || !videoIdea.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    if (balance < videoCost) {
      alert(`Saldo insuficiente. Necesitas $${videoCost} pero tienes $${balance}. Recarga créditos.`)
      return
    }

    setGeneratingVideo(true)

    try {
      // Descontar créditos
      const deductResult = await deductCredits(user.id, videoCost, `Video de ${duration}min generado`)
      if (!deductResult.success) {
        throw new Error(deductResult.error)
      }

      // Generar video con TopView
      const videoData = await generateVideo(imageFile, videoIdea, 'es-ES-Standard-A')
      
      // Polling para esperar que el video esté listo
      let videoReady = false
      let videoUrl = null
      let attempts = 0
      const maxAttempts = 60 // 5 minutos máximo

      while (!videoReady && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)) // Esperar 5 segundos
        const status = await getVideoStatus(videoData.jobId)
        
        if (status.status === 'completed') {
          videoReady = true
          videoUrl = status.videoUrl
        } else if (status.status === 'error') {
          throw new Error('Error al generar video en TopView')
        }
        
        attempts++
      }

      if (!videoUrl) {
        throw new Error('Timeout: El video tardó demasiado en generarse')
      }

      setGeneratedVideoUrl(videoUrl)
      setBalance(balance - videoCost)
      alert('✅ ¡Video generado exitosamente!')
      setStep(2) // Pasar a generar copy
    } catch (error: any) {
      console.error('Error generando video:', error)
      alert('❌ Error: ' + error.message)
    } finally {
      setGeneratingVideo(false)
    }
  }

  // ========================================
  // PASO 2: GENERAR COPY CON IA
  // ========================================

  const handleGenerateCopy = async () => {
    if (!videoIdea.trim()) {
      alert('Necesitas una idea del video para generar el copy')
      return
    }

    setGeneratingCopy(true)

    try {
      // Generar 3 variaciones de copy
      const variations = await generateCopyVariations(videoIdea, copyPlatform, 3)
      const copyTexts = variations.map(v => v.text)
      setCopyVariations(copyTexts)
      setGeneratedCopy(copyTexts[0])
      setSelectedCopyIndex(0)
    } catch (error: any) {
      console.error('Error generando copy:', error)
      alert('❌ Error al generar copy: ' + error.message)
    } finally {
      setGeneratingCopy(false)
    }
  }

  const selectCopyVariation = (index: number) => {
    setSelectedCopyIndex(index)
    setGeneratedCopy(copyVariations[index])
  }

  // ========================================
  // PASO 3: PUBLICAR EN REDES
  // ========================================

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform])
    }
  }

  const handlePublish = async () => {
    if (!user || !generatedVideoUrl || !generatedCopy.trim() || selectedPlatforms.length === 0) {
      alert('Por favor completa todos los pasos antes de publicar')
      return
    }

    if (connectedAccounts.length === 0) {
      alert('No tienes cuentas de redes sociales conectadas. Ve a Configuración para conectarlas.')
      return
    }

    setPublishing(true)

    try {
      const results = await publishToMultiplePlatforms(user.id, {
        videoUrl: generatedVideoUrl,
        caption: generatedCopy,
        platforms: selectedPlatforms,
      })

      setPublishResults(results)
      
      const successCount = results.filter(r => r.success).length
      const failCount = results.filter(r => !r.success).length

      alert(`✅ Publicado exitosamente en ${successCount} plataforma(s).\n${failCount > 0 ? `❌ ${failCount} falló(s).` : ''}`)
    } catch (error: any) {
      console.error('Error publicando:', error)
      alert('❌ Error al publicar: ' + error.message)
    } finally {
      setPublishing(false)
    }
  }

  const resetFlow = () => {
    setStep(1)
    setImageFile(null)
    setImagePreview(null)
    setVideoIdea('')
    setDuration(1)
    setGeneratedVideoUrl(null)
    setGeneratedCopy('')
    setCopyVariations([])
    setSelectedPlatforms([])
    setPublishResults([])
    loadUserData()
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Video className="w-8 h-8 text-primary-400" />
          Generador de Videos IA + Publicación Automatizada
        </h1>
        <p className="text-white/60">Crea videos profesionales y publícalos en todas tus redes en minutos</p>
      </div>

      {/* Balance */}
      <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-400/40 rounded-xl p-4 mb-8 flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm">Tu saldo:</p>
          <p className="text-2xl font-bold text-primary-400">${balance.toFixed(2)}</p>
        </div>
        <a href="/admin/creditos/comprar" className="bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors">
          Recargar Créditos
        </a>
      </div>

      {/* Indicador de Pasos */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center gap-2 ${step === 1 ? 'text-primary-400' : step > 1 ? 'text-green-400' : 'text-white/40'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step === 1 ? 'border-primary-400 bg-primary-400/20' : step > 1 ? 'border-green-400 bg-green-400/20' : 'border-white/40'}`}>
            {step > 1 ? <Check className="w-6 h-6" /> : '1'}
          </div>
          <span className="font-semibold hidden sm:block">Generar Video</span>
        </div>
        <div className="w-16 h-0.5 bg-white/20"></div>
        <div className={`flex items-center gap-2 ${step === 2 ? 'text-primary-400' : step > 2 ? 'text-green-400' : 'text-white/40'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step === 2 ? 'border-primary-400 bg-primary-400/20' : step > 2 ? 'border-green-400 bg-green-400/20' : 'border-white/40'}`}>
            {step > 2 ? <Check className="w-6 h-6" /> : '2'}
          </div>
          <span className="font-semibold hidden sm:block">Generar Copy</span>
        </div>
        <div className="w-16 h-0.5 bg-white/20"></div>
        <div className={`flex items-center gap-2 ${step === 3 ? 'text-primary-400' : 'text-white/40'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step === 3 ? 'border-primary-400 bg-primary-400/20' : 'border-white/40'}`}>
            3
          </div>
          <span className="font-semibold hidden sm:block">Publicar</span>
        </div>
      </div>

      {/* PASO 1: GENERAR VIDEO */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">1. Imagen del Avatar</h2>
              <div className="border-2 border-dashed border-primary-400/30 rounded-lg p-6 text-center relative">
                {imagePreview ? (
                  <div>
                    <img src={imagePreview} alt="Avatar" className="max-h-48 mx-auto rounded-lg shadow-lg mb-4" />
                    <button onClick={() => { setImageFile(null); setImagePreview(null); }} className="text-red-400 hover:text-red-300 text-sm">
                      ✕ Eliminar
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-white/40 mx-auto mb-3" />
                    <p className="text-white/60 font-semibold mb-2">Arrastra tu imagen aquí</p>
                    <p className="text-white/40 text-sm mb-4">o haz click para seleccionar</p>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <button className="bg-primary-400/10 text-primary-400 px-6 py-2 rounded-lg font-semibold hover:bg-primary-400/20 transition-colors">
                      Seleccionar Imagen
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">2. Idea del Video</h2>
              <textarea
                value={videoIdea}
                onChange={(e) => setVideoIdea(e.target.value)}
                placeholder="Ejemplo: Promoción de tratamiento facial rejuvenecedor con descuento 50%"
                className="w-full h-32 bg-black border border-primary-400/30 rounded-lg p-4 text-white placeholder-white/40 focus:outline-none focus:border-primary-400/50"
              ></textarea>
              <p className="text-white/60 text-sm mt-2">{videoIdea.length} caracteres</p>
            </div>

            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">3. Duración del Video</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { value: 0.5, label: '30seg', price: calculateVideoCost(0.5) },
                  { value: 1, label: '1min', price: calculateVideoCost(1) },
                  { value: 2, label: '2min', price: calculateVideoCost(2) },
                  { value: 5, label: '5min', price: calculateVideoCost(5) },
                  { value: 10, label: '10min', price: calculateVideoCost(10) },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDuration(option.value as any)}
                    className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                      duration === option.value
                        ? 'border-primary-400 bg-primary-400/20 text-primary-400'
                        : 'border-primary-400/30 text-white hover:border-primary-400/60'
                    }`}
                  >
                    {option.label}
                    <br />
                    <span className="text-sm">${option.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Generar */}
          <div className="bg-black border border-primary-400/30 rounded-xl p-6 sticky top-8">
            <h2 className="text-xl font-bold text-white mb-4">Vista Previa</h2>
            <div className="relative w-full h-64 bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden mb-6">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="object-contain max-h-full max-w-full" />
              ) : (
                <p className="text-white/60">Sube una imagen para previsualizar</p>
              )}
            </div>
            <div className="space-y-3 text-white/70 text-sm mb-6">
              <p><strong>Duración:</strong> {duration < 1 ? `${duration * 60}seg` : `${duration}min`}</p>
              <p><strong>Costo:</strong> ${videoCost.toFixed(2)}</p>
              <p><strong>Saldo actual:</strong> ${balance.toFixed(2)}</p>
              <p><strong>Saldo después:</strong> ${(balance - videoCost).toFixed(2)}</p>
            </div>
            <button
              onClick={handleGenerateVideo}
              disabled={generatingVideo || !imageFile || !videoIdea.trim() || balance < videoCost}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generatingVideo ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generando Video... (1-3 min)
                </>
              ) : (
                <>
                  <Video className="w-5 h-5" />
                  Generar Video con IA
                </>
              )}
            </button>
            {balance < videoCost && (
              <p className="text-red-400 text-sm mt-3 text-center">⚠️ Saldo insuficiente. Recarga créditos.</p>
            )}
          </div>
        </div>
      )}

      {/* PASO 2: GENERAR COPY */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-black border border-primary-400/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Video Generado ✅</h2>
            <video src={generatedVideoUrl || ''} controls className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"></video>
          </div>

          <div className="bg-black border border-primary-400/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Generar Copy Viral con IA 🤖</h2>
            <div className="mb-4">
              <label className="block text-white/80 mb-2">Plataforma:</label>
              <div className="flex gap-3">
                {[
                  { value: 'multi', label: 'Multi-Plataforma' },
                  { value: 'instagram', label: 'Instagram' },
                  { value: 'facebook', label: 'Facebook' },
                  { value: 'tiktok', label: 'TikTok' },
                ].map((platform) => (
                  <button
                    key={platform.value}
                    onClick={() => setCopyPlatform(platform.value as any)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      copyPlatform === platform.value
                        ? 'bg-primary-400 text-white'
                        : 'bg-black border border-primary-400/30 text-white hover:border-primary-400/60'
                    }`}
                  >
                    {platform.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleGenerateCopy}
              disabled={generatingCopy}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {generatingCopy ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generando copy...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generar Copy Viral con IA
                </>
              )}
            </button>
          </div>

          {copyVariations.length > 0 && (
            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Variaciones de Copy (Elige una):</h2>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {copyVariations.map((copy, index) => (
                  <button
                    key={index}
                    onClick={() => selectCopyVariation(index)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedCopyIndex === index
                        ? 'border-primary-400 bg-primary-400/10'
                        : 'border-primary-400/30 hover:border-primary-400/60'
                    }`}
                  >
                    <p className="text-white font-semibold mb-2">Variación {index + 1}</p>
                    <p className="text-white/80 text-sm line-clamp-3">{copy}</p>
                  </button>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Copy Seleccionado (Editable):</h3>
              <textarea
                value={generatedCopy}
                onChange={(e) => setGeneratedCopy(e.target.value)}
                className="w-full h-48 bg-black border border-primary-400/30 rounded-lg p-4 text-white focus:outline-none focus:border-primary-400/50"
              ></textarea>
              <button
                onClick={() => setStep(3)}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                Continuar a Publicar →
              </button>
            </div>
          )}
        </div>
      )}

      {/* PASO 3: PUBLICAR EN REDES */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-black border border-primary-400/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Selecciona dónde publicar:</h2>
            {connectedAccounts.length === 0 ? (
              <div className="bg-yellow-500/20 border border-yellow-400/40 rounded-lg p-6 text-center">
                <p className="text-yellow-400 font-semibold mb-2">⚠️ No tienes cuentas conectadas</p>
                <p className="text-white/60 mb-4">Ve a Configuración para conectar tus redes sociales</p>
                <a href="/admin/configuracion/redes-sociales" className="bg-primary-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-500 transition-colors inline-block">
                  Ir a Configuración
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => togglePlatform(account.platform)}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                      selectedPlatforms.includes(account.platform)
                        ? 'border-primary-400 bg-primary-400/20'
                        : 'border-primary-400/30 hover:border-primary-400/60'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-2xl">
                      {account.platform === 'instagram' && '📸'}
                      {account.platform === 'facebook' && '📘'}
                      {account.platform === 'tiktok' && '🎵'}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold capitalize">{account.platform}</p>
                      <p className="text-white/60 text-sm">@{account.account_name}</p>
                    </div>
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      selectedPlatforms.includes(account.platform)
                        ? 'border-primary-400 bg-primary-400'
                        : 'border-white/40'
                    }`}>
                      {selectedPlatforms.includes(account.platform) && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-black border border-primary-400/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Resumen:</h2>
            <div className="space-y-2 text-white/80 mb-6">
              <p>✅ Video generado</p>
              <p>✅ Copy viral creado</p>
              <p>✅ {selectedPlatforms.length} plataforma(s) seleccionada(s)</p>
            </div>
            <button
              onClick={handlePublish}
              disabled={publishing || selectedPlatforms.length === 0}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {publishing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Publicar en {selectedPlatforms.length} Red(es) Social(es) 🚀
                </>
              )}
            </button>
          </div>

          {publishResults.length > 0 && (
            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Resultados de Publicación:</h2>
              <div className="space-y-3">
                {publishResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.success ? 'border-green-400/40 bg-green-500/10' : 'border-red-400/40 bg-red-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold capitalize ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                        {result.platform}
                      </p>
                      {result.success ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <span className="text-red-400">✕</span>
                      )}
                    </div>
                    {result.postUrl && (
                      <a href={result.postUrl} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline text-sm mt-2 block">
                        Ver publicación →
                      </a>
                    )}
                    {result.error && <p className="text-red-300 text-sm mt-1">{result.error}</p>}
                  </div>
                ))}
              </div>
              <button
                onClick={resetFlow}
                className="w-full mt-6 bg-primary-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
              >
                Crear Otro Video
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

