/**
 * Servicio de Aprendizaje Autom├ítico
 * Responsabilidad: Aprender de conversaciones reales y mejorar respuestas
 */

import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export interface VocabularioParaguayo {
  id?: string
  palabra_o_frase: string
  significado: string
  contexto?: string
  ejemplos_uso?: string[]
  frecuencia_uso?: number
  confianza?: number
}

export interface PatronConversacion {
  id?: string
  patron_entrada: string
  patron_respuesta: string
  categoria?: string
  efectividad?: number
  veces_usado?: number
}

export interface FeedbackConversacion {
  conversacion_id?: string
  usuario_id?: string
  mensaje_usuario: string
  respuesta_sofia: string
  fue_util?: boolean
  requirio_correccion?: boolean
  correccion_sugerida?: string
  contexto_cultural?: string
}

export class LearningService {
  /**
   * Detecta si un mensaje contiene vocabulario paraguayo
   */
  static async detectarVocabularioParaguayo(mensaje: string): Promise<VocabularioParaguayo[]> {
    try {
      const { data, error } = await supabase
        .from('vocabulario_paraguayo')
        .select('*')
        .order('frecuencia_uso', { ascending: false })

      if (error) throw error

      // Buscar palabras/frases en el mensaje
      const palabrasEncontradas = data?.filter((vocab) => {
        const regex = new RegExp(`\\b${vocab.palabra_o_frase}\\b`, 'i')
        return regex.test(mensaje)
      })

      return palabrasEncontradas || []
    } catch (error) {
      console.error('Error detectando vocabulario:', error)
      return []
    }
  }

  /**
   * Busca patrones de conversaci├│n relevantes
   */
  static async buscarPatronRelevante(mensaje: string): Promise<PatronConversacion | null> {
    try {
      const { data, error } = await supabase
        .from('patrones_conversacion')
        .select('*')
        .order('efectividad', { ascending: false })

      if (error) throw error

      // Buscar patr├│n que coincida
      const patronEncontrado = data?.find((patron) => {
        try {
          const regex = new RegExp(patron.patron_entrada, 'i')
          return regex.test(mensaje)
        } catch {
          return false
        }
      })

      // Actualizar contador de uso
      if (patronEncontrado) {
        await supabase
          .from('patrones_conversacion')
          .update({
            veces_usado: (patronEncontrado.veces_usado || 0) + 1,
            ultima_vez_usado: new Date().toISOString(),
          })
          .eq('id', patronEncontrado.id)
      }

      return patronEncontrado || null
    } catch (error) {
      console.error('Error buscando patr├│n:', error)
      return null
    }
  }

  /**
   * Registra feedback de una conversaci├│n
   */
  static async registrarFeedback(feedback: FeedbackConversacion): Promise<void> {
    try {
      const { error } = await supabase.from('feedback_conversaciones').insert(feedback)

      if (error) throw error

      // Si requiri├│ correcci├│n, aprender de ello
      if (feedback.requirio_correccion && feedback.correccion_sugerida) {
        await this.aprenderDeCorreccion(
          feedback.mensaje_usuario,
          feedback.respuesta_sofia,
          feedback.correccion_sugerida
        )
      }
    } catch (error) {
      console.error('Error registrando feedback:', error)
    }
  }

  /**
   * Aprende de una correcci├│n manual
   */
  private static async aprenderDeCorreccion(
    mensajeOriginal: string,
    respuestaOriginal: string,
    correccionSugerida: string
  ): Promise<void> {
    try {
      await supabase.from('aprendizaje_continuo').insert({
        tipo: 'correccion',
        dato_original: `Mensaje: ${mensajeOriginal} | Respuesta: ${respuestaOriginal}`,
        dato_aprendido: correccionSugerida,
        fuente: 'feedback',
        validado: false,
      })
    } catch (error) {
      console.error('Error aprendiendo de correcci├│n:', error)
    }
  }

  /**
   * Detecta la intenci├│n del mensaje
   */
  static async detectarIntencion(mensaje: string): Promise<string> {
    const mensajeLower = mensaje.toLowerCase()

    // Patrones de agendamiento (incluyendo "marcar")
    if (
      /\b(marcar|agendar|reservar|turno|cita|hora)\b/i.test(mensajeLower) &&
      /\b(para|el|a las|ma├▒ana|hoy|viernes|lunes|martes|mi├⌐rcoles|jueves|s├íbado|domingo)\b/i.test(
        mensajeLower
      )
    ) {
      return 'agendar'
    }

    // Patrones de consulta
    if (/\b(cu├ínto|precio|costo|valor|informaci├│n|qu├⌐ es|c├│mo)\b/i.test(mensajeLower)) {
      return 'consultar'
    }

    // Patrones de cancelaci├│n
    if (/\b(cancelar|anular|cambiar|reprogramar)\b/i.test(mensajeLower)) {
      return 'cancelar'
    }

    // Patrones de saludo
    if (/\b(hola|buenos d├¡as|buenas tardes|buenas noches|hey)\b/i.test(mensajeLower)) {
      return 'saludo'
    }

    return 'acompanar'
  }

  /**
   * Registra una nueva palabra o frase aprendida
   */
  static async aprenderNuevaPalabra(vocabulario: VocabularioParaguayo): Promise<void> {
    try {
      const { error } = await supabase
        .from('vocabulario_paraguayo')
        .upsert(vocabulario, { onConflict: 'palabra_o_frase' })

      if (error) throw error

      logger.info(`Aprendida nueva palabra: ${vocabulario.palabra_o_frase}`)
    } catch (error) {
      console.error('Error aprendiendo nueva palabra:', error)
    }
  }

  /**
   * Registra un nuevo patr├│n de conversaci├│n
   */
  static async aprenderNuevoPatron(patron: PatronConversacion): Promise<void> {
    try {
      const { error } = await supabase.from('patrones_conversacion').insert(patron)

      if (error) throw error

      logger.info(`Aprendido nuevo patrón: ${patron.categoria}`)
    } catch (error) {
      console.error('Error aprendiendo nuevo patr├│n:', error)
    }
  }

  /**
   * Obtiene estad├¡sticas de aprendizaje
   */
  static async obtenerEstadisticas(): Promise<{
    total_vocabulario: number
    total_patrones: number
    total_feedback: number
    palabras_mas_usadas: VocabularioParaguayo[]
  }> {
    try {
      const [vocabCount, patronesCount, feedbackCount, palabrasTop] = await Promise.all([
        supabase.from('vocabulario_paraguayo').select('*', { count: 'exact', head: true }),
        supabase.from('patrones_conversacion').select('*', { count: 'exact', head: true }),
        supabase.from('feedback_conversaciones').select('*', { count: 'exact', head: true }),
        supabase
          .from('vocabulario_paraguayo')
          .select('*')
          .order('frecuencia_uso', { ascending: false })
          .limit(10),
      ])

      return {
        total_vocabulario: vocabCount.count || 0,
        total_patrones: patronesCount.count || 0,
        total_feedback: feedbackCount.count || 0,
        palabras_mas_usadas: palabrasTop.data || [],
      }
    } catch (error) {
      console.error('Error obteniendo estad├¡sticas:', error)
      return {
        total_vocabulario: 0,
        total_patrones: 0,
        total_feedback: 0,
        palabras_mas_usadas: [],
      }
    }
  }
}

