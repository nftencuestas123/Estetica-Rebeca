/**
 * Servicio: Multi-Platform Publisher
 * Responsabilidad: Publicación coordinada en múltiples plataformas
 */

import { publishToInstagram, publishReelToInstagram } from './instagram-publisher'
import { publishVideoToFacebook } from './facebook-publisher'
import { publishToTikTok } from './tiktok-publisher'
import { getSocialAccounts } from './accounts-manager'

export interface PublishResult {
  platform: string
  success: boolean
  postId?: string
  error?: string
}

export async function publishToMultiplePlatforms({
  userId,
  platforms,
  videoUrl,
  caption,
}: {
  userId: string
  platforms: string[]
  videoUrl: string
  caption: string
}): Promise<PublishResult[]> {
  const accounts = await getSocialAccounts(userId)
  const results: PublishResult[] = []

  for (const platform of platforms) {
    const account = accounts.find(a => a.platform === platform && a.connected)

    if (!account || !account.access_token || !account.account_id) {
      results.push({
        platform,
        success: false,
        error: 'Account not connected',
      })
      continue
    }

    try {
      let result

      switch (platform) {
        case 'instagram':
          result = await publishReelToInstagram(
            account.access_token,
            account.account_id,
            videoUrl,
            caption
          )
          break

        case 'facebook':
          result = await publishVideoToFacebook(
            account.access_token,
            account.account_id,
            videoUrl,
            caption
          )
          break

        case 'tiktok':
          result = await publishToTikTok(
            account.access_token,
            videoUrl,
            caption
          )
          break

        default:
          result = { success: false, error: 'Unsupported platform' }
      }

      results.push({
        platform,
        ...result,
      })
    } catch (error: any) {
      results.push({
        platform,
        success: false,
        error: error.message,
      })
    }
  }

  return results
}

