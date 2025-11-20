'use client'

import { useState, useEffect, useCallback } from 'react'
import { Video, Upload, Sparkles, Check, Loader2, DollarSign, Instagram, Facebook, Send, ArrowRight, X } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { getUserBalance, calculateVideoCost, deductCredits } from '@/services/credits'
import { generateVideo, getVideoStatus } from '@/services/topview'
import { generateViralCopy, generateCopyVariations } from '@/services/ai-copywriter'
import { publishToMultiplePlatforms, getSocialAccounts } from '@/services/social-media'
import { logger } from '@/lib/logger'

export default function VideosIAPage() {
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
    try {
      // Timeout de 3 segundos para no bloquear UI
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)
      
      const currentBalance = await getUserBalance(user.id)
      setBalance(currentBalance)
      
      const accounts = await getSocialAccounts(user.id)
      setConnectedAccounts(accounts)
      
      clearTimeout(timeoutId)
    } catch (error) {
      console.error('Error loading user data:', error)
      setBalance(0)
      setConnectedAccounts([])
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user, loadUserData])

  useEffect(() => {
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
      const deductResult = await deductCredits(user.id, videoCost, `Video de ${duration}min generado`)
      if (!deductResult.success) {
        throw new Error(deductResult.error)
      }

      const videoData = await generateVideo(imageFile, videoIdea, 'es-ES-Standard-A')
      
      let videoReady = false
      let videoUrl = null
      let attempts = 0
      const maxAttempts = 60

      while (!videoReady && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000))
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
      setStep(2)
    } catch (error: any) {
      logger.error('Error generando video', { error: error.message, userId: user?.id })
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
      const variations = await generateCopyVariations(videoIdea, copyPlatform, 3)
      const copyTexts = variations.map(v => v.text)
      setCopyVariations(copyTexts)
      setGeneratedCopy(copyTexts[0])
      setSelectedCopyIndex(0)
    } catch (error: any) {
      logger.error('Error generando copy', { error: error.message, platform: copyPlatform })
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
      const results = await publishToMultiplePlatforms({
        userId: user.id,
        videoUrl: generatedVideoUrl,
        caption: generatedCopy,
        platforms: selectedPlatforms,
      })

      setPublishResults(results)
      
      const successCount = results.filter(r => r.success).length
      const failCount = results.filter(r => !r.success).length

      alert(`✅ Publicado exitosamente en ${successCount} plataforma(s).\n${failCount > 0 ? `❌ ${failCount} falló(s).` : ''}`)
    } catch (error: any) {
      logger.error('Error publicando', { error: error.message, userId: user?.id, platforms: selectedPlatforms })
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

  return (
    <div className="min-h-screen bg-white">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Video className="w-8 h-8 text-rose-500" />
          Generador de Videos IA + Publicación Automatizada
        </h1>
        <p className="text-slate-600">Crea videos profesionales y publícalos en todas tus redes en minutos</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6 mb-8">
        <div>
          <p className="text-slate-600 text-sm font-semibold">Tu saldo:</p>
          <p className="text-3xl font-bold text-slate-900">${balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center gap-2 ${step === 1 ? 'text-rose-500' : step > 1 ? 'text-green-500' : 'text-slate-400'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border-2 ${step === 1 ? 'border-rose-500 bg-rose-50' : step > 1 ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-white'}`}>
            {step > 1 ? <Check className="w-6 h-6" /> : '1'}
          </div>
          <span className="font-semibold hidden sm:block">Generar Video</span>
        </div>
        <div className="w-16 h-1 bg-slate-200 rounded"></div>
        <div className={`flex items-center gap-2 ${step === 2 ? 'text-rose-500' : step > 2 ? 'text-green-500' : 'text-slate-400'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border-2 ${step === 2 ? 'border-rose-500 bg-rose-50' : step > 2 ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-white'}`}>
            {step > 2 ? <Check className="w-6 h-6" /> : '2'}
          </div>
          <span className="font-semibold hidden sm:block">Generar Copy</span>
        </div>
        <div className="w-16 h-1 bg-slate-200 rounded"></div>
        <div className={`flex items-center gap-2 ${step === 3 ? 'text-rose-500' : 'text-slate-400'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border-2 ${step === 3 ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}>
            3
          </div>
          <span className="font-semibold hidden sm:block">Publicar</span>
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Imagen del Avatar</h2>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center relative hover:border-rose-300 transition-colors">
                {imagePreview ? (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={imagePreview}
                      alt="Avatar"
                      fill
                      className="object-contain rounded-lg shadow-lg"
                    />
                    <button onClick={() => { setImageFile(null); setImagePreview(null); }} className="mt-4 text-red-600 hover:text-red-700 text-sm font-semibold">
                      🗑️ Eliminar
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-700 font-semibold mb-2">Arrastra tu imagen aquí</p>
                    <p className="text-slate-500 text-sm mb-4">o haz click para seleccionar</p>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-md">
                      Seleccionar Imagen
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Idea del Video</h2>
              <textarea
                value={videoIdea}
                onChange={(e) => setVideoIdea(e.target.value)}
                placeholder="Ejemplo: Promoción de tratamiento facial rejuvenecedor con descuento 50%"
                className="w-full h-32 bg-slate-50 border-2 border-slate-300 rounded-lg p-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500"
              ></textarea>
              <p className="text-slate-600 text-sm mt-2">{videoIdea.length} caracteres</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Duración del Video</h2>
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
                        ? 'border-rose-500 bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50'
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

          <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Vista Previa</h2>
            <div className="relative w-full h-64 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden mb-6 border-2 border-slate-200">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              ) : (
                <p className="text-slate-500">Sube una imagen para previsualizar</p>
              )}
            </div>
            <div className="space-y-3 text-slate-700 text-sm mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p><strong>Duración:</strong> {duration < 1 ? `${duration * 60}seg` : `${duration}min`}</p>
              <p><strong>Costo:</strong> ${videoCost.toFixed(2)}</p>
              <p><strong>Saldo actual:</strong> ${balance.toFixed(2)}</p>
              <p><strong>Saldo después:</strong> ${(balance - videoCost).toFixed(2)}</p>
            </div>
            <button
              onClick={handleGenerateVideo}
              disabled={generatingVideo || !imageFile || !videoIdea.trim() || balance < videoCost}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
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
              <p className="text-red-600 text-sm mt-3 text-center font-semibold">⚠️ Saldo insuficiente. Recarga créditos.</p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Check className="w-6 h-6 text-green-500" />
              Video Generado Exitosamente
            </h2>
            <video src={generatedVideoUrl || ''} controls className="w-full max-w-2xl mx-auto rounded-lg shadow-lg border-2 border-slate-200"></video>
          </div>

          <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-rose-500" />
              Generar Copy Viral con IA
            </h2>
            <div className="mb-4">
              <label className="block text-slate-700 font-semibold mb-3">Plataforma:</label>
              <div className="flex gap-3 flex-wrap">
                {[
                  { value: 'multi', label: 'Multi-Plataforma' },
                  { value: 'instagram', label: 'Instagram' },
                  { value: 'facebook', label: 'Facebook' },
                  { value: 'tiktok', label: 'TikTok' },
                ].map((platform) => (
                  <button
                    key={platform.value}
                    onClick={() => setCopyPlatform(platform.value as any)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all border-2 ${
                      copyPlatform === platform.value
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500 shadow-lg'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-blue-300 hover:bg-blue-50'
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg"
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
            <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Variaciones de Copy (Elige una):</h2>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {copyVariations.map((copy, index) => (
                  <button
                    key={index}
                    onClick={() => selectCopyVariation(index)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedCopyIndex === index
                        ? 'border-rose-500 bg-rose-50 shadow-md'
                        : 'border-slate-300 bg-white hover:border-rose-300 hover:bg-rose-50'
                    }`}
                  >
                    <p className="text-slate-900 font-semibold mb-2">Variación {index + 1}</p>
                    <p className="text-slate-700 text-sm line-clamp-3">{copy}</p>
                  </button>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Copy Seleccionado (Editable):</h3>
              <textarea
                value={generatedCopy}
                onChange={(e) => setGeneratedCopy(e.target.value)}
                className="w-full h-48 bg-slate-50 border-2 border-slate-300 rounded-lg p-4 text-slate-900 focus:outline-none focus:border-rose-500"
              ></textarea>
              <button
                onClick={() => setStep(3)}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ArrowRight className="w-5 h-5" />
                Continuar a Publicar
              </button>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Selecciona dónde publicar:</h2>
            {connectedAccounts.length === 0 ? (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 text-center">
                <p className="text-yellow-700 font-semibold mb-2">⚠️ No tienes cuentas conectadas</p>
                <p className="text-slate-600 mb-4">Ve a Configuración para conectar tus redes sociales</p>
                <a href="/admin/configuracion/redes-sociales" className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all inline-block shadow-lg">
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
                        ? 'border-rose-500 bg-rose-50 shadow-md'
                        : 'border-slate-300 bg-white hover:border-rose-300 hover:bg-rose-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-2xl shadow-md">
                      {account.platform === 'instagram' && '📷'}
                      {account.platform === 'facebook' && '👤'}
                      {account.platform === 'tiktok' && '🎵'}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-slate-900 font-semibold capitalize">{account.platform}</p>
                      <p className="text-slate-600 text-sm">@{account.account_name}</p>
                    </div>
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      selectedPlatforms.includes(account.platform)
                        ? 'border-rose-500 bg-rose-500'
                        : 'border-slate-300'
                    }`}>
                      {selectedPlatforms.includes(account.platform) && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Resumen:</h2>
            <div className="space-y-2 text-slate-700 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Video generado</p>
              <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Copy viral creado</p>
              <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> {selectedPlatforms.length} plataforma(s) seleccionada(s)</p>
            </div>
            <button
              onClick={handlePublish}
              disabled={publishing || selectedPlatforms.length === 0}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              {publishing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Publicar en {selectedPlatforms.length} Red(es) Social(es)
                </>
              )}
            </button>
          </div>

          {publishResults.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Resultados de Publicación:</h2>
              <div className="space-y-3">
                {publishResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      result.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold capitalize ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                        {result.platform}
                      </p>
                      {result.success ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {result.postUrl && (
                      <a href={result.postUrl} target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline text-sm mt-2 block font-semibold">
                        Ver publicación →
                      </a>
                    )}
                    {result.error && <p className="text-red-600 text-sm mt-1">{result.error}</p>}
                  </div>
                ))}
              </div>
              <button
                onClick={resetFlow}
                className="w-full mt-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Crear Otro Video
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
