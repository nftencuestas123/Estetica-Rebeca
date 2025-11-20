/**
 * Helper para crear cliente de Supabase en API routes
 * Maneja correctamente las variables de entorno durante build time
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Cliente lazy para evitar inicialización durante build time
let supabaseClient: SupabaseClient | null = null
let lastUsedUrl: string | null = null
let lastUsedKey: string | null = null

// Valores por defecto válidos SOLO para build time (cuando no hay variables de entorno)
// Estos valores permiten que el build pase sin errores
// ⚠️ IMPORTANTE: En producción (Railway), SIEMPRE se usarán las variables de entorno si están configuradas
const BUILD_TIME_URL = 'https://xvwzpgaxlqkfuwrqtlyp.supabase.co'
const BUILD_TIME_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2d3pwZ2F4bHFrZnV3cnF0bHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.dummy'

/**
 * Crea un cliente de Supabase para uso en servidor (API routes)
 * 
 * PRIORIDAD:
 * 1. Variables de entorno (Railway) - SIEMPRE se usan si están disponibles
 * 2. Valores por defecto - SOLO si no hay variables de entorno (build time)
 * 
 * En producción (Railway), las variables de entorno tienen PRIORIDAD ABSOLUTA
 */
export function getSupabaseClient(): SupabaseClient {
  // Obtener variables de entorno (PRIORIDAD #1)
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const envKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Determinar qué valores usar
  let supabaseUrl: string
  let supabaseKey: string
  let usingEnvVars = false

  // VALIDAR Y USAR VARIABLES DE ENTORNO (si están disponibles)
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '' && envUrl.trim() !== 'undefined') {
    const trimmed = envUrl.trim()
    // Validar que sea una URL válida de Supabase
    if (trimmed.startsWith('https://') && trimmed.includes('.supabase.co')) {
      supabaseUrl = trimmed
      usingEnvVars = true
    } else {
      // URL inválida, usar default
      supabaseUrl = BUILD_TIME_URL
    }
  } else {
    // No hay variable de entorno, usar default
    supabaseUrl = BUILD_TIME_URL
  }

  if (envKey && typeof envKey === 'string' && envKey.trim() !== '' && envKey.trim() !== 'undefined') {
    const trimmed = envKey.trim()
    // Validar que tenga formato de JWT (básico)
    if (trimmed.length > 50 && trimmed.includes('.')) {
      supabaseKey = trimmed
      usingEnvVars = true
    } else {
      // Key inválida, usar default
      supabaseKey = BUILD_TIME_KEY
    }
  } else {
    // No hay variable de entorno, usar default
    supabaseKey = BUILD_TIME_KEY
  }

  // Si estamos usando variables de entorno, invalidar el cliente anterior si cambió
  if (usingEnvVars && supabaseClient) {
    if (lastUsedUrl !== supabaseUrl || lastUsedKey !== supabaseKey) {
      // Las variables cambiaron, recrear el cliente
      supabaseClient = null
    }
  }

  // Si ya existe un cliente con los mismos valores, reutilizarlo
  if (supabaseClient && lastUsedUrl === supabaseUrl && lastUsedKey === supabaseKey) {
    return supabaseClient
  }

  // Crear cliente SIEMPRE con valores válidos (nunca undefined o vacío)
  // 
  // COMPORTAMIENTO:
  // - En BUILD TIME: Usa BUILD_TIME_URL/KEY (si no hay variables de entorno)
  // - En PRODUCCIÓN (Railway): Usa las variables de entorno configuradas (PRIORIDAD)
  // 
  // Si configuraste NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Railway,
  // el sistema SIEMPRE usará esas variables, nunca los valores por defecto.
  try {
    supabaseClient = createClient(
      supabaseUrl as string,
      supabaseKey as string,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )
    
    // Guardar los valores usados para comparación futura
    lastUsedUrl = supabaseUrl
    lastUsedKey = supabaseKey
    
    // Log en desarrollo para debugging (no en producción)
    if (process.env.NODE_ENV === 'development') {
      if (usingEnvVars) {
        console.log('[Supabase] ✅ Usando variables de entorno de Railway/producción')
      } else {
        console.warn('[Supabase] ⚠️ Usando valores por defecto (build time). Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Railway.')
      }
    }
  } catch (error) {
    // Si falla por alguna razón, intentar con valores por defecto
    console.error('Error creating Supabase client:', error)
    try {
      supabaseClient = createClient(BUILD_TIME_URL, BUILD_TIME_KEY, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
      lastUsedUrl = BUILD_TIME_URL
      lastUsedKey = BUILD_TIME_KEY
    } catch (fallbackError) {
      console.error('Error creating Supabase client with defaults:', fallbackError)
      throw new Error('No se pudo inicializar el cliente de Supabase')
    }
  }
  
  return supabaseClient
}

