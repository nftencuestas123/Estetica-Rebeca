/**
 * Servicio: Instagram Publisher
 * Responsabilidad: Solo publicación en Instagram
 */

import axios from 'axios'

export async function publishToInstagram(
  accessToken: string,
  accountId: string,
  mediaUrl: string,
  caption: string,
  mediaType: 'IMAGE' | 'VIDEO' = 'VIDEO'
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    // Paso 1: Crear contenedor de medios
    const containerResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${accountId}/media`,
      {
        [mediaType === 'VIDEO' ? 'video_url' : 'image_url']: mediaUrl,
        caption: caption,
        media_type: mediaType,
        access_token: accessToken,
      }
    )

    const containerId = containerResponse.data.id

    // Paso 2: Publicar el contenedor
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${accountId}/media_publish`,
      {
        creation_id: containerId,
        access_token: accessToken,
      }
    )

    return {
      success: true,
      postId: publishResponse.data.id,
    }
  } catch (error: any) {
    console.error('Error publishing to Instagram:', error)
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Unknown error',
    }
  }
}

export async function publishReelToInstagram(
  accessToken: string,
  accountId: string,
  videoUrl: string,
  caption: string,
  coverUrl?: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    const containerResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${accountId}/media`,
      {
        video_url: videoUrl,
        caption: caption,
        media_type: 'REELS',
        cover_url: coverUrl,
        share_to_feed: true,
        access_token: accessToken,
      }
    )

    const containerId = containerResponse.data.id

    // Esperar a que el video se procese
    let status = 'IN_PROGRESS'
    let attempts = 0
    const maxAttempts = 30

    while (status === 'IN_PROGRESS' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const statusResponse = await axios.get(
        `https://graph.facebook.com/v18.0/${containerId}`,
        {
          params: {
            fields: 'status_code',
            access_token: accessToken,
          },
        }
      )

      status = statusResponse.data.status_code
      attempts++
    }

    if (status !== 'FINISHED') {
      throw new Error('Video processing timed out')
    }

    // Publicar
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${accountId}/media_publish`,
      {
        creation_id: containerId,
        access_token: accessToken,
      }
    )

    return {
      success: true,
      postId: publishResponse.data.id,
    }
  } catch (error: any) {
    console.error('Error publishing Reel to Instagram:', error)
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Unknown error',
    }
  }
}

