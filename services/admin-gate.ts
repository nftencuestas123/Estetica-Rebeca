/**
 * Servicio de Puerta de Seguridad para Administradores
 * Sistema de 3 preguntas personales para validar identidad
 */

import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

// =====================================================
// TIPOS
// =====================================================

export interface SecurityQuestion {
  id: string
  question_text: string
  question_order: number
  hint?: string
}

export interface SecurityAnswers {
  answer1: string
  answer2: string
  answer3: string
}

// AdminRegistrationData ya no se usa aquí
// El registro se maneja en /api/auth/register-admin

// =====================================================
// OBTENER PREGUNTAS DE SEGURIDAD
// =====================================================

/**
 * Obtiene las 3 preguntas de seguridad desde Supabase
 */
export async function getSecurityQuestions(): Promise<{
  success: boolean
  questions?: SecurityQuestion[]
  error?: string
}> {
  try {
    const { data, error } = await supabase
      .from('admin_security_gate')
      .select('id, question_text, question_order, hint')
      .eq('is_active', true)
      .order('question_order', { ascending: true })

    if (error) {
      logger.error('Error fetching security questions', { error })
      return { success: false, error: 'Error al cargar preguntas de seguridad' }
    }

    if (!data || data.length !== 3) {
      logger.error('Invalid number of security questions', { count: data?.length })
      return { success: false, error: 'Sistema de seguridad no configurado correctamente' }
    }

    return { success: true, questions: data }
  } catch (error: any) {
    logger.error('Exception fetching security questions', { error })
    return { success: false, error: error.message }
  }
}

// =====================================================
// VALIDAR RESPUESTAS DE SEGURIDAD
// =====================================================

/**
 * Valida las 3 respuestas de seguridad
 * Las respuestas se normalizan (lowercase, trim) antes de validar
 */
export async function validateSecurityAnswers(
  answers: SecurityAnswers
): Promise<{ valid: boolean; error?: string }> {
  try {
    logger.info('Validating security answers')

    // Llamar a la función de Supabase que valida las respuestas
    const { data, error } = await supabase.rpc('validate_admin_security_answers', {
      p_answer_1: answers.answer1,
      p_answer_2: answers.answer2,
      p_answer_3: answers.answer3,
    })

    if (error) {
      logger.error('Error validating security answers', { error })
      return { 
        valid: false, 
        error: 'Error al validar respuestas' 
      }
    }

    if (!data) {
      logger.warn('Security answers validation failed')
      return { 
        valid: false, 
        error: 'Respuestas incorrectas. Acceso denegado.' 
      }
    }

    logger.info('Security answers validated successfully')
    return { valid: true }
  } catch (error: any) {
    logger.error('Exception validating security answers', { error })
    return { valid: false, error: error.message }
  }
}

// =====================================================
// NOTA: El registro de administrador ahora se maneja en
// /api/auth/register-admin usando el nuevo sistema JWT
// =====================================================

