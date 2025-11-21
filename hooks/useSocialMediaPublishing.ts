/**
 * Hook: Publicación en Redes Sociales
 * Responsabilidad: Lógica de publicación multiplataforma
 */

'use client'

import { useState, useEffect } from 'react'
import { publishToMultiplePlatforms, getSocialAccounts } from '@/services/social-media'

export interface SocialAccount {
  platform: string
  username: string
  connected: boolean
}

export const useSocialMediaPublishing = (userId: string | undefined) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([])
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    if (userId) {
      loadConnectedAccounts()
    }
  }, [userId])

  const loadConnectedAccounts = async () => {
    if (!userId) return

    try {
      const accounts = await getSocialAccounts(userId)
      setConnectedAccounts(accounts)
    } catch (error) {
      console.error('Error loading social accounts:', error)
    }
  }

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const publishContent = async (videoUrl: string, caption: string) => {
    if (selectedPlatforms.length === 0 || !userId) {
      throw new Error('Selecciona al menos una plataforma')
    }

    setPublishing(true)

    try {
      await publishToMultiplePlatforms({
        userId,
        platforms: selectedPlatforms,
        videoUrl,
        caption,
      })
      setPublishing(false)
    } catch (error) {
      setPublishing(false)
      throw error
    }
  }

  return {
    selectedPlatforms,
    connectedAccounts,
    publishing,
    togglePlatform,
    publishContent,
    loadConnectedAccounts,
  }
}

