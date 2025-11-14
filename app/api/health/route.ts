import { NextResponse } from 'next/server'

/**
 * Health Check endpoint para Railway
 * Railway puede usar este endpoint para verificar que la app está funcionando
 */
export async function GET() {
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
}

