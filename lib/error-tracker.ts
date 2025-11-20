/**
 * Sistema de tracking de errores y excepciones
 * Integraci├│n lista para Sentry u otros servicios
 */

import { logger } from './logger'

export interface ErrorContext {
  userId?: string
  email?: string
  action?: string
  component?: string
  metadata?: Record<string, any>
}

/**
 * Captura y registra un error con contexto adicional
 * 
 * @param error - El error a capturar
 * @param context - Contexto adicional del error
 * 
 * @example
 * ```typescript
 * try {
 *   await rieskyOperation()
 * } catch (error) {
 *   captureError(error as Error, {
 *     userId: '123',
 *     action: 'payment',
 *     component: 'CheckoutForm'
 *   })
 * }
 * ```
 */
export function captureError(error: Error, context?: ErrorContext): void {
  // Log estructurado con Winston
  logger.error('Error captured', {
    error: error.message,
    stack: error.stack,
    name: error.name,
    ...context,
  })

  // Si Sentry está configurado, enviar también ahí
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // En producción, aquí iría:
    // Sentry.captureException(error, { extra: context })
    logger.debug('Sentry would capture error', { error: error.message })
  }
}

/**
 * Captura una excepci├│n no manejada
 */
export function captureUnhandledException(error: Error): void {
  captureError(error, {
    action: 'unhandled_exception',
    metadata: {
      timestamp: new Date().toISOString(),
    },
  })
}

/**
 * Captura un rechazo de promesa no manejado
 */
export function captureUnhandledRejection(reason: any): void {
  const error = reason instanceof Error ? reason : new Error(String(reason))
  
  captureError(error, {
    action: 'unhandled_rejection',
    metadata: {
      timestamp: new Date().toISOString(),
    },
  })
}

/**
 * Inicializa el sistema de tracking de errores
 * Debe llamarse al inicio de la aplicaci├│n
 */
export function initErrorTracking(): void {
  if (typeof window !== 'undefined') {
    // Capturar errores no manejados
    window.addEventListener('error', (event) => {
      captureUnhandledException(event.error)
    })

    // Capturar promesas rechazadas no manejadas
    window.addEventListener('unhandledrejection', (event) => {
      captureUnhandledRejection(event.reason)
    })

    logger.info('Error tracking initialized')
  }
}

/**
 * Helper para errores de API
 */
export const apiErrorTracker = {
  /**
   * Registra un error de API con contexto
   */
  track: (endpoint: string, error: Error, statusCode?: number) => {
    captureError(error, {
      action: 'api_error',
      component: 'APIClient',
      metadata: {
        endpoint,
        statusCode,
        timestamp: new Date().toISOString(),
      },
    })
  },
}

/**
 * Helper para errores de autenticaci├│n
 */
export const authErrorTracker = {
  /**
   * Registra un error de autenticaci├│n
   */
  track: (email: string, error: Error, action: string) => {
    captureError(error, {
      email,
      action: `auth_error_${action}`,
      component: 'AuthSystem',
    })
  },
}

const errorTracker = { captureError, initErrorTracking }
export default errorTracker

