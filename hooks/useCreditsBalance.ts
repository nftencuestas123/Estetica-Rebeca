/**
 * Hook: Balance de Créditos
 * Responsabilidad: Gestión del balance de créditos del usuario
 */

'use client'

import { useState, useEffect } from 'react'
import { getUserBalance } from '@/services/credits'

export const useCreditsBalance = (userId: string | undefined) => {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      loadBalance()
    }
  }, [userId])

  const loadBalance = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const userBalance = await getUserBalance(userId)
      setBalance(userBalance)
    } catch (error) {
      console.error('Error loading balance:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshBalance = () => {
    loadBalance()
  }

  return {
    balance,
    loading,
    refreshBalance,
  }
}

