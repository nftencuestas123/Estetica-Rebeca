/**
 * Logging estructurado compatible con Next.js
 * Funciona tanto en servidor como en cliente
 */

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'
const isServer = typeof window === 'undefined'

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'http'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  service: string
  environment: string
  [key: string]: any
}

/**
 * Función helper para formatear logs
 */
function formatLog(level: LogLevel, message: string, meta?: Record<string, any>): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    service: 'estetica-rebeca',
    environment: process.env.NODE_ENV || 'development',
    ...meta,
  }
}

/**
 * Logger principal de la aplicación
 * Compatible con Next.js (servidor y cliente)
 * 
 * @example
 * ```typescript
 * import { logger } from '@/lib/logger'
 * 
 * logger.info('User logged in', { userId: '123', email: 'user@example.com' })
 * logger.error('Payment failed', { error: err.message, userId: '123' })
 * logger.warn('Rate limit approaching', { userId: '123', requests: 95 })
 * ```
 */
export const logger = {
  debug: (message: string, meta?: Record<string, any>) => {
    if (isDevelopment) {
      const log = formatLog('debug', message, meta)
      console.log(`🔍 [DEBUG] ${message}`, meta || '')
    }
  },

  info: (message: string, meta?: Record<string, any>) => {
    const log = formatLog('info', message, meta)
    if (isDevelopment) {
      console.log(`ℹ️  [INFO] ${message}`, meta || '')
    } else {
      console.log(JSON.stringify(log))
    }
  },

  warn: (message: string, meta?: Record<string, any>) => {
    const log = formatLog('warn', message, meta)
    if (isDevelopment) {
      console.warn(`⚠️  [WARN] ${message}`, meta || '')
    } else {
      console.warn(JSON.stringify(log))
    }
  },

  error: (message: string, meta?: Record<string, any>) => {
    const log = formatLog('error', message, meta)
    if (isDevelopment) {
      console.error(`❌ [ERROR] ${message}`, meta || '')
    } else {
      console.error(JSON.stringify(log))
    }
  },

  http: (message: string, meta?: Record<string, any>) => {
    if (isDevelopment) {
      const log = formatLog('http', message, meta)
      console.log(`🌐 [HTTP] ${message}`, meta || '')
    }
  },
}

/**
 * Stream para Morgan (HTTP logging middleware)
 */
export const httpLoggerStream = {
  write: (message: string) => {
    logger.http(message.trim())
  },
}

/**
 * Helper para log de autenticación
 */
export const authLogger = {
  login: (userId: string, email: string) => {
    logger.info('User login successful', { userId, email, action: 'login' })
  },
  logout: (userId: string) => {
    logger.info('User logout', { userId, action: 'logout' })
  },
  loginFailed: (email: string, reason: string) => {
    logger.warn('Login failed', { email, reason, action: 'login_failed' })
  },
  register: (userId: string, email: string) => {
    logger.info('User registered', { userId, email, action: 'register' })
  },
}

/**
 * Helper para log de operaciones de créditos
 */
export const creditLogger = {
  purchase: (userId: string, amount: number, method: string) => {
    logger.info('Credit purchase request', {
      userId,
      amount,
      method,
      action: 'credit_purchase',
    })
  },
  approved: (userId: string, amount: number, requestId: string) => {
    logger.info('Credit purchase approved', {
      userId,
      amount,
      requestId,
      action: 'credit_approved',
    })
  },
  deducted: (userId: string, amount: number, reason: string) => {
    logger.info('Credits deducted', {
      userId,
      amount,
      reason,
      action: 'credit_deducted',
    })
  },
  insufficientBalance: (userId: string, required: number, current: number) => {
    logger.warn('Insufficient balance', {
      userId,
      required,
      current,
      action: 'insufficient_balance',
    })
  },
}

/**
 * Helper para log de errores de API
 */
export const apiLogger = {
  request: (method: string, url: string, userId?: string) => {
    logger.http('API request', { method, url, userId, action: 'api_request' })
  },
  response: (method: string, url: string, statusCode: number, duration: number) => {
    logger.http('API response', {
      method,
      url,
      statusCode,
      duration,
      action: 'api_response',
    })
  },
  error: (method: string, url: string, error: string) => {
    logger.error('API error', { method, url, error, action: 'api_error' })
  },
}

export default logger
