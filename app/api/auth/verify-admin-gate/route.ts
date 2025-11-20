/**
 * API ROUTE: POST /api/auth/verify-admin-gate
 * Verifica las 3 preguntas de seguridad para registro de admin
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyPassword } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answer1, answer2, answer3 } = body

    if (!answer1 || !answer2 || !answer3) {
      return NextResponse.json(
        { error: 'Debes responder las 3 preguntas' },
        { status: 400 }
      )
    }

    // =====================================================
    // OBTENER LAS PREGUNTAS Y HASHES DE LA BASE DE DATOS
    // =====================================================

    const { data: questions, error: questionsError } = await supabase
      .from('admin_security_gate')
      .select('*')
      .eq('is_active', true)
      .order('question_order', { ascending: true })

    if (questionsError || !questions || questions.length !== 3) {
      return NextResponse.json(
        { error: 'Error al cargar las preguntas de seguridad' },
        { status: 500 }
      )
    }

    // =====================================================
    // VERIFICAR RESPUESTAS
    // =====================================================

    // Normalizar respuestas (minúsculas y sin espacios extra)
    const answers = [
      answer1.toLowerCase().trim(),
      answer2.toLowerCase().trim(),
      answer3.toLowerCase().trim(),
    ]
    let allCorrect = true

    for (let i = 0; i < 3; i++) {
      const isCorrect = await verifyPassword(answers[i], questions[i].answer_hash)
      if (!isCorrect) {
        allCorrect = false
        break
      }
    }

    // =====================================================
    // RESPUESTA
    // =====================================================

    if (!allCorrect) {
      return NextResponse.json(
        { error: 'Respuestas incorrectas. Intenta de nuevo.' },
        { status: 401 }
      )
    }

    // ✅ Todas las respuestas son correctas
    // El frontend procederá a mostrar el formulario de registro

    return NextResponse.json(
      {
        success: true,
        message: 'Respuestas verificadas correctamente. Puedes proceder con el registro.',
        verified: true,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Exception in /api/auth/verify-admin-gate:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

