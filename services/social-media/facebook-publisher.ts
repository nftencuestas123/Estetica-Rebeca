/**
 * Servicio: Facebook Publisher
 * Responsabilidad: Solo publicación en Facebook
 */

import axios from 'axios'

export async function publishToFacebook(
  accessToken: string,
  pageId: string,
  message: string,
  videoUrl?: string,
  imageUrl?: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    const postData: any = {
      message: message,
      access_token: accessToken,
    }

    let endpoint = `https://graph.facebook.com/v18.0/${pageId}/feed`

    if (videoUrl) {
      endpoint = `https://graph.facebook.com/v18.0/${pageId}/videos`
      postData.file_url = videoUrl
      delete postData.message
      postData.description = message
    } else if (imageUrl) {
      endpoint = `https://graph.facebook.com/v18.0/${pageId}/photos`
      postData.url = imageUrl
      delete postData.message
      postData.caption = message
    }

    const response = await axios.post(endpoint, postData)

    return {
      success: true,
      postId: response.data.id,
    }
  } catch (error: any) {
    console.error('Error publishing to Facebook:', error)
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Unknown error',
    }
  }
}

export async function publishVideoToFacebook(
  accessToken: string,
  pageId: string,
  videoUrl: string,
  description: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${pageId}/videos`,
      {
        file_url: videoUrl,
        description: description,
        access_token: accessToken,
      }
    )

    return {
      success: true,
      postId: response.data.id,
    }
  } catch (error: any) {
    console.error('Error publishing video to Facebook:', error)
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Unknown error',
    }
  }
}

