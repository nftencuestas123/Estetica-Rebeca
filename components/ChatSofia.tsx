/**
 * Componente Principal: ChatSofia
 * Responsabilidad: Orquestar el chat (solo coordinación)
 * 
 * REFACTORIZADO CON SRP:
 * - Hooks para lógica de negocio
 * - Subcomponentes para UI
 * - Este archivo solo coordina
 */

'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useMobileDetect, useMobileScrollLock } from '@/hooks/useMobileDetect'
import { useChatMessages } from '@/hooks/useChatMessages'
import { useChatPersistence } from '@/hooks/useChatPersistence'
import ChatButton from './sofia/ChatButton'
import ChatHeader from './sofia/ChatHeader'
import ChatMessageList from './sofia/ChatMessageList'
import ChatInputForm from './sofia/ChatInputForm'

interface ChatSofiaProps {
  userId?: string
  initialMessage?: string
  position?: 'floating' | 'embedded'
}

export default function ChatSofia({ userId, initialMessage, position = 'floating' }: ChatSofiaProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)

  // Hooks de lógica de negocio
  const { isMobile } = useMobileDetect()
  const { messages, loading, sendMessage, setMessagesFromHistory } = useChatMessages()
  const { saveMessage } = useChatPersistence({
    userId,
    isOpen,
    onHistoryLoaded: setMessagesFromHistory,
  })

  // Bloquear scroll en móvil
  useMobileScrollLock(isOpen, isMobile)

  // Mostrar tooltip al abrir en móvil
  useEffect(() => {
    if (isOpen && isMobile) {
      setShowTooltip(true)
      const timer = setTimeout(() => setShowTooltip(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isMobile])

  // Manejar envío de mensaje
  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')

    try {
      const response = await sendMessage(userMessage)
      // Guardar en base de datos si hay userId
      if (userId) {
        await saveMessage(userMessage, response)
      }
    } catch (error) {
      // Error ya manejado en el hook
    }
  }

  // Modo embedded (sin botón flotante)
  if (position === 'embedded') {
    return (
      <div className="flex flex-col h-full">
        <ChatMessageList messages={messages} loading={loading} />
        <ChatInputForm
          value={input}
          onChange={setInput}
          onSend={handleSend}
          loading={loading}
          autoFocus
        />
      </div>
    )
  }

  // Modo floating (con botón flotante)
  return (
    <>
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}

      {isOpen && (
        <div
          className={cn(
            "fixed flex flex-col z-[9999] bg-cream-50 shadow-2xl",
            isMobile
              ? "inset-0 h-screen w-screen"
              : "bottom-6 right-6 w-96 h-[600px] rounded-lg border border-primary-200"
          )}
        >
          <ChatHeader
            onClose={() => setIsOpen(false)}
            isMobile={isMobile}
            showTooltipInitial={showTooltip}
          />
          <ChatMessageList messages={messages} loading={loading} isMobile={isMobile} />
          <ChatInputForm
            value={input}
            onChange={setInput}
            onSend={handleSend}
            loading={loading}
            isMobile={isMobile}
            autoFocus={isOpen}
          />
        </div>
      )}
    </>
  )
}








