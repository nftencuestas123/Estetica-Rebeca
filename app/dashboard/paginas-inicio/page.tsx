'use client'

import { useState, useEffect } from 'react'
import { 
  Eye, 
  Check, 
  Sparkles, 
  Palette, 
  Zap, 
  Globe,
  ArrowRight,
  Info,
  Crown,
  Star,
  Heart,
  Gem,
  Leaf,
  Clock,
  Waves,
  Sun,
  Moon,
  Flower2,
  Sparkle
} from 'lucide-react'

// Plantillas con nombres elegantes y descripciones mejoradas
const LANDING_PAGES = [
  {
    id: 'nude-elegance',
    name: 'Elegancia Desnuda',
    elegantName: 'Nude Elegance',
    description: 'Minimalismo sofisticado que transmite profesionalismo y clase atemporal',
    style: 'Minimalista | Elegante | Sofisticado',
    preview: '✨ Perfecto para transmitir profesionalismo y clase',
    icon: Crown,
    color: 'from-amber-50 to-rose-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    bgGradient: 'from-amber-500 to-rose-500',
  },
  {
    id: 'soft-beauty',
    name: 'Belleza Suave',
    elegantName: 'Soft Beauty',
    description: 'Delicadeza y ternura con tonos pastel que crean un ambiente cálido y acogedor',
    style: 'Suave | Delicado | Femenino',
    preview: '🌸 Ideal para un ambiente cálido y acogedor',
    icon: Heart,
    color: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-300',
    textColor: 'text-pink-700',
    bgGradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'modern-glow',
    name: 'Resplandor Moderno',
    elegantName: 'Modern Glow',
    description: 'Diseño contemporáneo y luminoso que destaca tus servicios con estilo',
    style: 'Moderno | Luminoso | Contemporáneo',
    preview: '💫 Destaca tus servicios con estilo contemporáneo',
    icon: Sun,
    color: 'from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-300',
    textColor: 'text-yellow-700',
    bgGradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'chic-minimal',
    name: 'Minimalismo Chic',
    elegantName: 'Chic Minimal',
    description: 'Elegancia minimalista con toques de oro rosa y detalles premium',
    style: 'Chic | Minimalista | Premium',
    preview: '👑 Elegancia minimalista con detalles premium',
    icon: Gem,
    color: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-700',
    bgGradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'pure-essence',
    name: 'Esencia Pura',
    elegantName: 'Pure Essence',
    description: 'Pureza y esencia con diseño limpio que transmite confianza y profesionalismo',
    style: 'Puro | Profesional | Limpio',
    preview: '🤍 Transmite confianza y profesionalismo',
    icon: Sparkle,
    color: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-700',
    bgGradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'rose-dream',
    name: 'Sueño de Rosas',
    elegantName: 'Rose Dream',
    description: 'Romanticismo y magia con tonos rosa nude que crean experiencias memorables',
    style: 'Romántico | Soñador | Mágico',
    preview: '🌹 Crea una experiencia mágica y memorable',
    icon: Flower2,
    color: 'from-rose-50 to-pink-50',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-700',
    bgGradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 'luxury-touch',
    name: 'Toque de Lujo',
    elegantName: 'Luxury Touch',
    description: 'Exclusividad y lujo con detalles premium para clientes selectos',
    style: 'Lujoso | Premium | Exclusivo',
    preview: '💎 Para clientes que buscan exclusividad',
    icon: Star,
    color: 'from-amber-50 to-yellow-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    bgGradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'natural-beauty',
    name: 'Belleza Natural',
    elegantName: 'Natural Beauty',
    description: 'Conexión con la naturaleza y autenticidad con elementos orgánicos',
    style: 'Natural | Orgánico | Auténtico',
    preview: '🍃 Conecta con la naturaleza y lo auténtico',
    icon: Leaf,
    color: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-300',
    textColor: 'text-green-700',
    bgGradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'timeless-grace',
    name: 'Gracia Atemporal',
    elegantName: 'Timeless Grace',
    description: 'Elegancia clásica moderna que nunca pasa de moda',
    style: 'Atemporal | Clásico | Moderno',
    preview: '⏳ Un diseño que nunca pasa de moda',
    icon: Clock,
    color: 'from-slate-50 to-gray-50',
    borderColor: 'border-slate-300',
    textColor: 'text-slate-700',
    bgGradient: 'from-slate-500 to-gray-500',
  },
  {
    id: 'serene-spa',
    name: 'Spa Sereno',
    elegantName: 'Serene Spa',
    description: 'Serenidad y calma estilo spa de lujo que transmite paz instantánea',
    style: 'Sereno | Spa | Relajante',
    preview: '🧘‍♀️ Transmite paz y relajación instantánea',
    icon: Waves,
    color: 'from-teal-50 to-cyan-50',
    borderColor: 'border-teal-300',
    textColor: 'text-teal-700',
    bgGradient: 'from-teal-500 to-cyan-500',
  },
]

export default function PaginasInicioPage() {
  const [activePage, setActivePage] = useState<string>('nude-elegance')
  const [selectedPage, setSelectedPage] = useState<string>('nude-elegance')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)

  // Cargar página activa actual
  useEffect(() => {
    loadActivePage()
  }, [])

  const loadActivePage = async () => {
    try {
      const response = await fetch('/api/client/active-landing')
      if (response.ok) {
        const data = await response.json()
        const pageId = data.activePage || 'nude-elegance'
        setActivePage(pageId)
        setSelectedPage(pageId)
      }
    } catch (error) {
      console.error('Error loading active page:', error)
    }
  }

  const handleActivatePage = async (pageId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/client/active-landing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId }),
      })

      if (response.ok) {
        setActivePage(pageId)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error activating page:', error)
      alert('Error al activar la página')
    } finally {
      setLoading(false)
    }
  }

  const selectedPageData = LANDING_PAGES.find(p => p.id === selectedPage) || LANDING_PAGES[0]
  const IconComponent = selectedPageData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-pink-50/30">
      {/* Header fijo */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-rose-200/50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-rose-500" />
                Diseñador de Páginas de Inicio
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Elige y personaliza el diseño perfecto para tu sitio web
              </p>
            </div>
            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all flex items-center gap-2 shadow-md"
            >
              <Info className="w-4 h-4" />
              {showTutorial ? 'Ocultar' : 'Mostrar'} Guía
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar elegante */}
        <aside className="w-80 bg-white/90 backdrop-blur-lg border-r border-rose-200/50 h-[calc(100vh-88px)] overflow-y-auto sticky top-[88px]">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Palette className="w-5 h-5 text-rose-500" />
                Plantillas Disponibles
              </h2>
              <p className="text-xs text-slate-500">
                {LANDING_PAGES.length} diseños únicos
              </p>
            </div>

            <div className="space-y-2">
              {LANDING_PAGES.map((page) => {
                const PageIcon = page.icon
                const isActive = activePage === page.id
                const isSelected = selectedPage === page.id

                return (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`
                      w-full text-left p-3 rounded-xl transition-all duration-200
                      ${isSelected 
                        ? `bg-gradient-to-r ${page.bgGradient} text-white shadow-lg transform scale-[1.02]` 
                        : isActive
                        ? 'bg-green-50 border-2 border-green-300 text-green-800'
                        : 'bg-slate-50 hover:bg-rose-50 border-2 border-transparent hover:border-rose-200 text-slate-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        p-2 rounded-lg
                        ${isSelected 
                          ? 'bg-white/20' 
                          : isActive
                          ? 'bg-green-100'
                          : 'bg-white'
                        }
                      `}>
                        <PageIcon className={`w-5 h-5 ${isSelected ? 'text-white' : isActive ? 'text-green-600' : page.textColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-semibold text-sm truncate ${isSelected ? 'text-white' : ''}`}>
                            {page.elegantName}
                          </p>
                          {isActive && (
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className={`text-xs truncate ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
                          {page.name}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          {/* Mensaje de éxito */}
          {showSuccess && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 flex items-center gap-4 shadow-lg animate-in slide-in-from-top">
              <div className="p-2 bg-green-500 rounded-full">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-green-800 font-bold text-lg">
                  ¡Página activada exitosamente! 🎉
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Tu nueva página ya está visible en <span className="font-bold">rbestetica.vip</span>
                </p>
              </div>
            </div>
          )}

          {/* Tutorial explicativo */}
          {showTutorial && (
            <div className="mb-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    ¿Cómo funciona la activación?
                  </h3>
                  <div className="space-y-3 text-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <p className="text-sm">
                        <span className="font-semibold">Selecciona una plantilla</span> del menú lateral para ver sus detalles
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <p className="text-sm">
                        <span className="font-semibold">Haz clic en "Vista Previa"</span> para ver cómo se verá tu página completa
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <p className="text-sm">
                        <span className="font-semibold">Cuando estés listo, haz clic en "Activar"</span>
                      </p>
                    </div>
                    <div className="mt-4 p-4 bg-white/60 rounded-xl border-2 border-blue-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <p className="font-bold text-blue-900">
                          ¡Importante!
                        </p>
                      </div>
                      <p className="text-sm text-blue-800">
                        Al activar una plantilla, aparecerá automáticamente en tu dominio principal:{' '}
                        <span className="font-bold bg-blue-100 px-2 py-1 rounded">rbestetica.vip</span>
                      </p>
                      <p className="text-xs text-blue-700 mt-2 italic">
                        Todos los visitantes verán esta página cuando entren a tu sitio web
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vista de la plantilla seleccionada */}
          <div className={`
            bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300
            ${selectedPageData.borderColor}
          `}>
            {/* Header de la plantilla */}
            <div className={`bg-gradient-to-r ${selectedPageData.bgGradient} p-8 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {selectedPageData.elegantName}
                    </h2>
                    <p className="text-white/90 text-lg">
                      {selectedPageData.name}
                    </p>
                  </div>
                </div>
                {activePage === selectedPage && (
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="font-semibold">Activa</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contenido de la plantilla */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Descripción */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-500" />
                    Descripción
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {selectedPageData.description}
                  </p>
                  <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${selectedPageData.color} border ${selectedPageData.borderColor}`}>
                    <p className={`text-sm font-semibold ${selectedPageData.textColor}`}>
                      {selectedPageData.style}
                    </p>
                  </div>
                </div>

                {/* Características */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-rose-500" />
                    Características
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Diseño 100% responsive',
                      'Sección de servicios completa',
                      'Testimonios en video',
                      'Social proofs integrados',
                      'Presentación profesional',
                      'Copywriting optimizado',
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`p-1.5 bg-gradient-to-r ${selectedPageData.bgGradient} rounded-lg`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open(`/preview/${selectedPageData.id}`, '_blank')}
                    className="flex-1 group bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl transition-all flex items-center justify-center gap-3 font-semibold shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Ver Vista Previa Completa
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => handleActivatePage(selectedPageData.id)}
                    disabled={loading || activePage === selectedPage}
                    className={`
                      flex-1 py-4 rounded-xl transition-all flex items-center justify-center gap-3 font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                      ${activePage === selectedPage
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : `bg-gradient-to-r ${selectedPageData.bgGradient} text-white hover:scale-[1.02]`
                      }
                    `}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Activando...
                      </>
                    ) : activePage === selectedPage ? (
                      <>
                        <Check className="w-5 h-5" />
                        Página Activa
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Activar en rbestetica.vip
                      </>
                    )}
                  </button>
                </div>

                {activePage === selectedPage && (
                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <p className="text-green-800 text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Esta página está activa y visible en{' '}
                      <span className="font-bold">rbestetica.vip</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
