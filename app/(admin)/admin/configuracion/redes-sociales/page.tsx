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
    try {
      // Timeout de 3 segundos para no bloquear la interfaz
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 3000)
      )
      const data = await Promise.race([
        getSocialAccounts(user.id),
        timeoutPromise
      ])
      setAccounts(data as any[])
    } catch (error) {
      console.error('Error cargando cuentas:', error)
      setAccounts([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadAccounts()
    }
  }, [user, loadAccounts])

  const handleDisconnect = async (accountId: string, accountName: string) => {
    if (!confirm(`Desconectar cuenta ${accountName}?`)) return

    const result = await disconnectSocialAccount(user!.id, accountId)
    if (result.success) {
      alert('Cuenta desconectada')
      loadAccounts()
    } else {
      alert('Error: ' + result.error)
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
      icon: () => <span className="text-2xl">TikTok</span>,
      color: 'from-black to-gray-800',
      setupUrl: 'https://developers.tiktok.com/',
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <span className="text-3xl">📱</span>
          Configurar Redes Sociales
        </h1>
        <p className="text-slate-600">Conecta tus cuentas para publicar automaticamente</p>
      </div>

      {/* Guia Rapida */}
      <div className="bg-white border-2 border-slate-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Guia Rapida de Configuracion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(platformConfig).map(([platform, config]) => (
            <a
              key={platform}
              href={config.setupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-slate-200 rounded-xl p-4 hover:border-rose-500 transition-all flex items-center gap-3 group"
            >
              <div className={`p-3 bg-gradient-to-br ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <config.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{config.name}</p>
                <p className="text-xs text-slate-600">Click para configurar</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
            </a>
          ))}
        </div>
      </div>

      {/* Cuentas Conectadas */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500 mb-4"></div>
          <p className="text-slate-600">Cargando cuentas...</p>
        </div>
      ) : accounts.length === 0 ? (
        <div className="bg-white border-2 border-slate-200 rounded-xl p-12 text-center">
          <p className="text-slate-600 mb-4">No tienes cuentas conectadas</p>
          <p className="text-slate-500 text-sm">Haz clic en una plataforma arriba para conectar tu cuenta</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Cuentas Conectadas</h3>
          {accounts.map((account) => (
            <div key={account.id} className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                    {account.platform === 'instagram' && <Instagram className="w-6 h-6 text-white" />}
                    {account.platform === 'facebook' && <Facebook className="w-6 h-6 text-white" />}
                    {account.platform === 'tiktok' && <span className="text-white font-bold">TK</span>}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 capitalize">{account.platform}</p>
                    <p className="text-sm text-slate-600">@{account.account_name}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnect(account.id, account.account_name)}
                  className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
