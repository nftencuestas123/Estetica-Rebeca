'use client'

import { useState } from 'react'
import { Video, Upload, Wand2, Download, Share2, Image as ImageIcon, Mic, FileText, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface VideoProject {
  id: string
  name: string
  status: 'draft' | 'processing' | 'completed' | 'error'
  thumbnail?: string
  duration?: number
  createdAt: Date
}

export default function VideosIAPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create')
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [script, setScript] = useState('')
  const [voiceType, setVoiceType] = useState<'text-to-speech' | 'clone' | 'upload'>('text-to-speech')
  const [selectedVoice, setSelectedVoice] = useState('es-ES-Female-1')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [projects, setProjects] = useState<VideoProject[]>([
    {
      id: '1',
      name: 'Video Promocional Botox',
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=200&fit=crop',
      duration: 45,
      createdAt: new Date('2025-01-15')
    },
    {
      id: '2',
      name: 'Tutorial Facial',
      status: 'processing',
      duration: 120,
      createdAt: new Date('2025-01-15')
    },
  ])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!avatarImage && !avatarPreview) {
      alert('Por favor sube una imagen para el avatar')
      return
    }
    if (!script.trim()) {
      alert('Por favor escribe un guión')
      return
    }

    setIsGenerating(true)
    
    // TODO: Integrar con TopView API
    // Simulación de generación
    setTimeout(() => {
      const newProject: VideoProject = {
        id: Date.now().toString(),
        name: `Video ${projects.length + 1}`,
        status: 'processing',
        createdAt: new Date()
      }
      setProjects([newProject, ...projects])
      setIsGenerating(false)
      alert('¡Video en proceso! Lo verás en el historial cuando esté listo.')
    }, 2000)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Video className="w-8 h-8 text-primary-400" />
              Generador de Videos IA
            </h1>
            <p className="text-white/60">
              Powered by{' '}
              <a 
                href="https://www.topview.ai/es/make/avatar4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 font-semibold"
              >
                TopView Avatar 4
              </a>
            </p>
          </div>
          
          {/* Help Button */}
          <button
            onClick={() => {
              const helpModal = document.getElementById('help-modal')
              if (helpModal) {
                helpModal.classList.toggle('hidden')
              }
            }}
            className="bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-400/40 text-primary-400 px-6 py-3 rounded-xl font-semibold hover:from-primary-500/30 hover:to-primary-600/20 transition-all flex items-center gap-2"
          >
            <span className="text-xl">❓</span>
            ¿Cómo usar?
          </button>
        </div>
      </div>

      {/* Help Modal */}
      <div
        id="help-modal"
        className="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.classList.add('hidden')
          }
        }}
      >
        <div className="bg-gradient-to-b from-neutral-950 via-black to-neutral-950 border-2 border-primary-400/30 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8">
          {/* Close Button */}
          <button
            onClick={() => {
              const helpModal = document.getElementById('help-modal')
              if (helpModal) {
                helpModal.classList.add('hidden')
              }
            }}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl"
          >
            ×
          </button>

          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary-400" />
            Guía Rápida - Generador de Videos IA
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-black/50 border border-primary-400/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary-400 mb-3">
                1️⃣ Configuración Inicial (Solo la primera vez)
              </h3>
              <div className="space-y-2 text-white/80">
                <p>✅ <strong>Crear cuenta</strong> en <a href="https://www.topview.ai/es/make/avatar4" target="_blank" className="text-primary-400 underline">TopView.ai</a></p>
                <p>✅ <strong>Obtener API Key</strong> (contactar: <a href="mailto:official@topview.ai" className="text-primary-400">official@topview.ai</a>)</p>
                <p>✅ <strong>Configurar</strong> en archivo <code className="bg-black px-2 py-1 rounded text-primary-300">.env.local</code></p>
                <p className="text-white/60 text-sm mt-2">
                  📖 Lee: <code>TOPVIEW_GUIA_COMPLETA_PARA_PRINCIPIANTES.md</code> para detalles
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-black/50 border border-primary-400/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary-400 mb-3">
                2️⃣ Crear tu Video
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-semibold text-white mb-2">📸 Imagen del Avatar</p>
                  <p className="text-sm text-white/70">Sube una foto clara, frontal, bien iluminada. Puede ser tuya, de un producto, o un personaje.</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">✍️ Guión del Video</p>
                  <p className="text-sm text-white/70">Escribe lo que dirá el avatar. Sé natural. 100-300 palabras = 30-90 segundos.</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">🎤 Configurar Voz</p>
                  <p className="text-sm text-white/70">Elige una voz de IA en español, o sube tu propio audio.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-black/50 border border-primary-400/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary-400 mb-3">
                3️⃣ Generar y Descargar
              </h3>
              <div className="space-y-2 text-white/80">
                <p>✅ Click en <strong>"Generar Video con IA"</strong></p>
                <p>✅ Espera 1-3 minutos (procesando)</p>
                <p>✅ Ve a tab <strong>"Mis Videos"</strong></p>
                <p>✅ Descarga tu video (MP4 en 1080p)</p>
                <p>✅ Comparte en redes sociales 📱</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/5 border border-primary-400/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                💰 Precios TopView
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-white mb-1">Gratuito</p>
                  <p className="text-white/70">$0 - 2-5 videos prueba</p>
                </div>
                <div>
                  <p className="font-semibold text-primary-400 mb-1">Pro (Recomendado)</p>
                  <p className="text-white/70">$29-49/mes - 50-100 videos</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Business</p>
                  <p className="text-white/70">$99-199/mes - 200-500 videos</p>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-black/50 border border-primary-400/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                ✨ ¿Qué puede hacer el Avatar?
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-white/80">Hablar naturalmente</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-white/80">Sostener productos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-white/80">Gestos con manos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-white/80">Movimientos de cabeza</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-white/80">Expresiones faciales</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-white/80">Videos hasta 2 minutos</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center pt-4 border-t border-primary-400/20">
              <p className="text-white/60 text-sm mb-2">
                📚 Documentación completa en archivos .md del proyecto
              </p>
              <p className="text-white/60 text-sm">
                📧 Dudas sobre TopView: <a href="mailto:official@topview.ai" className="text-primary-400">official@topview.ai</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-primary-400/20">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 font-semibold transition-all relative ${
            activeTab === 'create'
              ? 'text-primary-400 border-b-2 border-primary-400'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Wand2 className="w-5 h-5 inline-block mr-2" />
          Crear Video
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 font-semibold transition-all relative ${
            activeTab === 'history'
              ? 'text-primary-400 border-b-2 border-primary-400'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <FileText className="w-5 h-5 inline-block mr-2" />
          Mis Videos ({projects.length})
        </button>
      </div>

      {/* Create Tab */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Avatar Image Upload */}
            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary-400" />
                1. Imagen del Avatar
              </h3>
              
              {avatarPreview ? (
                <div className="relative">
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <button
                    onClick={() => {
                      setAvatarImage(null)
                      setAvatarPreview('')
                    }}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Cambiar
                  </button>
                </div>
              ) : (
                <label className="block w-full h-64 border-2 border-dashed border-primary-400/30 rounded-lg hover:border-primary-400/50 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center h-full">
                    <Upload className="w-12 h-12 text-primary-400 mb-4" />
                    <p className="text-white font-medium mb-2">Sube una foto</p>
                    <p className="text-white/60 text-sm">PNG, JPG hasta 10MB</p>
                  </div>
                </label>
              )}

              <div className="mt-4">
                <button className="w-full bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-400/40 text-primary-400 px-4 py-3 rounded-lg font-semibold hover:from-primary-500/30 hover:to-primary-600/20 transition-all">
                  <Sparkles className="w-5 h-5 inline-block mr-2" />
                  Generar Avatar con IA
                </button>
                <p className="text-xs text-white/40 mt-2 text-center">
                  O deja que la IA cree uno por ti
                </p>
              </div>
            </div>

            {/* Script Input */}
            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-400" />
                2. Guión del Video
              </h3>
              
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Escribe el texto que dirá tu avatar...

Ejemplo:
¡Hola! Soy Rebeca Barreto y te doy la bienvenida a nuestro centro de estética y belleza. Hoy quiero hablarte sobre nuestro tratamiento estrella de Botox..."
                className="w-full h-48 bg-black border border-primary-400/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-400/50 resize-none"
              />
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-white/60">
                  {script.length} caracteres | ~{Math.ceil(script.length / 150)} segundos
                </p>
                <button className="text-primary-400 hover:text-primary-300 text-sm font-semibold">
                  Mejorar con IA ✨
                </button>
              </div>
            </div>

            {/* Voice Configuration */}
            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Mic className="w-5 h-5 text-primary-400" />
                3. Configuración de Voz
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setVoiceType('text-to-speech')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      voiceType === 'text-to-speech'
                        ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-400/40 text-primary-400'
                        : 'bg-black border border-primary-400/20 text-white/60 hover:text-white'
                    }`}
                  >
                    IA
                  </button>
                  <button
                    onClick={() => setVoiceType('clone')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      voiceType === 'clone'
                        ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-400/40 text-primary-400'
                        : 'bg-black border border-primary-400/20 text-white/60 hover:text-white'
                    }`}
                  >
                    Clonar
                  </button>
                  <button
                    onClick={() => setVoiceType('upload')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      voiceType === 'upload'
                        ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-400/40 text-primary-400'
                        : 'bg-black border border-primary-400/20 text-white/60 hover:text-white'
                    }`}
                  >
                    Subir
                  </button>
                </div>

                {voiceType === 'text-to-speech' && (
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full bg-black border border-primary-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-400/50"
                  >
                    <option value="es-ES-Female-1">Español - Mujer 1 (Natural)</option>
                    <option value="es-ES-Female-2">Español - Mujer 2 (Energética)</option>
                    <option value="es-ES-Male-1">Español - Hombre 1 (Profesional)</option>
                    <option value="es-AR-Female-1">Español Argentina - Mujer</option>
                    <option value="es-MX-Female-1">Español México - Mujer</option>
                  </select>
                )}

                {voiceType === 'clone' && (
                  <div className="text-center py-8 border border-primary-400/20 rounded-lg">
                    <Mic className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Clonación de Voz</p>
                    <p className="text-sm text-white/60 mb-4">Próximamente disponible</p>
                  </div>
                )}

                {voiceType === 'upload' && (
                  <label className="block w-full border border-primary-400/30 rounded-lg p-6 hover:border-primary-400/50 transition-all cursor-pointer text-center">
                    <input type="file" accept="audio/*" className="hidden" />
                    <Upload className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <p className="text-white text-sm">Sube tu archivo de audio</p>
                    <p className="text-white/60 text-xs mt-1">MP3, WAV hasta 10MB</p>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Generate */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-black border border-primary-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Vista Previa</h3>
              
              <div className="aspect-video bg-gradient-to-br from-neutral-900 to-black rounded-lg border border-primary-400/20 flex items-center justify-center mb-4">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg opacity-70"
                  />
                ) : (
                  <div className="text-center">
                    <Video className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Sube una imagen para ver la vista previa</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Duración estimada:</span>
                  <span className="text-white font-semibold">
                    ~{Math.ceil(script.length / 150)} seg
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Resolución:</span>
                  <span className="text-white font-semibold">1080p</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Formato:</span>
                  <span className="text-white font-semibold">MP4</span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !avatarImage || !script.trim()}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white inline-block mr-3"></div>
                  Generando Video...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6 inline-block mr-3" />
                  Generar Video con IA
                </>
              )}
            </button>

            {/* Info */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/5 border border-primary-400/30 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                TopView Avatar 4
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5">✓</span>
                  <span>Movimientos labiales ultra-realistas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5">✓</span>
                  <span>Sincronización perfecta audio-visual</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5">✓</span>
                  <span>Control de movimientos por IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5">✓</span>
                  <span>Videos de hasta 2 minutos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-black border border-primary-400/30 rounded-xl overflow-hidden hover:border-primary-400/50 transition-all group"
            >
              {project.thumbnail ? (
                <div className="aspect-video bg-gradient-to-br from-neutral-900 to-black relative">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  {project.status === 'completed' && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4">
                        <Video className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center">
                  {project.status === 'processing' ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
                      <p className="text-white/60 text-sm">Generando...</p>
                    </div>
                  ) : (
                    <Video className="w-12 h-12 text-white/20" />
                  )}
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold mb-1">{project.name}</h3>
                    <p className="text-xs text-white/60">
                      {project.createdAt.toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    project.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                    project.status === 'processing' ? 'bg-yellow-400/10 text-yellow-400' :
                    project.status === 'error' ? 'bg-red-400/10 text-red-400' :
                    'bg-primary-400/10 text-primary-400'
                  }`}>
                    {project.status === 'completed' ? 'Completado' :
                     project.status === 'processing' ? 'Procesando' :
                     project.status === 'error' ? 'Error' : 'Borrador'}
                  </span>
                </div>

                {project.duration && (
                  <p className="text-sm text-white/60 mb-3">
                    Duración: {project.duration}s
                  </p>
                )}

                {project.status === 'completed' && (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary-400/10 hover:bg-primary-400/20 text-primary-400 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                      <Download className="w-4 h-4 inline-block mr-2" />
                      Descargar
                    </button>
                    <button className="flex-1 bg-primary-400/10 hover:bg-primary-400/20 text-primary-400 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                      <Share2 className="w-4 h-4 inline-block mr-2" />
                      Compartir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

