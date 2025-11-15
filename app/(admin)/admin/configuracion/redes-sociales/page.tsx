'use client'

import { useState, useEffect, useCallback } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Check, X, ExternalLink, RefreshCw } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getSocialAccounts, disconnectSocialAccount } from '@/services/social-media'

export default function RedesSocialesPage() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadAccounts = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const data = await getSocialAccounts(user.id)
    setAccounts(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (user) {
      loadAccounts()
    }
  }, [user, loadAccounts])

  const handleDisconnect = async (accountId: string, accountName: string) => {
    if (!confirm(`¿Desconectar cuenta ${accountName}?`)) return

    const result = await disconnectSocialAccount(user!.id, accountId)
    if (result.success) {
      alert('✅ Cuenta desconectada')
      loadAccounts()
    } else {
      alert('❌ Error: ' + result.error)
    }
  }

  const platformConfig: {
    [key: string]: {
      name: string
      icon: React.ComponentType<{ className?: string }> | (() => JSX.Element)
      color: string
      setupUrl: string
    }
  } = {
    instagram: {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      setupUrl: 'https://developers.facebook.com/docs/instagram-api/getting-started',
    },
    facebook: {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-blue-600 to-blue-700',
      setupUrl: 'https://developers.facebook.com/docs/facebook-login',
    },
    tiktok: {
      name: 'TikTok',
      icon: () => <span className="text-2xl">🎵</span>,
      color: 'from-black to-gray-800',
      setupUrl: 'https://developers.tiktok.com/',
    },
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span className="text-3xl">🔗</span>
          Configurar Redes Sociales
        </h1>
        <p className="text-white/60">Conecta tus cuentas para publicar automáticamente</p>
      </div>

      {/* Guía Rápida */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/10 border border-blue-400/40 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">📋 Guía Rápida de Configuración</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-blue-400 mb-2">1️⃣ Instagram/Facebook</p>
            <ol className="text-white/80 text-sm space-y-1 list-decimal list-inside">
              <li>Ve a <a href="https://developers.facebook.com/" target="_blank" className="text-primary-400 underline">Facebook Developers</a></li>
              <li>Crea una App</li>
              <li>Agrega Instagram Graph API</li>
              <li>Obtén Access Token</li>
              <li>Pégalo abajo ⬇️</li>
            </ol>
          </div>
          <div>
            <p className="font-semibold text-blue-400 mb-2">2️⃣ TikTok</p>
            <ol className="text-white/80 text-sm space-y-1 list-decimal list-inside">
              <li>Ve a <a href="https://developers.tiktok.com/" target="_blank" className="text-primary-400 underline">TikTok Developers</a></li>
              <li>Crea una App</li>
              <li>Habilita Content Posting API</li>
              <li>Obtén Access Token</li>
              <li>Pégalo abajo ⬇️</li>
            </ol>
          </div>
          <div>
            <p className="font-semibold text-blue-400 mb-2">3️⃣ Ayuda Manual</p>
            <p className="text-white/80 text-sm mb-2">
              ¿Necesitas ayuda?
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm">
              💬 Solicitar Configuración Manual
            </button>
            <p className="text-white/60 text-xs mt-2">
              Te ayudaremos paso a paso
            </p>
          </div>
        </div>
      </div>

      {/* Cuentas Conectadas */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Cuentas Conectadas</h2>
          <button
            onClick={loadAccounts}
            disabled={loading}
            className="bg-primary-400/10 text-primary-400 px-4 py-2 rounded-lg font-semibold hover:bg-primary-400/20 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refrescar
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
            <p className="text-white/60 mt-4">Cargando cuentas...</p>
          </div>
        ) : accounts.length === 0 ? (
          <div className="bg-black border border-primary-400/30 rounded-xl p-12 text-center">
            <X className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-xl font-semibold text-white mb-2">No hay cuentas conectadas</p>
            <p className="text-white/60">Conecta tus redes sociales abajo para empezar a publicar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((account) => {
              const config = platformConfig[account.platform as keyof typeof platformConfig]
              if (!config) return null
              
              const renderIcon = () => {
                const IconComponent = config.icon
                if ('displayName' in IconComponent || 'render' in IconComponent) {
                  // Es un componente React (Instagram, Facebook, etc)
                  const Icon = IconComponent as React.ComponentType<{ className?: string }>
                  return <Icon className="w-7 h-7 text-white" />
                } else {
                  // Es una función que retorna JSX (TikTok emoji)
                  const IconFn = IconComponent as () => JSX.Element
                  return <IconFn />
                }
              }
              
              return (
                <div key={account.id} className="bg-black border-2 border-green-400/40 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                        {renderIcon()}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{config.name}</p>
                        <p className="text-white/60 text-sm">@{account.account_name}</p>
                      </div>
                    </div>
                    <Check className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="space-y-2 text-sm text-white/60 mb-4">
                    <p>Conectado: {new Date(account.connected_at).toLocaleDateString()}</p>
                    <p>Estado: <span className="text-green-400 font-semibold">Activo</span></p>
                  </div>
                  <button
                    onClick={() => handleDisconnect(account.id, account.account_name)}
                    className="w-full bg-red-500/10 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-500/20 transition-colors"
                  >
                    Desconectar
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Conectar Nuevas Cuentas */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Conectar Nueva Cuenta</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(platformConfig).map(([platform, config]) => {
            const isConnected = accounts.some((acc) => acc.platform === platform)

            const renderIcon = () => {
              const IconComponent = config.icon
              if ('displayName' in IconComponent || 'render' in IconComponent) {
                // Es un componente React (Instagram, Facebook, etc)
                const Icon = IconComponent as React.ComponentType<{ className?: string }>
                return <Icon className="w-6 h-6 text-white" />
              } else {
                // Es una función que retorna JSX (TikTok emoji)
                const IconFn = IconComponent as () => JSX.Element
                return <IconFn />
              }
            }

            return (
              <div key={platform} className="bg-black border border-primary-400/30 rounded-xl p-6 hover:border-primary-400/60 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                    {renderIcon()}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{config.name}</p>
                    {isConnected && <p className="text-green-400 text-sm">✓ Conectado</p>}
                  </div>
                </div>
                <a
                  href={config.setupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary-400 text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver Guía de Configuración
                </a>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                  <p className="text-yellow-400 text-xs font-semibold mb-1">⚠️ PLACEHOLDER</p>
                  <p className="text-white/60 text-xs">
                    Sigue la guía para obtener tu Access Token y conéctalo manualmente por ahora.
                    OAuth automático próximamente.
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Info Adicional */}
      <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-600/10 border border-purple-400/40 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3">💡 ¿Necesitas Ayuda?</h3>
        <p className="text-white/80 mb-4">
          La configuración de redes sociales requiere crear apps en cada plataforma. Si necesitas asistencia:
        </p>
        <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all">
          📞 Solicitar Ayuda del Administrador
        </button>
      </div>
    </div>
  )
}

