/**
 * Hook: Generación de Videos
 * Responsabilidad: Lógica de generación y estado de videos
 */

'use client'

import { useState } from 'react'
import { generateVideo, getVideoStatus } from '@/services/topview'
import { calculateVideoCost, deductCredits } from '@/services/credits'

export interface VideoGenerationState {
  imageFile: File | null
  imagePreview: string | null
  videoIdea: string
  duration: 0.5 | 1 | 2 | 5 | 10
  generatingVideo: boolean
  generatedVideoUrl: string | null
  videoCost: number
}

export const useVideoGeneration = (userId: string | undefined) => {
  const [state, setState] = useState<VideoGenerationState>({
    imageFile: null,
    imagePreview: null,
    videoIdea: '',
    duration: 1,
    generatingVideo: false,
    generatedVideoUrl: null,
    videoCost: 0,
  })

  const setImageFile = (file: File | null) => {
    setState(prev => ({ ...prev, imageFile: file }))
  }

  const setImagePreview = (preview: string | null) => {
    setState(prev => ({ ...prev, imagePreview: preview }))
  }

  const setVideoIdea = (idea: string) => {
    setState(prev => ({ ...prev, videoIdea: idea }))
  }

  const setDuration = (duration: 0.5 | 1 | 2 | 5 | 10) => {
    const cost = calculateVideoCost(duration)
    setState(prev => ({ ...prev, duration, videoCost: cost }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateVideoFromImage = async () => {
    if (!state.imageFile || !userId) return

    setState(prev => ({ ...prev, generatingVideo: true }))

    try {
      // Deducir créditos primero
      await deductCredits(userId, state.videoCost)

      // Generar video
      const result = await generateVideo(
        state.imageFile!,
        state.videoIdea,
        `duration_${state.duration}`
      )

      // Polling del estado
      let videoUrl = null
      const maxAttempts = 60
      let attempts = 0

      while (!videoUrl && attempts < maxAttempts) {
        const status = await getVideoStatus(result.jobId)
        if (status.status === 'completed' && status.videoUrl) {
          videoUrl = status.videoUrl
          break
        } else if (status.status === 'error') {
          throw new Error('Video generation failed')
        }
        await new Promise(resolve => setTimeout(resolve, 5000))
        attempts++
      }

      if (!videoUrl) {
        throw new Error('Video generation timed out')
      }

      setState(prev => ({ ...prev, generatedVideoUrl: videoUrl!, generatingVideo: false }))
    } catch (error) {
      setState(prev => ({ ...prev, generatingVideo: false }))
      throw error
    }
  }

  return {
    state,
    handleImageUpload,
    setVideoIdea,
    setDuration,
    generateVideoFromImage,
  }
}

