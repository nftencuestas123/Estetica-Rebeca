/**
 * Servicio: TikTok Publisher
 * Responsabilidad: Solo publicación en TikTok
 */

import axios from 'axios'

export async function publishToTikTok(
  accessToken: string,
  videoUrl: string,
  caption: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    // Iniciar upload
    const initResponse = await axios.post(
      'https://open-api.tiktok.com/v2/video/init/',
      {
        post_info: {
          title: caption,
          privacy_level: 'PUBLIC_TO_EVERYONE',
          disable_duet: false,
          disable_comment: false,
          disable_stitch: false,
          video_cover_timestamp_ms: 1000,
        },
        source_info: {
          source: 'FILE_URL',
          video_url: videoUrl,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const uploadId = initResponse.data.data.upload_id

    // Confirmar upload
    const publishResponse = await axios.post(
      'https://open-api.tiktok.com/v2/video/publish/',
      {
        upload_id: uploadId,
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
      postId: publishResponse.data.data.publish_id,
    }
  } catch (error: any) {
    console.error('Error publishing to TikTok:', error)
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Unknown error',
    }
  }
}

