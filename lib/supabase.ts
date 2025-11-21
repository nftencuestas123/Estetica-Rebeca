import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Valores por defecto válidos SOLO para build time (cuando no hay variables de entorno)
// ⚠️ IMPORTANTE: En producción (Railway), SIEMPRE se usarán las variables de entorno si están configuradas
const BUILD_TIME_URL = 'https://xvwzpgaxlqkfuwrqtlyp.supabase.co'
const BUILD_TIME_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2d3pwZ2F4bHFrZnV3cnF0bHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.dummy'

// Obtener variables de entorno (PRIORIDAD #1 - se usan SIEMPRE si están disponibles)
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// PRIORIDAD: Variables de entorno > Valores por defecto
// En Railway, si configuraste NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY,
// el sistema SIEMPRE usará esas variables, nunca los valores por defecto.

// Validar y usar URL de entorno (si está disponible)
let supabaseUrl: string
if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '' && envUrl.trim() !== 'undefined') {
  const trimmed = envUrl.trim()
  // Validar que sea una URL válida de Supabase
  if (trimmed.startsWith('https://') && trimmed.includes('.supabase.co')) {
    supabaseUrl = trimmed // ✅ Usar variable de entorno
  } else {
    supabaseUrl = BUILD_TIME_URL // URL inválida, usar default
  }
} else {
  supabaseUrl = BUILD_TIME_URL // No hay variable, usar default
}

// Validar y usar Key de entorno (si está disponible)
let supabaseAnonKey: string
if (envKey && typeof envKey === 'string' && envKey.trim() !== '' && envKey.trim() !== 'undefined') {
  const trimmed = envKey.trim()
  // Validar que tenga formato de JWT (básico)
  if (trimmed.length > 50 && trimmed.includes('.')) {
    supabaseAnonKey = trimmed // ✅ Usar variable de entorno
  } else {
    supabaseAnonKey = BUILD_TIME_KEY // Key inválida, usar default
  }
} else {
  supabaseAnonKey = BUILD_TIME_KEY // No hay variable, usar default
}

// Crear cliente siempre con valores válidos (nunca undefined o vacío)
// Durante build time usará BUILD_TIME_URL/KEY
// En runtime usará las variables de entorno reales si están disponibles
export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string,
  {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: typeof window !== 'undefined',
    },
  }
)

// Tipos para las tablas principales
export interface User {
  id: string
  email: string
  whatsapp?: string
  nombre: string
  edad?: number
  genero?: string
  foto_perfil?: string
  alergias?: string
  medicamentos?: string
  puntos_lealtad?: number
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum'
  membresia_tipo?: string
  estado?: string
  fecha_registro?: string
  created_at?: string
  updated_at?: string
}

export interface Tratamiento {
  id: string
  nombre: string
  slug: string
  descripcion?: string
  descripcion_larga?: string
  categoria?: string
  precio_base: number
  precio_membresia_silver?: number
  precio_membresia_gold?: number
  precio_membresia_platinum?: number
  duracion_minutos?: number
  imagen_principal?: string
  galeria_antes_despues?: string[]
  activo?: boolean
  created_at?: string
  updated_at?: string
}

export interface Cita {
  id: string
  usuario_id: string
  especialista_id?: string
  tratamiento_id: string
  sede_id: string
  fecha_hora: string
  duracion_minutos?: number
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada'
  notas_medicas?: string
  precio_final?: number
  metodo_pago?: string
  pago_estado?: string
  created_at?: string
  updated_at?: string
}

export interface ConversacionSofia {
  id: string
  usuario_id?: string
  sesion_id: string
  mensaje_usuario: string
  respuesta_sofia: string
  tipo_interaccion?: string
  satisfaccion?: number
  timestamp?: string
  created_at?: string
}

