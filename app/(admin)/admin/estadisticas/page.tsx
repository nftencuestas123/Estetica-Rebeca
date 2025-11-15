'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Eye, Heart, MessageCircle, Share2, RefreshCw, Calendar, Award } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  getDashboardStats,
  getPostsWithAnalytics,
  comparePlatformPerformance,
  getBestPostingTimes,
  syncAllPostAnalytics,
} from '@/services/analytics'

export default function EstadisticasPage() {
  const { user } = useAuth()
  const [dashboardStats, setDashboardStats] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [platformComparison, setPlatformComparison] = useState<any>(null)
  const [bestTimes, setBestTimes] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (user) {
      loadAllData()
    }
  }, [user, selectedPlatform])

  const loadAllData = async () => {
    if (!user) return
    setLoading(true)

    const [stats, postsData, comparison, times] = await Promise.all([
      getDashboardStats(user.id),
      getPostsWithAnalytics(user.id, selectedPlatform),
      comparePlatformPerformance(user.id),
      getBestPostingTimes(user.id),
    ])

    setDashboardStats(stats)
    setPosts(postsData)
    setPlatformComparison(comparison)
    setBestTimes(times)
    setLoading(false)
  }

  const handleSyncAnalytics = async () => {
    if (!user) return
    setSyncing(true)
    await syncAllPostAnalytics(user.id)
    await loadAllData()
    setSyncing(false)
    alert('✅ Analytics sincronizados correctamente')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400 mb-4"></div>
          <p className="text-white/60">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary-400" />
              Estadísticas y Analytics
            </h1>
            <p className="text-white/60">Rendimiento de tus publicaciones en redes sociales</p>
          </div>
          <button
            onClick={handleSyncAnalytics}
            disabled={syncing}
            className="bg-primary-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Sincronizando...' : 'Sincronizar'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/60 text-sm">Total Publicaciones</p>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-4xl font-bold text-blue-400">{dashboardStats?.totalPosts || 0}</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-400/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/60 text-sm">Total Likes</p>
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-4xl font-bold text-pink-400">{dashboardStats?.totalLikes?.toLocaleString() || 0}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/60 text-sm">Total Comentarios</p>
            <MessageCircle className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-4xl font-bold text-purple-400">{dashboardStats?.totalComments?.toLocaleString() || 0}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/60 text-sm">Total Vistas</p>
            <Eye className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-4xl font-bold text-green-400">{dashboardStats?.totalViews?.toLocaleString() || 0}</p>
        </div>
      </div>

      {/* Engagement & Best Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-black border border-primary-400/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-bold text-white">Engagement Promedio</h2>
          </div>
          <p className="text-5xl font-bold text-primary-400 mb-2">
            {dashboardStats?.averageEngagement?.toFixed(2)}%
          </p>
          <p className="text-white/60 text-sm">
            {dashboardStats?.averageEngagement > 3
              ? '🔥 Excelente engagement!'
              : dashboardStats?.averageEngagement > 1.5
              ? '⭐ Buen engagement'
              : '📊 Puede mejorar'}
          </p>
        </div>

        <div className="bg-black border border-primary-400/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Plataforma Top</h2>
          </div>
          <p className="text-3xl font-bold text-yellow-400 mb-2 capitalize">
            {dashboardStats?.topPerformingPlatform || 'N/A'}
          </p>
          <p className="text-white/60 text-sm">
            {platformComparison?.[dashboardStats?.topPerformingPlatform]?.totalPosts || 0} publicaciones
          </p>
        </div>
      </div>

      {/* Platform Comparison */}
      <div className="bg-black border border-primary-400/30 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Comparación de Plataformas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platformComparison &&
            Object.entries(platformComparison).map(([platform, stats]: [string, any]) => (
              <div key={platform} className="bg-gradient-to-br from-white/5 to-white/0 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-3 capitalize flex items-center gap-2">
                  {platform === 'instagram' && '📸'}
                  {platform === 'facebook' && '📘'}
                  {platform === 'tiktok' && '🎵'}
                  {platform}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Publicaciones:</span>
                    <span className="text-white font-semibold">{stats.totalPosts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Alcance Total:</span>
                    <span className="text-white font-semibold">{stats.totalReach?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Engagement Prom:</span>
                    <span className="text-primary-400 font-semibold">{stats.avgEngagement?.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Best Posting Times */}
      {bestTimes && (
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-600/10 border border-orange-400/40 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-bold text-white">Mejores Horarios para Publicar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-white/60 text-sm mb-2">Mejor Día:</p>
              <p className="text-2xl font-bold text-orange-400">{bestTimes.bestDayOfWeek}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-2">Mejor Hora:</p>
              <p className="text-2xl font-bold text-orange-400">{bestTimes.bestHourOfDay}:00hs</p>
            </div>
          </div>
          <p className="text-white/80 mt-4">{bestTimes.insights}</p>
        </div>
      )}

      {/* Filter Posts */}
      <div className="flex items-center gap-4 mb-6">
        <p className="text-white font-semibold">Filtrar por plataforma:</p>
        <div className="flex gap-2">
          {['Todas', 'instagram', 'facebook', 'tiktok'].map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform === 'Todas' ? undefined : platform)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                (platform === 'Todas' && !selectedPlatform) || selectedPlatform === platform
                  ? 'bg-primary-400 text-white'
                  : 'bg-black border border-primary-400/30 text-white hover:border-primary-400/60'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-black border border-primary-400/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Publicaciones Recientes</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60">No hay publicaciones aún</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gradient-to-r from-white/5 to-white/0 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold capitalize flex items-center gap-2">
                      {post.platform === 'instagram' && '📸'}
                      {post.platform === 'facebook' && '📘'}
                      {post.platform === 'tiktok' && '🎵'}
                      {post.platform} - @{post.social_account?.account_name}
                    </p>
                    <p className="text-white/60 text-sm">
                      {new Date(post.posted_at).toLocaleString()}
                    </p>
                  </div>
                  {post.post_url && (
                    <a
                      href={post.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1"
                    >
                      Ver post →
                    </a>
                  )}
                </div>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">{post.copy_text}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-white/60 mb-1">Likes</p>
                    <p className="text-pink-400 font-semibold flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {post.likes?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Comentarios</p>
                    <p className="text-purple-400 font-semibold flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> {post.comments?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Compartidos</p>
                    <p className="text-blue-400 font-semibold flex items-center gap-1">
                      <Share2 className="w-4 h-4" /> {post.shares?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Vistas</p>
                    <p className="text-green-400 font-semibold flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {post.views?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Engagement</p>
                    <p className="text-primary-400 font-semibold">{post.engagement_rate?.toFixed(2) || 0}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

