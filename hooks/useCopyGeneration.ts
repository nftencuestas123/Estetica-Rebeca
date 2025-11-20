/**
 * Hook: Generación de Copy AI
 * Responsabilidad: Lógica de generación de textos virales
 */

'use client'

import { useState } from 'react'
import { generateViralCopy, generateCopyVariations } from '@/services/ai-copywriter'

export interface CopyGenerationState {
  copyPlatform: 'multi' | 'instagram' | 'facebook' | 'tiktok'
  generatedCopy: string
  copyVariations: string[]
  generatingCopy: boolean
  selectedCopyIndex: number
}

export const useCopyGeneration = () => {
  const [state, setState] = useState<CopyGenerationState>({
    copyPlatform: 'multi',
    generatedCopy: '',
    copyVariations: [],
    generatingCopy: false,
    selectedCopyIndex: 0,
  })

  const setCopyPlatform = (platform: 'multi' | 'instagram' | 'facebook' | 'tiktok') => {
    setState(prev => ({ ...prev, copyPlatform: platform }))
  }

  const setSelectedCopyIndex = (index: number) => {
    setState(prev => ({ ...prev, selectedCopyIndex: index }))
  }

  const generateCopy = async (videoUrl: string, videoIdea: string) => {
    setState(prev => ({ ...prev, generatingCopy: true }))

    try {
      const copy = await generateViralCopy({
        platform: state.copyPlatform,
        videoDescription: videoIdea,
        targetAudience: 'Beauty enthusiasts',
      })

      setState(prev => ({ ...prev, generatedCopy: copy, generatingCopy: false }))
    } catch (error) {
      setState(prev => ({ ...prev, generatingCopy: false }))
      throw error
    }
  }

  const generateVariations = async (videoIdea: string) => {
    if (!videoIdea) return

    setState(prev => ({ ...prev, generatingCopy: true }))

    try {
      const variations = await generateCopyVariations(videoIdea, state.copyPlatform, 3)
      const variationTexts = variations.map(v => typeof v === 'string' ? v : v.text)
      setState(prev => ({
        ...prev,
        copyVariations: variationTexts,
        generatingCopy: false,
      }))
    } catch (error) {
      setState(prev => ({ ...prev, generatingCopy: false }))
      throw error
    }
  }

  return {
    state,
    setCopyPlatform,
    setSelectedCopyIndex,
    generateCopy,
    generateVariations,
  }
}

