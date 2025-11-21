'use client'

import { useState, Suspense, lazy } from 'react'
import dynamic from 'next/dynamic'
import { BookOpen, Settings, Zap, BarChart3, HelpCircle, Mic, ChevronRight, ChevronDown, Lightbulb, Users, Loader2 } from 'lucide-react'

// Lazy load componentes pesados - Se cargan SOLO cuando se necesitan
const VoiceAssistantSetupGuide = dynamic(() => import('./VoiceAssistantSetupGuide'), { ssr: false })
const AdvancedSettings = dynamic(() => import('./VoiceAssistantAdvancedSettings'), { ssr: false })
const FeaturesSection = dynamic(() => import('./VoiceAssistantFeatures'), { ssr: false })
const StatisticsSection = dynamic(() => import('./VoiceAssistantStats'), { ssr: false })
const HelpSection = dynamic(() => import('./VoiceAssistantHelp'), { ssr: false })
const ElevenLabsGuide = dynamic(() => import('./ElevenLabsGuide'), { ssr: false })
const ClientsManagement = dynamic(() => import('./ClientsManagement'), { ssr: false })
const ElevenLabsExpertChat = dynamic(() => import('./ElevenLabsExpertChat'), { ssr: false })
const ElevenLabsExpertGuide = dynamic(() => import('./ElevenLabsExpertGuide'), { ssr: false })

// Loading spinner reutilizable
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
  </div>
)

type NavItem = 'setup' | 'settings' | 'features' | 'stats' | 'help' | 'elevenlabs' | 'clients' | 'credits' | 'history' | 'integrations' | 'expert-chat' | 'expert-guide'
type MenuGroup = 'guide' | 'monitoring' | 'support' | 'elevenlabs' | 'management'

/**
 * Componente: VoiceAssistantLayout
 * Responsabilidad: Layout con sidebar izquierdo agrupado por categorías
 * Estructura: 3 grupos principales para evitar infinite scroll
 */
export default function VoiceAssistantLayout() {
  const [activeNav, setActiveNav] = useState<NavItem | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<MenuGroup[]>([])

  const toggleGroup = (group: MenuGroup) => {
    // Si el grupo está abierto, ciérralo (y resetea activeNav)
    // Si está cerrado, ábrelo (y cierra los demás)
    setExpandedGroups(prev => {
      const willBeClosed = prev.includes(group)
      const newGroups = willBeClosed ? [] : [group]
      
      // Si se va a cerrar el grupo, resetea activeNav a null (vuelve a la presentación)
      if (willBeClosed) {
        setActiveNav(null)
      }
      
      return newGroups
    })
  }

  const menuGroups = [
    {
      id: 'guide' as MenuGroup,
      label: '📋 Guía y Setup',
      description: 'Configuración inicial',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'black',
      bgColor: 'bg-slate-800',
      textColor: 'text-white',
      borderColor: 'border-white',
      items: [
        {
          id: 'setup' as NavItem,
          label: 'Guía de Configuración',
          icon: <BookOpen className="w-4 h-4" />,
          description: '6 pasos para empezar',
        },
        {
          id: 'settings' as NavItem,
          label: 'Configuración Avanzada',
          icon: <Settings className="w-4 h-4" />,
          description: 'Personaliza el agente',
        },
      ],
    },
    {
      id: 'monitoring' as MenuGroup,
      label: '📊 Monitoreo',
      description: 'Estadísticas y features',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'white',
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-black',
      items: [
        {
          id: 'stats' as NavItem,
          label: 'Estadísticas',
          icon: <BarChart3 className="w-4 h-4" />,
          description: 'Uso y rendimiento',
        },
        {
          id: 'features' as NavItem,
          label: 'Funcionalidades',
          icon: <Zap className="w-4 h-4" />,
          description: 'Capacidades disponibles',
        },
      ],
    },
    {
      id: 'support' as MenuGroup,
      label: '❓ Soporte',
      description: 'Ayuda y preguntas',
      icon: <HelpCircle className="w-5 h-5" />,
      color: 'black',
      bgColor: 'bg-slate-800',
      textColor: 'text-white',
      borderColor: 'border-white',
      items: [
        {
          id: 'expert-guide' as NavItem,
          label: 'Guía del Asistente Experto',
          icon: <BookOpen className="w-4 h-4" />,
          description: 'Documentación completa',
        },
        {
          id: 'expert-chat' as NavItem,
          label: 'Asistente Experto ElevenLabs',
          icon: <Lightbulb className="w-4 h-4" />,
          description: 'Chat con especialista en IA',
        },
        {
          id: 'help' as NavItem,
          label: 'Ayuda y Preguntas Frecuentes',
          icon: <HelpCircle className="w-4 h-4" />,
          description: 'FAQ y soporte',
        },
      ],
    },
    {
      id: 'elevenlabs' as MenuGroup,
      label: '📚 Guía ElevenLabs',
      description: 'Documentación completa',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'amber',
      bgColor: 'bg-amber-600',
      textColor: 'text-white',
      borderColor: 'border-amber-300',
      items: [
        {
          id: 'elevenlabs' as NavItem,
          label: 'Guía Completa de ElevenLabs',
          icon: <BookOpen className="w-4 h-4" />,
          description: 'SaaS, precios y monetización',
        },
      ],
    },
    {
      id: 'management' as MenuGroup,
      label: '👥 Gestión de Clientes',
      description: 'Administra tus clientes',
      icon: <Users className="w-5 h-5" />,
      color: 'indigo',
      bgColor: 'bg-indigo-600',
      textColor: 'text-white',
      borderColor: 'border-indigo-300',
      items: [
        {
          id: 'clients' as NavItem,
          label: 'Mis Clientes',
          icon: <Users className="w-4 h-4" />,
          description: 'Lista de clientes activos',
        },
        {
          id: 'credits' as NavItem,
          label: 'Créditos',
          icon: <Zap className="w-4 h-4" />,
          description: 'Gestionar créditos',
        },
        {
          id: 'history' as NavItem,
          label: 'Historial',
          icon: <BarChart3 className="w-4 h-4" />,
          description: 'Historial de uso',
        },
        {
          id: 'integrations' as NavItem,
          label: 'Integraciones',
          icon: <Zap className="w-4 h-4" />,
          description: 'Landing pages',
        },
      ],
    },
  ]


  return (
    <div className="flex gap-6">
      {/* ============================================================
          SIDEBAR IZQUIERDO - AGRUPADO
          ============================================================ */}
      <aside className="w-72 flex-shrink-0">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm sticky top-6">
          {/* HEADER DEL SIDEBAR */}
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Mic className="w-5 h-5" />
              <h3 className="font-bold text-sm">Panel de Control</h3>
            </div>
            <p className="text-xs text-rose-100">Asistente de Voz</p>
          </div>

          {/* GRUPOS DE MENÚ */}
          <nav className="divide-y divide-slate-200">
            {menuGroups.map((group) => {
              const isOpen = expandedGroups.includes(group.id)
              
              return (
                <div key={group.id} className="border-b border-slate-200 last:border-b-0">
                  {/* HEADER DEL GRUPO - CON COLOR DIFERENTE POR GRUPO */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full px-4 py-3 flex items-center justify-between transition-all ${
                      isOpen ? group.bgColor : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-lg ${isOpen ? group.textColor : 'text-slate-600'}`}>{group.icon}</span>
                      <div className="text-left">
                        <p className={`font-semibold text-sm ${isOpen ? group.textColor : 'text-slate-900'}`}>{group.label}</p>
                        <p className={`text-xs ${isOpen ? group.textColor + ' opacity-75' : 'text-slate-500'}`}>{group.description}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform flex-shrink-0 ${
                        isOpen ? group.textColor + ' rotate-180' : 'text-slate-600'
                      }`}
                    />
                  </button>

                  {/* ITEMS DEL GRUPO - GRIS CLARO SUAVE, SIN CAMBIO DE COLOR */}
                  {isOpen && (
                    <div className="divide-y divide-slate-200 bg-slate-50">
                      {group.items.map((item) => {
                        const isSelected = activeNav === item.id
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveNav(item.id)}
                            className={`w-full px-6 py-3 flex items-center justify-between text-left transition-all border-l-4 ${
                              isSelected 
                                ? 'border-slate-400'
                                : 'border-slate-200'
                            } hover:bg-slate-100`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="text-base text-slate-700">{item.icon}</span>
                              <div className="min-w-0">
                                <p className="font-semibold text-sm text-slate-900">
                                  {item.label}
                                </p>
                                <p className="text-xs text-slate-600 truncate">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            {isSelected && (
                              <ChevronRight className="w-4 h-4 text-slate-700 flex-shrink-0 ml-2" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* PIE DEL SIDEBAR */}
          <div className="p-3 bg-slate-50 border-t border-slate-200">
            <p className="text-xs text-slate-600 text-center">
              💡 Haz click en los grupos para expandir/contraer
            </p>
          </div>
        </div>
      </aside>

      {/* ============================================================
          CONTENIDO PRINCIPAL
          ============================================================ */}
      <main className="flex-1">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* HEADER DEL CONTENIDO */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6 text-white flex items-center justify-between">
            <div>
              {activeNav ? (() => {
                const allItems = menuGroups.flatMap(g => g.items)
                const currentItem = allItems.find(i => i.id === activeNav)
                return (
                  <>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      {currentItem?.icon}
                      {currentItem?.label}
                    </h2>
                    <p className="text-slate-300 text-sm mt-1">{currentItem?.description}</p>
                  </>
                )
              })() : (
                <>
                  <h2 className="text-2xl font-bold">🎙️ Asistente de Voz</h2>
                  <p className="text-slate-300 text-sm mt-1">Panel de Control</p>
                </>
              )}
            </div>
          </div>

          {/* CONTENIDO DINÁMICO */}
          <div className="p-8 max-h-[calc(100vh-300px)] overflow-y-auto">
            {activeNav === null ? (
              // MINI PRESENTACIÓN - Cuando no hay nada seleccionado
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500 text-white rounded-full p-3 flex-shrink-0">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">¡Bienvenido al Asistente de Voz!</h3>
                      <p className="text-slate-700 mb-4">
                        Este panel te permite configurar y gestionar tu asistente de voz impulsado por ElevenLabs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-8">
                  <h4 className="text-lg font-bold text-slate-900 mb-6">📍 Cómo Usar Esta Interfaz</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-800 text-white font-bold text-sm">1</div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900">Mira el Menú Izquierdo</h5>
                        <p className="text-slate-600 text-sm">Verás 3 grupos principales de opciones organizadas por categoría</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-800 text-white font-bold text-sm">2</div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900">Haz Clic en un Grupo</h5>
                        <p className="text-slate-600 text-sm">Al hacer clic en un grupo (ej: "Guía y Setup"), se expandirá mostrando las opciones disponibles</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-800 text-white font-bold text-sm">3</div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900">Selecciona una Opción</h5>
                        <p className="text-slate-600 text-sm">Haz clic en la opción que desees (ej: "Guía de Configuración") y su contenido aparecerá aquí</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-800 text-white font-bold text-sm">4</div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900">Solo Una Sección Abierta</h5>
                        <p className="text-slate-600 text-sm">Si abres un grupo, el anterior se cerrará automáticamente para mantener una interfaz limpia</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 flex gap-4">
                  <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-1">💡 Pro Tip</h5>
                    <p className="text-slate-700 text-sm">
                      Comienza por <strong>"Guía y Setup"</strong> → <strong>"Guía de Configuración"</strong> para aprender todos los pasos necesarios para activar tu asistente.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // CONTENIDO ESPECÍFICO - Con Suspense para mejor UX
              <Suspense fallback={<LoadingSpinner />}>
                {activeNav === 'setup' && <VoiceAssistantSetupGuide />}
                {activeNav === 'settings' && <AdvancedSettings />}
                {activeNav === 'features' && <FeaturesSection />}
                {activeNav === 'stats' && <StatisticsSection />}
                {activeNav === 'expert-guide' && <ElevenLabsExpertGuide />}
                {activeNav === 'expert-chat' && <ElevenLabsExpertChat />}
                {activeNav === 'help' && <HelpSection />}
                {activeNav === 'elevenlabs' && <ElevenLabsGuide />}
                {activeNav === 'clients' && <ClientsManagement section="clients" />}
                {activeNav === 'credits' && <ClientsManagement section="credits" />}
                {activeNav === 'history' && <ClientsManagement section="history" />}
                {activeNav === 'integrations' && <ClientsManagement section="integrations" />}
              </Suspense>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
