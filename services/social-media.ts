// services/social-media.ts
import axios from 'axios'
import { supabase } from '@/lib/supabase'

export interface SocialAccount {
  id: string
  user_id: string
  platform: 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'linkedin'
  account_name: string
  account_id: string
  access_token: string
  refresh_token?: string
  token_expires_at?: string
  is_active: boolean
  connected_at: string
}

export interface PublishOptions {
  videoUrl: string
  caption: string
  platforms: string[] // ['instagram', 'facebook', 'tiktok']
  scheduledAt?: Date
}

export interface PublishResult {
  platform: string
  success: boolean
  postUrl?: string
  postId?: string
  error?: string
}

// ====================================
// INSTAGRAM API
// ====================================

export async function publishToInstagram(
  accessToken: string,
  instagramAccountId: string,
  videoUrl: string,
  caption: string
): Promise<{ success: boolean; postUrl?: string; postId?: string; error?: string }> {
  try {
    // Step 1: Create media container
    const containerResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${instagramAccountId}/media`,
      {
        media_type: 'REELS', // Videos en Instagram son Reels
        video_url: videoUrl,
        caption: caption,
        access_token: accessToken,
      }
    )

    const creationId = containerResponse.data.id

    // Step 2: Publish container
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish`,
      {
        creation_id: creationId,
        access_token: accessToken,
      }
    )

    const postId = publishResponse.data.id

    return {
      success: true,
      postId,
      postUrl: `https://www.instagram.com/p/${postId}`,
    }
  } catch (error: any) {
    console.error('Error publishing to Instagram:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Error al publicar en Instagram',
    }
  }
}

// ====================================
// FACEBOOK API
// ====================================

export async function publishToFacebook(
  accessToken: string,
  pageId: string,
  videoUrl: string,
  caption: string
): Promise<{ success: boolean; postUrl?: string; postId?: string; error?: string }> {
  try {
    // Publicar video en Facebook Page
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${pageId}/videos`,
      {
        file_url: videoUrl,
        description: caption,
        access_token: accessToken,
      }
    )

    const postId = response.data.id

    return {
      success: true,
      postId,
      postUrl: `https://www.facebook.com/${postId}`,
    }
  } catch (error: any) {
    console.error('Error publishing to Facebook:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Error al publicar en Facebook',
    }
  }
}

// ====================================
// TIKTOK API
// ====================================

export async function publishToTikTok(
  accessToken: string,
  videoUrl: string,
  caption: string
): Promise<{ success: boolean; postUrl?: string; postId?: string; error?: string }> {
  try {
    // TikTok Content Posting API
    // Nota: Requiere TikTok Developer Account y aprobación
    const response = await axios.post(
      'https://open-api.tiktok.com/share/video/upload/',
      {
        video: {
          video_url: videoUrl,
        },
        post_info: {
          title: caption,
          privacy_level: 'EVERYONE',
          disable_duet: false,
          disable_comment: false,
          disable_stitch: false,
          video_cover_timestamp_ms: 1000,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return {
      success: true,
      postId: response.data.data.publish_id,
      postUrl: response.data.data.share_url || 'https://www.tiktok.com',
    }
  } catch (error: any) {
    console.error('Error publishing to TikTok:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.message || 'Error al publicar en TikTok',
    }
  }
}

// ====================================
// TWITTER/X API
// ====================================

export async function publishToTwitter(
  accessToken: string,
  accessTokenSecret: string,
  videoUrl: string,
  caption: string
): Promise<{ success: boolean; postUrl?: string; postId?: string; error?: string }> {
  try {
    // Twitter API v2 - Media Upload
    // Nota: Requiere OAuth 1.0a
    // Aquí se implementaría la lógica de subida de video y tweet
    
    // Por ahora retorno placeholder
    return {
      success: false,
      error: 'Twitter API requiere configuración OAuth 1.0a adicional',
    }
  } catch (error: any) {
    console.error('Error publishing to Twitter:', error.response?.data || error.message)
    return {
      success: false,
      error: 'Error al publicar en Twitter',
    }
  }
}

// ====================================
// PUBLICAR EN MÚLTIPLES REDES
// ====================================

export async function publishToMultiplePlatforms(
  userId: string,
  options: PublishOptions
): Promise<PublishResult[]> {
  const results: PublishResult[] = []

  // Obtener cuentas conectadas del usuario
  const { data: accounts, error } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .in('platform', options.platforms)

  if (error || !accounts) {
    console.error('Error fetching social accounts:', error)
    return options.platforms.map((platform) => ({
      platform,
      success: false,
      error: 'No se encontraron cuentas conectadas',
    }))
  }

  // Publicar en cada plataforma
  for (const account of accounts) {
    let result: Awaited<ReturnType<typeof publishToInstagram>>

    switch (account.platform) {
      case 'instagram':
        result = await publishToInstagram(
          account.access_token,
          account.account_id,
          options.videoUrl,
          options.caption
        )
        break
      case 'facebook':
        result = await publishToFacebook(
          account.access_token,
          account.account_id,
          options.videoUrl,
          options.caption
        )
        break
      case 'tiktok':
        result = await publishToTikTok(account.access_token, options.videoUrl, options.caption)
        break
      default:
        result = { success: false, error: 'Plataforma no soportada' }
    }

    results.push({
      platform: account.platform,
      ...result,
    })

    // Guardar registro de publicación en BD
    if (result.success) {
      await supabase.from('social_posts').insert({
        user_id: userId,
        social_account_id: account.id,
        platform: account.platform,
        post_id: result.postId,
        post_url: result.postUrl,
        copy_text: options.caption,
        video_url: options.videoUrl,
        posted_at: new Date().toISOString(),
      })
    }
  }

  return results
}

// ====================================
// GESTIÓN DE CUENTAS SOCIALES
// ====================================

// Conectar cuenta de Instagram
export async function connectInstagramAccount(
  userId: string,
  accessToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Obtener info de la cuenta
    const response = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
      params: { access_token: accessToken },
    })

    const pages = response.data.data
    if (!pages || pages.length === 0) {
      return { success: false, error: 'No se encontraron páginas de Facebook conectadas' }
    }

    // Por cada página, obtener cuenta de Instagram Business
    for (const page of pages) {
      const igResponse = await axios.get(
        `https://graph.facebook.com/v18.0/${page.id}?fields=instagram_business_account`,
        { params: { access_token: accessToken } }
      )

      if (igResponse.data.instagram_business_account) {
        const igAccountId = igResponse.data.instagram_business_account.id

        // Obtener nombre de cuenta
        const igInfoResponse = await axios.get(
          `https://graph.facebook.com/v18.0/${igAccountId}?fields=username`,
          { params: { access_token: accessToken } }
        )

        // Guardar en BD
        const { error } = await supabase.from('social_accounts').upsert({
          user_id: userId,
          platform: 'instagram',
          account_name: igInfoResponse.data.username,
          account_id: igAccountId,
          access_token: accessToken,
          is_active: true,
        })

        if (error) throw error
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error connecting Instagram:', error)
    return { success: false, error: 'Error al conectar cuenta de Instagram' }
  }
}

// Conectar cuenta de Facebook
export async function connectFacebookAccount(
  userId: string,
  accessToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Obtener páginas de Facebook
    const response = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
      params: { access_token: accessToken },
    })

    const pages = response.data.data
    if (!pages || pages.length === 0) {
      return { success: false, error: 'No se encontraron páginas de Facebook' }
    }

    // Guardar cada página en BD
    for (const page of pages) {
      const { error } = await supabase.from('social_accounts').upsert({
        user_id: userId,
        platform: 'facebook',
        account_name: page.name,
        account_id: page.id,
        access_token: page.access_token, // Page access token
        is_active: true,
      })

      if (error) throw error
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error connecting Facebook:', error)
    return { success: false, error: 'Error al conectar cuenta de Facebook' }
  }
}

// Conectar cuenta de TikTok
export async function connectTikTokAccount(
  userId: string,
  accessToken: string,
  accountName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // TikTok OAuth - obtener info de usuario
    const response = await axios.get('https://open-api.tiktok.com/oauth/userinfo/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    const tikTokUserId = response.data.data.user.open_id

    // Guardar en BD
    const { error } = await supabase.from('social_accounts').upsert({
      user_id: userId,
      platform: 'tiktok',
      account_name: accountName || response.data.data.user.display_name,
      account_id: tikTokUserId,
      access_token: accessToken,
      is_active: true,
    })

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    console.error('Error connecting TikTok:', error)
    return { success: false, error: 'Error al conectar cuenta de TikTok' }
  }
}

// Desconectar cuenta
export async function disconnectSocialAccount(
  userId: string,
  accountId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('social_accounts')
      .update({ is_active: false })
      .eq('id', accountId)
      .eq('user_id', userId)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    console.error('Error disconnecting account:', error)
    return { success: false, error: 'Error al desconectar cuenta' }
  }
}

// Obtener cuentas conectadas
export async function getSocialAccounts(userId: string): Promise<SocialAccount[]> {
  try {
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('connected_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('Error getting social accounts:', error)
    return []
  }
}

// Verificar si token está expirado
export function isTokenExpired(expiresAt?: string): boolean {
  if (!expiresAt) return false
  return new Date(expiresAt) < new Date()
}

// Refrescar access token (Facebook/Instagram)
export async function refreshAccessToken(
  accountId: string
): Promise<{ success: boolean; newToken?: string; error?: string }> {
  try {
    const { data: account, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('id', accountId)
      .single()

    if (error || !account) throw new Error('Cuenta no encontrada')

    if (account.platform === 'instagram' || account.platform === 'facebook') {
      // Extender token de Facebook/Instagram
      const response = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          fb_exchange_token: account.access_token,
        },
      })

      const newToken = response.data.access_token
      const expiresIn = response.data.expires_in // segundos

      // Actualizar en BD
      await supabase
        .from('social_accounts')
        .update({
          access_token: newToken,
          token_expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
        })
        .eq('id', accountId)

      return { success: true, newToken }
    }

    return { success: false, error: 'Plataforma no soporta refresh de token' }
  } catch (error: any) {
    console.error('Error refreshing token:', error)
    return { success: false, error: 'Error al refrescar token' }
  }
}

