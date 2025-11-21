/**
 * Sistema de monitoreo de performance
 * Mide tiempos de ejecuci├│n y env├¡a m├⌐tricas
 */

import { logger } from './logger'

export interface PerformanceMeasure {
  name: string
  duration: number
  metadata?: Record<string, any>
}

/**
 * Inicia una medici├│n de performance
 * 
 * @param name - Nombre de la operaci├│n a medir
 * @returns Objeto con m├⌐todo end() para finalizar la medici├│n
 * 
 * @example
 * ```typescript
 * const perf = measurePerformance('fetch-user-data')
 * const data = await fetchUserData()
 * perf.end({ userId: '123' })
 * ```
 */
export function measurePerformance(name: string) {
  const start = performance.now()
  
  return {
    /**
     * Finaliza la medici├│n y registra el resultado
     * @param metadata - Metadata adicional para el log
     */
    end: (metadata?: Record<string, any>) => {
      const duration = performance.now() - start
      
      // Log de performance
      logger.debug('Performance measurement', {
        name,
        duration: `${duration.toFixed(2)}ms`,
        ...metadata,
      })
      
      // Si est├í en el navegador, enviar a analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'timing_complete', {
          name,
          value: Math.round(duration),
          event_category: 'performance',
        })
      }
      
      return duration
    },
  }
}

/**
 * Mide el tiempo de una funci├│n as├¡ncrona
 * 
 * @param name - Nombre de la operaci├│n
 * @param fn - Funci├│n a ejecutar y medir
 * @returns Resultado de la funci├│n
 * 
 * @example
 * ```typescript
 * const data = await measureAsync('fetch-treatments', async () => {
 *   return await getTreatments()
 * })
 * ```
 */
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const perf = measurePerformance(name)
  try {
    const result = await fn()
    perf.end({ status: 'success' })
    return result
  } catch (error) {
    perf.end({ status: 'error', error: (error as Error).message })
    throw error
  }
}

/**
 * Helper para medir tiempos de API
 */
export const apiPerformance = {
  /**
   * Mide el tiempo de una llamada API
   */
  measure: (endpoint: string, method: string) => {
    return measurePerformance(`api_${method.toLowerCase()}_${endpoint}`)
  },
}

/**
 * Helper para medir tiempos de renderizado de componentes
 */
export const componentPerformance = {
  /**
   * Mide el tiempo de renderizado de un componente
   */
  measure: (componentName: string) => {
    return measurePerformance(`component_render_${componentName}`)
  },
}

/**
 * Helper para medir operaciones de base de datos
 */
export const dbPerformance = {
  /**
   * Mide el tiempo de una query a la base de datos
   */
  measure: (operation: string, table: string) => {
    return measurePerformance(`db_${operation}_${table}`)
  },
}

/**
 * Obtiene m├⌐tricas de Web Vitals (Core Web Vitals)
 */
export function reportWebVitals(metric: any): void {
  logger.info('Web Vital', {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  })

  // Enviar a analytics si est├í configurado
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

const performanceTracker = { measurePerformance, measureAsync, reportWebVitals }
export default performanceTracker

