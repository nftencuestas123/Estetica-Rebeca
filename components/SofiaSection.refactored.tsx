/**
 * Componente principal de sección Sofia
 * Responsabilidad: Orquestar la UI del chat y agentes
 */

'use client'

import { motion } from 'framer-motion'
import type { SofiaSectionProps } from '@/types/sofia.types'
import { useChat } from '@/hooks/useChat'
import { AgentCard } from './sofia/AgentCard'
import { ChatMessage } from './sofia/ChatMessage'
import { ChatInput } from './sofia/ChatInput'

export default function SofiaSection({ userId }: SofiaSectionProps) {
  const {
    messages,
    input,
    setInput,
    loading,
    currentAgent,
    agents,
    messagesContainerRef,
    inputRef,
    sendMessage,
  } = useChat(userId)

  const handleSend = () => {
    sendMessage(input)
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-200/20 via-primary-300/20 to-primary-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary-200/25 via-primary-300/25 to-primary-400/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-200/30 via-primary-300/30 to-primary-400/30 border-2 border-primary-200/50 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(201,163,71,0.3)',
                '0 0 40px rgba(201,163,71,0.5)',
                '0 0 20px rgba(201,163,71,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              Atención al Cliente 24/7
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
            Hablá con{' '}
            <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent animate-gradient">
              Nuestro Equipo
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-light text-white max-w-2xl mx-auto px-4">
            Nuestras especialistas están acá para ayudarte. Elegí con quién querés hablar.
          </p>
        </motion.div>

        {/* Grid de agentes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AgentCard
                agent={agent}
                isActive={currentAgent?.id === agent.id}
                onClick={() => {}}
              />
            </motion.div>
          ))}
        </div>

        {/* Chat interface */}
        {currentAgent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-cream-100/95 md:backdrop-blur-md rounded-3xl shadow-2xl border-2 border-primary-200/50 overflow-visible"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 p-5 pl-40">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {currentAgent.name}
                  </h3>
                  <p className="text-sm text-white">
                    {currentAgent.status === 'available' ? 'Disponible' : 'En conversación'}
                  </p>
                </div>
                <motion.div
                  className="w-3 h-3 bg-primary-100 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="h-[300px] sm:h-[350px] md:h-[400px] overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-cream-50 to-transparent space-y-3 sm:space-y-4 custom-scrollbar"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-200/20 via-primary-300/20 to-primary-400/20 flex items-center justify-center">
                    <span className="text-3xl">💬</span>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-white mb-2">
                    ¡Hola! Soy {currentAgent.name}
                  </p>
                  <p className="text-sm sm:text-base text-white font-light px-4">
                    Estoy acá para ayudarte con lo que necesites. ¿En qué puedo asistirte hoy?
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <ChatMessage key={message.id} message={message} index={index} />
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 sm:p-6 bg-cream-50 border-t-2 border-primary-100">
              <ChatInput
                value={input}
                onChange={setInput}
                onSend={handleSend}
                loading={loading}
                placeholder={`Escribí tu mensaje para ${currentAgent.name}...`}
                inputRef={inputRef}
              />
            </div>
          </motion.div>
        )}

        {/* Info adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-4 bg-cream-100/50 backdrop-blur-sm rounded-2xl p-4 border border-primary-200/50"
        >
          <p className="text-xs sm:text-sm text-white font-light">
            <span className="font-semibold text-white">Tiempo de respuesta:</span>{' '}
            <span className="font-semibold text-white">menos de 2 minutos</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

