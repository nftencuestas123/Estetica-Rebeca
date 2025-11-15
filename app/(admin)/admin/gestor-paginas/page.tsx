'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Eye, 
  EyeOff, 
  Star, 
  Check,
  TrendingUp,
  FileText,
  Loader2
} from 'lucide-react'
import AdminSidebar from '@/components/AdminSidebar'
import {
  getAllPages,
  setRootPage,
  togglePageActive,
  getPagesStats,
  type Page,
  type PageStats,
} from '@/services/pages'

/**
 * =====================================================
 * GESTOR DE PÁGINAS - Panel Admin
 * Centro de control para landing pages y capture pages
 * =====================================================
 */

export default function GestorPaginasPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [stats, setStats] = useState<PageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'landing' | 'capture'>('all')

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [pagesData, statsData] = await Promise.all([
        getAllPages(),
        getPagesStats(),
      ])
      setPages(pagesData)
      setStats(statsData)
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSetRoot = async (pageId: string) => {
    try {
      await setRootPage(pageId)
      await loadData()
    } catch (error) {
      console.error('Error estableciendo página root:', error)
    }
  }

  const handleToggleActive = async (pageId: string, currentState: boolean) => {
    try {
      await togglePageActive(pageId, !currentState)
      await loadData()
    } catch (error) {
      console.error('Error cambiando estado:', error)
    }
  }

  const filteredPages = pages.filter((page) => {
    if (filter === 'all') return true
    return page.type === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-400 to-yellow-500 bg-clip-text text-transparent">
            Gestor de Páginas
          </h1>
          <p className="text-white/70">
            Controla qué landing pages y capture pages se muestran en tu sitio
          </p>
        </div>

        {/* ESTADÍSTICAS */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-neutral-900 to-black border border-primary-400/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <LayoutDashboard className="w-8 h-8 text-primary-400" />
                <span className="text-3xl font-bold text-white">{stats.totalPages}</span>
              </div>
              <p className="text-white/70">Total Páginas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-neutral-900 to-black border border-blue-400/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-blue-400" />
                <span className="text-3xl font-bold text-white">{stats.activeLanding}</span>
              </div>
              <p className="text-white/70">Landing Pages Activas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-neutral-900 to-black border border-green-400/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-green-400" />
                <span className="text-3xl font-bold text-white">{stats.activeCapture}</span>
              </div>
              <p className="text-white/70">Capture Pages Activas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-neutral-900 to-black border border-purple-400/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-purple-400" />
                <span className="text-3xl font-bold text-white">{stats.totalViews}</span>
              </div>
              <p className="text-white/70">Total Vistas</p>
            </motion.div>
          </div>
        )}

        {/* PÁGINA ROOT ACTUAL */}
        {stats?.rootPage && (
          <div className="bg-gradient-to-r from-primary-500/20 to-yellow-500/10 border-2 border-primary-400/40 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-bold text-white">Página Principal Actual</h3>
            </div>
            <p className="text-white/70 mb-2">
              La página que se muestra en la raíz de tu dominio (<code className="text-primary-400">/</code>)
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 rounded-xl border border-primary-400/30">
              <span className="text-white font-semibold">{stats.rootPage.display_name}</span>
              <span className="text-primary-400">({stats.rootPage.template_key})</span>
            </div>
          </div>
        )}

        {/* FILTROS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'all'
                ? 'bg-primary-400 text-black'
                : 'bg-neutral-900 text-white/70 hover:bg-neutral-800'
            }`}
          >
            Todas ({pages.length})
          </button>
          <button
            onClick={() => setFilter('landing')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'landing'
                ? 'bg-blue-400 text-black'
                : 'bg-neutral-900 text-white/70 hover:bg-neutral-800'
            }`}
          >
            Landing Pages ({pages.filter((p) => p.type === 'landing').length})
          </button>
          <button
            onClick={() => setFilter('capture')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'capture'
                ? 'bg-green-400 text-black'
                : 'bg-neutral-900 text-white/70 hover:bg-neutral-800'
            }`}
          >
            Capture Pages ({pages.filter((p) => p.type === 'capture').length})
          </button>
        </div>

        {/* LISTA DE PÁGINAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPages.map((page) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-neutral-900 to-black border border-primary-400/20 rounded-2xl p-6 hover:border-primary-400/40 transition-all"
            >
              {/* Header con badge de tipo */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white">{page.display_name}</h3>
                    {page.is_root && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-400/20 text-primary-400 rounded-full text-xs font-bold">
                        <Star className="w-3 h-3" />
                        ROOT
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm">{page.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    page.type === 'landing'
                      ? 'bg-blue-400/20 text-blue-400'
                      : 'bg-green-400/20 text-green-400'
                  }`}
                >
                  {page.type === 'landing' ? 'LANDING' : 'CAPTURE'}
                </span>
              </div>

              {/* Tags */}
              {page.tags && page.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {page.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/5 text-white/60 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-white/60">
                  <Eye className="w-4 h-4" />
                  <span>{page.views} vistas</span>
                </div>
                {page.type === 'capture' && (
                  <div className="flex items-center gap-1 text-white/60">
                    <Check className="w-4 h-4" />
                    <span>{page.conversions} conversiones</span>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex gap-3">
                {page.type === 'landing' && !page.is_root && (
                  <button
                    onClick={() => handleSetRoot(page.id)}
                    className="flex-1 px-4 py-3 bg-primary-400/20 text-primary-400 rounded-xl font-semibold hover:bg-primary-400/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Star className="w-4 h-4" />
                    Establecer como Principal
                  </button>
                )}
                <button
                  onClick={() => handleToggleActive(page.id, page.is_active)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    page.is_active
                      ? 'bg-red-400/20 text-red-400 hover:bg-red-400/30'
                      : 'bg-green-400/20 text-green-400 hover:bg-green-400/30'
                  }`}
                >
                  {page.is_active ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Desactivar
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Activar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

