// services/analytics.ts
import axios from 'axios'
import { supabase } from '@/lib/supabase'

export interface PostAnalytics {
  postId: string
  platform: string
  likes: number
  comments: number
  shares: number
  views: number
  reach: number
  engagement_rate: number
  last_updated: string
}

export interface DashboardStats {
  totalPosts: number
  totalLikes: number
  totalComments: number
  totalViews: number
  totalReach: number
  averageEngagement: number
  topPerformingPlatform: string
  topPerformingPost: any
}

// ====================================
// INSTAGRAM ANALYTICS
// ====================================

export async function getInstagramPostInsights(
  accessToken: string,
  mediaId: string
): Promise<{
  likes: number
  comments: number
  shares: number
  views: number
  reach: number
  engagement_rate: number
} | null> {
  try {
    // Obtener insights del post
    const response = await axios.get(`https://graph.facebook.com/v18.0/${mediaId}/insights`, {
      params: {
        metric: 'likes,comments,shares,impressions,reach,saved,video_views',
        access_token: accessToken,
      },
    })

    const insights = response.data.data

    // Parsear m├⌐tricas
    const likes = insights.find((i: any) => i.name === 'likes')?.values[0]?.value || 0
    const comments = insights.find((i: any) => i.name === 'comments')?.values[0]?.value || 0
    const shares = insights.find((i: any) => i.name === 'shares')?.values[0]?.value || 0
    const views = insights.find((i: any) => i.name === 'video_views')?.values[0]?.value || 0
    const reach = insights.find((i: any) => i.name === 'reach')?.values[0]?.value || 0
    const impressions = insights.find((i: any) => i.name === 'impressions')?.values[0]?.value || 0

    // Calcular engagement rate
    const engagement = likes + comments + shares
    const engagement_rate = reach > 0 ? (engagement / reach) * 100 : 0

    return {
      likes,
      comments,
      shares,
      views,
      reach,
      engagement_rate: Math.round(engagement_rate * 100) / 100,
    }
  } catch (error: any) {
    console.error('Error getting Instagram insights:', error.response?.data || error.message)
    return null
  }
}

// ====================================
// FACEBOOK ANALYTICS
// ====================================

export async function getFacebookPostInsights(
  accessToken: string,
  postId: string
): Promise<{
  likes: number
  comments: number
  shares: number
  views: number
  reach: number
  engagement_rate: number
} | null> {
  try {
    // Obtener m├⌐tricas del post
    const response = await axios.get(`https://graph.facebook.com/v18.0/${postId}`, {
      params: {
        fields: 'likes.summary(true),comments.summary(true),shares,reactions.summary(true),insights.metric(post_impressions,post_impressions_unique,post_video_views)',
        access_token: accessToken,
      },
    })

    const post = response.data

    const likes = post.likes?.summary?.total_count || 0
    const comments = post.comments?.summary?.total_count || 0
    const shares = post.shares?.count || 0
    const reach = post.insights?.data?.find((i: any) => i.name === 'post_impressions_unique')?.values[0]?.value || 0
    const views = post.insights?.data?.find((i: any) => i.name === 'post_video_views')?.values[0]?.value || 0

    // Calcular engagement rate
    const engagement = likes + comments + shares
    const engagement_rate = reach > 0 ? (engagement / reach) * 100 : 0

    return {
      likes,
      comments,
      shares,
      views,
      reach,
      engagement_rate: Math.round(engagement_rate * 100) / 100,
    }
  } catch (error: any) {
    console.error('Error getting Facebook insights:', error.response?.data || error.message)
    return null
  }
}

// ====================================
// TIKTOK ANALYTICS
// ====================================

export async function getTikTokVideoStats(
  accessToken: string,
  videoId: string
): Promise<{
  likes: number
  comments: number
  shares: number
  views: number
  reach: number
  engagement_rate: number
} | null> {
  try {
    // TikTok Video Analytics API
    const response = await axios.get(`https://open-api.tiktok.com/video/data/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        video_id: videoId,
        fields: 'like_count,comment_count,share_count,view_count',
      },
    })

    const video = response.data.data.videos[0]

    const likes = video.like_count || 0
    const comments = video.comment_count || 0
    const shares = video.share_count || 0
    const views = video.view_count || 0

    // TikTok no da "reach" exacto, usar views como proxy
    const reach = views

    // Calcular engagement rate
    const engagement = likes + comments + shares
    const engagement_rate = views > 0 ? (engagement / views) * 100 : 0

    return {
      likes,
      comments,
      shares,
      views,
      reach,
      engagement_rate: Math.round(engagement_rate * 100) / 100,
    }
  } catch (error: any) {
    console.error('Error getting TikTok stats:', error.response?.data || error.message)
    return null
  }
}

// ====================================
// SINCRONIZAR ANALYTICS DE TODAS LAS PUBLICACIONES
// ====================================

export async function syncAllPostAnalytics(userId: string): Promise<void> {
  try {
    // Obtener todas las publicaciones del usuario
    const { data: posts, error } = await supabase
      .from('social_posts')
      .select('*, social_account:social_accounts(*)')
      .eq('user_id', userId)
      .not('post_id', 'is', null)

    if (error || !posts) {
      console.error('Error fetching posts:', error)
      return
    }

    // Actualizar analytics de cada post
    for (const post of posts) {
      let analytics: Awaited<ReturnType<typeof getInstagramPostInsights>> = null

      switch (post.platform) {
        case 'instagram':
          analytics = await getInstagramPostInsights(
            post.social_account.access_token,
            post.post_id
          )
          break
        case 'facebook':
          analytics = await getFacebookPostInsights(
            post.social_account.access_token,
            post.post_id
          )
          break
        case 'tiktok':
          analytics = await getTikTokVideoStats(post.social_account.access_token, post.post_id)
          break
      }

      if (analytics) {
        // Actualizar en BD
        await supabase
          .from('social_posts')
          .update({
            likes: analytics.likes,
            comments: analytics.comments,
            shares: analytics.shares,
            views: analytics.views,
            reach: analytics.reach,
            engagement_rate: analytics.engagement_rate,
            analytics_updated_at: new Date().toISOString(),
          })
          .eq('id', post.id)
      }
    }
  } catch (error) {
    console.error('Error syncing analytics:', error)
  }
}

// ====================================
// OBTENER STATS DEL DASHBOARD
// ====================================

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  try {
    const { data: posts, error } = await supabase
      .from('social_posts')
      .select('*')
      .eq('user_id', userId)

    if (error || !posts) {
      return {
        totalPosts: 0,
        totalLikes: 0,
        totalComments: 0,
        totalViews: 0,
        totalReach: 0,
        averageEngagement: 0,
        topPerformingPlatform: 'N/A',
        topPerformingPost: null,
      }
    }

    // Calcular totales
    const totalPosts = posts.length
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0)
    const totalComments = posts.reduce((sum, post) => sum + (post.comments || 0), 0)
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0)
    const totalReach = posts.reduce((sum, post) => sum + (post.reach || 0), 0)

    // Calcular promedio de engagement
    const postsWithEngagement = posts.filter((p) => p.engagement_rate && p.engagement_rate > 0)
    const averageEngagement =
      postsWithEngagement.length > 0
        ? postsWithEngagement.reduce((sum, post) => sum + post.engagement_rate, 0) /
          postsWithEngagement.length
        : 0

    // Plataforma con mejor rendimiento
    const platformStats: { [key: string]: { posts: number; engagement: number } } = {}
    posts.forEach((post) => {
      if (!platformStats[post.platform]) {
        platformStats[post.platform] = { posts: 0, engagement: 0 }
      }
      platformStats[post.platform].posts++
      platformStats[post.platform].engagement += post.engagement_rate || 0
    })

    let topPerformingPlatform = 'N/A'
    let maxAvgEngagement = 0
    Object.entries(platformStats).forEach(([platform, stats]) => {
      const avgEngagement = stats.engagement / stats.posts
      if (avgEngagement > maxAvgEngagement) {
        maxAvgEngagement = avgEngagement
        topPerformingPlatform = platform
      }
    })

    // Post con mejor rendimiento
    const topPerformingPost = posts.reduce((top, post) => {
      if (!top || (post.engagement_rate || 0) > (top.engagement_rate || 0)) {
        return post
      }
      return top
    }, posts[0] || null)

    return {
      totalPosts,
      totalLikes,
      totalComments,
      totalViews,
      totalReach,
      averageEngagement: Math.round(averageEngagement * 100) / 100,
      topPerformingPlatform,
      topPerformingPost,
    }
  } catch (error) {
    console.error('Error getting dashboard stats:', error)
    return {
      totalPosts: 0,
      totalLikes: 0,
      totalComments: 0,
      totalViews: 0,
      totalReach: 0,
      averageEngagement: 0,
      topPerformingPlatform: 'N/A',
      topPerformingPost: null,
    }
  }
}

// ====================================
// OBTENER POSTS CON ANALYTICS
// ====================================

export async function getPostsWithAnalytics(
  userId: string,
  platform?: string,
  limit: number = 50
): Promise<any[]> {
  try {
    let query = supabase
      .from('social_posts')
      .select('*, social_account:social_accounts(account_name, platform)')
      .eq('user_id', userId)
      .order('posted_at', { ascending: false })
      .limit(limit)

    if (platform) {
      query = query.eq('platform', platform)
    }

    const { data, error } = await query

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('Error getting posts with analytics:', error)
    return []
  }
}

// ====================================
// COMPARAR RENDIMIENTO DE PLATAFORMAS
// ====================================

export async function comparePlatformPerformance(userId: string): Promise<{
  instagram: { avgEngagement: number; totalPosts: number; totalReach: number }
  facebook: { avgEngagement: number; totalPosts: number; totalReach: number }
  tiktok: { avgEngagement: number; totalPosts: number; totalReach: number }
}> {
  try {
    const { data: posts, error } = await supabase
      .from('social_posts')
      .select('*')
      .eq('user_id', userId)

    if (error || !posts) {
      return {
        instagram: { avgEngagement: 0, totalPosts: 0, totalReach: 0 },
        facebook: { avgEngagement: 0, totalPosts: 0, totalReach: 0 },
        tiktok: { avgEngagement: 0, totalPosts: 0, totalReach: 0 },
      }
    }

    const calculateStats = (platform: string) => {
      const platformPosts = posts.filter((p) => p.platform === platform)
      const totalPosts = platformPosts.length
      const totalReach = platformPosts.reduce((sum, p) => sum + (p.reach || 0), 0)
      const avgEngagement =
        totalPosts > 0
          ? platformPosts.reduce((sum, p) => sum + (p.engagement_rate || 0), 0) / totalPosts
          : 0

      return {
        avgEngagement: Math.round(avgEngagement * 100) / 100,
        totalPosts,
        totalReach,
      }
    }

    return {
      instagram: calculateStats('instagram'),
      facebook: calculateStats('facebook'),
      tiktok: calculateStats('tiktok'),
    }
  } catch (error) {
    console.error('Error comparing platform performance:', error)
    return {
      instagram: { avgEngagement: 0, totalPosts: 0, totalReach: 0 },
      facebook: { avgEngagement: 0, totalPosts: 0, totalReach: 0 },
      tiktok: { avgEngagement: 0, totalPosts: 0, totalReach: 0 },
    }
  }
}

// ====================================
// OBTENER MEJORES HORARIOS PARA PUBLICAR
// ====================================

export async function getBestPostingTimes(userId: string): Promise<{
  bestDayOfWeek: string
  bestHourOfDay: number
  insights: string
}> {
  try {
    const { data: posts, error } = await supabase
      .from('social_posts')
      .select('posted_at, engagement_rate')
      .eq('user_id', userId)
      .not('engagement_rate', 'is', null)

    if (error || !posts || posts.length === 0) {
      return {
        bestDayOfWeek: 'No hay datos suficientes',
        bestHourOfDay: 0,
        insights: 'Publica m├ís contenido para obtener insights',
      }
    }

    // Agrupar por d├¡a de semana y hora
    const dayStats: { [key: number]: { count: number; totalEngagement: number } } = {}
    const hourStats: { [key: number]: { count: number; totalEngagement: number } } = {}

    posts.forEach((post) => {
      const date = new Date(post.posted_at)
      const dayOfWeek = date.getDay() // 0=Domingo, 6=S├íbado
      const hourOfDay = date.getHours()

      if (!dayStats[dayOfWeek]) dayStats[dayOfWeek] = { count: 0, totalEngagement: 0 }
      if (!hourStats[hourOfDay]) hourStats[hourOfDay] = { count: 0, totalEngagement: 0 }

      dayStats[dayOfWeek].count++
      dayStats[dayOfWeek].totalEngagement += post.engagement_rate

      hourStats[hourOfDay].count++
      hourStats[hourOfDay].totalEngagement += post.engagement_rate
    })

    // Encontrar mejor d├¡a
    let bestDay = 0
    let maxDayEngagement = 0
    Object.entries(dayStats).forEach(([day, stats]) => {
      const avgEngagement = stats.totalEngagement / stats.count
      if (avgEngagement > maxDayEngagement) {
        maxDayEngagement = avgEngagement
        bestDay = parseInt(day)
      }
    })

    // Encontrar mejor hora
    let bestHour = 0
    let maxHourEngagement = 0
    Object.entries(hourStats).forEach(([hour, stats]) => {
      const avgEngagement = stats.totalEngagement / stats.count
      if (avgEngagement > maxHourEngagement) {
        maxHourEngagement = avgEngagement
        bestHour = parseInt(hour)
      }
    })

    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Mi├⌐rcoles', 'Jueves', 'Viernes', 'S├íbado']

    return {
      bestDayOfWeek: dayNames[bestDay],
      bestHourOfDay: bestHour,
      insights: `Tus publicaciones tienen mejor engagement los ${dayNames[bestDay]} alrededor de las ${bestHour}:00hs`,
    }
  } catch (error) {
    console.error('Error getting best posting times:', error)
    return {
      bestDayOfWeek: 'Error',
      bestHourOfDay: 0,
      insights: 'Error al calcular mejores horarios',
    }
  }
}

