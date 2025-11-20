import { NextResponse } from 'next/server'

/**
 * Health Check endpoint para Railway
 * Railway puede usar este endpoint para verificar que la app está funcionando
 * 
 * IMPORTANTE: Este endpoint debe ser dinámico para que Railway pueda verificar
 * que el servidor está funcionando correctamente
 */
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      checks: {
        supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        openrouter: !!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
      }
    }

    return NextResponse.json(health, { status: 200 })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

